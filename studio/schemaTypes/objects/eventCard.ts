import { defineField, defineType } from "sanity"

import { requiredEnglish } from "./localized"

// One card in the home page's "What are you planning" grid.
export const eventCard = defineType({
  name: "eventCard",
  title: "Event card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: requiredEnglish,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      description: "One or two sentences.",
      validation: requiredEnglish,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "localizedImage",
      description: "Portrait photos work best; the card crops to about 6:7.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Links to",
      type: "string",
      description: "The page this card opens, e.g. /proposal/. The site adds the language prefix itself.",
      validation: (rule) =>
        rule.required().regex(/^\/[a-z0-9/-]*$/, { name: "page path, e.g. /proposal/" }),
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "link", media: "image" },
  },
})
