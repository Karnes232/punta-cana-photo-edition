import { defineField, defineType } from "sanity"

import { languages } from "../shared/languages"

// A short label in all four languages, for shared lists such as the blog's
// event types and topics, where one document serves every language.
export const localizedString = defineType({
  name: "localizedString",
  title: "Label",
  type: "object",
  fields: languages.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ),
})
