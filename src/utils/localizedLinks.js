const SITE_ORIGIN = "https://sertuinevents.com";
const SITE_HOSTNAMES = new Set(["sertuinevents.com", "www.sertuinevents.com"]);

const hasLocalizedProposalDestination = (pathname) =>
  /^\/proposal\/?$/i.test(pathname) || /^\/packages(?:\/|$)/i.test(pathname);

const parseUrl = (value) => {
  try {
    return new URL(value, SITE_ORIGIN);
  } catch {
    return null;
  }
};

export const isExternalSiteUrl = (value) => {
  if (!/^https?:\/\//i.test(value || "")) return false;
  const url = parseUrl(value);
  return Boolean(url && !SITE_HOSTNAMES.has(url.hostname.toLowerCase()));
};

/**
 * Keep proposal traffic inside the Spanish site architecture. Contentful still
 * contains a few historic absolute English URLs, so localization must also be
 * applied when rich text is rendered instead of relying only on navigation.
 */
export const localizeProposalUrl = (value, language) => {
  const languagePrefix =
    language === "es" ? "es" : language === "pt" ? "pt" : "";
  if (!languagePrefix || typeof value !== "string") return value;

  const candidate = value.trim();
  const isAbsolute = /^https?:\/\//i.test(candidate);
  const isRootRelative = candidate.startsWith("/");
  if (!isAbsolute && !isRootRelative) return value;

  const url = parseUrl(candidate);
  if (!url) return value;
  if (isAbsolute && !SITE_HOSTNAMES.has(url.hostname.toLowerCase())) {
    return value;
  }
  if (/^\/(?:es|pt)(?:\/|$)/i.test(url.pathname)) return value;
  if (!hasLocalizedProposalDestination(url.pathname)) return value;

  url.pathname = `/${languagePrefix}${url.pathname}`;
  if (isAbsolute) {
    return `${url.protocol}//${url.host}${url.pathname}${url.search}${url.hash}`;
  }
  return `${url.pathname}${url.search}${url.hash}`;
};

// Kept as an API alias while callers migrate to the language-neutral name.
export const localizeSpanishProposalUrl = localizeProposalUrl;
