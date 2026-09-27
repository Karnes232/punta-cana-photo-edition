import { TranslateIcon } from "@sanity/icons/Translate"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languages } from "../shared/languages"

// One language's text and photos of a proposal package. Opened from its
// Proposal Package, which sets the package and language; the price and what
// the package includes are shared and edited in the package's settings.
export const proposalPackagePage = defineType({
  name: "proposalPackagePage",
  title: "Package Page",
  type: "document",
  icon: TranslateIcon,
  groups: [{ name: "card", title: "Card", default: true }],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({
      name: "package",
      title: "Package",
      type: "reference",
      to: [{ type: "proposalPackage" }],
      readOnly: true,
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "card",
      description: "The package's name in this language, on its card and page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card photo",
      type: "imageWithAlt",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardHighlights",
      title: "Card highlights",
      type: "array",
      group: "card",
      description: "The short list on the package's card on the proposal page.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    select: { title: "name", language: "language", media: "cardImage" },
    prepare: ({ title, language, media }) => ({
      title,
      subtitle: languages.find((item) => item.id === language)?.title ?? language,
      media,
    }),
  },
})
