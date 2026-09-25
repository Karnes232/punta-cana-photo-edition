import { defineField, defineType } from "sanity"

import { baseLanguage, languages } from "../shared/languages"

// Field-level localization: one object holds the same text in every language.
// English shows first; the translations sit in a fieldset below it.
// Whether a field is required is decided where the type is used, not here.
const localizedObject = (name: string, title: string, fieldType: "string" | "text") =>
  defineType({
    name,
    title,
    type: "object",
    fieldsets: [{ name: "translations", title: "Translations", options: { collapsible: true } }],
    fields: languages.map((language) =>
      defineField({
        name: language.id,
        title: language.title,
        type: fieldType,
        fieldset: language.id === baseLanguage.id ? undefined : "translations",
      }),
    ),
  })

export const localizedString = localizedObject("localizedString", "Localized string", "string")
export const localizedText = localizedObject("localizedText", "Localized text", "text")
