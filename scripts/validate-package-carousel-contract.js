#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.join(__dirname, "..");
const source = (relativePath) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

const packageTemplate = source("src/template/package.js");
const heroCarousel = source("src/components/HeroSwiper/HeroSwiper.js");
const packageCarousel = source(
  "src/components/SwiperCarouselComponent/SwiperCarousel.js",
);

// The proposal package experience is a product contract: keep the same hero,
// carousel, slide order, autoplay, loop, navigation and form structure. Image
// delivery may change underneath it, but presentation must remain stable.
assert.match(packageTemplate, /<HeroSwiper\b/);
assert.match(packageTemplate, /<SwiperCarousel\b/);
assert.match(packageTemplate, /<PackageForm\b/);
assert.match(packageTemplate, /<ProposalPackageDetails\b/);

assert.match(heroCarousel, /heroInfo\?\.heroImageList\?\.forEach/);
assert.match(heroCarousel, /loop=\{true\}/);
assert.match(heroCarousel, /autoplay=\{\{/);
assert.match(heroCarousel, /<SwiperSlide\b/);
assert.match(heroCarousel, /<ContentfulResponsiveImage\b/);

assert.match(packageCarousel, /images\?\.forEach/);
assert.match(packageCarousel, /loop=\{true\}/);
assert.match(packageCarousel, /autoplay=\{\{/);
assert.match(packageCarousel, /navigation=\{true\}/);
assert.match(packageCarousel, /type: "fraction"/);
assert.match(packageCarousel, /photoListEdited\.map/);
assert.match(packageCarousel, /<ContentfulResponsiveImage\b/);
assert.doesNotMatch(packageCarousel, /images\?*\.slice\(/);

assert.match(packageTemplate, /heroImageList\s*\{\s*url\s*width\s*height/s);
assert.match(packageTemplate, /images\s*\{[\s\S]*?url\s*width\s*height/);

console.log(
  "Validated the unchanged package hero, carousel, slide order, controls and form contract with responsive CDN image delivery.",
);
