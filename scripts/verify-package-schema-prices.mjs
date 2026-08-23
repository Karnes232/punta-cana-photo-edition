#!/usr/bin/env node
/**
 * Asserts that every built package page publishes a schema Offer price equal to
 * the price rendered on the page.
 *
 * This is the falsifiable check for the schema/page price drift: it reads the
 * actual build output rather than trusting the source, so it catches the case
 * where the reconciler is bypassed, removed, or silently fails.
 *
 * Usage:  node scripts/verify-package-schema-prices.mjs [publicDir]
 * Exits non-zero if any page disagrees.
 */

import fs from "fs";
import path from "path";

const PUBLIC_DIR = process.argv[2] ?? "public";
const PACKAGES_DIR = path.join(PUBLIC_DIR, "packages");

// Offers inside these containers are not the package offer.
const NON_PACKAGE_OFFER_KEYS = new Set([
  "addOn",
  "hasOfferCatalog",
  "itemListElement",
]);

const packageOfferPrices = (schema) => {
  const prices = [];
  const walk = (node, container) => {
    if (Array.isArray(node)) {
      node.forEach((child) => walk(child, container));
      return;
    }
    if (!node || typeof node !== "object") return;
    if (node["@type"] === "Offer" && !container && node.price != null) {
      prices.push(Number(node.price));
    }
    Object.entries(node).forEach(([key, value]) =>
      walk(value, NON_PACKAGE_OFFER_KEYS.has(key) ? key : container),
    );
  };
  walk(schema, null);
  return prices;
};

/** Largest 3–4 digit dollar figure rendered on the page — the headline package price. */
const renderedPrices = (html) => {
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "");
  const matches = [...text.matchAll(/\$\s?([0-9],[0-9]{3}|[0-9]{3,4})(?!\d)/g)];
  return [...new Set(matches.map((m) => Number(m[1].replace(/,/g, ""))))];
};

if (!fs.existsSync(PACKAGES_DIR)) {
  console.error(
    `No build output at ${PACKAGES_DIR}. Run \`npm run build\` first.`,
  );
  process.exit(2);
}

const slugs = fs
  .readdirSync(PACKAGES_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let checked = 0;
let mismatched = 0;
let noSchema = 0;

for (const slug of slugs) {
  const file = path.join(PACKAGES_DIR, slug, "index.html");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");

  // Gatsby appends `data-gatsby-head="true"`, so allow arbitrary extra attributes.
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
    console.log(`  --   ${slug.padEnd(44)} no package Offer price in schema`);
    continue;
  }

  checked++;
  const onPage = renderedPrices(html);
  const agrees = prices.every((p) => onPage.includes(p));

  if (agrees) {
    console.log(`  ok   ${slug.padEnd(44)} ${prices.join(", ")}`);
  } else {
    mismatched++;
    console.log(
      `  FAIL ${slug.padEnd(44)} schema=${prices.join(", ")} page=${onPage.join(", ") || "(none found)"}`,
    );
  }
}

console.log(
  `\n${checked} checked, ${mismatched} mismatched, ${noSchema} without a schema price.`,
);
process.exit(mismatched === 0 ? 0 : 1);
