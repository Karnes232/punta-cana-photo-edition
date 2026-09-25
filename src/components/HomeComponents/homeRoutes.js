import { localizedPath as buildLocalizedPath } from "../../utils/siteLocales";

// Contentful service pages that no longer exist; their cards are hidden.
export const legacyRoutes = new Set([
  "/punta-cana-bachelor-party/",
  "/weddings-punta-cana/",
  "/photo-gallery/",
  "/real-estate-photography/",
  "/videos-and-comercial-photos/",
  "/event-rentals/",
  "/birthday-celebrations/",
  "/floral-art/",
  "/packages/photography-event-planner/",
  "/packages/videography-event-planner/",
]);

// Old Contentful URLs that now live at a different path.
const currentRouteAliases = new Map([
  ["/gender-reveal-and-baby-showers/", "/gender-reveal-punta-cana/"],
  ["/weddings-punta-cana/", "/puntacana-wedding-planner/"],
  ["/elopement-vow-renewal/", "/punta-cana-elopement-packages/"],
]);

export const normalizeInternalPath = (path) => {
  if (!path || path.startsWith("#") || path.startsWith("http")) return path;
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
  return currentRouteAliases.get(normalized) || normalized;
};

export const localizedPath = (path, language) => {
  if (!path || path.startsWith("#") || path.startsWith("http")) return path;
  const normalizedPath = normalizeInternalPath(path);
  return buildLocalizedPath(normalizedPath, language);
};
