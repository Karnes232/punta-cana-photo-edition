import { documentInternationalization } from "@sanity/document-internationalization"
import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { media } from "sanity-plugin-media"
import { structureTool } from "sanity/structure"

import { apiVersion, dataset, projectId } from "./env"
import { schemaTypes } from "./schemaTypes"
import { languages } from "./schemaTypes/shared/languages"
import { hiddenTypes, singletonTypes, structure } from "./structure"

// Types with one document per language, linked through the Translations menu.
export const translatedTypes = [
  "homePage",
  "contactPage",
  "thankYouPage",
  "notFoundPage",
  "shareExperiencePage",
  "eventPlannerPage",
  "blogPage",
]

// Singletons can be edited and published, but not duplicated or deleted.
const singletonActions = new Set(["publish", "discardChanges", "restore", "unpublish"])

// Template ids are the type name, or "<type>-<language>" / "<type>-parameterized"
// for the templates document-internationalization adds.
const templateType = (templateId: string) =>
  [...hiddenTypes].find((type) => templateId === type || templateId.startsWith(`${type}-`))

export default defineConfig({
  name: "sertuin",
  title: "Sertuin Events",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    media(),
    documentInternationalization({
      supportedLanguages: [...languages],
      schemaTypes: translatedTypes,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    // Opened from a Blog Guide's language entries (structure.ts).
    templates: (templates) => [
      ...templates,
      {
        id: "blogPost-for-guide",
        title: "Blog Post",
        schemaType: "blogPost",
        parameters: [
          { name: "guideId", type: "string" },
          { name: "language", type: "string" },
        ],
        value: ({ guideId, language }: { guideId: string; language: string }) => ({
          language,
          guide: { _type: "reference", _ref: guideId.replace(/^drafts\./, "") },
        }),
      },
    ],
  },
  document: {
    newDocumentOptions: (templates) =>
      templates.filter(({ templateId }) => !templateType(templateId)),
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
})
