import { defineArrayMember, defineField, defineType } from "sanity"

// One package as shown in one language. The price, badge and icon come from
// the linked Wedding Package, so they stay the same in every language.
export const weddingPackageText = defineType({
  name: "weddingPackageText",
  title: "Package",
  type: "object",
  fields: [
    defineField({
      name: "package",
      title: "Package",
      type: "reference",
      to: [{ type: "weddingPackage" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "package.name" } },
})
