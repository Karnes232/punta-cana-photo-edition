const clean = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

/**
 * Gives every rendered Contentful image a meaningful alt description and an
 * HTML title. Editorial asset metadata wins; localized, unique copy fills any
 * gaps so no proposal image is emitted unnamed.
 */
export const getImageSeo = (
  asset,
  { language = "en-US", subject, context = "gallery", index = 0 } = {},
) => {
  const isSpanish = language === "es";
  const safeSubject =
    clean(subject) ||
    (isSpanish ? "Propuesta de matrimonio" : "Marriage proposal");
  const editorialTitle = clean(asset?.title);
  const editorialDescription = clean(asset?.description);
  const ordinal = Number(index) + 1;
  const contextCopy = {
    hero: isSpanish ? "vista principal" : "main view",
    card: isSpanish ? "vista del paquete" : "package preview",
    gallery: isSpanish ? "detalle del montaje" : "setup detail",
    feature: isSpanish ? "decoración destacada" : "featured décor",
  };
  const fallbackContext = contextCopy[context] || contextCopy.gallery;
  const fallbackDescription = isSpanish
    ? `${safeSubject}: ${fallbackContext} ${ordinal} en una playa privada de Uvero Alto, Punta Cana.`
    : `${safeSubject}: ${fallbackContext} ${ordinal} on a private beach in Uvero Alto, Punta Cana.`;
  const fallbackTitle = isSpanish
    ? `${safeSubject} en Punta Cana — ${fallbackContext} ${ordinal}`
    : `${safeSubject} in Punta Cana — ${fallbackContext} ${ordinal}`;
  const contextualTitle = editorialTitle
    ? `${editorialTitle} — ${fallbackContext} ${ordinal}`
    : fallbackTitle;
  const contextualDescription = editorialDescription
    ? `${editorialDescription.replace(/[.!?]+$/, "")}: ${fallbackContext} ${ordinal}, Uvero Alto, Punta Cana.`
    : fallbackDescription;

  return {
    alt: contextualDescription,
    title: contextualTitle,
  };
};

export default getImageSeo;
