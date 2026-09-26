import { WarningOutlineIcon } from "@sanity/icons/WarningOutline"
import { defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// The page shown for a missing URL, one document per language
// ("notFoundPage-en" plus translations). Its button always goes to the
// visitor's language home, so there is no link to edit. The page is hidden
// from search engines, so it only needs a browser-tab title and description.
export const notFoundPage = defineType({
  name: "notFoundPage",
  title: "404 Page",
  type: "document",
  icon: WarningOutlineIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "Browser tab" },
  ],
  fields: [
    languageField,
    text("heading", "Heading", "content", { required: true }),
    text("body", "Text", "content", { long: true }),
    text("buttonLabel", "Button text", "content", {
      required: true,
      description: "The button goes to the home page in this language.",
    }),
    defineField({
      name: "seoTitle",
      title: "Title",
      type: "string",
      group: "seo",
      description: "Shown on the browser tab.",
      validation: (rule) => [
        rule.required(),
        rule.max(60).warning("Over 60 characters; browser tabs may cut it off"),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => [
        rule.required(),
        rule.max(160).warning("Over 160 characters"),
      ],
    }),
  ],
  preview: languagePreview("404 Page"),
})
