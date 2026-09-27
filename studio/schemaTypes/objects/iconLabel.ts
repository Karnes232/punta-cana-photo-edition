import { defineField, defineType } from "sanity"

import { cardIcons } from "./iconCard"

// A one-line item with an icon, e.g. one service in a "what we do" grid.
export const iconLabel = defineType({
  name: "iconLabel",
  title: "Item",
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
      name: "label",
      title: "Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "icon" },
  },
})
