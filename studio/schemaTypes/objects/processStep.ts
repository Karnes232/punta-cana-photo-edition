import { defineField, defineType } from "sanity"

// One step of "How we work". The page numbers the steps 01, 02, 03 by position.
export const processStep = defineType({
  name: "processStep",
  title: "Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
})
