import { defineField } from "sanity"

import { languages } from "./shared/languages"

// A plain text field in a group; `long` makes it a multi-line text area.
export const text = (
  name: string,
  title: string,
  group: string,
  options: { long?: boolean; required?: boolean; description?: string } = {},
) =>
  defineField({
    name,
    title,
    group,
    type: options.long ? "text" : "string",
    ...(options.long ? { rows: 3 } : {}),
    description: options.description,
    validation: options.required ? (rule) => rule.required() : undefined,
  })

// Pages with one document per language carry a language field that the
// document-internationalization plugin sets; editors never touch it.
export const languageField = defineField({
  name: "language",
  type: "string",
  readOnly: true,
  hidden: true,
})

// Preview for a per-language page: its title, with the language as subtitle.
export const languagePreview = (title: string) => ({
  select: { language: "language" },
  prepare: ({ language }: { language?: string }) => ({
    title,
    subtitle: languages.find((item) => item.id === language)?.title ?? language,
  }),
})
