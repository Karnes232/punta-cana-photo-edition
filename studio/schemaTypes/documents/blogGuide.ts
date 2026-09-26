import { DocumentIcon } from "@sanity/icons/Document"
import { defineArrayMember, defineField, defineType, type Reference } from "sanity"

// The language-neutral part of a blog guide: its address, photo and place in
// the topic map. The text lives in one Blog Post per language, opened from
// this guide in the Studio. A guide goes live once it and its language texts
// are published (after the next site build).
const publishedId = (id?: string) => (id || "").replace(/^drafts\./, "")

export const blogGuide = defineType({
  name: "blogGuide",
  title: "Blog Guide",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "slug",
      title: "Address",
      type: "slug",
      description:
        "The end of the guide's URL, the same in every language: /blog/<address>/. Changing it after launch breaks links and search results.",
      validation: (rule) =>
        rule.required().custom((slug?: { current?: string }) =>
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug?.current || "")
            ? true
            : "Use lowercase letters, digits and single dashes",
        ),
    }),
    defineField({
      name: "category",
      title: "Event type",
      type: "reference",
      to: [{ type: "blogCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Position among its event type's guides, from the lowest number.",
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "guideType",
      title: "Kind of guide",
      type: "string",
      options: {
        list: [
          { title: "Guide", value: "guide" },
          { title: "Comparison", value: "comparison" },
          { title: "Checklist", value: "checklist" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      description: "The topic lists at the bottom of /blog/ that include this guide.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "blogTopic" }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "related",
      title: "Related guides",
      type: "array",
      description: "Shown under \"Continue planning\" at the end of the guide.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "blogGuide" }] })],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .unique()
          .custom((related: Reference[] | undefined, context) =>
            (related || []).some((item) => item._ref === publishedId(context.document?._id))
              ? "A guide can't be related to itself"
              : true,
          ),
    }),
    defineField({
      name: "next",
      title: "Suggested next guide",
      type: "reference",
      to: [{ type: "blogGuide" }],
      description: "Optional. Listed first under \"Continue planning\"; must also be one of the related guides.",
      validation: (rule) =>
        rule.custom((next: Reference | undefined, context) => {
          if (!next) return true
          const related = (context.document?.related as Reference[] | undefined) || []
          return related.some((item) => item._ref === next._ref) ? true : "Add this guide to the related guides too"
        }),
    }),
    defineField({
      name: "heroImage",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Shown under the introduction and when the guide is shared. Landscape, 3:2. Each language describes it in its own alt text.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageCredit",
      title: "Photo credit",
      type: "string",
      description: "Optional, shown under the photo, e.g. \"Gareth Davies Photography\".",
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated",
      type: "date",
      description: "Tell search engines the guide changed: update it after a meaningful edit to any language or the photo.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "slug.current", subtitle: "category.label.en", media: "heroImage" },
  },
})
