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
 * Three contracts are checked, mirroring gatsby-node.js:
 *   1. Each grouped slug   -> 301 to its group destination, both locales.
 *   2. Each category hub   -> 301 to its mapped destination, both locales.
 *   3. Each "gone" slug    -> a real 404, NOT a redirect. Redirecting these
 *      would create the soft-404s the data file deliberately avoids, so a 301
 *      here is a failure, not a pass.
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

const SITE = (process.env.SITE_URL ?? "https://sertuinevents.com").replace(
  /\/+$/,
  "",
);
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 8);
const LOCALES = ["", "/es"];

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
}

const problems = [];
let ok = 0;

const run = async (check) => {
  let res;
  try {
    res = await fetch(check.url, { redirect: "manual" });
  } catch (error) {
    problems.push(`  ERR    ${check.url} (${error.message})`);
    return;
  }

  if (check.kind === "gone") {
    // A 301 here is the specific regression this check exists to catch.
    if (res.status === 404) ok++;
    else
      problems.push(
        `  SOFT404 ${check.url} -> ${res.status} ${res.headers.get("location") ?? ""} (want 404)`,
      );
    return;
  }

  const got = res.headers.get("location");
  if (res.status !== 301)
    problems.push(`  ${res.status}    ${check.url} (want 301 -> ${check.want})`);
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

console.log(`  correct  : ${ok}`);
console.log(`  problems : ${problems.length}`);
if (problems.length) {
  console.log("\n" + problems.sort().join("\n"));
}
process.exit(problems.length === 0 ? 0 : 1);
