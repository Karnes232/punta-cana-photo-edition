import { TagIcon } from "@sanity/icons/Tag"
import { defineField, defineType } from "sanity"

// A marriage proposal package's shared facts: its address, price and what it
// includes. One document serves all four languages; each language's Package
// Page (opened from the package) gives it a name, card text and photos.
export const proposalPackage = defineType({
  name: "proposalPackage",
  title: "Proposal Package",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Internal name",
      type: "string",
      description: "For the Studio only. Visitors see each language's name.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Address",
      type: "slug",
      description: "The package page lives at /packages/<address>/. Changing it breaks existing links.",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Shown on the card, on the package page and in search results in every language. Packages are listed from the lowest price.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "charcuterieIncluded",
      title: "Charcuterie included",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "dinnerIncluded",
      title: "Private dinner included",
      type: "boolean",
      description: "Hides the dinner add-on and shows the dinner menu choices on the package page.",
      initialValue: false,
    }),
    defineField({
      name: "violinIncluded",
      title: "Violinist included",
      type: "boolean",
      description: "Hides the violinist add-on.",
      initialValue: false,
    }),
    defineField({
      name: "coldSparksAvailable",
      title: "Cold sparks can be added",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [{ title: "Price", name: "price", by: [{ field: "price", direction: "asc" }] }],
  preview: {
    select: { title: "name", price: "price", slug: "slug.current" },
    prepare: ({ title, price, slug }: { title?: string; price?: number; slug?: string }) => ({
      title,
      subtitle: [price != null ? `US$${price.toLocaleString("en-US")}` : undefined, slug && `/packages/${slug}/`]
        .filter(Boolean)
        .join(" · "),
    }),
  },
})
