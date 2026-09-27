import { TranslateIcon } from "@sanity/icons/Translate"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languages } from "../shared/languages"

// One language's text and photos of a proposal package: its card on the
// proposal page and its own page at /packages/<address>/. Opened from its
// Proposal Package, which sets the package and language; the price, extras
// and what the package includes are shared and edited in the package's
// settings. The text every package page shares is in the Package Page Texts.

const list = (name: string, title: string, group: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type: "string" })],
  })

const photos = (name: string, title: string, group: string, description: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type: "imageWithAlt" })],
  })

export const proposalPackagePage = defineType({
  name: "proposalPackagePage",
  title: "Package Page",
  type: "document",
  icon: TranslateIcon,
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "page", title: "Package page" },
    { name: "photos", title: "Photos" },
    { name: "seo", title: "SEO" },
  ],
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
      group: ["card", "page"],
      description: "The package's name in this language, on its card and as its page's heading.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card photo",
      type: "imageWithAlt",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    list("cardHighlights", "Card highlights", "card", "The short list on the package's card on the proposal page."),

    defineField({
      name: "heroSubheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      group: "page",
      description: "Optional line under the name, over the photos.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "page",
      description: "Beside the price, and the page's summary in search results.",
    }),
    list("setup", "The setup", "page", "What the setup includes, one item per line."),
    list("exclusions", "Not included", "page"),

    photos("heroImages", "Photos at the top", "photos", "The slideshow behind the name, in order."),
    photos("galleryPhotos", "Gallery", "photos", "The photo carousel under the package details, in order."),
    defineField({
      name: "bookingPhoto",
      title: "Photo beside the booking form",
      type: "imageWithAlt",
      group: "photos",
      description: "Shown when the package has no video link.",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
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
