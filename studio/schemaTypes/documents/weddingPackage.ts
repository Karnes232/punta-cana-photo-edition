import { TagIcon } from "@sanity/icons/Tag"
import { defineField, defineType } from "sanity"

import { cardIcons } from "../objects/iconCard"

// A wedding planning package's shared facts: its price, badge and icon. One
// document serves all four languages; each language's Wedding Planner Page
// gives it a name, description and included items.
export const weddingPackage = defineType({
  name: "weddingPackage",
  title: "Wedding Package",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Internal name",
      type: "string",
      description: "For the Studio only, e.g. \"Full Wedding Planning\". Visitors see each language's title.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Shown on the card and in the form in every language.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "mostPopular",
      title: "Mark as most popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "southAsian",
      title: "South Asian package",
      type: "boolean",
      description: "Shown in the South Asian weddings section instead of the package grid. Only one package should have this.",
      initialValue: false,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: cardIcons },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Packages are listed from the lowest number.",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", price: "price" },
    prepare: ({ title, price }: { title?: string; price?: number }) => ({
      title,
      subtitle: price != null ? `US$${price.toLocaleString("en-US")}` : undefined,
    }),
  },
})
