import { defineField, defineType } from "sanity"

import { requiredEnglish } from "./localized"

// An image whose alternative text is translated, for content images that
// describe the event (hero, cards, share image). A named type so the GraphQL
// API that Gatsby reads keeps the alt field.
export const localizedImage = defineType({
  name: "localizedImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "localizedString",
      description: "Describe the photo for screen readers and search engines.",
      validation: requiredEnglish,
    }),
  ],
})
