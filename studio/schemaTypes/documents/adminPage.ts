import { LockIcon } from "@sanity/icons/Lock"
import { defineArrayMember, defineField, defineType } from "sanity"

import { atLeast, withRules } from "../fields"

// The photos and heading at the top of every /admin page (quotes, contracts,
// sign-in). A singleton: structure.ts always opens the document with this ID.
export const adminPage = defineType({
  name: "adminPage",
  title: "Admin Area",
  type: "document",
  icon: LockIcon,
  fields: withRules([
    defineField({
      name: "heroImages",
      title: "Photos",
      type: "array",
      description: "The slideshow behind the heading, in order.",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({ name: "heroHeading", title: "Heading", type: "adminLabel" }),
    defineField({
      name: "fullScreenHero",
      title: "Full-screen photos",
      type: "boolean",
      initialValue: false,
    }),
  ], {
    heroImages: atLeast(1),
  }),
  preview: { prepare: () => ({ title: "Admin Area" }) },
})
