import { BookIcon } from "@sanity/icons/Book"
import { CaseIcon } from "@sanity/icons/Case"
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle"
import { DocumentIcon } from "@sanity/icons/Document"
import { CogIcon } from "@sanity/icons/Cog"
import { CommentIcon } from "@sanity/icons/Comment"
import { EnvelopeIcon } from "@sanity/icons/Envelope"
import { HomeIcon } from "@sanity/icons/Home"
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline"
import type { StructureResolver } from "sanity/structure"

import { languages } from "./schemaTypes/shared/languages"

// Types opened by a fixed ID rather than listed: one document (generalLayout), or
// one per language for the pages. sanity.config.ts drops their delete/duplicate actions.
export const singletonTypes = new Set([
  "generalLayout",
  "homePage",
  "contactPage",
  "thankYouPage",
  "notFoundPage",
  "shareExperiencePage",
  "eventPlannerPage",
  "blogPage",
  "blogPost",
])

// Hidden from the content list and the "new document" menu: the singletons, the tags
// and folders sanity-plugin-media manages in its own Media tool, and the records
// document-internationalization uses to link a page's language versions.
export const hiddenTypes = new Set([
  ...singletonTypes,
  "media.tag",
  "media.folder",
  "translation.metadata",
])

// Listed in their own sections below rather than in the generic type list.
const listedTypes = new Set(["blogGuide", "blogCategory", "blogTopic"])

// A guide's language texts have fixed IDs: blogPost-<guide>-<language>, where
// <guide> drops the "blogGuide-" prefix of the guides created by the migration.
export const blogPostId = (guideId: string, language: string) =>
  `blogPost-${guideId.replace(/^drafts\./, "").replace(/^blogGuide-/, "")}-${language}`

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

  // Each guide opens its shared settings and one text per language.
  const blogGuides = S.listItem()
    .title("Blog Guides")
    .id("blogGuides")
    .icon(DocumentIcon)
    .child(
      S.documentTypeList("blogGuide")
        .title("Blog Guides")
        .defaultOrdering([{ field: "slug.current", direction: "asc" }])
        .child((guideId) =>
          S.list()
            .title("Guide")
            .items([
              S.listItem()
                .title("Guide settings")
                .id("settings")
                .icon(CogIcon)
                .child(S.document().schemaType("blogGuide").documentId(guideId)),
              S.divider(),
              ...languages.map(({ id, title }) =>
                S.listItem()
                  .title(title)
                  .id(id)
                  .child(
                    S.document()
                      .schemaType("blogPost")
                      .documentId(blogPostId(guideId, id))
                      .initialValueTemplate("blogPost-for-guide", { guideId, language: id }),
                  ),
              ),
            ]),
        ),
    )

  return S.list()
    .title("Content")
    .items([
      singleton("generalLayout", "General Layout", CogIcon),
      translatedPage("homePage", "Home Page", HomeIcon),
      translatedPage("eventPlannerPage", "Event Planner Page", CaseIcon),
      translatedPage("blogPage", "Blog Page", BookIcon),
      blogGuides,
      S.documentTypeListItem("blogCategory").title("Blog Event Types"),
      S.documentTypeListItem("blogTopic").title("Blog Topics"),
      translatedPage("contactPage", "Contact Page", EnvelopeIcon),
      translatedPage("thankYouPage", "Thank-You Page", CheckmarkCircleIcon),
      translatedPage("shareExperiencePage", "Share Your Experience", CommentIcon),
      translatedPage("notFoundPage", "404 Page", WarningOutlineIcon),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !hiddenTypes.has(item.getId() ?? "") && !listedTypes.has(item.getId() ?? "")),
    ])
}
