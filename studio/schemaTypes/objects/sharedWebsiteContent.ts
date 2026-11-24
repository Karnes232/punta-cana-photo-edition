import { defineField, defineType } from "sanity";
import { safeLink } from "../../../src/utils/reviewPolicy";
const label = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "localizedString",
    validation: (r) => r.required(),
  });
const destination = defineField({
  name: "url",
  title: "Destination",
  type: "string",
  validation: (r) =>
    r
      .required()
      .custom((v) =>
        typeof v === "string" && /^\/(?!\/)[^\s\\]*$/.test(String(v))
          ? true
          : "Use an internal path beginning with one /.",
      ),
});
export const sharedWebsiteTypes = [
  defineType({
    name: "sharedNavLink",
    title: "Navigation link",
    type: "object",
    fields: [label("label", "Label"), destination],
    preview: { select: { title: "label.en", subtitle: "url" } },
  }),
  defineType({
    name: "sharedNavItem",
    title: "Navigation item",
    type: "object",
    fields: [
      label("label", "Label"),
      {
        ...destination,
        validation: (r) =>
          r.custom((v) =>
            !v || /^\/(?!\/)[^\s\\]*$/.test(String(v))
              ? true
              : "Use an internal path.",
          ),
      },
      defineField({
        name: "footerOnly",
        title: "Footer only",
        type: "boolean",
        initialValue: false,
      }),
      defineField({
        name: "children",
        title: "Submenu links",
        type: "array",
        of: [{ type: "sharedNavLink" }],
        validation: (r) => r.max(12),
      }),
    ],
    validation: (r) =>
      r.custom((v: any) =>
        v?.url || v?.children?.length
          ? true
          : "Choose a destination or add submenu links.",
      ),
    preview: { select: { title: "label.en", subtitle: "url" } },
  }),
  defineType({
    name: "sharedInterfaceLabel",
    title: "Interface label",
    type: "object",
    fields: [
      defineField({
        name: "key",
        title: "Interface key",
        type: "string",
        readOnly: true,
        description: "Stable identifier used by the shared components.",
      }),
      label("text", "Text"),
    ],
    preview: { select: { title: "key", subtitle: "text.en" } },
  }),
  defineType({
    name: "sharedLanguage",
    title: "Language",
    type: "object",
    fields: [
      defineField({
        name: "code",
        title: "Language",
        type: "string",
        options: { list: ["en-US", "es", "pt", "fr"] },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "display",
        title: "Display name",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "flag",
        title: "Flag symbol",
        type: "string",
        validation: (r) => r.max(8),
      }),
    ],
    preview: { select: { title: "display" } },
  }),
  defineType({
    name: "sharedWebsiteContent",
    title: "Shared Website Content",
    type: "object",
    fields: [
      defineField({
        name: "navigation",
        title: "Shared navigation and footer menu",
        type: "array",
        of: [{ type: "sharedNavItem" }],
        validation: (r) => r.required().min(1).max(12),
      }),
      defineField({
        name: "legalLinks",
        title: "Footer legal links",
        type: "array",
        of: [{ type: "sharedNavLink" }],
        validation: (r) => r.required().min(1),
      }),
      defineField({
        name: "homePath",
        title: "Logo and copyright destination",
        type: "string",
        validation: destination.validation,
      }),
      defineField({
        name: "cookiePath",
        title: "Cookie banner policy destination",
        type: "string",
        validation: destination.validation,
      }),
      defineField({
        name: "labels",
        title: "Common CTA, consent and accessibility text",
        type: "array",
        options: { disableActions: ["add", "remove", "duplicate"] },
        of: [{ type: "sharedInterfaceLabel" }],
        description:
          "Expand a label and edit its four translations. Existing consent behavior stays controlled by the application.",
        validation: (r) =>
          r
            .required()
            .custom((v: any) =>
              new Set((v || []).map((x: any) => x.key)).size ===
              (v || []).length
                ? true
                : "Interface keys must be unique.",
            ),
      }),
      defineField({
        name: "languages",
        title: "Supported language display names",
        type: "array",
        of: [{ type: "sharedLanguage" }],
        validation: (r) =>
          r
            .required()
            .length(4)
            .custom((v: any) =>
              new Set((v || []).map((x: any) => x.code)).size === 4
                ? true
                : "Include each supported language once.",
            ),
      }),
      label("creditName", "Footer credit name"),
      {
        ...label("creditUrl", "Footer credit destination"),
        validation: (r) =>
          r
            .required()
            .custom((v: any) =>
              v && ["en", "es", "pt", "fr"].every((l) => safeLink(v[l]))
                ? true
                : "Enter a safe HTTPS destination in each language.",
            ),
      },
      label("creditLogoAlt", "Footer credit logo alternative text"),
      defineField({
        name: "creditLogoUrl",
        title: "Footer credit image URL",
        type: "url",
        description: "An existing approved asset hosted on Sanity.",
        validation: (r) =>
          r
            .uri({ scheme: ["https"] })
            .custom((v) =>
              !v || v.startsWith("https://cdn.sanity.io/images/")
                ? true
                : "Use an approved Sanity image URL.",
            ),
      }),
    ],
  }),
];
