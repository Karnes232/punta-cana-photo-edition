import { AddIcon } from "@sanity/icons/Add"
import { defineField, defineType } from "sanity"

// An extra a couple can add to a proposal package in the booking form, with
// its price. One document serves all four languages; the Package Page Texts
// give it a name in each language, and each Proposal Package lists the extras
// it offers.
export const proposalAddOn = defineType({
  name: "proposalAddOn",
  title: "Proposal Extra",
  type: "document",
  icon: AddIcon,
  fields: [
    defineField({
      name: "name",
      title: "Internal name",
      type: "string",
      description: "For the Studio only. Visitors see each language's name.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      description: "Choosing the private dinner opens the dinner menu in the form.",
      options: {
        list: [
          { title: "Professional video", value: "video" },
          { title: "Violinist", value: "violin" },
          { title: "Saxophonist", value: "saxophone" },
          { title: "Private dinner", value: "dinner" },
          { title: "Cold sparks", value: "cold-sparks" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Added to the estimate in the booking form. Extras are listed from the lowest price.",
      validation: (rule) => rule.required().positive(),
    }),
  ],
  preview: {
    select: { title: "name", price: "price" },
    prepare: ({ title, price }) => ({
      title,
      subtitle: price != null ? `US$${price.toLocaleString("en-US")}` : undefined,
    }),
  },
})
