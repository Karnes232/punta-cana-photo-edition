import { defineField, defineType } from "sanity";
import { languageField, languagePreview } from "../fields";
import { languages } from "../shared/languages";
import {
  validGoogleReviewUrl,
  safeLink,
} from "../../../src/utils/reviewPolicy";

const str = (
  name: string,
  title: string,
  required = false,
  long = false,
): any =>
  defineField({
    name,
    title,
    type: long ? "text" : "string",
    validation: (r: any) =>
      required ? r.required().max(long ? 8000 : 180) : r.max(long ? 8000 : 180),
  });
const enabled = () =>
  defineField({
    name: "enabled",
    title: "Enabled",
    type: "boolean",
    initialValue: true,
  });
const image = (name = "image", title = "Image"): any =>
  defineField({ name, title, type: "reviewImage" });
const button = (name: string, title: string): any =>
  defineField({ name, title, type: "reviewButton" });
const order = defineField({
  name: "order",
  title: "Display order",
  type: "number",
  initialValue: 0,
  validation: (r) => r.integer().min(0),
});
const localized = (name: string, title: string): any =>
  defineField({ name, title, type: "localizedString" });
const variant = (values: string[]): any =>
  defineField({
    name: "variant",
    title: "Display variant",
    type: "string",
    initialValue: values[0],
    options: { list: values },
    validation: (r) =>
      r.custom((v) =>
        !v || values.includes(v) ? true : "Select an approved display variant.",
      ),
  });
