import { CommentIcon } from "@sanity/icons/Comment"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// The page where clients leave a testimonial (/share-your-experience/), one
// document per language. It is hidden from search engines, but its link is
// sent to clients, so the SEO share title, description and image still show
// in WhatsApp and email previews. The form's fields (labels, service options,
// button) stay in the repo, in src/content/shareExperienceContent.js.
export const shareExperiencePage = defineType({
  name: "shareExperiencePage",
  title: "Share Your Experience",
  type: "document",
  icon: CommentIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "form", title: "Form" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,

    defineField({
      name: "heroImages",
      title: "Slideshow photos",
      type: "array",
      group: "hero",
      description: "Shown one after another at the top of the page, in this order.",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "fullScreen",
      title: "Full-screen hero",
      type: "boolean",
      group: "hero",
      description: "On: the slideshow fills the screen. Off: it takes about two thirds of it.",
      initialValue: false,
    }),

    text("formTitle", "Title", "form", { required: true }),
    text("formIntro", "Intro", "form", { long: true }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: languagePreview("Share Your Experience"),
})
