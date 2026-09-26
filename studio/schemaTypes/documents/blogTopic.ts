import { TagsIcon } from "@sanity/icons/Tags"
import { defineField, defineType } from "sanity"

// A planning topic listed at the bottom of /blog/, e.g. "Weather &
// alternatives". Guides pick their topics in Guide settings.
export const blogTopic = defineType({
  name: "blogTopic",
  title: "Blog Topic",
  type: "document",
  icon: TagsIcon,
  fields: [
    defineField({ name: "label", title: "Name", type: "localizedString" }),
    defineField({
      name: "key",
      title: "Anchor",
      type: "string",
      description: "The part after #topic- in links to this topic on /blog/, e.g. \"weather\".",
      validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/, { name: "lowercase letters, digits and dashes" }),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label.en", subtitle: "key" } },
})
