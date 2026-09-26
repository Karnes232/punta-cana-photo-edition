import { BookIcon } from "@sanity/icons/Book"
import { defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// The planning library's front page (/blog/), one document per language. The
// guide cards and the event-type and topic headings come from the guides and
// their topic map, not from this document. It also holds the wording every
// guide page shares, and the heading of the guide list on the service pages.
export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  icon: BookIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "labels", title: "Labels" },
    { name: "intimate", title: "Intimate box" },
    { name: "guides", title: "Guide pages" },
    { name: "services", title: "Service pages" },
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

    text("homeLabel", "Home link", "guides", { description: "First link of the trail above each guide's title, e.g. \"Home\"." }),
    text("libraryLabel", "Library link", "guides", {
      description: "Second link of that trail, to this page, e.g. \"Event planning guides\".",
    }),
    text("breadcrumbLabel", "Trail name for screen readers", "guides", { description: "e.g. \"Breadcrumb\"." }),
    text("tocLabel", "Contents heading", "guides", { description: "Above the list of a guide's sections, e.g. \"In this guide\"." }),
    text("nextLabel", "Related guides heading", "guides", {
      description: "Above the related guides at the end of each guide, e.g. \"Continue planning\".",
    }),

    text("serviceGuidesTitle", "Heading", "services", {
      description: "Above the list of guides on each service page, e.g. the proposal or wedding planner page.",
    }),
    text("serviceGuidesIntro", "Intro", "services", { long: true }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: languagePreview("Blog Page"),
})
