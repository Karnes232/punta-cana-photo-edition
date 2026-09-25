import type { StructureResolver } from "sanity/structure"

// Singletons (company details, page content) get pinned here as the schema lands.
export const structure: StructureResolver = (S) =>
  S.list().title("Content").items(S.documentTypeListItems())
