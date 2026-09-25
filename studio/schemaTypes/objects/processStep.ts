import { defineField, defineType } from "sanity"

import { requiredEnglish } from "./localized"

// One step of "How we work". The page numbers the steps 01, 02, 03 by position.
export const processStep = defineType({
  name: "processStep",
  title: "Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: requiredEnglish,
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "localizedText",
      validation: requiredEnglish,
    }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "body.en" },
  },
})
