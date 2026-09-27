import { defineField, defineType } from "sanity"

// A Proposal Extra's name in one language.
export const addOnName = defineType({
  name: "addOnName",
  title: "Extra",
  type: "object",
  fields: [
    defineField({
      name: "addOn",
      title: "Extra",
      type: "reference",
      to: [{ type: "proposalAddOn" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "addOn.name" } },
})
