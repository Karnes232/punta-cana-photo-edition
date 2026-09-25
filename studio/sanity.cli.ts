import { defineCliConfig } from "sanity/cli"

import { dataset, projectId } from "./env"

export default defineCliConfig({
  api: { projectId, dataset },
  // The Studio root: Vite serves it and its assets under /studio/, matching sertuinevents.com/studio
  // and the dev proxy in gatsby-config.js. Don't also set basePath in sanity.config.ts, since it
  // gets appended to this one (/studio/studio).
  project: { basePath: "/studio" },
})
