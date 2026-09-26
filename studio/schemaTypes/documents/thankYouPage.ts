import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// The confirmation every form on the site lands on (/contact/thankyou/), one
// document per language. The WhatsApp number and email come from General
// Layout. The page is hidden from search engines, so it only needs a
// browser-tab title and description.
export const thankYouPage = defineType({
  name: "thankYouPage",
  title: "Thank-You Page",
  type: "document",
  icon: CheckmarkCircleIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "Browser tab" },
  ],
  fields: [
    languageField,

    text("eyebrow", "Eyebrow", "content", { description: "Small line above the heading." }),
    text("title", "Heading", "content", {
      required: true,
      description: "Shown when the form didn't pass the visitor's name.",
    }),
    text("greeting", "Greeting", "content", {
      description: "Shown before the visitor's name instead of the heading, e.g. \"Thank you,\" → \"Thank you, Ana.\"",
    }),
    text("intro", "Intro", "content", { long: true }),
    text("nextTitle", "Next steps heading", "content"),
    defineField({
      name: "steps",
      title: "Next steps",
      type: "array",
      group: "content",
      description: "Numbered 01, 02, … in this order.",
      of: [defineArrayMember({ type: "processStep" })],
      validation: (rule) => rule.min(1).max(3),
    }),
    text("guidesLabel", "Guides button", "content", { description: "Links to the planning guides." }),
    text("homeLabel", "Home button", "content"),
    text("extra", "Closing line", "content", {
      description: "Above the WhatsApp and email links, e.g. \"Something else you'd like to share?\"",
    }),
    text("whatsappLabel", "WhatsApp link text", "content"),
    text("emailLabel", "Email link text", "content"),

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
  preview: languagePreview("Thank-You Page"),
})
