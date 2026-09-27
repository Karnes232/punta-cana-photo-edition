import { HeartIcon } from "@sanity/icons/Heart"
import { defineArrayMember, defineField, defineType } from "sanity"

import { languageField, languagePreview, text } from "../fields"

// Every visible section of the elopement page (/punta-cana-elopement-packages/),
// in page order, one document per language. Prices come from the shared
// Elopement Prices; phone and email from General Layout. The request form's
// fields stay in the repo (src/content/elopementFormContent.js), and the
// planning guides under the page come from the Blog Guides.

const array = (name: string, title: string, group: string, type: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    group,
    description,
    of: [defineArrayMember({ type })],
  })

export const elopementPage = defineType({
  name: "elopementPage",
  title: "Elopement Page",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "builder", title: "Price builder" },
    { name: "ceremony", title: "Ceremony" },
    { name: "estimate", title: "Estimate" },
    { name: "included", title: "Included" },
    { name: "compare", title: "Symbolic vs. legal" },
    { name: "gallery", title: "Gallery" },
    { name: "reserve", title: "Reserve" },
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
      description: "Full-screen background photo, darkened towards the bottom behind the heading.",
      validation: (rule) => rule.required(),
    }),
    text("heroTitle", "Heading", "hero", { required: true }),

    text("builderEyebrow", "Eyebrow", "builder"),
    text("builderTitle", "Title", "builder", { required: true }),
    text("builderIntro", "Intro", "builder", { long: true }),
    defineField({
      name: "formula",
      title: "Formula",
      type: "array",
      group: "builder",
      description: "The three boxes joined by \"+\" under the intro.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(3),
    }),
    text("stepOne", "Step 1 heading", "builder"),
    array("experiences", "Settings", "builder", "elopementExperienceText", "Each setting in this language, in order."),
    text("fromLabel", "Price label", "builder", { description: "Beside each setting's price, e.g. \"Base experience\"." }),
    text("guestsLabel", "People aboard", "builder", { description: "Shown when the catamaran is selected." }),
    text("guestsHelp", "People aboard: help", "builder", { long: true }),
    text("stepTwo", "Step 2 heading", "builder"),
    array("decorations", "Décor", "builder", "elopementDecorText", "Each décor in this language, in order. The first is selected when the page opens."),
    text("realTouchLabel", "Flowers tag", "builder", { description: "Tag on every décor card." }),
    text("beachAndCatamaranLabel", "\"Beach or catamaran\" tag", "builder"),
    text("beachOnlyLabel", "\"Beach only\" tag", "builder"),
    text("unavailableCatamaran", "Not on the catamaran", "builder", {
      long: true,
      description: "Under a beach-only décor while the catamaran is selected.",
    }),
    text("previousPhotoLabel", "Previous photo (screen readers)", "builder", {
      description: "{name} is replaced by the décor name.",
    }),
    text("nextPhotoLabel", "Next photo (screen readers)", "builder", {
      description: "{name} is replaced by the décor name.",
    }),
    text("selectLabel", "\"Select\" button", "builder"),
    text("selectedLabel", "\"Selected\" badge", "builder"),

    text("stepThree", "Step 3 heading", "ceremony"),
    text("symbolicTitle", "Symbolic ceremony", "ceremony", { required: true }),
    text("symbolicIncluded", "Symbolic: price line", "ceremony", { description: "In place of a price, e.g. \"Included in every base experience\"." }),
    text("symbolicChoiceText", "Symbolic: short text", "ceremony", { long: true, description: "On the step 3 card." }),
    text("symbolicText", "Symbolic: full text", "ceremony", { long: true, description: "In the symbolic vs. legal section." }),
    defineField({
      name: "legalUpgrade",
      title: "Legal wedding upgrade",
      type: "elopementUpgradeText",
      group: "ceremony",
    }),

    text("estimateTitle", "Title", "estimate"),
    text("experienceLine", "Setting line", "estimate"),
    text("decorLine", "Décor line", "estimate"),
    text("legalLine", "Legal wedding line", "estimate"),
    text("includedLabel", "\"Included\"", "estimate", { description: "In place of a price for the symbolic ceremony." }),
    text("customQuote", "Custom quote", "estimate", { description: "Replaces the total above 10 people on the catamaran." }),
    text("customQuoteText", "Custom quote: text", "estimate", { long: true }),
    text("totalNote", "Note", "estimate", { long: true }),
    text("reserveSelection", "Button", "estimate", { description: "Scrolls down to the request form." }),

    text("includedEyebrow", "Eyebrow", "included"),
    text("includedTitle", "Title", "included", { required: true }),
    text("includedIntro", "Intro", "included", { long: true }),
    array("inclusions", "Cards", "included", "iconCard", "Three per row on wide screens."),

    text("legalEyebrow", "Eyebrow", "compare"),
    text("legalTitle", "Title", "compare", { required: true }),
    text("legalIntro", "Intro", "compare", { long: true }),

    text("realEyebrow", "Eyebrow", "gallery"),
    text("realTitle", "Title", "gallery", { required: true }),
    text("realIntro", "Intro", "gallery", { long: true }),
    array("galleryPhotos", "Photos", "gallery", "imageWithAlt", "Shown in columns, in order."),

    text("reserveEyebrow", "Eyebrow", "reserve"),
    text("reserveTitle", "Title", "reserve", { required: true }),
    text("reserveIntro", "Intro", "reserve", { long: true }),
    text("paymentTitle", "Payment title", "reserve"),
    array("paymentSteps", "Payment steps", "reserve", "processStep", "Numbered 1, 2, 3… in this order."),
    text("depositNotice", "Deposit notice", "reserve", { long: true }),
    text("formSubmitLabel", "Send button", "reserve"),
    text("formNotice", "Note under the button", "reserve", { long: true }),
    text("successTitle", "Sent: title", "reserve"),
    text("successText", "Sent: text", "reserve", { long: true }),

    text("faqEyebrow", "Eyebrow", "faq"),
    text("faqTitle", "Title", "faq", { required: true }),
    text("faqIntro", "Intro", "faq", { long: true }),
    array("faqs", "Questions", "faq", "faqItem"),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    text("breadcrumbHome", "Breadcrumb: home", "seo", { description: "Sent to search engines with the page's breadcrumb." }),
    text("breadcrumbCurrent", "Breadcrumb: this page", "seo"),
  ],
  preview: languagePreview("Elopement Page"),
})
