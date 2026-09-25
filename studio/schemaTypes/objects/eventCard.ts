import { defineField, defineType } from "sanity"

// One card in the home page's "What are you planning" grid.
export const eventCard = defineType({
  name: "eventCard",
  title: "Event card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "One or two sentences.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
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
    select: { title: "title", subtitle: "link", media: "image" },
  },
})
