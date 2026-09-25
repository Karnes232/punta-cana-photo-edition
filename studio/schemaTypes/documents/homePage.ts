import { HomeIcon } from "@sanity/icons/Home"
import { defineArrayMember, defineField, defineType } from "sanity"

import { requiredEnglish } from "../objects/localized"

// Every visible section of the home page, in page order, in all four
// languages. A singleton: structure.ts always opens the "homePage" document.
// Phone and email come from General Layout; the contact form's text stays in
// the repo (src/content/homeContent.js).

const text = (
  name: string,
  title: string,
  group: string,
  options: { long?: boolean; required?: boolean; description?: string } = {},
) =>
  defineField({
    name,
    title,
    group,
    type: options.long ? "localizedText" : "localizedString",
    description: options.description,
    validation: options.required ? requiredEnglish : undefined,
  })

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "highlights", title: "Highlights" },
    { name: "events", title: "Events" },
    { name: "what", title: "What we do" },
    { name: "process", title: "Process" },
    { name: "commitment", title: "Commitment" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "localizedImage",
      group: "hero",
      description: "Full-width background photo. Landscape, at least 2200px wide.",
      validation: (rule) => rule.required(),
    }),
    text("heroEyebrow", "Eyebrow", "hero", { description: "Small line above the heading." }),
    text("heroHeading", "Heading", "hero", { required: true }),
    text("heroIntro", "Intro", "hero", { long: true }),
    defineField({ name: "primaryCta", title: "Main button", type: "cta", group: "hero" }),
    defineField({ name: "secondaryCta", title: "Second button", type: "cta", group: "hero" }),

    text("availability", "Availability", "highlights", {
      description: "First item in the strip under the hero; also shown in the contact section.",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      group: "highlights",
      description: "The other items in the strip under the hero.",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (rule) => rule.max(3),
    }),

    text("eventsEyebrow", "Eyebrow", "events"),
    text("eventsTitle", "Title", "events", { required: true }),
    text("eventsIntro", "Intro", "events", { long: true }),
    text("eventCardLinkLabel", "Card link text", "events", {
      description: "The link at the bottom of each card, e.g. \"Explore service\".",
    }),
    defineField({
      name: "eventCards",
      title: "Event cards",
      type: "array",
      group: "events",
      description: "Shown in this order. Drag to reorder.",
      of: [defineArrayMember({ type: "eventCard" })],
    }),

    text("whatEyebrow", "Eyebrow", "what"),
    text("whatTitle", "Title", "what", { required: true }),
    defineField({
      name: "whatParagraphs",
      title: "Paragraphs",
      type: "array",
      group: "what",
      of: [defineArrayMember({ type: "localizedText" })],
    }),
    defineField({
      name: "whatItems",
      title: "Checklist",
      type: "array",
      group: "what",
      description: "Short items shown with a check mark.",
      of: [defineArrayMember({ type: "localizedString" })],
    }),

    text("processEyebrow", "Eyebrow", "process"),
    text("processTitle", "Title", "process", { required: true }),
    text("processIntro", "Intro", "process", { long: true }),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      description: "Numbered 01, 02, 03 in this order.",
      of: [defineArrayMember({ type: "processStep" })],
      validation: (rule) => rule.length(3),
    }),

    defineField({
      name: "commitmentImage",
      title: "Image",
      type: "localizedImage",
      group: "commitment",
    }),
    text("commitmentEyebrow", "Eyebrow", "commitment"),
    text("commitmentTitle", "Title", "commitment", { required: true }),
    text("commitmentBody", "Text", "commitment", { long: true }),
    defineField({ name: "commitmentCta", title: "Button", type: "cta", group: "commitment" }),

    text("contactEyebrow", "Eyebrow", "contact"),
    text("contactTitle", "Title", "contact", { required: true }),
    text("contactBody", "Intro", "contact", { long: true }),
    text("whatsappLabel", "WhatsApp link text", "contact"),
    text("callLabel", "Call link text", "contact"),
    text("emailLabel", "Email link text", "contact"),
    text("whatsappMessage", "WhatsApp message", "contact", {
      long: true,
      description: "Pre-filled in WhatsApp when a visitor taps the WhatsApp link.",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page", subtitle: "sertuinevents.com/" }),
  },
})
