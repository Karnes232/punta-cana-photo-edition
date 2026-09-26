import { TagIcon } from "@sanity/icons/Tag"
import { defineField, defineType } from "sanity"

// A group of guides on /blog/, e.g. "Marriage proposals", linked to its
// service page. One document serves all four languages.
export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog Event Type",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "label", title: "Name", type: "localizedString" }),
    defineField({
      name: "key",
      title: "Anchor",
      type: "string",
      description: "The part after # in links to this group on /blog/, e.g. \"proposals\". Changing it breaks existing links.",
      validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/, { name: "lowercase letters, digits and dashes" }),
    }),
    defineField({
      name: "servicePage",
      title: "Service page",
      type: "string",
      description: "The page its \"Explore the service\" link opens, e.g. /proposal/. The site adds the language prefix itself.",
      validation: (rule) => rule.required().regex(/^\/[a-z0-9/-]*$/, { name: "page path, e.g. /proposal/" }),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Groups are listed on /blog/ from the lowest number.",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label.en", subtitle: "servicePage" } },
})
