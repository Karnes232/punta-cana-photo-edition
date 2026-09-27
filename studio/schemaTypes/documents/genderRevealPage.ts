import { SparklesIcon } from "@sanity/icons/Sparkles"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// Every visible section of the gender reveal page (/gender-reveal-punta-cana/),
// in page order, one document per language. Phone and email come from General
// Layout. The quote form's fields stay in the repo
// (src/content/genderRevealFormContent.js), and the planning guides under the
// page come from the Blog Guides.

const list = (name: string, title: string, group: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type: "string" })],
  })

const images = (name: string, title: string, group: string, count: number, description: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type: "imageWithAlt" })],
    validation: (rule) => rule.length(count),
  })

export const genderRevealPage = defineType({
  name: "genderRevealPage",
  title: "Gender Reveal Page",
  type: "document",
  icon: SparklesIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "intro", title: "Introduction" },
    { name: "service", title: "Service" },
    { name: "locations", title: "Locations" },
    { name: "gallery", title: "Gallery" },
    { name: "process", title: "Process" },
    { name: "form", title: "Form" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,

    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "hero",
      description: "Full-screen background photo, darkened on the left behind the text.",
      validation: (rule) => rule.required(),
    }),
    text("eyebrow", "Eyebrow", "hero", { description: "Small line above the heading." }),
    text("heroHeading", "Heading", "hero", { required: true }),
    text("heroText", "Intro", "hero", { long: true }),
    text("primaryCtaLabel", "Main button", "hero", { description: "Scrolls down to the quote form." }),
    text("whatsappCtaLabel", "WhatsApp button", "hero"),
    text("whatsappMessage", "WhatsApp message", "hero", {
      long: true,
      description: "Pre-filled in WhatsApp when a visitor taps a WhatsApp link on this page.",
    }),
    defineField({
      name: "trustItems",
      title: "Highlights",
      type: "array",
      group: "hero",
      description: "The strip under the hero, each with a check mark.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(4),
    }),

    text("introEyebrow", "Eyebrow", "intro"),
    text("introTitle", "Title", "intro", { required: true }),
    defineField({
      name: "introParagraphs",
      title: "Paragraphs",
      type: "array",
      group: "intro",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    images("introImages", "Photos", "intro", 2, "Two tall photos beside the text; the second sits a little lower."),

    text("serviceEyebrow", "Eyebrow", "service"),
    text("serviceTitle", "Title", "service", { required: true }),
    text("serviceIntro", "Intro", "service", { long: true }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "service",
      description: "Three per row on wide screens.",
      of: [defineArrayMember({ type: "iconLabel" })],
    }),
    text("serviceNote", "Note", "service", { long: true, description: "Paragraph under the services." }),

    text("locationsEyebrow", "Eyebrow", "locations"),
    text("locationsTitle", "Title", "locations", { required: true }),
    text("locationsIntro", "Intro", "locations", { long: true }),
    defineField({
      name: "locations",
      title: "Locations",
      type: "array",
      group: "locations",
      of: [defineArrayMember({ type: "iconCard" })],
    }),
    text("locationsNote", "Note", "locations", {
      long: true,
      description: "Optional paragraph under the location cards.",
    }),

    text("galleryEyebrow", "Eyebrow", "gallery"),
    text("galleryTitle", "Title", "gallery", { required: true }),
    text("galleryIntro", "Intro", "gallery", { long: true }),
    images("galleryImages", "Photos", "gallery", 5, "Five photos: the first and the last two are shown wide."),

    text("processEyebrow", "Eyebrow", "process"),
    text("processTitle", "Title", "process", { required: true }),
    text("processIntro", "Intro", "process", { long: true }),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      description: "Numbered 01, 02… in this order.",
      of: [defineArrayMember({ type: "processStep" })],
    }),

    text("formEyebrow", "Eyebrow", "form"),
    text("formTitle", "Title", "form", { required: true }),
    text("formBody", "Intro", "form", { long: true }),
    text("formWhatsappLabel", "WhatsApp link", "form", { description: "Under the intro, beside the form." }),
    text("formSubmitLabel", "Send button", "form"),

    text("faqTitle", "Title", "faq", { required: true }),
    defineField({
      name: "faqs",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: languagePreview("Gender Reveal Page"),
})
