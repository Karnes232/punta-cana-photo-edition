import { CogIcon } from "@sanity/icons/Cog"
import type { StructureResolver } from "sanity/structure"

// Types with exactly one document, opened by a fixed ID rather than listed.
// sanity.config.ts drops their delete/duplicate actions.
export const singletonTypes = new Set(["generalLayout"])

// Hidden from the content list and the "new document" menu: the singletons, plus the tags
// and folders sanity-plugin-media manages in its own Media tool.
export const hiddenTypes = new Set([...singletonTypes, "media.tag", "media.folder"])

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("General Layout")
        .id("generalLayout")
        .icon(CogIcon)
        .child(S.document().schemaType("generalLayout").documentId("generalLayout")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !hiddenTypes.has(item.getId() ?? "")),
    ])
