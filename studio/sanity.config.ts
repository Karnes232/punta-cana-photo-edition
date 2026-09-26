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
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (templates) =>
      templates.filter(({ templateId }) => !templateType(templateId)),
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
})
