import { blogPage } from "./documents/blogPage"
import { contactPage } from "./documents/contactPage"
import { eventPlannerPage } from "./documents/eventPlannerPage"
import { generalLayout } from "./documents/generalLayout"
import { homePage } from "./documents/homePage"
import { notFoundPage } from "./documents/notFoundPage"
import { shareExperiencePage } from "./documents/shareExperiencePage"
import { thankYouPage } from "./documents/thankYouPage"
import { caseStudy } from "./objects/caseStudy"
import { cta } from "./objects/cta"
import { eventCard } from "./objects/eventCard"
import { faqItem } from "./objects/faqItem"
import { iconCard } from "./objects/iconCard"
import { imageWithAlt } from "./objects/imageWithAlt"
import { processStep } from "./objects/processStep"
import { seo } from "./objects/seo"
import { workMode } from "./objects/workMode"

export const schemaTypes = [
  // Documents
  generalLayout,
  homePage,
  contactPage,
  thankYouPage,
  notFoundPage,
  shareExperiencePage,
  eventPlannerPage,
  blogPage,
  // Objects
  caseStudy,
  cta,
  eventCard,
  faqItem,
  iconCard,
  imageWithAlt,
  processStep,
  seo,
  workMode,
]
