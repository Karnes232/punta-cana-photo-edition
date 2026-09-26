#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  gonePackageSlugs,
  retiredPackageSlugs,
} = require("../src/data/retiredPackageSlugs");
const { retiredBlogSlugs } = require("../src/data/retiredBlogRedirects");

const projectRoot = path.join(__dirname, "..");
const source = (relativePath) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

for (const slug of gonePackageSlugs) {
  assert.equal(retiredPackageSlugs.has(slug), true);
}
assert.equal(retiredPackageSlugs.has("tropical-bliss-elopement"), true);
assert.equal(retiredPackageSlugs.has("tropical-bliss"), true);
for (const slug of [
  "marriage-proposal-packages-punta-cana",
  "propuestas-matrimonio-punta-cana-sertuin-events",
  "romantic-beach-dinner-for-proposal-punta-cana",
]) {
  assert.equal(
    retiredBlogSlugs.has(slug),
    true,
    `Missing language-safe proposal migration for ${slug}`,
  );
}

// Guides are published from Sanity; the build must refuse one that reuses a
// retired address (see validate-knowledge-graph.js for the published list).
assert.match(source("gatsby-node.js"), /retiredBlogSlugs\.has\(slug\)/);
assert.match(source("gatsby-node.js"), /retiredPackageSlugs\.has/);
assert.match(source("gatsby-node.js"), /protectedRedirectSources/);
assert.match(
  source("gatsby-config.js"),
  /!isRetiredOrUnapprovedContentPath\(page\.path\)/,
);

console.log(
  `Validated ${retiredBlogSlugs.size} retired blog slugs and ${retiredPackageSlugs.size} retired package slugs.`,
);
