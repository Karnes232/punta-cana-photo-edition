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
  const isPortuguese = language === "pt";
  const safeSubject =
    clean(subject) ||
    (isPortuguese
      ? "Pedido de casamento"
      : isSpanish
        ? "Propuesta de matrimonio"
        : "Marriage proposal");
  const editorialTitle = clean(asset?.title);
  const editorialDescription = clean(asset?.description);
  const ordinal = Number(index) + 1;
  const contextCopy = {
    hero: isPortuguese
      ? "vista principal"
      : isSpanish
        ? "vista principal"
        : "main view",
    card: isPortuguese
      ? "prévia do pacote"
      : isSpanish
        ? "vista del paquete"
        : "package preview",
    gallery: isPortuguese
      ? "detalhe da montagem"
      : isSpanish
        ? "detalle del montaje"
        : "setup detail",
    feature: isPortuguese
      ? "decoração em destaque"
      : isSpanish
        ? "decoración destacada"
        : "featured décor",
  };
  const fallbackContext = contextCopy[context] || contextCopy.gallery;
  const fallbackDescription = isPortuguese
    ? `${safeSubject}: ${fallbackContext} ${ordinal} em uma praia privativa de Uvero Alto, Punta Cana.`
    : isSpanish
      ? `${safeSubject}: ${fallbackContext} ${ordinal} en una playa privada de Uvero Alto, Punta Cana.`
      : `${safeSubject}: ${fallbackContext} ${ordinal} on a private beach in Uvero Alto, Punta Cana.`;
  const fallbackTitle = isPortuguese
    ? `${safeSubject} em Punta Cana — ${fallbackContext} ${ordinal}`
    : isSpanish
      ? `${safeSubject} en Punta Cana — ${fallbackContext} ${ordinal}`
      : `${safeSubject} in Punta Cana — ${fallbackContext} ${ordinal}`;
  const contextualTitle =
    editorialTitle && !isPortuguese
      ? `${editorialTitle} — ${fallbackContext} ${ordinal}`
      : fallbackTitle;
  const contextualDescription =
    editorialDescription && !isPortuguese
      ? `${editorialDescription.replace(/[.!?]+$/, "")}: ${fallbackContext} ${ordinal}, Uvero Alto, Punta Cana.`
      : fallbackDescription;

  return {
    alt: contextualDescription,
    title: contextualTitle,
  };
};

export default getImageSeo;
