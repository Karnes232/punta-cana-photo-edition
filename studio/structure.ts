import { CogIcon } from "@sanity/icons/Cog"
import { HomeIcon } from "@sanity/icons/Home"
import type { StructureResolver } from "sanity/structure"

// Types opened by a fixed ID rather than listed: one document, or (homePage) one
// per language. sanity.config.ts drops their delete/duplicate actions.
export const singletonTypes = new Set(["generalLayout", "homePage"])

// Hidden from the content list and the "new document" menu: the singletons, the tags
// and folders sanity-plugin-media manages in its own Media tool, and the records
// document-internationalization uses to link a page's language versions.
export const hiddenTypes = new Set([
  ...singletonTypes,
  "media.tag",
  "media.folder",
  "translation.metadata",
])

export const structure: StructureResolver = (S) => {
  const singleton = (type: string, title: string, icon: typeof CogIcon) =>
    S.listItem()
      .title(title)
      .id(type)
      .icon(icon)
      .child(S.document().schemaType(type).documentId(type))

  // One document per language: open the English one, whose Translations menu
  // creates and opens the others. The template sets its language to "en".
  const translatedPage = (type: string, title: string, icon: typeof CogIcon) =>
    S.listItem()
      .title(title)
      .id(type)
      .icon(icon)
      .child(
        S.document()
          .schemaType(type)
          .documentId(`${type}-en`)
          .initialValueTemplate(`${type}-en`),
      )

  return S.list()
    .title("Content")
    .items([
      singleton("generalLayout", "General Layout", CogIcon),
      translatedPage("homePage", "Home Page", HomeIcon),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !hiddenTypes.has(item.getId() ?? "")),
    ])
}
