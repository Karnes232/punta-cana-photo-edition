import { defineField, defineType, type Rule } from "sanity"

import { baseLanguage, languages } from "../shared/languages"

type LocalizedValue = Partial<Record<string, unknown>> | undefined

// Field-level localization: one object holds the same text in every language.
// English shows first; the translations sit in a fieldset below it.
// Whether a field is required is decided where the type is used, not here.
const localizedObject = (
  name: string,
  title: string,
  field: { type: "string" | "text" } | { type: "array"; of: { type: "string" }[] },
) =>
  defineType({
    name,
    title,
    type: "object",
    fieldsets: [{ name: "translations", title: "Translations", options: { collapsible: true } }],
    fields: languages.map((language) =>
      defineField({
        name: language.id,
        title: language.title,
        ...field,
        fieldset: language.id === baseLanguage.id ? undefined : "translations",
      }),
    ),
  })

export const localizedString = localizedObject("localizedString", "Localized string", {
  type: "string",
})
export const localizedText = localizedObject("localizedText", "Localized text", { type: "text" })
// A different list per language, e.g. SEO keywords.
export const localizedStringList = localizedObject("localizedStringList", "Localized list", {
  type: "array",
  of: [{ type: "string" }],
})

// For localized fields that must at least have English, which is the fallback
// for every other language.
export const requiredEnglish = (rule: Rule) =>
  rule.custom((value: LocalizedValue) => {
    const english = value?.[baseLanguage.id]
    const filled = Array.isArray(english) ? english.length > 0 : String(english ?? "").trim()
    return filled ? true : "Add the English text"
  })
