import { HeartIcon } from "@sanity/icons/Heart"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// Every visible section of the marriage proposal page (/proposal/), in page
// order, one document per language. The package cards come from the Proposal
// Packages (price) and each package's page in this language (name, photo and
// highlights); phone and Instagram from General Layout. The Google Maps and
// review links, and the photo carousel's screen-reader labels, stay in code.

const array = (name: string, title: string, group: string, type: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type })],
  })

const list = (name: string, title: string, group: string, rows: number, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember(rows > 1 ? { type: "text", rows } : { type: "string" })],
  })

export const proposalPage = defineType({
  name: "proposalPage",
  title: "Proposal Page",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "intro", title: "Introduction" },
    { name: "packages", title: "Packages" },
    { name: "inclusions", title: "Included" },
    { name: "moments", title: "Real moments" },
    { name: "booking", title: "Booking" },
    { name: "trust", title: "About us" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,

    array("heroImages", "Photos", "hero", "imageWithAlt", "The slideshow behind the heading, in order."),
    text("heroHeading", "Heading", "hero", { required: true }),
    text("heroSubheading", "Subheading", "hero", { long: true, description: "Optional line under the heading." }),

    text("introEyebrow", "Eyebrow", "intro"),
    text("introTitle", "Title", "intro", { required: true }),
    list("introParagraphs", "Paragraphs", "intro", 4),

    text("packagesTitle", "Title", "packages", { required: true }),
    text("fromLabel", "Price prefix", "packages", { description: "Before each card's price, e.g. \"Starting at\"." }),

    text("inclusionsEyebrow", "Eyebrow", "inclusions"),
    text("inclusionsTitle", "Title", "inclusions", { required: true }),
    text("inclusionsIntro", "Intro", "inclusions", { long: true }),
    array("inclusions", "Cards", "inclusions", "iconCard", "Three per row on wide screens."),
    text("upgradesTitle", "Extras title", "inclusions"),
    text("upgradesIntro", "Extras intro", "inclusions", { long: true }),
    array("upgrades", "Extras", "inclusions", "iconLabel", "Write the price in the text, e.g. \"Live violinist — US$399\"."),

    text("momentsEyebrow", "Eyebrow", "moments"),
    text("momentsTitle", "Title", "moments", { required: true }),
    text("momentsIntro", "Intro", "moments", { long: true }),
    defineField({
      name: "videoUrl",
      title: "Video link",
      type: "url",
      group: "moments",
      description: "A Vimeo or YouTube link, shown above the photos.",
    }),
    array("galleryPhotos", "Photos", "moments", "imageWithAlt", "The photo carousel, in order."),

    text("bookingEyebrow", "Eyebrow", "booking"),
    text("bookingTitle", "Title", "booking", { required: true }),
    text("bookingIntro", "Intro", "booking", { long: true }),
    array("bookingSteps", "Steps", "booking", "iconCard", "Numbered 01–04 in this order."),
    text("contactLabel", "Button", "booking", { description: "Opens the contact page." }),

    text("trustEyebrow", "Eyebrow", "trust"),
    text("trustTitle", "Title", "trust", { required: true }),
    text("trustIntro", "Intro", "trust", { long: true }),
    text("companyTitle", "Company box title", "trust"),
    list("experienceFacts", "Company facts", "trust", 1),
    text("appointmentNote", "Contact note", "trust", { long: true }),
    text("portfolioText", "Portfolio text", "trust", { long: true }),
    text("instagramLabel", "Instagram link", "trust"),
    text("mapsLabel", "Google Maps link", "trust"),
    text("reviewsTitle", "Reviews title", "trust"),
    text("reviewsIntro", "Reviews intro", "trust", { long: true }),
    array("reviews", "Review excerpts", "trust", "reviewExcerpt", "Short quotes from published Google reviews."),
    text("fiveStarsLabel", "Stars (screen readers)", "trust", { description: "Read out instead of the five stars." }),
    text("reviewSourceLabel", "Link under each review", "trust"),
    text("reviewLinkLabel", "\"Write a review\" link", "trust"),

    text("faqTitle", "Title", "faq", { required: true }),
    array("faqs", "Questions", "faq", "faqItem"),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: languagePreview("Proposal Page"),
})
