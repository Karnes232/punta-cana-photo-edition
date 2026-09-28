import { defineField, defineType } from "sanity"

// An image with required alternative text. It's a named type (not an inline image with
// extra fields) because the deployed GraphQL API, which gatsby-source-sanity reads,
// only exposes custom image fields such as alt on named types.
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  // Alt text alone isn't a photo: if the image is filled in, it needs a file.
  validation: (rule) =>
    rule.custom((value?: { asset?: unknown }) => (!value || value.asset ? true : "Upload an image")),
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for screen readers and search engines.",
      validation: (rule) => rule.required(),
    }),
  ],
})
