import { TranslateIcon } from "@sanity/icons/Translate"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languagePreview } from "../fields"

// One language's text of a blog guide. Opened from its Blog Guide, which sets
// the guide and language; the address, photo and related guides are shared
// and edited in the guide's settings.
const text = (name: string, title: string, group: string, options: { rows?: number; required?: boolean; description?: string } = {}) =>
  defineField({
    name,
    title,
    group,
    type: options.rows ? "text" : "string",
    ...(options.rows ? { rows: options.rows } : {}),
    description: options.description,
    validation: options.required ? (rule) => rule.required() : undefined,
  })

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: TranslateIcon,
  groups: [
    { name: "intro", title: "Introduction", default: true },
    { name: "body", title: "Sections" },
    { name: "faq", title: "FAQ" },
    { name: "byline", title: "Byline" },
    { name: "cta", title: "Call to action" },
    { name: "help", title: "Help box" },
  ],
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({
      name: "guide",
      title: "Guide",
      type: "reference",
      to: [{ type: "blogGuide" }],
      readOnly: true,
      hidden: true,
      validation: (rule) => rule.required(),
    }),

    text("title", "Title", "intro", { required: true }),
    text("seoTitle", "Search title", "intro", {
      description: "Shown in search results and on the browser tab. About 60 characters.",
    }),
    text("description", "Summary", "intro", {
      rows: 3,
      description: "Shown on the guide's card and in search results. About 160 characters.",
    }),
    text("directAnswer", "Short answer", "intro", {
      rows: 4,
      description: "The highlighted answer under the title.",
    }),
    text("heroAlt", "Photo alt text", "intro", {
      required: true,
      description: "Describe the guide's photo (set in Guide settings) for screen readers and search engines.",
    }),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "body",
      of: [defineArrayMember({ type: "blogSection" })],
      validation: (rule) => rule.required().min(1),
    }),

    text("faqHeading", "Heading", "faq"),
    defineField({
      name: "faqs",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
    }),

    text("authorName", "Author", "byline", { required: true }),
    defineField({
      name: "authorType",
      title: "Author is",
      type: "string",
      group: "byline",
      options: {
        list: [
          { title: "A person", value: "Person" },
          { title: "The company", value: "Organization" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    text("authorRole", "Role", "byline", { description: "Optional, e.g. \"Founder of Sertuin Events\"." }),
    text("reviewNote", "Review note", "byline", {
      description: "Shown in the byline, e.g. \"Operational information updated September 7, 2026.\"",
    }),
    defineField({ name: "reviewedAt", title: "Reviewed on", type: "date", group: "byline", validation: (rule) => rule.required() }),
    defineField({ name: "reviewDue", title: "Review again by", type: "date", group: "byline" }),

    text("ctaTitle", "Title", "cta"),
    text("ctaText", "Text", "cta", { rows: 3 }),
    defineField({ name: "ctaButton", title: "Button", type: "cta", group: "cta" }),

    text("helpTitle", "Title", "help"),
    text("helpText", "Text", "help", { rows: 3 }),
    defineField({
      name: "helpWhatsApp",
      title: "Show WhatsApp link",
      type: "boolean",
      group: "help",
      description: "Uses the phone number in General Layout.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", language: "language" },
    prepare: ({ title, language }: { title?: string; language?: string }) => ({
      title: title || "Untitled",
      subtitle: languagePreview("").prepare({ language }).subtitle,
    }),
  },
})
