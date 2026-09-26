import { EnvelopeIcon } from "@sanity/icons/Envelope"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// The Contact page, in page order, one document per language ("contactPage-en"
// plus translations). The phone number and email come from General Layout.
// The form's fields (purpose choices, labels, placeholders, submit button and
// note) stay in the repo, in src/content/contactContent.js.
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "direct", title: "Direct contact" },
    { name: "form", title: "Form" },
    { name: "next", title: "Next steps" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,

    text("heroEyebrow", "Eyebrow", "hero", { description: "Small line above the heading." }),
    text("heroTitle", "Heading", "hero", { required: true }),
    text("heroIntro", "Intro", "hero", { long: true }),
    text("welcome", "Welcome line", "hero", {
      description: "Short line under the intro, e.g. \"Your ideas. Your questions. Always welcome.\"",
    }),

    text("directLabel", "Heading", "direct", {
      description: "Above the WhatsApp, email and phone links.",
    }),
    text("whatsappLabel", "WhatsApp link text", "direct"),
    text("emailLabel", "Email link text", "direct"),
    text("phoneLabel", "Phone link text", "direct"),

    text("formEyebrow", "Eyebrow", "form"),
    text("formTitle", "Title", "form", { required: true }),
    text("formIntro", "Intro", "form"),

    text("nextEyebrow", "Eyebrow", "next"),
    text("nextTitle", "Title", "next"),
    defineField({
      name: "nextSteps",
      title: "Steps",
      type: "array",
      group: "next",
      description: "Numbered 01, 02, 03 in this order.",
      of: [defineArrayMember({ type: "processStep" })],
      validation: (rule) => rule.length(3),
    }),
    text("location", "Closing line", "next", {
      description: "e.g. \"Based in Punta Cana. Ready to hear from you.\"",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: languagePreview("Contact Page"),
})
