import { blogCategory } from "./documents/blogCategory"
import { blogGuide } from "./documents/blogGuide"
import { blogPage } from "./documents/blogPage"
import { blogPost } from "./documents/blogPost"
import { blogTopic } from "./documents/blogTopic"
import { contactPage } from "./documents/contactPage"
import { elopementOption } from "./documents/elopementOption"
import { elopementPage } from "./documents/elopementPage"
import { eventPlannerPage } from "./documents/eventPlannerPage"
import { genderRevealPage } from "./documents/genderRevealPage"
import { generalLayout } from "./documents/generalLayout"
import { homePage } from "./documents/homePage"
import { notFoundPage } from "./documents/notFoundPage"
import { proposalPackage } from "./documents/proposalPackage"
import { proposalPackagePage } from "./documents/proposalPackagePage"
import { proposalPage } from "./documents/proposalPage"
import { shareExperiencePage } from "./documents/shareExperiencePage"
import { thankYouPage } from "./documents/thankYouPage"
import { weddingPackage } from "./documents/weddingPackage"
import { weddingPlannerPage } from "./documents/weddingPlannerPage"
import { blogSection, blogSource, blogStep } from "./objects/blogSection"
import { caseStudy } from "./objects/caseStudy"
import { cta } from "./objects/cta"
import { elopementDecorText, elopementExperienceText, elopementUpgradeText } from "./objects/elopementOptionText"
import { eventCard } from "./objects/eventCard"
import { faqItem } from "./objects/faqItem"
import { iconCard } from "./objects/iconCard"
import { iconLabel } from "./objects/iconLabel"
import { imageWithAlt } from "./objects/imageWithAlt"
import { localizedString } from "./objects/localizedString"
import { processStep } from "./objects/processStep"
import { reviewExcerpt } from "./objects/reviewExcerpt"
import { seo } from "./objects/seo"
import { weddingFilm } from "./objects/weddingFilm"
import { weddingPackageText } from "./objects/weddingPackageText"
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
  genderRevealPage,
  weddingPlannerPage,
  weddingPackage,
  elopementPage,
  elopementOption,
  proposalPage,
  proposalPackage,
  proposalPackagePage,
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
  elopementDecorText,
  elopementExperienceText,
  elopementUpgradeText,
  eventCard,
  faqItem,
  iconCard,
  iconLabel,
  imageWithAlt,
  localizedString,
  processStep,
  reviewExcerpt,
  seo,
  weddingFilm,
  weddingPackageText,
  workMode,
]
