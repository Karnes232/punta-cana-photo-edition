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
  100-reasons-why-sertuin-events-is-the-most-recognized-company-for-marriage-proposals-in-punta-cana
  fiesta-americana-funeeq-punta-cana-proposal-packages-2026-2027
  exclusive-punta-cana-proposal-packages-with-photography-included
  punta-cana-beach-proposal-packages
  marriage-proposal-packages-punta-cana
  propuestas-matrimonio-punta-cana-sertuin-events
  romantic-beach-dinner-for-proposal-punta-cana
  romantic-marriage-proposal-punta-cana
  all-inclusive-resort-proposal-punta-cana
  luxury-punta-cana-marriage-proposal-packages-for-couples
  gourmet-dinner-marriage-proposal-packages-punta-cana-2026
  most-romantic-beach-proposal-packages-punta-cana-2026
  marriage-proposals-in-punta-cana-luxury-romantic-engagement-packages
  boho-beach-proposal-punta-cana-romantic-simplicity
  proposal-on-saona-island-punta-cana
  uvero-alto-beach-proposal-punta-cana-secluded-romance-in-the-caribbean
  how-sertuin-events-creates-unforgettable-marriage-proposals-in-punta-cana
  historias-reales-de-amor-vividas-en-punta-cana-con-sertuin-events
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
  barcelo-bavaro-palace-set-up-fee-punta-cana-wedding-contract
  zoetry-agua-punta-cana-eco-fee-wedding-budget
  melia-caribe-beach-banquet-service-charge-punta-cana-wedding
  paradisus-palma-real-decor-coordination-fee-punta-cana-wedding-tips
  ocean-el-faro-av-add-ons-hidden-punta-cana-wedding-expenses
  excellence-el-carmen-reception-minimums-punta-cana-wedding-budget
  majestic-mirage-vendor-penalties-punta-cana-wedding-guide-negotiating-waivers
  royalton-bavaro-wedding-cocktail-hour-hidden-fees
  iberostar-grand-bavaro-wedding-ceremony-hidden-fees
  dreams-macao-beach-wedding-hidden-fees
  hyatt-ziva-cap-cana-wedding-costs-hidden-fees-guide
  punta-cana-vs-aruba-caribbean-wedding
  punta-cana-vs-bahamas-wedding-beaches
  punta-cana-vs-jamaica-romantic-wedding
  punta-cana-vs-cabo-san-lucas-wedding
  punta-cana-vs-tulum-wedding-destination
  punta-cana-vs-cancun-wedding-destination
  punta-cana-vs-riviera-maya-wedding-showdown
  punta-cana-vs-cozumel-beach-wedding
  punta-cana-vs-amalfi-coast-wedding-comparison
  punta-cana-vs-santorini-wedding-destination
  punta-cana-vs-cartagena-wedding-romance-vs-history
  punta-cana-vs-miami-wedding-comparison
  punta-cana-vs-bali-destination-wedding
  punta-cana-vs-seychelles-wedding-paradise
  punta-cana-vs-hawaii-dream-wedding
  punta-cana-vs-maldives-romantic-escape
  punta-cana-vs-bora-bora-luxury-beach-wedding
  punta-cana-vs-key-west-wedding-comparison
  punta-cana-vs-belize-nature-vs-luxury-wedding
  punta-cana-vs-isla-mujeres-beach-wedding
  punta-cana-vs-st-martin-wedding-comparison
  punta-cana-vs-barbados-romantic-wedding
  punta-cana-vs-grenada-private-wedding
  punta-cana-vs-san-juan-wedding-destination
  punta-cana-vs-dominica-unique-wedding
  punta-cana-vs-curacao-wedding-backdrop
  punta-cana-vs-turks-and-caicos-luxury-wedding
  punta-cana-vs-st-lucia-wedding-experience
  punta-cana-vs-puerto-vallarta-wedding-comparison
  caribbean-beach-wedding-checklist
  beach-wedding-themes-caribbean-style
  all-inclusive-caribbean-beach-weddings
  what-to-wear-caribbean-beach-wedding
  punta-cana-beach-wedding-worth-it
  best-time-caribbean-beach-wedding
  caribbean-beach-vs-resort-wedding
  destination-vs-traditional-wedding-2025
  caribbean-wedding-showdown-punta-cana-vs-riviera-maya
  caribbean-wedding-cost-2025
  mexico-vs-caribbean-wedding
  top-caribbean-islands-wedding-ranking
  punta-cana-vs-cancun-wedding
  beach-wedding-budget-2025
  jamaica-vs-dominican-republic-wedding
  caribbean-wedding-what-i-wish-i-knew
  from-engagement-to-i-do-caribbean
  bring-your-own-photographer-fees-dreams-macao-beach-punta-cana
  rain-plan-strategies-dreams-macao-beach-punta-cana-weddings
  wedding-dress-trends-2025-dreams-macao-beach-punta-cana-brides
  planning-mistakes-dreams-macao-beach-punta-cana-wedding
  dreams-macao-beach-punta-cana-wedding-faqs-2025-2026
  honeymoon-wedding-combo-dreams-macao-beach-punta-cana
  music-entertainment-guide-dreams-macao-beach-punta-cana-weddings
  culinary-delights-weddings-dreams-macao-beach-punta-cana
  must-have-photos-dreams-macao-beach-punta-cana-weddings
  trusted-vendors-2025-dreams-macao-beach-punta-cana-weddings
  best-season-to-marry-dreams-macao-beach-punta-cana
  dreams-macao-beach-punta-cana-wedding-reviews-2025
  micro-weddings-dreams-macao-beach-punta-cana-creative-ideas
  save-18-percent-on-your-dreams-macao-beach-punta-cana-wedding
  tropical-decor-trends-2025-2026-dreams-macao-beach-punta-cana-weddings
  top-10-wedding-spots-dreams-macao-beach-punta-cana
  dreams-macao-beach-punta-cana-wedding-checklist-12-month-plan
  how-much-does-a-dreams-macao-beach-punta-cana-wedding-cost
  dreams-macao-beach-punta-cana-wedding-packages-prices-2025-2026-guide
  how-many-days-before-wedding-punta-cana
  bring-own-photographer-punta-cana-resort-wedding
  punta-cana-destination-wedding-guests-with-kids
  best-month-wedding-punta-cana-no-rain
  punta-cana-wedding-guests-passport
  boda-en-capilla-en-punta-cana-experiencia-sagrada-elegante-sertuin-events
  tropical-elegance-wedding-punta-cana
  elegant-sunset-wedding-in-punta-cana
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
  exclusive-beachfront-villas-punta-cana-private-events
