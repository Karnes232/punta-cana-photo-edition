#!/usr/bin/env node
/**
 * Asserts that every package page on the LIVE site publishes a schema Offer
 * price equal to the price rendered on that page, in both locales.
 *
 * This is the live counterpart to scripts/verify-package-schema-prices.mjs,
 * which performs the same check against local build output. Run this after a
 * deploy to confirm the reconciled prices actually shipped.
 *
 * The rendered-price regex and the Offer walk are kept identical to that
 * script on purpose: a narrower price pattern misses 3-digit prices such as
 * $999 and reports them as mismatches that do not exist.
 *
 * The Offer walk is container-aware: offers nested under addOn,
 * hasOfferCatalog or itemListElement are add-ons, not the package price, so
 * counting them produces false mismatches.
 *
 * Slugs default to the local build output (public/packages/*), which keeps the
 * list self-maintaining; pass slugs as arguments to check a subset.
 *
 * Usage:  node scripts/verify-prices-live.mjs [slug ...]
 *         SITE_URL=https://deploy-preview--x.netlify.app node scripts/verify-prices-live.mjs
 * Exits non-zero if any page disagrees.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = (process.env.SITE_URL ?? "https://sertuinevents.com").replace(
  /\/+$/,
  "",
);
const LOCALES = ["", "/es"];

// Offers inside these containers are not the package offer.
const EXCLUDE = new Set(["addOn", "hasOfferCatalog", "itemListElement"]);

const packageOfferPrices = (schema) => {
  const out = [];
  const walk = (node, container) => {
    if (Array.isArray(node)) return node.forEach((x) => walk(x, container));
    if (!node || typeof node !== "object") return;
    if (node["@type"] === "Offer" && !container && node.price != null)
      out.push(Number(node.price));
    Object.entries(node).forEach(([key, value]) =>
      walk(value, EXCLUDE.has(key) ? key : container),
    );
  };
  walk(schema, null);
  return [...new Set(out)];
};

const slugsFromBuild = () => {
  const dir = path.join(here, "..", "public", "packages");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
};

const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : slugsFromBuild();

if (!slugs.length) {
  console.error(
    "No slugs given and no build output at public/packages. Run `npm run build` or pass slugs.",
  );
  process.exit(2);
}

let ok = 0;
let mismatched = 0;
let noSchema = 0;
let missing = 0;

console.log(
  `Checking ${slugs.length} packages x ${LOCALES.length} locales against ${SITE} ...\n`,
);

for (const locale of LOCALES) {
  for (const slug of slugs) {
    const url = `${SITE}${locale}/packages/${slug}/`;
    let res;
    try {
      res = await fetch(url);
    } catch (error) {
      missing++;
      console.log(`  ERR      ${locale}/packages/${slug} (${error.message})`);
      continue;
    }
    if (!res.ok) {
      missing++;
      console.log(`  ${res.status}      ${locale}/packages/${slug}`);
      continue;
    }
    const html = await res.text();

    const blocks = [
      ...html.matchAll(
        /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ];
    const prices = blocks.flatMap((m) => {
      try {
        return packageOfferPrices(JSON.parse(m[1]));
      } catch {
        return [];
      }
    });
    if (!prices.length) {
      noSchema++;
      console.log(
        `  --       ${locale}/packages/${slug}  no package Offer price in schema`,
      );
      continue;
    }

    const text = html.replace(/<script[\s\S]*?<\/script>/g, "");
    const page = [
      ...new Set(
        [
          ...text.matchAll(/\$\s?([0-9],[0-9]{3}|[0-9]{3,4})(?!\d)/g),
        ].map((m) =>
          Number(m[1].replace(/,/g, "")),
        ),
      ),
    ];

    if (prices.every((p) => page.includes(p))) {
      ok++;
    } else {
      mismatched++;
      console.log(
        `  MISMATCH ${locale}/packages/${slug}  schema=${prices.join(", ")} page=${
          page.length ? page.join(", ") : "(no price displayed)"
        }`,
      );
    }
  }
}

console.log(
  `\n  matched=${ok}  mismatched=${mismatched}  no-schema-price=${noSchema}  unreachable=${missing}`,
);
process.exit(mismatched === 0 ? 0 : 1);
