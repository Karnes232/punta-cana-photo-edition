import { defineField, defineType } from "sanity";
import { languages } from "../shared/languages";

const text = (name: string, title: string, type = "string", required = true) =>
  defineField({
    name,
    title,
    type,
    validation: (r) => (required ? r.required() : r),
  });
const visible = () =>
  defineField({
    name: "visible",
    title: "Visible",
    type: "boolean",
    initialValue: true,
  });
const order = () =>
  defineField({
    name: "order",
    title: "Display order",
    type: "number",
    initialValue: 0,
  });
const url = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "url",
    validation: (r) => r.uri({ scheme: ["https"], allowRelative: false }),
  });
const localized = (name: string, title: string, long = false) =>
  text(name, title, long ? "aboutLocalizedText" : "localizedString");
export const aboutTypes = [
  defineType({
    name: "aboutLocalizedText",
    title: "Translated text",
    type: "object",
    fields: languages.map(({ id, title }) => text(id, title, "text")),
  }),
  defineType({
    name: "aboutPrinciple",
    title: "Value or process step",
    type: "object",
    fields: [
      localized("heading", "Heading"),
      localized("description", "Description", true),
      defineField({
        name: "icon",
        title: "Optional icon",
        type: "string",
        options: { list: ["heart", "ear", "check"] },
      }),
      order(),
      visible(),
    ],
    preview: { select: { title: "heading.en", subtitle: "description.en" } },
  }),
  defineType({
    name: "aboutCorporateProfile",
    title: "Corporate information",
    type: "object",
    fields: [
      text("legalName", "Legal company name"),
      localized("description", "Public company description", true),
      localized("history", "Company history", true),
      text("location", "Location"),
      text("country", "Country"),
      defineField({
        name: "founders",
        title: "Owners",
        type: "array",
        of: [{ type: "reference", to: [{ type: "companyFounder" }] }],
        validation: (r) => r.required().min(1).unique(),
      }),
      defineField({
        name: "values",
        title: "Shared company values",
        type: "array",
        of: [{ type: "aboutPrinciple" }],
        validation: (r) => r.required().min(1),
      }),
    ],
  }),
  defineType({
    name: "companyFounder",
    title: "Founder",
    type: "document",
    fields: [
      text("name", "Full name"),
      localized("title", "Professional title"),
      localized("biography", "Short biography", true),
      defineField({
        name: "extendedBiography",
        title: "Extended biography",
        type: "aboutLocalizedText",
      }),
      defineField({ name: "photo", title: "Photograph", type: "imageWithAlt" }),
      defineField({
        name: "links",
        title: "Approved professional links",
        type: "array",
        of: [{ type: "url", validation: (r) => r.uri({ scheme: ["https"] }) }],
      }),
      order(),
      visible(),
    ],
    preview: {
      select: { title: "name", subtitle: "title.en", media: "photo" },
    },
  }),
  defineType({
    name: "brandProfile",
    title: "Brand",
    type: "document",
    fields: [
      text("brandId", "Stable brand identifier"),
      text("name", "Official brand name"),
      localized("specialty", "Specialty"),
      localized("description", "Short description", true),
      defineField({
        name: "extendedDescription",
        title: "Extended description",
        type: "aboutLocalizedText",
      }),
      defineField({ name: "logo", title: "Brand logo", type: "imageWithAlt" }),
      defineField({
        name: "image",
        title: "Approved photograph",
        type: "imageWithAlt",
      }),
      url("homepageUrl", "Homepage URL"),
      localized("homepageButtonLabel", "Homepage button label"),
      defineField({
        name: "homepageLinkEnabled",
        title: "Enable homepage link",
        type: "boolean",
        initialValue: true,
        description: "An empty URL always keeps the visible button disabled.",
      }),
      order(),
      defineField({
        name: "active",
        title: "Active in portfolio",
        type: "boolean",
        initialValue: true,
      }),
    ],
    preview: {
      select: { title: "name", subtitle: "homepageUrl", media: "logo" },
    },
  }),
  defineType({
    name: "aboutPage",
    title: "About Us",
    type: "document",
    groups: [
      { name: "intro", title: "Introduction", default: true },
      { name: "founders", title: "Founders & Photograph" },
      { name: "company", title: "Sertuin SRL" },
      { name: "brand", title: "Sertuin Events" },
      { name: "purpose", title: "Purpose & Process" },
      { name: "values", title: "Shared Values" },
      { name: "directory", title: "Our Seven Brands" },
      { name: "cta", title: "Closing CTA" },
      { name: "seo", title: "SEO & Social Sharing" },
    ],
    fields: [
      defineField({
        name: "language",
        title: "Language",
        type: "string",
        readOnly: true,
        options: {
          list: languages.map((l) => ({ title: l.title, value: l.id })),
        },
        validation: (r) => r.required(),
      }),
      ...[
        text("eyebrow", "Introductory label"),
        text("heading", "Main H1 heading"),
        text("subtitle", "Supporting headline"),
        text("introduction", "Introduction", "text"),
      ].map((f) => ({ ...f, group: "intro" })),
      ...[
        text("foundersHeading", "Biography heading"),
        text("foundersSubtitle", "Biography subtitle"),
        text("biography", "Joint biography", "text"),
        defineField({
          name: "foundersPhoto",
          title: "Original founders photograph",
          type: "imageWithAlt",
          validation: (r) => r.required().assetRequired(),
        }),
        text("photoCaption", "Photograph caption", "string", false),
      ].map((f) => ({ ...f, group: "founders" })),
      defineField({
        name: "company",
        title: "Existing company record",
        type: "reference",
        to: [{ type: "generalLayout" }],
        group: "company",
        validation: (r) => r.required(),
        description:
          "Reuse General Layout; corporate information is maintained there.",
      }),
      { ...text("companyHeading", "Company heading"), group: "company" },
      ...[
        text("currentBrandLabel", "Current-brand indicator"),
        text("brandHeading", "Main brand heading"),
        text("brandDescription", "Main brand description", "text"),
        defineField({
          name: "serviceLinks",
          title: "Related service links",
          type: "array",
          of: [
            {
              type: "object",
              name: "aboutServiceLink",
              fields: [
                text("label", "Link label"),
                defineField({
                  name: "path",
                  title: "Existing service path",
                  type: "string",
                  options: {
                    list: [
                      "/proposal/",
                      "/puntacana-wedding-planner/",
                      "/event-planner/",
                      "/reviews/",
                      "/contact/",
                    ],
                  },
                  validation: (r) => r.required(),
                }),
              ],
            },
          ],
        }),
      ].map((f) => ({ ...f, group: "brand" })),
      ...[
        text("purposeHeading", "Purpose heading"),
        text("purpose", "Purpose statement", "text"),
        text("commitmentHeading", "Commitment heading"),
        text("commitment", "Commitment statement", "text"),
        text("processHeading", "Process heading"),
        defineField({
          name: "steps",
          title: "Process steps",
          type: "array",
          of: [{ type: "aboutPrinciple" }],
        }),
      ].map((f) => ({ ...f, group: "purpose" })),
      ...[
        text("valuesHeading", "Values heading"),
        text("valuesIntro", "Values introduction", "text"),
        defineField({
          name: "valuesEnabled",
          title: "Show shared values",
          type: "boolean",
          initialValue: true,
        }),
      ].map((f) => ({ ...f, group: "values" })),
      ...[
        text("directoryHeading", "Directory heading"),
        text("directorySubtitle", "Directory subtitle"),
        text("directoryIntro", "Directory introduction", "text"),
        defineField({
          name: "brands",
          title: "Brand directory",
          type: "array",
          of: [{ type: "reference", to: [{ type: "brandProfile" }] }],
          validation: (r) => r.required().unique().min(1),
        }),
        defineField({
          name: "directoryEnabled",
          title: "Show brand directory",
          type: "boolean",
          initialValue: true,
        }),
      ].map((f) => ({ ...f, group: "directory" })),
      defineField({
        name: "closing",
        title: "Closing invitation",
        type: "object",
        group: "cta",
        fields: [
          visible(),
          text("heading", "Heading"),
          text("description", "Description", "text"),
          text("label", "Button label"),
          defineField({
            name: "url",
            title: "Destination",
            type: "string",
            validation: (r) =>
              r
                .required()
                .custom((v) =>
                  typeof v === "string" &&
                  (/^\/(?!\/)/.test(v) || /^https:\/\//.test(v))
                    ? true
                    : "Use an internal /path/ or HTTPS URL",
                ),
          }),
          defineField({
            name: "image",
            title: "Supporting image",
            type: "imageWithAlt",
          }),
          defineField({
            name: "variant",
            title: "Display variant",
            type: "string",
            options: { list: ["plain", "soft", "dark"] },
            initialValue: "dark",
          }),
        ],
      }),
      defineField({
        name: "seo",
        title: "SEO & Social Sharing",
        type: "object",
        group: "seo",
        fields: [
          text("title", "SEO title"),
          text("description", "Meta description", "text"),
          text("ogTitle", "Open Graph title", "string", false),
          text("ogDescription", "Open Graph description", "text", false),
          defineField({
            name: "image",
            title: "Social image and alternative text",
            type: "imageWithAlt",
          }),
        ],
      }),
    ],
    preview: {
      select: {
        title: "heading",
        subtitle: "language",
        media: "foundersPhoto",
      },
    },
  }),
];
