import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { media } from "sanity-plugin-media"
import { structureTool } from "sanity/structure"

import { apiVersion, dataset, projectId } from "./env"
import { schemaTypes } from "./schemaTypes"
import { hiddenTypes, singletonTypes, structure } from "./structure"

// Singletons can be edited and published, but not duplicated or deleted.
const singletonActions = new Set(["publish", "discardChanges", "restore", "unpublish"])

export default defineConfig({
  name: "sertuin",
  title: "Sertuin Events",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), media(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (templates) =>
      templates.filter(({ templateId }) => !hiddenTypes.has(templateId)),
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
})
