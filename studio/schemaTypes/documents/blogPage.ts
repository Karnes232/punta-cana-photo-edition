import { BookIcon } from "@sanity/icons/Book"
import { defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// The planning library's front page (/blog/), one document per language. The
// guide cards and the event-type and topic headings come from the guides and
// their topic map, not from this document.
export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  icon: BookIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "labels", title: "Labels" },
    { name: "intimate", title: "Intimate box" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,

    text("eyebrow", "Eyebrow", "hero", { description: "Small line above the heading." }),
    text("title", "Heading", "hero", { required: true }),
    text("intro", "Intro", "hero", { long: true }),

    text("topicsTitle", "Topics heading", "labels", {
      description: "Heading of the topic lists at the bottom; screen readers also announce it for the jump links under the intro.",
    }),
    text("readLabel", "Guide card link", "labels", { description: "At the bottom of each guide card, e.g. \"Read the guide\"." }),
    text("serviceLabel", "Service link", "labels", {
      description: "Beside each event type's heading; opens that service page, e.g. \"Explore the service\".",
    }),

    text("intimateEyebrow", "Eyebrow", "intimate"),
    text("intimateTitle", "Title", "intimate"),
    text("intimateText", "Text", "intimate", { long: true }),
    defineField({
      name: "intimateLink",
      title: "Link",
      type: "cta",
      group: "intimate",
      description: "The label also appears as the last jump link under the intro.",
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: languagePreview("Blog Page"),
})
