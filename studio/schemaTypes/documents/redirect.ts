import { ArrowRightIcon } from "@sanity/icons/ArrowRight"
import { defineField, defineType } from "sanity"

// A permanent (301) redirect from an old address to a current page, created
// when the site is built. Redirects written in the code win over these, and an
// entry missing either address is skipped.
export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  icon: ArrowRightIcon,
  fields: [
    defineField({
      name: "from",
      title: "Old address",
      type: "string",
      description: "The path to redirect, starting with /, e.g. /blog/old-post/. Include the language, e.g. /es/blog/…",
      validation: (rule) =>
        rule.required().custom((value) => (!value || value.startsWith("/") ? true : "Start with /")),
    }),
    defineField({
      name: "to",
      title: "New address",
      type: "string",
      description: "A path on this site (e.g. /proposal/ or /es/proposal/) or a full https:// address.",
      validation: (rule) =>
        rule.required().custom((value) =>
          !value || value.startsWith("/") || /^https?:\/\//.test(value) ? true : "Start with / or https://",
        ),
    }),
  ],
  orderings: [{ title: "Old address", name: "from", by: [{ field: "from", direction: "asc" }] }],
  preview: { select: { title: "from", subtitle: "to" }, prepare: ({ title, subtitle }) => ({ title, subtitle: `→ ${subtitle}` }) },
})
