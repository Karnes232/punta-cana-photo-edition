import { defineField, defineType } from "sanity"

import { cardIcons } from "./iconCard"

// One service every proposal package includes, with its icon. Marked items
// are also listed under "Essentials included" near the top of the page.
export const packageInclusion = defineType({
  name: "packageInclusion",
  title: "Inclusion",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: cardIcons },
      validation: (rule) => rule.required(),
    }),
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
    }),
    defineField({
      name: "essential",
      title: "List under \"Essentials included\"",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
})
