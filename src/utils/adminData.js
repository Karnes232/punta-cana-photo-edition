// Data for the /admin pages (English and Spanish only), from Sanity: the hero
// from the Admin Area document, quote packages and extras from the website's
// proposal packages and elopement settings, and rental items from the Rental
// Items. The pages receive "en-US" or "es"; Sanity documents use "en" or "es".
const sanityLanguage = (language) => (language === "es" ? "es" : "en");

// The Admin Area hero, in the shape HeroSwiper expects.
export const adminHeroInfo = (adminPage, language) => ({
  fullSize: Boolean(adminPage?.fullScreenHero),
  heroHeading:
    adminPage?.heroHeading?.[sanityLanguage(language)] ||
    adminPage?.heroHeading?.en,
  heroImageList: (adminPage?.heroImages || []).map((image) => ({
    gatsbyImage: image.asset?.gatsbyImageData,
    alt: image.alt,
  })),
});

// Quote packages: every proposal package (its name in this language) and
// elopement setting, most expensive first.
export const adminPackages = (data, language) => {
  const lang = sanityLanguage(language);
  const proposals = data.allSanityProposalPackagePage.nodes
    .filter((page) => page.language === lang && page.package)
    .map((page) => ({ title: page.name, price: page.package.price }));
  const elopement = data.allSanityElopementPage.nodes.find(
    (page) => page.language === lang,
  );
  const settings = (elopement?.experiences || [])
    .filter((item) => item.option)
    .map((item) => ({ title: item.title, price: item.option.price }));
  return [...proposals, ...settings].sort((a, b) => b.price - a.price);
};

// Quote extras: the website's Proposal Extras, named in this language.
export const adminAdditions = (data, language) => {
  const lang = sanityLanguage(language);
  const texts = data.allSanityProposalPackageTexts.nodes.find(
    (item) => item.language === lang,
  );
  const names = new Map(
    (texts?.addOnNames || []).map((item) => [item.addOn?._id, item.name]),
  );
  return data.allSanityProposalAddOn.nodes
    .map((addOn) => ({
      addition: names.get(addOn._id) || addOn.name,
      price: addOn.price,
    }))
    .sort((a, b) => a.price - b.price);
};

// Rental items offered in quotes, with their name and description in this
// language (Spanish falls back to English), in alphabetical order.
export const adminRentalItems = (data, language) => {
  const lang = sanityLanguage(language);
  return data.allSanityRentalItem.nodes
    .map((item) => ({
      rentalItem: item.name?.[lang] || item.name?.en,
      price: item.price ?? null,
      description: item.description?.[lang] || item.description?.en || "",
    }))
    .sort((a, b) => a.rentalItem.localeCompare(b.rentalItem, lang));
};
