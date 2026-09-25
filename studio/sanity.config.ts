import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { media } from "sanity-plugin-media"
import { structureTool } from "sanity/structure"

import { apiVersion, dataset, projectId } from "./env"
import { schemaTypes } from "./schemaTypes"
import { structure } from "./structure"

export default defineConfig({
  name: "sertuin",
  title: "Sertuin Events",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), media(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
})
