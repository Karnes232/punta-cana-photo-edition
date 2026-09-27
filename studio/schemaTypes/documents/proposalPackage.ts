import { TagIcon } from "@sanity/icons/Tag"
import { defineArrayMember, defineField, defineType } from "sanity"

// A marriage proposal package's shared facts: its address, price, what it
// includes and the extras it offers. One document serves all four languages;
// each language's Package Page (opened from the package) gives it a name,
// text and photos.
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
      description: "Shows the charcuterie among the package's inclusions.",
      initialValue: false,
    }),
    defineField({
      name: "dinnerIncluded",
      title: "Private dinner included",
      type: "boolean",
      description: "Shows the dinner among the package's inclusions and the dinner menu in the booking form.",
      initialValue: false,
    }),
    defineField({
      name: "violinIncluded",
      title: "Violinist included",
      type: "boolean",
      description: "Shows the live violin among the package's inclusions.",
      initialValue: false,
    }),
    defineField({
      name: "addOns",
      title: "Extras offered",
      type: "array",
      description: "The extras a couple can add in the booking form. Leave out what the package already includes.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "proposalAddOn" }] })],
    }),
    defineField({
      name: "videoUrl",
      title: "Video link",
      type: "url",
      description: "Optional Vimeo or YouTube link, shown beside the booking form instead of a photo.",
    }),
    defineField({
      name: "fullScreenHero",
      title: "Full-screen photos at the top",
      type: "boolean",
      description: "When off, the photos at the top of the package page take two thirds of the screen.",
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
