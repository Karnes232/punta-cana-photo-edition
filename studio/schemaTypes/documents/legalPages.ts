import { CogIcon } from "@sanity/icons/Cog"
import { DocumentTextIcon } from "@sanity/icons/DocumentText"
import { LockIcon } from "@sanity/icons/Lock"
import { defineArrayMember, defineField, defineType } from "sanity"

import { atLeast, languageField, languagePreview, needed, text, withRules } from "../fields"

// A legal page (privacy, terms, cookies), one document per language
// ("privacyPolicyPage-en" plus translations). The text is formatted text,
// shown as-is at /privacy-policy/, /terms-and-conditions/ and /cookie-policy/.
const legalPage = (name: string, title: string, icon: typeof LockIcon) =>
  defineType({
    name,
    title,
    type: "document",
    icon,
    groups: [
      { name: "content", title: "Content", default: true },
      { name: "seo", title: "SEO" },
    ],
    fields: withRules([
      languageField,
      text("title", "Heading", "content", { required: true }),
      defineField({
        name: "lastUpdated",
        title: "Last updated",
        type: "date",
        group: "content",
        description: "Shown under the heading. Change it whenever the text changes.",
      }),
      defineField({
        name: "body",
        title: "Text",
        type: "array",
        group: "content",
        of: [
          defineArrayMember({
            type: "block",
            styles: [
              { title: "Normal", value: "normal" },
              { title: "Heading", value: "h2" },
              { title: "Subheading", value: "h3" },
            ],
            lists: [
              { title: "Bullets", value: "bullet" },
              { title: "Numbered", value: "number" },
            ],
            marks: {
              decorators: [
                { title: "Bold", value: "strong" },
                { title: "Italic", value: "em" },
              ],
              annotations: [
                {
                  name: "link",
                  type: "object",
                  title: "Link",
                  fields: [
                    {
                      name: "href",
                      type: "url",
                      title: "Address",
                      validation: (rule) =>
                        rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                    },
                  ],
                },
              ],
            },
          }),
        ],
      }),
      defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    ], {
      lastUpdated: needed,
      body: atLeast(1),
      seo: needed,
    }),
    preview: languagePreview(title),
  })

export const privacyPolicyPage = legalPage("privacyPolicyPage", "Privacy Policy", LockIcon)
export const termsPage = legalPage("termsPage", "Terms & Conditions", DocumentTextIcon)
export const cookiePolicyPage = legalPage("cookiePolicyPage", "Cookie Policy", CogIcon)
