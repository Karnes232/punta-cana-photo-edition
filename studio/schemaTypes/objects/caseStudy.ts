import { defineArrayMember, defineField, defineType } from "sanity"

// One past event: its photos, a few short facts and the story, plus an
// optional video.
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "object",
  fields: [
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      description: "Small line above the title, e.g. \"Organon\".",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "facts",
      title: "Facts",
      type: "array",
      description: "Short tags under the title, e.g. the venue or guest count.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "description",
      title: "Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description: "The first is shown large; on phones only the first three show.",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "videoUrl",
      title: "Video link",
      type: "url",
      description: "Optional. A Vimeo or YouTube link, shown under the text.",
    }),
  ],
  preview: {
    select: { title: "client", subtitle: "title", media: "images.0" },
  },
})
