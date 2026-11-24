const CURRENT_BRAND_ID = "sertuin-events";
const local = (value, language) => value?.[language] || "";
const byOrder = (a, b) => (a.order || 0) - (b.order || 0);
const httpsUrl = (value) => {
  if (typeof value !== "string" || value.trim() !== value) return undefined;
  try {
    const u = new URL(value);
    return u.protocol === "https:" && !u.username && !u.password
      ? value
      : undefined;
  } catch {
    return undefined;
  }
};
const homepage = (brand) =>
  brand.homepageLinkEnabled ? httpsUrl(brand.homepageUrl) : undefined;
const visibleItems = (items) =>
  (items || [])
    .filter((item) => item.visible !== false)
    .slice()
    .sort(byOrder);
function validateAbout(page) {
  for (const field of [
    "heading",
    "introduction",
    "foundersHeading",
    "biography",
    "brandHeading",
    "brandDescription",
    "currentBrandLabel",
    "companyHeading",
    "purposeHeading",
    "purpose",
    "processHeading",
    "directoryHeading",
  ]) {
    if (!page[field]?.trim())
      throw new Error(`About ${page.language}: missing ${field}`);
  }
  if (!page.foundersPhoto?.asset || !page.foundersPhoto.alt)
    throw new Error("About: original photograph and alternative text required");
  if (!page.seo?.title || !page.seo.description)
    throw new Error("About: SEO title and description required");
  if (!page.company?.corporateProfile?.legalName)
    throw new Error("About: existing company record required");
  const brands = (page.brands || []).filter((b) => b && b.active !== false);
  if (new Set(brands.map((b) => b.brandId)).size !== brands.length)
    throw new Error("About: duplicate stable brand identifier");
  if (!brands.some((b) => b.brandId === CURRENT_BRAND_ID))
    throw new Error("About: current brand missing");
  for (const b of brands)
    if (
      !b.name ||
      !local(b.description, page.language) ||
      !local(b.homepageButtonLabel, page.language)
    )
      throw new Error("About: incomplete localized brand card");
  return page;
}
module.exports = {
  CURRENT_BRAND_ID,
  local,
  byOrder,
  httpsUrl,
  homepage,
  visibleItems,
  validateAbout,
};
