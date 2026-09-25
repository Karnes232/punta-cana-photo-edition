import { defineField, defineType } from "sanity"

// An image with required alternative text. It's a named type (not an inline image with
// extra fields) because the deployed GraphQL API, which gatsby-source-sanity reads,
// only exposes custom image fields such as alt on named types.
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Read by screen readers in every language, e.g. \"Sertuin Events logo\".",
      validation: (rule) => rule.required(),
    }),
  ],
})
