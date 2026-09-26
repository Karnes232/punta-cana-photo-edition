import { languageKey } from "./siteLocales";

// Blog guides come from Sanity: a language-neutral Blog Guide (address, photo,
// event type, topics, related guides) and one Blog Post per language (text).

// A Sanity localizedString label in the page's language.
export const localized = (label, language) =>
  label?.[languageKey(language)] || label?.en || "";

// Position of the page language in four-item label arrays (en, es, pt, fr).
export const languageIndex = (language) =>
  ["en", "es", "pt", "fr"].indexOf(languageKey(language));

export const guideSlug = (guide) => guide?.slug?.current;

// Guides in library order: by event type, then by their order within it.
export const byLibraryOrder = (a, b) =>
  (a.guide?.category?.order ?? 0) - (b.guide?.category?.order ?? 0) ||
  (a.guide?.order ?? 0) - (b.guide?.order ?? 0);

// Section anchors are positional (#section-1, #section-2…), as they were
// before the move to Sanity, so existing links keep working.
export const sectionId = (index) => `section-${index + 1}`;
