import { contactPage } from "./documents/contactPage"
import { generalLayout } from "./documents/generalLayout"
import { homePage } from "./documents/homePage"
import { notFoundPage } from "./documents/notFoundPage"
import { shareExperiencePage } from "./documents/shareExperiencePage"
import { cta } from "./objects/cta"
import { eventCard } from "./objects/eventCard"
import { imageWithAlt } from "./objects/imageWithAlt"
import { processStep } from "./objects/processStep"
import { seo } from "./objects/seo"

export const schemaTypes = [
  // Documents
  generalLayout,
  homePage,
  contactPage,
  notFoundPage,
  shareExperiencePage,
  // Objects
  cta,
  eventCard,
  imageWithAlt,
  processStep,
  seo,
]
