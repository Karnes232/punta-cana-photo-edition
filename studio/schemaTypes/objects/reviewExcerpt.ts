import { defineField, defineType } from "sanity"

// A short quote from a published review, with its author's name as shown on
// the review.
export const reviewExcerpt = defineType({
  name: "reviewExcerpt",
  title: "Review",
  type: "object",
  fields: [
    defineField({
      name: "excerpt",
      title: "Quote",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "excerpt", subtitle: "author" } },
})
