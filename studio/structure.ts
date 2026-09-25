import { CogIcon } from "@sanity/icons/Cog"
import { HomeIcon } from "@sanity/icons/Home"
import type { StructureResolver } from "sanity/structure"

// Types with exactly one document, opened by a fixed ID rather than listed.
// sanity.config.ts drops their delete/duplicate actions.
export const singletonTypes = new Set(["generalLayout", "homePage"])

// Hidden from the content list and the "new document" menu: the singletons, plus the tags
// and folders sanity-plugin-media manages in its own Media tool.
export const hiddenTypes = new Set([...singletonTypes, "media.tag", "media.folder"])

export const structure: StructureResolver = (S) => {
  const singleton = (type: string, title: string, icon: typeof CogIcon) =>
    S.listItem()
      .title(title)
      .id(type)
      .icon(icon)
      .child(S.document().schemaType(type).documentId(type))

  return S.list()
    .title("Content")
    .items([
      singleton("generalLayout", "General Layout", CogIcon),
      singleton("homePage", "Home Page", HomeIcon),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !hiddenTypes.has(item.getId() ?? "")),
    ])
}
