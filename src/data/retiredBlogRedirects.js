// Only URLs with a clear, useful replacement receive a 301. Deleted articles
// without an equivalent are intentionally left to Gatsby's real 404 page;
// redirecting every old blog URL to Home would create soft-404s.
const split = (value) => value.trim().split(/\s+/).filter(Boolean);

const proposalBlogSlugs = split(`
  how-to-plan-a-surprise-proposal-in-punta-cana
  mario-phuong-proposal-secrets-tides-punta-cana
  lopesan-costa-bavaro-resort-spa-casino-punta-cana-marriage-proposal-package
  why-choose-trusted-company-punta-cana-marriage-proposal
  private-cabana-proposal-punta-cana
  scape-park-proposal-punta-cana
  lopesan-costa-bavaro-resort-spa-casino-romantic-punta-cana-proposal-planning
  cap-cana-marina-proposal-punta-cana
  punta-cana-ecological-reserve-proposal
  bavaro-beach-proposal-punta-cana
  macao-beach-proposal-punta-cana
  barcelo-bavaro-palace-punta-cana-beach-proposal-ideas
  secrets-cap-cana-marriage-proposal-packages-complete-guide-2025-2026
  majestic-mirage-punta-cana-beach-proposal-ideas
  romantic-hotel-proposal-punta-cana
  punta-cana-proposal-with-live-music
  yacht-proposal-punta-cana-price
  private-beach-proposal-punta-cana
  sunset-proposal-ideas-punta-cana
  unique-proposal-ideas-punta-cana
  tips-to-plan-a-surprise-proposal-in-punta-cana
  why-infinity-love-by-sertuin-events-is-the-most-popular-package
  punta-cana-vs-turks-proposal
  dreams-flora-marriage-proposal-packages
  best-caribbean-places-to-propose-punta-cana
  caribbean-seaside-marriage-proposal
  reasons-to-propose-in-the-caribbean
  unforgettable-proposal-caribbean
  best-time-of-day-to-propose-punta-cana
  surprise-engagement-ideas-punta-cana
  why-punta-cana-is-perfect-for-proposal
  top-romantic-proposal-spots-punta-cana
  yes-under-caribbean-sunset
  punta-cana-vs-turks-and-caicos-proposal
  punta-cana-vs-maui-proposal
  punta-cana-vs-bora-bora-proposal
  punta-cana-vs-riviera-maya-proposal
  punta-cana-vs-maldives-proposal
  punta-cana-vs-aruba-proposal
  punta-cana-vs-bahamas-proposal
  punta-cana-vs-tulum-proposal
  punta-cana-vs-jamaica-proposal
  punta-cana-vs-cancun-proposal
  dreams-onyx-marriage-proposal-packages
  hyatt-ziva-marriage-proposal-packages
  dreams-cap-cana-resort-marriage-proposal-packages
  is-punta-cana-a-good-place-for-lgbtq-destination-proposal
  picture-perfect-proposal-in-punta-cana
  destination-for-proposal-in-punta-cana
  sunset-proposal-punta-cana
  marriage-proposal-on-a-private-yacht-in-punta-cana
  marry-me-punta-cana
  spectacular-yes-punta-cana-sertuin-events
  red-roses-sertuin-events-bold-beach-proposal-punta-cana
  pure-surprise-sertuin-events-candid-beach-proposal-punta-cana
  surprise-proposal-sertuin-events-paradise-caribbean-sun
  real-emotions-sertuin-events-heartfelt-proposal-punta-cana
  marry-me-in-paradise-dream-proposal-sertuin-events
  unforgettable-proposals-punta-cana-sertuin-events
  punta-cana-proposal-with-sertuin-events
  where-to-propose-in-punta-cana
  sertuin-events-romantic-proposals-punta-cana
  where-to-propose-in-punta-cana-with-sertuin-events
  romantic-marriage-proposal-punta-cana-2025
  marriage-proposals-punta-cana
  proposal-planner-punta-cana
  punta-cana-marriage-proposal-packages
  punta-cana-marriage-proposal-planner-grecia-mejia
  punta-cana-proposal-spots
  majestic-mirage-punta-cana-marriage-proposal-package
  punta-cana-perfect-stage-sertuin-events
  punta-cana-proposal-package-comparison
  surprise-proposal-videographer-punta-cana
`);