`);

const weddingVenueBlogSlugs = split(`
  hidden-costs-in-punta-cana-wedding-venues-how-professional-inspections-protect-your-budget
  why-international-wedding-planners-trust-punta-cana-venue-collection
  verified-wedding-venues-in-punta-cana-why-inspections-matter-for-your-big-day
`);

const genderRevealBlogSlugs = split(`
  sertuin-events-captures-the-best-gender-reveal-moments-in-punta-cana
`);

const elopementBlogSlugs = split(`
  caribbean-elopement-best-decision
  symbolic-vs-legal-caribbean-wedding
  how-to-get-married-dominican-republic
  legal-tips-foreign-couples-wedding-dreams-macao-beach-punta-cana
  civil-vs-symbolic-ceremony-dreams-macao-beach-punta-cana
  symbolic-wedding-in-punta-cana-vs-legal-ceremony
  symbolic-vs-civil-ceremony-dominican-republic
  how-long-to-get-marriage-certificate-dominican-republic
  is-a-civil-ceremony-in-the-dominican-republic-valid-internationally
  do-you-need-to-speak-spanish-to-get-married-in-the-dominican-republic
  how-to-make-dominican-republic-wedding-legal-in-home-country
  is-a-destination-wedding-in-the-dominican-republic-legally-binding
  do-i-need-to-register-my-dominican-republic-marriage-in-the-us
  can-us-citizens-legally-marry-in-punta-cana
  is-a-wedding-in-the-dominican-republic-legally-recognized-in-canada
  legal-requirements-getting-married-punta-cana
`);

// Two retired blog CATEGORY hubs are deliberately absent from categoryRedirects
// below and therefore stay 404:
//   /blog/local-businesses            - no equivalent service page exists.
//   /blog/birthdays-and-bachelor-parties
// The latter looks like it belongs on /event-planner/ (matching the
// private-parties-and-celebrations entry), but that page is now corporate-only
// - it mentions "corporate" 34 times and "birthday"/"bachelor" zero times, so
// the redirect would be a soft-404. Birthdays and bachelor parties currently
// live only under /packages/*, and /packages/ itself does not exist yet.
// Revisit once a /packages/ hub page ships: that becomes the honest destination.

// These topics are outside Sertuin Events' current services and have no close
// replacement. If an old Contentful entry remains, do not recreate the page.
const goneBlogSlugs = split(`
  engagement-photoshoot-punta-cana
  ultimate-bachelor-party-guide-punta-cana
  ultimate-punta-cana-birthday-celebration-guide
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
  {
    slugs: genderRevealBlogSlugs,
    destination: "/gender-reveal-punta-cana/",
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
  "/blog/themed-and-experiential-events": "/event-planner/",
  "/blog/complete-guide-to-organizing-events-in-punta-cana": "/event-planner/",
};

const retiredBlogSlugs = new Set([
  ...groups.flatMap((group) => group.slugs),
  ...goneBlogSlugs,
]);

module.exports = { groups, categoryRedirects, retiredBlogSlugs };
