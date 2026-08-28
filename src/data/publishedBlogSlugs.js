// Public blog allowlist.
//
// Contentful still contains historical entries and Google continues to crawl
// some of their old URLs. Publishing from an allowlist prevents an archived
// entry from silently returning to the site after an editorial or locale
// change. New articles must be reviewed and added here intentionally.
const publishedBlogSlugs = new Set([
  "punta-cana-resort-proposal-permits-fees-privacy",
  "punta-cana-proposal-rain-weather-policy",
  "punta-cana-destination-wedding-guest-travel-guide",
  "punta-cana-wedding-rain-plan",
  "first-meeting-punta-cana-wedding-planner-checklist",
  "plan-multicultural-wedding-punta-cana-family-traditions",
  "south-asian-wedding-punta-cana-venue-logistics-checklist",
  "punta-cana-corporate-event-quote-checklist",
  "punta-cana-corporate-event-transport-setup-timeline",
  "punta-cana-corporate-event-ballroom-beach-private-venue",
  "best-location-gender-reveal-punta-cana-villa-hotel-beach",
  "keep-gender-reveal-result-secret-punta-cana",
  "punta-cana-gender-reveal-rain-wind-weather-plan",
  "punta-cana-wedding-all-inclusive-resort-vs-private-venue",
  "how-to-prepare-for-a-marriage-proposal-in-punta-cana",
]);

const normalizeBlogSlug = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const isPublishedBlogSlug = (value) =>
  publishedBlogSlugs.has(normalizeBlogSlug(value));

module.exports = {
  isPublishedBlogSlug,
  normalizeBlogSlug,
  publishedBlogSlugs,
};
