import { DocumentsIcon } from "@sanity/icons/Documents"
import { defineArrayMember, defineField, defineType } from "sanity"

import { atLeast, languageField, languagePreview, needed, text, withRules } from "../fields"

// The text every proposal package page shares, one document per language:
// labels, the services every package includes, the booking conditions, the
// extras' names and the questions. Each package's own text and photos are in
// its Package Page. The booking form's field labels stay in the repo.

const array = (name: string, title: string, group: string, type: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type })],
  })

export const proposalPackageTexts = defineType({
  name: "proposalPackageTexts",
  title: "Package Page Texts",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "top", title: "Top", default: true },
    { name: "details", title: "Details" },
    { name: "included", title: "Included" },
    { name: "conditions", title: "Conditions" },
    { name: "form", title: "Booking form" },
    { name: "faq", title: "FAQ" },
  ],
  fields: withRules([
    languageField,

    text("breadcrumbLabel", "Breadcrumb (screen readers)", "top", { description: "Names the breadcrumb for screen readers." }),
    text("breadcrumbHome", "Breadcrumb: home", "top"),
    text("breadcrumbProposals", "Breadcrumb: proposal page", "top"),
    text("eyebrow", "Eyebrow", "top", { description: "Above each package's summary." }),
    text("basePriceLabel", "Price label", "top", { description: "Above the price, e.g. \"Base price\"." }),
    text("priceNote", "Price note", "top", { long: true }),
    text("bookLabel", "Booking button", "top", { description: "Scrolls down to the booking form." }),
    text("quickTitle", "Essentials title", "top"),
    text("specialTitle", "Package extras title", "top", { description: "Above the charcuterie, dinner or violin a package includes." }),

    text("setupDetailsLabel", "Setup panel", "details", { description: "Opens the setup, the package's extras and what's not included." }),
    text("setupTitle", "Setup title", "details"),
    text("setupIntro", "Setup intro", "details", { long: true }),
    text("exclusionsTitle", "\"Not included\" title", "details"),
    text("charcuterieTitle", "Charcuterie: title", "details"),
    text("charcuterieShort", "Charcuterie: short text", "details", { long: true }),
    text("charcuterieText", "Charcuterie: full text", "details", { long: true }),
    text("dinnerTitle", "Dinner: title", "details"),
    text("dinnerShort", "Dinner: short text", "details", { long: true }),
    text("dinnerText", "Dinner: full text", "details", { long: true }),
    text("violinTitle", "Violin: title", "details"),
    text("violinShort", "Violin: short text", "details", { long: true }),
    text("violinText", "Violin: full text", "details", { long: true }),

    text("completeInfoLabel", "Logistics panel", "included", { description: "Opens what every package includes and the booking conditions." }),
    text("commonTitle", "Title", "included"),
    text("commonIntro", "Intro", "included", { long: true }),
    array("inclusions", "Included with every package", "included", "packageInclusion"),

    text("importantTitle", "Title", "conditions"),
    text("importantIntro", "Intro", "conditions", { long: true }),
    defineField({
      name: "conditions",
      title: "Conditions",
      type: "array",
      group: "conditions",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),

    text("formTitle", "Form title", "form"),
    text("formSubmitLabel", "Send button", "form"),
    array("addOnNames", "Extras' names", "form", "addOnName", "Each Proposal Extra's name in this language."),

    text("faqTitle", "Title", "faq"),
    array("faqs", "Questions", "faq", "faqItem", "Shown on every package page, followed by the dinner question."),
    text("dinnerQuestion", "Dinner question", "faq"),
    text("dinnerAnswerIncluded", "Dinner answer (dinner included)", "faq", { long: true }),
    text("dinnerAnswerAddOn", "Dinner answer (dinner as an extra)", "faq", { long: true }),
  ], {
    breadcrumbHome: needed,
    breadcrumbProposals: needed,
    breadcrumbLabel: needed,
    eyebrow: needed,
    basePriceLabel: needed,
    bookLabel: needed,
    quickTitle: needed,
    setupDetailsLabel: needed,
    completeInfoLabel: needed,
    setupTitle: needed,
    commonTitle: needed,
    importantTitle: needed,
    formTitle: needed,
    formSubmitLabel: needed,
    charcuterieTitle: needed,
    charcuterieShort: needed,
    charcuterieText: needed,
    dinnerTitle: needed,
    dinnerShort: needed,
    dinnerText: needed,
    violinTitle: needed,
    violinShort: needed,
    violinText: needed,
    dinnerQuestion: needed,
    dinnerAnswerIncluded: needed,
    dinnerAnswerAddOn: needed,
    inclusions: atLeast(1),
  }),
  preview: languagePreview("Package Page Texts"),
})
