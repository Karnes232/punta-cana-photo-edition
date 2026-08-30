const SITE_ORIGIN = "https://sertuinevents.com";
const SITE_HOSTNAMES = new Set(["sertuinevents.com", "www.sertuinevents.com"]);

const hasLocalizedDestination = (pathname) =>
  /^\/(?:contact|event-planner|gender-reveal-punta-cana|proposal|punta-cana-elopement-packages|puntacana-wedding-planner)\/?$/i.test(
    pathname,
  ) || /^\/(?:blog|packages)(?:\/|$)/i.test(pathname);

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
 * Keep internal traffic inside the selected language architecture. Contentful
 * still contains historic absolute English URLs, so localization must also be
 * applied when content links are rendered instead of relying only on navigation.
 */
export const localizeProposalUrl = (value, language) => {
  const languagePrefix =
    language === "es"
      ? "es"
      : language === "pt"
        ? "pt"
        : language === "fr"
          ? "fr"
          : "";
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
  if (/^\/(?:es|pt|fr)(?:\/|$)/i.test(url.pathname)) return value;
  if (!hasLocalizedDestination(url.pathname)) return value;

  url.pathname = `/${languagePrefix}${url.pathname}`;
  if (isAbsolute) {
    return `${url.protocol}//${url.host}${url.pathname}${url.search}${url.hash}`;
  }
  return `${url.pathname}${url.search}${url.hash}`;
};

// Kept as an API alias while callers migrate to the language-neutral name.
export const localizeSpanishProposalUrl = localizeProposalUrl;