export const reviewObjects = [
  defineType({
    name: "reviewImage",
    title: "Editorial image",
    type: "image",
    options: { hotspot: true },
    fields: [str("alt", "Alternative text", true), str("caption", "Caption")],
    validation: (r) => r.assetRequired(),
  }),
  defineType({
    name: "reviewButton",
    title: "Button",
    type: "object",
    fields: [
      enabled(),
      str("label", "Button label", true),
      defineField({
        name: "url",
        title: "Destination",
        type: "string",
        description:
          "A site path beginning with / or a complete HTTPS address.",
        validation: (r) =>
          r
            .required()
            .custom((v) =>
              safeLink(v) ? true : "Enter a safe site path or HTTPS address.",
            ),
      }),
      variant(["primary", "secondary"]),
    ],
  }),
  defineType({
    name: "reviewRichText",
    title: "Editorial content",
    type: "array",
    of: [
      {
        type: "block",
        styles: [{ title: "Paragraph", value: "normal" }],
        lists: [
          { title: "Bullet list", value: "bullet" },
          { title: "Numbered list", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              title: "Link",
              type: "object",
              fields: [
                {
                  name: "href",
                  title: "Destination",
                  type: "string",
                  validation: (r: any) =>
                    r
                      .required()
                      .custom((v: any) =>
                        safeLink(v)
                          ? true
                          : "Enter a safe site path or HTTPS address.",
                      ),
                },
              ],
            },
          ],
        },
      },
    ],
  }),
  defineType({
    name: "reviewHero",
    title: "Hero",
    type: "object",
    fields: [
      enabled(),
      str("eyebrow", "Introductory label"),
      str("heading", "Main H1 heading", true),
      str("description", "Supporting paragraph", false, true),
      str("secondaryParagraph", "Secondary paragraph", false, true),
      defineField({
        name: "mediaEnabled",
        title: "Show supporting image",
        type: "boolean",
        initialValue: true,
      }),
      image(),
      variant(["plain", "soft", "dark"]),
      button("primary", "Primary button"),
      button("secondary", "Secondary button"),
    ],
  }),
  defineType({
    name: "reviewPhilosophy",
    title: "Company Philosophy",
    type: "object",
    fields: [
      enabled(),
      str("eyebrow", "Eyebrow"),
      str("heading", "Heading", true),
      str("subtitle", "Subtitle"),
      defineField({
        name: "body",
        title: "Main editorial content",
        type: "reviewRichText",
      }),
      image(),
      button("cta", "Supporting CTA"),
      variant(["stacked", "split"]),
    ],
  }),
  defineType({
    name: "reviewValue",
    title: "Value",
    type: "object",
    fields: [
      enabled(),
      str("heading", "Heading", true),
      str("description", "Description", true, true),
      defineField({
        name: "icon",
        title: "Icon",
        type: "string",
        options: { list: ["heart", "ear", "check"] },
      }),
    ],
    preview: { select: { title: "heading" } },
  }),
  defineType({
    name: "reviewClosing",
    title: "Closing Call to Action",
    type: "object",
    fields: [
      enabled(),
      str("eyebrow", "Introductory label"),
      str("heading", "Heading", true),
      str("description", "Supporting paragraph", false, true),
      image(),
      button("primary", "Primary button"),
      button("secondary", "Secondary button"),
      variant(["plain", "dark"]),
    ],
  }),
  defineType({
    name: "reviewSeo",
    title: "SEO & Social Sharing",
    type: "object",
    fields: [
      str("title", "SEO title", true),
      str("description", "Meta description", true, true),
      str("ogTitle", "Open Graph title"),
      str("ogDescription", "Open Graph description", false, true),
      image("image", "Social image"),
      defineField({
        name: "noIndex",
        title: "Exclude from search engines",
        type: "boolean",
        initialValue: false,
      }),
    ],
  }),
];
export const reviewsPage = defineType({
  name: "reviewsPage",
  title: "Reviews Page",
  type: "document",
  // Editorial starting copy is saved into the Sanity document, never used as
  // a frontend fallback. Editors can replace every value before publishing.
  initialValue: {
    language: "en",
    hero: {
      enabled: true,
      heading: "Client Reviews",
      description: "Discover experiences shared by Sertuin Events clients.",
      mediaEnabled: true,
      variant: "plain",
    },
    reviewsHeading: "Client Experiences",
    allReviews: "All Reviews",
    loadMore: "Load More Reviews",
    googleLabel: "View Original Review on Google",
    externalLabel: "Opens in a new tab",
    emptyMessage: "No Reviews Available",
    filterLabel: "Filter reviews by event type",
    translationLabel: "Translation of the original review",
    pageSize: 12,
    valuesHeading: "Our Values",
    valuesEnabled: false,
    values: [
      {
        _key: "listen",
        _type: "reviewValue",
        enabled: false,
        heading: "We Listen",
        description: "We take time to understand your ideas and priorities.",
      },
      {
        _key: "organize",
        _type: "reviewValue",
        enabled: false,
        heading: "We Organize",
        description: "We coordinate the details of your celebration.",
      },
      {
        _key: "responsibility",
        _type: "reviewValue",
        enabled: false,
        heading: "We Take Responsibility",
        description: "We follow through on the arrangements we agree with you.",
      },
    ],
    featuredEnabled: false,
    featuredHeading: "Featured Experiences",
    sectionOrder: ["companyPhilosophy", "values", "featured", "faq"],
    closing: {
      enabled: false,
      heading: "Your Story Could Be Next.",
      variant: "plain",
    },
    seo: {
      title: "Client Reviews | Sertuin Events",
      description:
        "Read authentic client experiences with Sertuin Events and view their original reviews on Google.",
      noIndex: false,
    },
  },
  groups: [
    "Hero",
    "Company Philosophy",
    "Our Values",
    "Review Section Introduction",
    "Featured Reviews",
    "Review Display Settings",
    "Closing Call to Action",
    "SEO & Social Sharing",
    "FAQ",
  ].map((title, i) => ({ name: `g${i}`, title, default: i === 0 })),
  fields: [
    languageField,
    defineField({
      name: "hero",
      title: "Hero",
      type: "reviewHero",
      group: "g0",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "companyPhilosophy",
      title: "Company Philosophy",
      type: "reviewPhilosophy",
      group: "g1",
    }),
    defineField({
      name: "valuesEnabled",
      title: "Show values",
      type: "boolean",
      group: "g2",
      initialValue: true,
    }),
    { ...str("valuesHeading", "Values section heading"), group: "g2" },
    defineField({
      name: "values",
      title: "Our Values",
      type: "array",
      of: [{ type: "reviewValue" }],
      group: "g2",
      description: "Drag items to change their display order.",
      validation: (r) => r.max(12),
    }),
    { ...str("reviewsHeading", "Review section heading", true), group: "g3" },
    { ...str("reviewsIntro", "Introduction", false, true), group: "g3" },
    defineField({
      name: "featuredEnabled",
      title: "Show featured reviews",
      type: "boolean",
      group: "g4",
    }),
    { ...str("featuredHeading", "Featured reviews heading"), group: "g4" },
    ...[
      ["allReviews", "All reviews filter"],
      ["loadMore", "Load more button"],
      ["googleLabel", "Default Google review button"],
      ["externalLabel", "Opens in a new tab label"],
      ["emptyMessage", "No reviews message"],
      ["filterLabel", "Category navigation accessible label"],
      ["translationLabel", "Translation notice"],
    ].map(([name, title]) => ({ ...str(name, title, true), group: "g5" })),
    defineField({
      name: "pageSize",
      title: "Reviews per page",
      type: "number",
      group: "g5",
      initialValue: 12,
      validation: (r) => r.required().integer().min(3).max(48),
    }),
    defineField({
      name: "sectionOrder",
      title: "Editorial sections before reviews",
      type: "array",
      group: "g5",
      of: [
        {
          type: "string",
          options: { list: ["companyPhilosophy", "values", "featured", "faq"] },
        },
      ],
      initialValue: ["companyPhilosophy", "values", "featured", "faq"],
      validation: (r) => r.unique().max(4),
    }),
    defineField({
      name: "closing",
      title: "Closing Call to Action",
      type: "reviewClosing",
      group: "g6",
    }),
    defineField({
      name: "seo",
      title: "SEO & Social Sharing",
      type: "reviewSeo",
      group: "g7",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "faqEnabled",
      title: "Show FAQ",
      type: "boolean",
      group: "g8",
    }),
    { ...str("faqHeading", "FAQ heading"), group: "g8" },
    defineField({
      name: "faqs",
      title: "Questions",
      type: "array",
      group: "g8",
      of: [{ type: "faqItem" }],
      validation: (r) => r.max(20),
    }),
  ],
  validation: r=>r.custom((d:any)=>{
    for(const [enabled,heading] of [["valuesEnabled","valuesHeading"],["featuredEnabled","featuredHeading"],["faqEnabled","faqHeading"]])
      if(d?.[enabled]&&!d?.[heading]?.trim())return "Add a heading for every enabled editorial section.";
    return true;
  }),
  preview: languagePreview("Reviews Page"),
});
export const reviewCategory = defineType({
  name: "reviewCategory",
  title: "Review Category",
  type: "document",
  fields: [
    {...localized("name", "Category name"),validation:(r:any)=>r.required()},
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en" },
      validation: (r) => r.required(),
    }),
    {...localized("description", "Description"),validation:(r:any)=>r.required()},
    localized("intro", "Introductory text"),
    order,
    enabled(),
    image(),
    defineField({
      name: "servicePage",
      title: "Associated service page",
      type: "reference",
      to: [
        { type: "proposalPage" },
        { type: "weddingPlannerPage" },
        { type: "elopementPage" },
        { type: "genderRevealPage" },
        { type: "eventPlannerPage" },
      ],
      description:
        "The destination follows the service route and the current language.",
    }),
    defineField({
      name: "ctaEnabled",
      title: "Service CTA enabled",
      type: "boolean",
    }),
    localized("ctaHeading", "Service CTA heading"),
    localized("ctaDescription", "Service CTA description"),
    localized("ctaLabel", "Service CTA button label"),
    defineField({
      name: "servicePath",
      title: "Internal service destination",
      type: "string",
      description:
        "Used only without a service page reference. Use an existing service route.",
      validation: (r) =>
        r.custom((v) =>
          !v ||
          /^\/(proposal|puntacana-wedding-planner|punta-cana-elopement-packages|gender-reveal-punta-cana|event-planner)\/$/.test(
            v,
          )
            ? true
            : "Select an existing service route, including trailing /.",
        ),
    }),
    image("ctaImage", "Service CTA photograph"),
    variant(["primary", "secondary"]),
  ],
  validation: (r) =>
    r.custom((d: any) =>
      !d?.ctaEnabled || ((d.servicePage || d.servicePath) && d.ctaHeading?.en && d.ctaDescription?.en && d.ctaLabel?.en)
        ? true
        : "An enabled service CTA needs a destination, heading, description and button label.",
    ),
  preview: { select: { title: "name.en", media: "image" } },
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
export const clientReview = defineType({
  name: "clientReview",
  title: "Client Review",
  type: "document",
  fields: [
    str("clientName", "Client name", true),
    str("text", "Original review text", true, true),
    {
      ...image("photo", "Authorized client/event photograph"),
      validation: (r: any) => r.required().assetRequired(),
    },
    defineField({
      name: "category",
      title: "Review category",
      type: "reference",
      to: [{ type: "reviewCategory" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "googleReviewUrl",
      title: "Individual Google review permalink",
      type: "url",
      description:
        "Paste the expanded google.com/maps individual review URL. Google review routes with Ch or Ci identifiers are supported. Short links and general business profiles are rejected.",
      validation: (r) =>
        r
          .required()
          .custom((v) =>
            validGoogleReviewUrl(v)
              ? true
              : "Use the expanded individual review permalink, not a profile or short URL.",
          ),
    }),
    defineField({
      name: "photoAuthorized",
      title: "Photo publication authorization confirmed",
      type: "boolean",
      initialValue: false,
      validation: (r) =>
        r
          .required()
          .custom((v) =>
            v === true ? true : "Confirm permission before publishing.",
          ),
    }),
    defineField({
      name: "verificationStatus",
      title: "Source verification status",
      type: "string",
      options: { list: ["pending", "verified", "rejected"] },
      initialValue: "pending",
      validation: (r) =>
        r
          .required()
          .custom((v) =>
            v === "verified" ? true : "Verify the source before publishing.",
          ),
    }),
    defineField({
      name: "rating",
      title: "Verified rating (optional)",
      type: "number",
      validation: (r) => r.integer().min(1).max(5),
    }),
    defineField({
      name: "reviewDate",
      title: "Original review date",
      type: "date",
    }),
    defineField({ name: "eventDate", title: "Event date", type: "date" }),
    str("eventLocation", "Event location"),
    defineField({
      name: "originalLanguage",
      title: "Original review language",
      type: "string",
      options: {
        list: languages.map((l) => ({ title: l.title, value: l.id })),
      },
      validation: (r) => r.required(),
    }),
    localized("translation", "Optional translations"),
    localized("eventLabel", "Public event label"),
    localized("googleLabel", "Optional Google button label override"),
    order,
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "verificationStatus",
      media: "photo",
    },
  },
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});

// Kept in authenticated drafts, separately from the published testimonial.
// Studio deliberately offers no publish action for this document type.
export const reviewVerification = defineType({name:"reviewVerification",title:"Private Verification Notes",type:"document",fields:[
  defineField({name:"review",title:"Client review",type:"reference",to:[{type:"clientReview"}]}),
  str("title","Internal reference",true),
  str("notes","Internal verification notes",false,true),
],preview:{select:{title:"title"}}});
