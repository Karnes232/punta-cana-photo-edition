import { TagIcon } from "@sanity/icons/Tag"
import { defineField, defineType } from "sanity"

// One priced choice in the elopement price builder: a setting (private beach or
// catamaran), a décor design or the legal wedding upgrade. One document serves
// all four languages; each language's Elopement Page gives it a name and text.
export const elopementOption = defineType({
  name: "elopementOption",
  title: "Elopement Price",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Internal name",
      type: "string",
      description: "For the Studio only, e.g. \"Ivory Tide décor\". Visitors see each language's name.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Setting", value: "experience" },
          { title: "Décor", value: "decor" },
          { title: "Legal wedding upgrade", value: "legal" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "setting",
      title: "Setting",
      type: "string",
      description: "The catamaran asks for the number of people aboard and needs a custom quote above 10.",
      options: {
        list: [
          { title: "Private beach", value: "beach" },
          { title: "Catamaran", value: "catamaran" },
        ],
        layout: "radio",
      },
      hidden: ({ document }) => document?.kind !== "experience",
      validation: (rule) =>
        rule.custom((value, { document }) =>
          document?.kind === "experience" && !value ? "Choose the setting" : true,
        ),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Shown on the card, in the estimate and in search results in every language.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "catamaranAllowed",
      title: "Can be installed on the catamaran",
      type: "boolean",
      description: "When off, the décor is greyed out while the catamaran is selected.",
      initialValue: true,
      hidden: ({ document }) => document?.kind !== "decor",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Options of the same kind are listed from the lowest number.",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "kind", direction: "desc" }, { field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", price: "price", kind: "kind" },
    prepare: ({ title, price, kind }: { title?: string; price?: number; kind?: string }) => ({
      title,
      subtitle: [
        kind === "experience" ? "Setting" : kind === "decor" ? "Décor" : kind === "legal" ? "Legal upgrade" : undefined,
        price != null ? `US$${price.toLocaleString("en-US")}` : undefined,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
})
