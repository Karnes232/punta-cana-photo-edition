export const SITE_LANGUAGES = ["en-US", "es", "pt", "fr"];

export const LANGUAGE_CONFIG = {
  "en-US": {
    prefix: "",
    htmlLang: "en",
    hrefLang: "en",
    ogLocale: "en_US",
    label: "English",
    flag: "🇺🇸",
  },
  es: {
    prefix: "/es",
    htmlLang: "es",
    hrefLang: "es",
    ogLocale: "es_DO",
    label: "Español",
    flag: "🇪🇸",
  },
  pt: {
    prefix: "/pt",
    htmlLang: "pt-BR",
    hrefLang: "pt-BR",
    ogLocale: "pt_BR",
    label: "Português",
    flag: "🇧🇷",
  },
  fr: {
    prefix: "/fr",
    htmlLang: "fr-FR",
    hrefLang: "fr-FR",
    ogLocale: "fr_FR",
    label: "Français",
    flag: "🇫🇷",
  },
};

export const normalizeLanguage = (language) =>
  LANGUAGE_CONFIG[language] ? language : "en-US";

export const getLanguageConfig = (language) =>
  LANGUAGE_CONFIG[normalizeLanguage(language)];

export const localizedPath = (path, language) => {
  const config = getLanguageConfig(language);
  const normalized =
    path === "/" ? "/" : `/${String(path).replace(/^\/+|\/+$/g, "")}/`;
  if (!config.prefix) return normalized;
  return normalized === "/"
    ? `${config.prefix}/`
    : `${config.prefix}${normalized}`;
};

export const localizedUrl = (rootUrl, path, language) =>
  `${String(rootUrl).replace(/\/$/, "")}${localizedPath(path, language)}`;

export const languageKey = (language) => {
  if (language === "es") return "es";
  if (language === "pt") return "pt";
  if (language === "fr") return "fr";
  return "en";
};
