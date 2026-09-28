import { defineField, defineType } from "sanity"

// A short text in English and Spanish, the two languages of the /admin area.
export const adminLabel = defineType({
  name: "adminLabel",
  title: "Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "es", title: "Spanish", type: "string" }),
  ],
})
