import { defineField, defineType } from "sanity"

import { requiredEnglish } from "./localized"

type Localized = Partial<Record<string, string>> | undefined

// Warns (doesn't block publishing) when any language runs past what search
// results usually show.
const maxLengthWarning = (max: number) => (value: Localized) => {
  const tooLong = Object.entries(value ?? {}).filter(
    ([key, text]) => !key.startsWith("_") && typeof text === "string" && text.length > max,
  )
  return tooLong.length
    ? `Over ${max} characters (${tooLong.map(([key]) => key).join(", ")}); search results may cut it off`
    : true
}

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Search title",
      type: "localizedString",
      description: "Shown as the link in search results and on the browser tab. About 60 characters.",
      validation: (rule) => [requiredEnglish(rule), rule.custom(maxLengthWarning(60)).warning()],
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "localizedText",
      description: "The summary under the link in search results. About 160 characters.",
      validation: (rule) => [requiredEnglish(rule), rule.custom(maxLengthWarning(160)).warning()],
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "localizedStringList",
    }),
    defineField({
      name: "image",
      title: "Share image",
      type: "localizedImage",
      description: "Shown when the page is shared on social media or messaging apps. 1200×630 works best.",
    }),
  ],
})
