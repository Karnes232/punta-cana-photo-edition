import { CaseIcon } from "@sanity/icons/Case"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// Every visible section of the corporate event planner page (/event-planner/),
// in page order, one document per language. Phone and email come from General
// Layout. The proposal form's fields stay in the repo
// (src/content/eventPlannerFormContent.js), and the planning guides under the
// page come from the blog.

const list = (name: string, title: string, group: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type: "string" })],
  })

export const eventPlannerPage = defineType({
  name: "eventPlannerPage",
  title: "Event Planner Page",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "intro", title: "Introduction" },
    { name: "workModes", title: "Ways of working" },
    { name: "services", title: "Services" },
    { name: "process", title: "Process" },
    { name: "budget", title: "Budget" },
    { name: "onsite", title: "On-site" },
    { name: "caseStudies", title: "Case studies" },
    { name: "why", title: "Why us" },
    { name: "eventTypes", title: "Event types" },
    { name: "venues", title: "Venues" },
    { name: "faq", title: "FAQ" },
    { name: "form", title: "Form" },
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
    text("eyebrow", "Eyebrow", "hero", {
      description: "Small line above the heading; also shown above the introduction.",
    }),
    text("heroHeading", "Heading", "hero", { required: true }),
    text("heroSubheading", "Intro", "hero", { long: true }),
    text("servicesLine", "Services line", "hero", {
      description: "The list under the intro, e.g. \"Planning · Vendors · Staffing\".",
    }),
    text("primaryCtaLabel", "Main button", "hero", { description: "Scrolls down to the proposal form." }),
    text("whatsappCtaLabel", "WhatsApp button", "hero", {
      description: "Opens WhatsApp; also shown beside the proposal form.",
    }),
    text("whatsappMessage", "WhatsApp message", "hero", {
      long: true,
      description: "Pre-filled in WhatsApp when a visitor taps a WhatsApp button.",
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

    text("introTitle", "Title", "intro", { required: true }),
    text("introBody", "Text", "intro", { long: true }),

    text("workModesTitle", "Title", "workModes", { required: true }),
    text("workModesIntro", "Intro", "workModes", { long: true }),
    defineField({
      name: "workModes",
      title: "Cards",
      type: "array",
      group: "workModes",
      description: "Numbered 01, 02 in this order.",
      of: [defineArrayMember({ type: "workMode" })],
    }),

    text("servicesTitle", "Title", "services", { required: true }),
    text("servicesIntro", "Intro", "services", { long: true }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "services",
      description: "Four per row on wide screens. Drag to reorder.",
      of: [defineArrayMember({ type: "iconCard" })],
    }),

    text("processTitle", "Title", "process", { required: true }),
    text("processIntro", "Intro", "process", { long: true }),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      description: "Numbered 1, 2, 3… in this order.",
      of: [defineArrayMember({ type: "processStep" })],
    }),

    text("budgetEyebrow", "Eyebrow", "budget"),
    text("budgetTitle", "Title", "budget", { required: true }),
    text("budgetBody", "Text", "budget", { long: true }),
    list("budgetPoints", "Checklist", "budget", "Short items shown with a check mark."),
    text("budgetChangeTitle", "Side card title", "budget"),
    text("budgetChangeBody", "Side card text", "budget", { long: true }),

    defineField({
      name: "onsiteImage",
      title: "Image",
      type: "imageWithAlt",
      group: "onsite",
      description: "Tall photo beside the text; the first checklist item sits on its corner.",
    }),
    text("onsiteEyebrow", "Eyebrow", "onsite"),
    text("onsiteTitle", "Title", "onsite", { required: true }),
    text("onsiteBody", "Text", "onsite", { long: true }),
    list("onsitePoints", "Checklist", "onsite", "Short items shown with a check mark."),

    text("caseStudiesTitle", "Title", "caseStudies", { required: true }),
    text("caseStudiesIntro", "Intro", "caseStudies", { long: true }),
    defineField({
      name: "caseStudies",
      title: "Case studies",
      type: "array",
      group: "caseStudies",
      description: "Photos and text swap sides on every other one.",
      of: [defineArrayMember({ type: "caseStudy" })],
    }),

    text("whyTitle", "Title", "why", { required: true }),
    defineField({
      name: "whyItems",
      title: "Reasons",
      type: "array",
      group: "why",
      description: "Three per row on wide screens.",
      of: [defineArrayMember({ type: "iconCard" })],
    }),

    text("eventTypesTitle", "Title", "eventTypes", { required: true }),
    list("eventTypes", "Event types", "eventTypes"),

    text("venueEyebrow", "Eyebrow", "venues"),
    text("venueTitle", "Title", "venues", { required: true }),
    text("resortTitle", "Resort card title", "venues"),
    text("resortBody", "Resort card text", "venues", { long: true }),
    text("independentTitle", "Independent venue card title", "venues"),
    text("independentBody", "Independent venue card text", "venues", { long: true }),
    text("venueClosing", "Closing line", "venues", { long: true }),

    text("faqTitle", "Title", "faq", { required: true }),
    defineField({
      name: "faqs",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
    }),

    text("formEyebrow", "Eyebrow", "form"),
    text("formTitle", "Title", "form", { required: true }),
    text("formIntro", "Intro", "form", { long: true }),
    text("formSubmitLabel", "Send button", "form"),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: languagePreview("Event Planner Page"),
})
