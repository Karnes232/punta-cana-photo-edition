import { generalLayout } from "./documents/generalLayout"
import { homePage } from "./documents/homePage"
import { cta } from "./objects/cta"
import { eventCard } from "./objects/eventCard"
import { imageWithAlt } from "./objects/imageWithAlt"
import { localizedString, localizedStringList, localizedText } from "./objects/localized"
import { localizedImage } from "./objects/localizedImage"
import { processStep } from "./objects/processStep"
import { seo } from "./objects/seo"

export const schemaTypes = [
  // Documents
  generalLayout,
  homePage,
  // Objects
  cta,
  eventCard,
  imageWithAlt,
  localizedImage,
  localizedString,
  localizedStringList,
  localizedText,
  processStep,
  seo,
]
