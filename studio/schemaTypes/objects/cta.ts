import { defineField, defineType } from "sanity"

import { requiredEnglish } from "./localized"

// A section on the same page (#start-your-event) or a page on this site
// (/proposal/). The site adds the language prefix itself.
export const SITE_LINK = /^(#[a-z0-9-]+|\/[a-z0-9/-]*)$/

export const cta = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "localizedString",
      validation: requiredEnglish,
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "string",
      description: "A section on this page, e.g. #start-your-event, or a page, e.g. /proposal/.",
      validation: (rule) =>
        rule.required().regex(SITE_LINK, { name: "#section or /page/ link" }),
    }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "url" },
  },
})
