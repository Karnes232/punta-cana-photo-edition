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

// --- Validation for what the website can't show without ---
// Each page lists, after its fields, the rules for the fields the site renders
// with no fallback (headings, buttons, link labels, fixed layouts). Everything
// else is optional on purpose: the site hides it when empty.
type RuleBuilder = (rule: any) => any

export const needed: RuleBuilder = (rule) => rule.required()
export const atLeast = (count: number): RuleBuilder => (rule) => rule.required().min(count)
export const exactly = (count: number): RuleBuilder => (rule) => rule.required().length(count)
export const neededImage: RuleBuilder = (rule) => rule.required().assetRequired()

// Array items (objects) must not repeat the same reference at `path`.
export const uniqueRefs =
  (path: string, message: string): RuleBuilder =>
  (rule) =>
    rule.custom((items?: Array<Record<string, any>>) => {
      const refs = (items || []).map((item) => item?.[path]?._ref).filter(Boolean)
      return new Set(refs).size === refs.length ? true : message
    })

// Adds the rules to the named fields (replacing any rule they had). An unknown
// name throws, so a renamed field can't silently lose its rule.
export const withRules = <T extends { name: string }>(fields: T[], rules: Record<string, RuleBuilder>): T[] => {
  const names = new Set(fields.map((field) => field.name))
  for (const name of Object.keys(rules)) {
    if (!names.has(name)) throw new Error(`withRules: there is no field "${name}"`)
  }
  return fields.map((field) => (rules[field.name] ? { ...field, validation: rules[field.name] } : field))
}

// Other documents (not this one, draft or published) matching a GROQ filter.
export const othersMatching = async (
  context: { document?: { _id?: string }; getClient: (options: { apiVersion: string }) => any },
  filter: string,
  params: Record<string, unknown>,
): Promise<number> => {
  const id = (context.document?._id || "").replace(/^drafts\./, "")
  return context
    .getClient({ apiVersion: "2025-09-19" })
    .fetch(`count(*[${filter} && !(_id in [$id, $draft])])`, { ...params, id, draft: `drafts.${id}` })
}
