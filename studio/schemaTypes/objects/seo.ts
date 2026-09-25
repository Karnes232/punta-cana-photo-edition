import { defineField, defineType } from "sanity"

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Search title",
      type: "string",
      description: "Shown as the link in search results and on the browser tab. About 60 characters.",
      validation: (rule) => [
        rule.required(),
        rule.max(60).warning("Over 60 characters; search results may cut it off"),
      ],
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 3,
      description: "The summary under the link in search results. About 160 characters.",
      validation: (rule) => [
        rule.required(),
        rule.max(160).warning("Over 160 characters; search results may cut it off"),
      ],
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "image",
      title: "Share image",
      type: "imageWithAlt",
      description: "Shown when the page is shared on social media or messaging apps. 1200×630 works best.",
    }),
  ],
})
