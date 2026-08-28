// Package entries that must never create a public page, even if the Contentful
// record remains available to staff. A URL with a true successor is redirected
// separately; discontinued offers without an equivalent return a real 404.
const retiredPackageRedirects = Object.freeze({
  "ocean-of-love": "/proposal/",
});

const gonePackageSlugs = [
  "photography-event-planner",
  "videography-event-planner",
  "carribean-baby-shower",
  "sunshine-baby-shower",
  "blue-ocean-baby-shower",
  // Tropical Bliss is discontinued. Keep both known spellings retired so a
  // future CMS edit cannot recreate either route.
  "tropical-bliss",
  "tropical-bliss-elopement",
];

const retiredPackageSlugs = new Set([
  ...Object.keys(retiredPackageRedirects),
  ...gonePackageSlugs,
]);

module.exports = {
  gonePackageSlugs,
  retiredPackageRedirects,
  retiredPackageSlugs,
};
