#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { publishedBlogSlugs } = require("../src/data/publishedBlogSlugs");
const {
  gonePackageSlugs,
  retiredPackageSlugs,
} = require("../src/data/retiredPackageSlugs");
const { retiredBlogSlugs } = require("../src/data/retiredBlogRedirects");

const projectRoot = path.join(__dirname, "..");
const source = (relativePath) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

assert.equal(
  publishedBlogSlugs.size,
  15,
  "The public blog allowlist changed; review the sitemap and update this contract intentionally.",
);

for (const slug of publishedBlogSlugs) {
  assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(
    retiredBlogSlugs.has(slug),
    false,
    `Published and retired blog lists overlap: ${slug}`,
  );
}

for (const slug of gonePackageSlugs) {
  assert.equal(retiredPackageSlugs.has(slug), true);
}
assert.equal(retiredPackageSlugs.has("tropical-bliss-elopement"), true);
assert.equal(retiredPackageSlugs.has("tropical-bliss"), true);

assert.match(source("gatsby-node.js"), /!isPublishedBlogSlug\(slug\)/);
assert.match(source("gatsby-node.js"), /retiredPackageSlugs\.has/);
assert.match(
  source("gatsby-config.js"),
  /!isRetiredOrUnapprovedContentPath\(page\.path\)/,
);
assert.match(source("src/pages/blog/index.js"), /isPublishedBlogSlug\(slug\)/);

console.log(
  `Validated ${publishedBlogSlugs.size} approved blog slugs, ${retiredBlogSlugs.size} retired blog slugs and ${retiredPackageSlugs.size} retired package slugs.`,
);
