import { PackageIcon } from "@sanity/icons/Package"
import { defineField, defineType } from "sanity"

// An item offered in the /admin rental quotes and contracts (tables, chairs,
// bars…). Staff pick it by name; the price is filled in when set and can be
// changed on each quote.
export const rentalItem = defineType({
  name: "rentalItem",
  title: "Rental Item",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "adminLabel",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "adminLabel",
      description: "Filled into the quote line when the item is picked.",
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Optional. Leave empty to type the price on each quote.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "active",
      title: "Offered in quotes",
      type: "boolean",
      description: "Turn off to hide the item from the quote and contract forms.",
      initialValue: true,
    }),
  ],
  orderings: [{ title: "Name", name: "name", by: [{ field: "name.en", direction: "asc" }] }],
  preview: {
    select: { title: "name.en", price: "price", active: "active" },
    prepare: ({ title, price, active }) => ({
      title,
      subtitle: [price != null ? `US$${price.toLocaleString("en-US")}` : "No price", active === false ? "hidden" : undefined]
        .filter(Boolean)
        .join(" · "),
    }),
  },
})
