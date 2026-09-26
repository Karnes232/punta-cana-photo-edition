import { defineField, defineType } from "sanity"

// One way of working with Sertuin, e.g. full service or local execution. The
// page numbers the cards 01, 02 by position.
export const workMode = defineType({
  name: "workMode",
  title: "Way of working",
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
      title: "Text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bestFor",
      title: "Best for",
      type: "text",
      rows: 2,
      description: "Closing line under a divider, e.g. \"Best for companies that…\"",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "bestFor" },
  },
})
