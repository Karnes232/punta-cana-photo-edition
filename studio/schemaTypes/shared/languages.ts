// The four site languages. English is the base language and the fallback.
export const languages = [
  { id: "en", title: "English" },
  { id: "es", title: "Español" },
  { id: "pt", title: "Português" },
  { id: "fr", title: "Français" },
] as const

export type LanguageId = (typeof languages)[number]["id"]

export const baseLanguage = languages[0]