const weddingBlogSlugs = split(`
  dreams-flora-resort-wedding-packages
  wedding-planner-in-punta-cana
  punta-cana-wedding-planners-remote-services
  destination-wedding-in-punta-cana
  destination-weddings-punta-cana
  destination-wedding-punta-cana
  weddings-punta-cana
  wedding-in-punta-cana-paradise
  punta-cana-beach-wedding
  beach-wedding-in-punta-cana
  punta-cana-destination-wedding-cost
  punta-cana-wedding-package-inclusions
  affordable-wedding-punta-cana
  micro-wedding-packages-punta-cana-all-inclusive
  best-wedding-packages-under-10000
  dreams-royal-beach-punta-cana-wedding-packages
  dreams-onyx-resort-wedding-packages
  hyatt-ziva-wedding-packages
  hyatt-zilara-wedding-packages
  sanctuary-cap-cana-wedding-packages
  dreams-cap-cana-wedding-packages
  secrets-cap-cana-wedding-packages-complete-guide-2025-2026
  how-early-to-book-wedding-punta-cana
  top-10-beachfront-wedding-venues-punta-cana
  marriage-in-the-dominican-republic-why-us-citizens-should-choose-sertuin-events
`);

const corporateBlogSlugs = split(`
  events-in-dreams-royal-beach-punta-cana
  events-dreams-flora-resort
  events-dreams-onyx-resort-punta-cana
  events-hyatt-ziva-cap-cana
  events-hyatt-zilara-cap-cana
  events-sanctuary-cap-cana-luxury-resort
  events-dreams-cap-cana-resort-spa
  events-secrets-cap-cana-resort-spa-complete-guide-2025-2026
  corporate-event-tech-av-production-resources-punta-cana
  top-5-luxury-resorts-corporate-retreats-punta-cana
  corporate-retreats-punta-cana-private-venues
  punta-cana-caribbean-concert-capital-behind-scenes
  punta-cana-music-festival-guide
  transformative-experiential-events-punta-cana
  immersive-themed-events-punta-cana
  from-beaches-to-ballrooms-punta-canas-most-trusted-event-venues
  corporate-retreats-in-punta-cana-choosing-the-right-venue-through-professional-inspections
  the-hidden-risks-of-booking-a-venue-online-and-how-our-inspections-solve-them
  organizacion-total-de-eventos-con-sertuin-events
  el-lado-humano-de-los-eventos-en-punta-cana-con-sertuin-events
`);

const weddingVenueBlogSlugs = split(`
  hidden-costs-in-punta-cana-wedding-venues-how-professional-inspections-protect-your-budget
  why-international-wedding-planners-trust-punta-cana-venue-collection
  verified-wedding-venues-in-punta-cana-why-inspections-matter-for-your-big-day
`);

const birthdayBlogSlugs = split(`
  ultimate-punta-cana-birthday-celebration-guide
`);

const genderRevealBlogSlugs = split(`
  sertuin-events-captures-the-best-gender-reveal-moments-in-punta-cana
`);

const elopementBlogSlugs = split(`
  caribbean-elopement-best-decision
`);

// These topics are outside Sertuin Events' current services and have no close
// replacement. If an old Contentful entry remains, do not recreate the page.
const goneBlogSlugs = split(`
  engagement-photoshoot-punta-cana
  ultimate-bachelor-party-guide-punta-cana
  scuba-diving-punta-cana
  san-juan-shopping-center
`);

const groups = [
  { slugs: proposalBlogSlugs, destination: "/proposal/" },
  {
    slugs: [...weddingBlogSlugs, ...weddingVenueBlogSlugs],
    destination: "/puntacana-wedding-planner/",
  },
  { slugs: corporateBlogSlugs, destination: "/event-planner/" },
  { slugs: birthdayBlogSlugs, destination: "/birthday-celebrations/" },
  {
    slugs: genderRevealBlogSlugs,
    destination: "/gender-reveal-and-baby-showers/",
  },
  {
    slugs: elopementBlogSlugs,
    destination: "/punta-cana-elopement-packages/",
  },
];

const categoryRedirects = {
  "/blog/marriage-proposals": "/proposal/",
  "/blog/weddings-in-punta-cana": "/puntacana-wedding-planner/",
  "/blog/punta-cana-venues": "/event-planner/",
  "/blog/corporate-events-in-punta-cana": "/event-planner/",
  "/blog/private-parties-and-celebrations": "/event-planner/",
  "/blog/concerts-and-festivals": "/event-planner/",
  "/blog/birthdays-and-bachelor-parties": "/birthday-celebrations/",
  "/blog/themed-and-experiential-events": "/event-planner/",
  "/blog/complete-guide-to-organizing-events-in-punta-cana": "/event-planner/",
};

const retiredBlogSlugs = new Set([
  ...groups.flatMap((group) => group.slugs),
  ...goneBlogSlugs,
]);

module.exports = { groups, categoryRedirects, retiredBlogSlugs };
