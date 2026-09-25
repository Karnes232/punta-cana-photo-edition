import { CogIcon } from "@sanity/icons/Cog"
import { defineField, defineType } from "sanity"

// Site-wide settings shown on every page: logo, contact buttons, footer socials and the
// copyright line, plus the legal details used on the /admin contract PDFs.
// A singleton: structure.ts always opens the document with this same ID.
// Field names match Contentful's generalLayout, which the site reads today.
export const generalLayout = defineType({
  name: "generalLayout",
  title: "General Layout",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "branding", title: "Branding", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "legal", title: "Legal & admin" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "Company name",
      type: "string",
      group: "branding",
      description: "Shown in the copyright line and search results.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "branding",
      description: "PNG or SVG with a transparent background.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "localizedString",
          description: "Read by screen readers, e.g. \"Sertuin Events logo\".",
          validation: (rule) =>
            rule.custom((alt?: { en?: string }) =>
              alt?.en?.trim() ? true : "Add the English alternative text",
            ),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "favIcon",
      title: "Favicon",
      type: "image",
      group: "branding",
      description: "The browser tab icon. Square PNG, at least 512×512.",
    }),

    defineField({
      name: "telephone",
      title: "Phone / WhatsApp number",
      type: "string",
      group: "contact",
      description: "Digits only, with the country code, e.g. 18295222900.",
      validation: (rule) =>
        rule.required().regex(/^\d{10,15}$/, { name: "digits with country code" }),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "messengerLink",
      title: "Messenger link",
      type: "url",
      group: "contact",
      description: "e.g. https://m.me/sertuinevents",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "localizedString",
      group: "contact",
      description: "e.g. \"24 hours a day, 7 days a week, all year\".",
    }),

    ...[
      { name: "instagram", title: "Instagram" },
      { name: "facebook", title: "Facebook" },
      { name: "x", title: "X (Twitter)" },
    ].map(({ name, title }) =>
      defineField({
        name,
        title: `${title} URL`,
        type: "url",
        group: "social",
        validation: (rule) => rule.uri({ scheme: ["https"] }),
      }),
    ),

    defineField({
      name: "legalName",
      title: "Legal name",
      type: "string",
      group: "legal",
      description: "Registered company name, e.g. SERTUIN SRL. Shown in the footer.",
    }),
    defineField({
      name: "rnc",
      title: "RNC",
      type: "string",
      group: "legal",
      description: "Dominican tax ID, e.g. 132-19965-2.",
      validation: (rule) => rule.regex(/^\d{3}-\d{5}-\d$/, { name: "RNC (000-00000-0)" }),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      group: "legal",
      description: "Printed on contract PDFs.",
    }),
    defineField({
      name: "companyStamp",
      title: "Company stamp",
      type: "image",
      group: "legal",
      description: "Only used on /admin contract PDFs.",
    }),
    defineField({
      name: "signature",
      title: "Signature",
      type: "image",
      group: "legal",
      description: "Only used on /admin contract PDFs.",
    }),
  ],
  preview: {
    select: { title: "companyName", media: "logo" },
    prepare: ({ title, media }) => ({
      title: title || "General Layout",
      subtitle: "Site-wide settings",
      media,
    }),
  },
})
