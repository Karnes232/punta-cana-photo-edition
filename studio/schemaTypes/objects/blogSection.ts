import { defineArrayMember, defineField, defineType } from "sanity"

// One step in a guide's numbered list, shown as "Label: detail".
export const blogStep = defineType({
  name: "blogStep",
  title: "Step",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "detail", title: "Detail", type: "text", rows: 2, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "label", subtitle: "detail" } },
})

// An official source linked at the end of a section.
export const blogSource = defineType({
  name: "blogSource",
  title: "Source",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["https", "http"] }),
    }),
  ],
  preview: { select: { title: "label", subtitle: "url" } },
})

// One section of a guide: a heading, then any of the parts below in this
// order. The site links to sections as #section-1, #section-2… by position,
// and lists them in the guide's "In this guide" menu.
export const blogSection = defineType({
  name: "blogSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 2 }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "steps",
      title: "Numbered steps",
      type: "array",
      of: [defineArrayMember({ type: "blogStep" })],
    }),
    defineField({
      name: "bullets",
      title: "Bullet list",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 2 })],
    }),
    defineField({ name: "note", title: "Highlighted note", type: "text", rows: 2 }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [defineArrayMember({ type: "blogSource" })],
    }),
  ],
  validation: (rule) =>
    rule.custom((section: { paragraphs?: unknown[]; steps?: unknown[]; bullets?: unknown[]; sources?: unknown[] } | undefined) =>
      [section?.paragraphs, section?.steps, section?.bullets, section?.sources].some((list) => list?.length)
        ? true
        : "Add at least one paragraph, step, bullet or source",
    ),
  preview: {
    select: { title: "heading", subtitle: "paragraphs.0" },
  },
})
