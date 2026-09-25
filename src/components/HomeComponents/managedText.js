// Contentful holds only English and Spanish copy for the home page, so
// Portuguese and French always use the repo copy in homeContent.js. Spanish
// Contentful entries that still use the English service names fall back too.
const ENGLISH_SERVICE_TERMS =
  /\belopements?\b|\bwedding (?:planner|planning)\b|\bgender\s*reveal\b/i;

export const createManagedText = (language) => (value, fallback) => {
  if (!value) return fallback;
  if (language === "pt" || language === "fr") return fallback;
  if (language === "es" && ENGLISH_SERVICE_TERMS.test(value)) return fallback;
  return value;
};

// Rich-text Contentful fields are also en/es only.
export const hasContentfulCopy = (language) =>
  language !== "pt" && language !== "fr";
