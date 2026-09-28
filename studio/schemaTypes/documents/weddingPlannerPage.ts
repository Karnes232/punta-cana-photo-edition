import { HeartIcon } from "@sanity/icons/Heart"
import { defineArrayMember, defineField, defineType } from "sanity"

import { atLeast, languageField, languagePreview, needed, neededImage, text, uniqueRefs, withRules } from "../fields"

// Every visible section of the wedding planner page (/puntacana-wedding-planner/),
// in page order, one document per language. Package prices, badges and icons
// come from the shared Wedding Packages; phone and email from General Layout.
// The inquiry form's fields stay in the repo
// (src/content/weddingPlannerFormContent.js), and the planning guides under
// the page come from the Blog Guides.

const images = (name: string, title: string, group: string, description: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type: "imageWithAlt" })],
  })

export const weddingPlannerPage = defineType({
  name: "weddingPlannerPage",
  title: "Wedding Planner Page",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "realWeddings", title: "Real weddings" },
    { name: "packages", title: "Packages" },
    { name: "southAsian", title: "South Asian" },
    { name: "process", title: "Process" },
    { name: "grecia", title: "Grecia" },
    { name: "faq", title: "FAQ" },
    { name: "form", title: "Form" },
    { name: "labels", title: "Labels" },
    { name: "seo", title: "SEO" },
  ],
  fields: withRules([
    languageField,

    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "hero",
      description: "Full-screen background photo, darkened on the left behind the text.",
      validation: (rule) => rule.required().assetRequired(),
    }),
    text("eyebrow", "Eyebrow", "hero", { description: "Small line above the heading." }),
    text("heroHeading", "Heading", "hero", { required: true }),
    text("heroText", "Intro", "hero", { long: true }),
    text("primaryCtaLabel", "Main button", "hero", { description: "Scrolls down to the packages." }),
    text("whatsappCtaLabel", "WhatsApp button", "hero"),
    text("whatsappMessage", "WhatsApp message", "hero", {
      long: true,
      description: "Pre-filled in WhatsApp when a visitor taps a WhatsApp link on this page.",
    }),

    text("realWeddingsTitle", "Title", "realWeddings", { required: true }),
    text("realWeddingsText", "Intro", "realWeddings", { long: true }),
    images(
      "realWeddingPhotos",
      "Photos",
      "realWeddings",
      "Shown as a swipeable gallery; the first also illustrates the \"Western weddings\" card under the hero.",
    ),

    text("packagesEyebrow", "Eyebrow", "packages"),
    text("packagesTitle", "Title", "packages", { required: true }),
    text("packagesIntro", "Intro", "packages", { long: true }),
    defineField({
      name: "packages",
      title: "Packages",
      type: "array",
      group: "packages",
      description: "Each Wedding Package in this language. The South Asian one is shown in its own section.",
      of: [defineArrayMember({ type: "weddingPackageText" })],
    }),
    text("popularLabel", "\"Most popular\" badge", "packages"),
    text("fromLabel", "Price prefix", "packages", { description: "Before each price, e.g. \"USD\"." }),
    text("selectLabel", "Card button", "packages", { description: "Selects the package in the form." }),

    text("southAsianTitle", "Title", "southAsian", { required: true }),
    text("southAsianIntro", "Intro", "southAsian", { long: true }),
    text("filmsTitle", "Films title", "southAsian"),
    text("filmsText", "Films text", "southAsian", { long: true }),
    text("southAsianCtaLabel", "Films button", "southAsian", { description: "Selects the South Asian package in the form." }),
    defineField({
      name: "films",
      title: "Films",
      type: "array",
      group: "southAsian",
      of: [defineArrayMember({ type: "weddingFilm" })],
      validation: (rule) => rule.max(2),
    }),
    text("southAsianGalleryTitle", "Gallery title", "southAsian"),
    images(
      "southAsianPhotos",
      "Photos",
      "southAsian",
      "The gallery; the second photo also illustrates the section and the \"South Asian weddings\" card under the hero.",
    ),
    text("southAsianOfferTitle", "Offer title", "southAsian"),
    text("southAsianBody", "Offer text", "southAsian", { long: true }),
    text("southAsianNote", "Offer note", "southAsian", { long: true }),

    text("processTitle", "Title", "process", { required: true }),
    text("processIntro", "Intro", "process", { long: true }),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      description: "Numbered 01–04 in this order.",
      of: [defineArrayMember({ type: "processStep" })],
      validation: (rule) => rule.max(4),
    }),

    defineField({
      name: "greciaPortrait",
      title: "Portrait",
      type: "imageWithAlt",
      group: "grecia",
    }),
    text("greciaEyebrow", "Eyebrow", "grecia"),
    text("greciaTitle", "Title", "grecia", { required: true }),
    text("greciaText", "Text", "grecia", { long: true }),
    text("greciaQuote", "Second paragraph", "grecia", { long: true }),
    text("greciaCompanyLine", "Company line", "grecia", { description: "Beside the shield icon." }),
    text("greciaGalleryTitle", "Gallery title", "grecia"),
    text("greciaGalleryBody", "Gallery text", "grecia", { long: true }),
    text("greciaCarouselLabel", "Gallery name for screen readers", "grecia"),
    images("greciaPhotos", "Gallery photos", "grecia", "Swipeable row under the portrait."),

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
    text("formBody", "Intro", "form", { long: true }),
    text("formSubmitLabel", "Send button", "form"),
    text("undecidedLabel", "\"Not sure yet\" option", "form", { description: "The package choice for couples who want guidance." }),

    text("pathsLabel", "Wedding type cards: name for screen readers", "labels"),
    text("westernLabel", "\"Western weddings\"", "labels", { description: "Card under the hero and the real weddings eyebrow." }),
    text("southAsianLabel", "\"South Asian weddings\"", "labels", { description: "Card under the hero and the section eyebrow." }),
    text("exploreLabel", "Card link", "labels"),
    text("previousLabel", "Previous photo", "labels"),
    text("nextLabel", "Next photo", "labels"),
    text("openLabel", "Open photo", "labels"),
    text("closeLabel", "Close gallery", "labels"),
    text("playLabel", "Play film", "labels"),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ], {
    seo: needed,
    southAsianPhotos: atLeast(2),
    realWeddingPhotos: atLeast(1),
    packages: (rule) => [rule.required().min(1), uniqueRefs("package", "Each Wedding Package can appear only once.")(rule)],
    greciaPortrait: neededImage,
    processSteps: (rule) => rule.required().min(1).max(4),
    faqs: atLeast(1),
    primaryCtaLabel: needed,
    whatsappCtaLabel: needed,
    southAsianCtaLabel: needed,
    formSubmitLabel: needed,
    undecidedLabel: needed,
    selectLabel: needed,
    fromLabel: needed,
    popularLabel: needed,
    westernLabel: needed,
    southAsianLabel: needed,
    exploreLabel: needed,
    filmsTitle: needed,
    southAsianGalleryTitle: needed,
    southAsianOfferTitle: needed,
    pathsLabel: needed,
    previousLabel: needed,
    nextLabel: needed,
    openLabel: needed,
    closeLabel: needed,
    playLabel: needed,
    greciaCarouselLabel: needed,
  }),
  preview: languagePreview("Wedding Planner Page"),
})
