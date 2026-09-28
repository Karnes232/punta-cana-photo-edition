import { defineArrayMember, defineField, defineType } from "sanity"

// Elopement Prices as shown in one language. Each links one shared Elopement
// Price, so the amount stays the same in every language.
const option = (kind: string) =>
  defineField({
    name: "option",
    title: "Price",
    type: "reference",
    to: [{ type: "elopementOption" }],
    options: { filter: "kind == $kind", filterParams: { kind } },
    validation: (rule) => rule.required(),
  })

// A setting card in step 1 (private beach or catamaran).
export const elopementExperienceText = defineType({
  name: "elopementExperienceText",
  title: "Setting",
  type: "object",
  fields: [
    option("experience"),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "eyebrow", title: "Duration line", type: "string", description: "Small line above the title." }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "option.name" } },
})

// A décor card in step 2, with its own two photos.
export const elopementDecorText = defineType({
  name: "elopementDecorText",
  title: "Décor",
  type: "object",
  fields: [
    option("decor"),
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description: "Browsed with the arrows on the card; the first is shown first.",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { select: { title: "name", subtitle: "option.name", media: "photos.0" } },
})

// The legal wedding upgrade: its card in step 3 and in the symbolic vs. legal section.
export const elopementUpgradeText = defineType({
  name: "elopementUpgradeText",
  title: "Legal wedding upgrade",
  type: "object",
  fields: [
    option("legal"),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "choiceText", title: "Short text", type: "text", rows: 2, description: "On the step 3 card." }),
    defineField({ name: "text", title: "Full text", type: "text", rows: 3, description: "In the symbolic vs. legal section." }),
    defineField({ name: "caution", title: "Caution", type: "text", rows: 2, description: "Shown in red on both cards." }),
  ],
  preview: { select: { title: "title", subtitle: "option.name" } },
})
