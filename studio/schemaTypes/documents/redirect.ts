import { ArrowRightIcon } from "@sanity/icons/ArrowRight"
import { defineField, defineType } from "sanity"

import { othersMatching } from "../fields"

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
        rule.required().custom(async (value?: string, context?: any) => {
          if (!value) return true
          if (!value.startsWith("/")) return "Start with /"
          if (value.replace(/\/+$/, "") === "") return "The home page can't be redirected"
          if (value.trim() === String(context?.document?.to || "").trim()) return "The old and new addresses are the same"
          const others = await othersMatching(context, `_type == "redirect" && from == $from`, { from: value })
          return others > 0 ? "Another redirect already uses this old address" : true
        }),
    }),
    defineField({
      name: "to",
      title: "New address",
      type: "string",
      description: "A path on this site (e.g. /proposal/ or /es/proposal/) or a full https:// address.",
      validation: (rule) =>
        rule.required().custom((value?: string) =>
          !value ||
          (value.startsWith("/") && !value.startsWith("//")) ||
          /^https?:\/\//.test(value)
            ? true
            : "Start with / (a page on this site) or https://",
        ),
    }),
  ],
  orderings: [{ title: "Old address", name: "from", by: [{ field: "from", direction: "asc" }] }],
  preview: { select: { title: "from", subtitle: "to" }, prepare: ({ title, subtitle }) => ({ title, subtitle: `→ ${subtitle}` }) },
})
