#!/usr/bin/env node
/**
 * Asserts that every retired blog URL behaves on the LIVE site the way
 * src/data/retiredBlogRedirects.js says it should.
 *
 * This is the live counterpart to scripts/verify-package-schema-prices.mjs,
 * which checks build output. Run this after a deploy: it catches the case where
 * the redirect rules build correctly but never reach the CDN, or where a rule
 * is shadowed by an earlier one in netlify.toml.
 *
 * Five contracts are checked, mirroring gatsby-node.js and the sitemap guard:
 *   1. Each grouped slug   -> 301 to its group destination, both locales.
 *   2. Each category hub   -> 301 to its mapped destination, both locales.
 *   3. Each "gone" slug    -> a real 404, NOT a redirect. Redirecting these
 *      would create the soft-404s the data file deliberately avoids, so a 301
 *      here is a failure, not a pass.
 *   4. Retired package URLs -> 301 only with an equivalent; otherwise 404.
 *   5. Only approved blogs appear in the sitemap and return 200.
 *
 * Usage:  node scripts/verify-redirects-live.mjs
 *         SITE_URL=https://deploy-preview--x.netlify.app node scripts/verify-redirects-live.mjs
 * Exits non-zero if any URL disagrees.
 */

import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
// The data module is CommonJS (`module.exports`), so it is required, not imported.
const { groups, categoryRedirects, retiredBlogSlugs } = require(
  path.join(here, "..", "src", "data", "retiredBlogRedirects.js"),
);
const { publishedBlogSlugs } = require(
  path.join(here, "..", "src", "data", "publishedBlogSlugs.js"),
);
const { gonePackageSlugs, retiredPackageRedirects } = require(
  path.join(here, "..", "src", "data", "retiredPackageSlugs.js"),
);

const SITE = (process.env.SITE_URL ?? "https://sertuinevents.com").replace(
  /\/+$/,
  "",
);
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 4);
const LOCALES = ["", "/es"];
const RETRYABLE_STATUSES = new Set([403, 429, 500, 502, 503, 504]);
const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
const fetchWithRetry = async (url, options = {}) => {
  let response;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    response = await fetch(url, {
      ...options,
      headers: {
        "user-agent": "SertuinEvents-redirect-verifier/1.0",
        ...options.headers,
      },
    });
    if (!RETRYABLE_STATUSES.has(response.status)) return response;
    if (attempt < 2) await wait(750 * (attempt + 1));
  }
  return response;
};

const groupedSlugs = new Set(groups.flatMap((g) => g.slugs));
// retiredBlogSlugs = grouped + gone, so the difference is exactly the gone set.
const goneSlugs = [...retiredBlogSlugs].filter((s) => !groupedSlugs.has(s));

const checks = [];
for (const locale of LOCALES) {
  for (const { slugs, destination } of groups) {
    for (const slug of slugs) {
      checks.push({
        kind: "redirect",
        url: `${SITE}${locale}/blog/${slug}/`,
        want: locale ? `/es${destination}` : destination,
      });
    }
  }
  for (const [source, destination] of Object.entries(categoryRedirects)) {
    checks.push({
      kind: "redirect",
      url: `${SITE}${locale}${source}/`,
      want: locale ? `/es${destination}` : destination,
    });
  }
  for (const slug of goneSlugs) {
    checks.push({ kind: "gone", url: `${SITE}${locale}/blog/${slug}/` });
  }
  for (const [slug, destination] of Object.entries(retiredPackageRedirects)) {
    checks.push({
      kind: "redirect",
      url: `${SITE}${locale}/packages/${slug}/`,
      want: locale ? `/es${destination}` : destination,
    });
  }
  for (const slug of gonePackageSlugs) {
    checks.push({
      kind: "gone",
      url: `${SITE}${locale}/packages/${slug}/`,
    });
  }
  for (const slug of publishedBlogSlugs) {
    checks.push({
      kind: "published",
      url: `${SITE}${locale}/blog/${slug}/`,
    });
  }
}

const problems = [];
let ok = 0;

const run = async (check) => {
  let res;
  try {
    res = await fetchWithRetry(check.url, { redirect: "manual" });
  } catch (error) {
    problems.push(`  ERR    ${check.url} (${error.message})`);
    return;
  }

  if (check.kind === "gone") {
    // A redirect here is the specific regression this check exists to catch.
    if (res.status === 404) ok++;
    else
      problems.push(
        `  WRONG  ${check.url} -> ${res.status} ${res.headers.get("location") ?? ""} (want 404)`,
      );
    return;
  }

  if (check.kind === "published") {
    if (res.status === 200) ok++;
    else problems.push(`  ${res.status}    ${check.url} (want 200)`);
    return;
  }

  const got = res.headers.get("location");
  if (res.status !== 301)
    problems.push(
      `  ${res.status}    ${check.url} (want 301 -> ${check.want})`,
    );
  else if (got !== check.want)
    problems.push(`  WRONG  ${check.url} -> ${got} (want ${check.want})`);
  else ok++;
};

console.log(`Checking ${checks.length} URLs against ${SITE} ...\n`);

let cursor = 0;
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, checks.length) }, async () => {
    while (cursor < checks.length) await run(checks[cursor++]);
  }),
);

try {
  const sitemapResponse = await fetchWithRetry(`${SITE}/sitemap-0.xml`);
  const sitemap = await sitemapResponse.text();
  if (!sitemapResponse.ok) {
    problems.push(
      `  ${sitemapResponse.status}    ${SITE}/sitemap-0.xml (want 200)`,
    );
  } else {
    for (const locale of LOCALES) {
      for (const slug of publishedBlogSlugs) {
        const url = `${SITE}${locale}/blog/${slug}/`;
        if (!sitemap.includes(`<loc>${url}</loc>`)) {
          problems.push(`  MISSING ${url} from sitemap`);
        }
      }
      for (const slug of retiredBlogSlugs) {
        const url = `${SITE}${locale}/blog/${slug}/`;
        if (sitemap.includes(`<loc>${url}</loc>`)) {
          problems.push(`  STALE  ${url} remains in sitemap`);
        }
      }
      for (const slug of [
        ...Object.keys(retiredPackageRedirects),
        ...gonePackageSlugs,
      ]) {
        const url = `${SITE}${locale}/packages/${slug}/`;
        if (sitemap.includes(`<loc>${url}</loc>`)) {
          problems.push(`  STALE  ${url} remains in sitemap`);
        }
      }
    }
  }
} catch (error) {
  problems.push(`  ERR    ${SITE}/sitemap-0.xml (${error.message})`);
}

console.log(`  correct  : ${ok}`);
console.log(`  problems : ${problems.length}`);
if (problems.length) {
  console.log("\n" + problems.sort().join("\n"));
}
process.exit(problems.length === 0 ? 0 : 1);
