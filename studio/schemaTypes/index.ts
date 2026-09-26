import { blogCategory } from "./documents/blogCategory"
import { blogGuide } from "./documents/blogGuide"
import { blogPage } from "./documents/blogPage"
import { blogPost } from "./documents/blogPost"
import { blogTopic } from "./documents/blogTopic"
import { contactPage } from "./documents/contactPage"
import { eventPlannerPage } from "./documents/eventPlannerPage"
import { generalLayout } from "./documents/generalLayout"
import { homePage } from "./documents/homePage"
import { notFoundPage } from "./documents/notFoundPage"
import { shareExperiencePage } from "./documents/shareExperiencePage"
import { thankYouPage } from "./documents/thankYouPage"
import { blogSection, blogSource, blogStep } from "./objects/blogSection"
import { caseStudy } from "./objects/caseStudy"
import { cta } from "./objects/cta"
import { eventCard } from "./objects/eventCard"
import { faqItem } from "./objects/faqItem"
import { iconCard } from "./objects/iconCard"
import { imageWithAlt } from "./objects/imageWithAlt"
import { localizedString } from "./objects/localizedString"
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
  blogGuide,
  blogPost,
  blogCategory,
  blogTopic,
  // Objects
  blogSection,
  blogSource,
  blogStep,
  caseStudy,
  cta,
  eventCard,
  faqItem,
  iconCard,
  imageWithAlt,
  localizedString,
  processStep,
  seo,
  workMode,
]
