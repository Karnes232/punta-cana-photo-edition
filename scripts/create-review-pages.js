const path = require("path");
const fetch = require("node-fetch");
const {
  eligibleReview,
  visibleCategories,
  byOrder,
} = require("../src/utils/reviewPolicy");
// Explicit public projection: verification notes and other administrative fields
// must never enter Gatsby's downloadable page-data JSON.
const query = `{
  "pages": *[_type == "reviewsPage" && !(_id in path("drafts.**"))],
  "categories": *[_type == "reviewCategory" && !(_id in path("drafts.**"))]{
    _id,name,slug,description,intro,order,enabled,image,ctaEnabled,ctaHeading,
    ctaDescription,ctaLabel,servicePath,ctaImage,variant,"serviceType":servicePage->_type
  },
  "reviews": *[_type == "clientReview" && !(_id in path("drafts.**")) && photoAuthorized == true && verificationStatus == "verified"]{
    _id,clientName,text,photo,category,googleReviewUrl,photoAuthorized,verificationStatus,
    rating,reviewDate,eventDate,eventLocation,originalLanguage,translation,eventLabel,googleLabel,order,featured
  }
}`;
module.exports = async ({ actions, reporter }) => {
  const project = process.env.SANITY_PROJECT_ID || "mj6f2710";
  const dataset = process.env.SANITY_DATASET || "production";
  const response = await fetch(
    `https://${project}.api.sanity.io/v2025-02-19/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}`,
  );
  if (!response.ok)
    throw new Error(`Reviews content request failed (${response.status})`);
  const { result } = await response.json();
  if (!result?.pages) throw new Error("Reviews content response is invalid");
  const reviews = result.reviews.filter(eligibleReview).sort(byOrder);
  const categories = visibleCategories(result.categories, reviews);
  const publicReviews = reviews.filter((r) =>
    categories.some((c) => c._id === r.category._ref),
  );
  const supported = ["en", "es", "pt", "fr"];
  const pages = result.pages.filter((p) => supported.includes(p.language));
  for (const language of supported) {
    const candidates = pages.filter((p) => p.language === language);
    if (candidates.length > 1)
      throw new Error(`Multiple Reviews Page documents for ${language}`);
  }
  if (!pages.length)
    reporter.warn(
      "Reviews: publish Reviews Page > Page Content to create /reviews/. No placeholder page or invented reviews generated.",
    );
  const alternates = pages.map((p) => ({
    language: p.language,
    path: p.language === "en" ? "/reviews/" : `/${p.language}/reviews/`,
  }));
  for (const copy of pages) {
    if (
      !copy.hero?.heading ||
      !copy.seo?.title ||
      !copy.seo?.description ||
      [
        "allReviews",
        "loadMore",
        "googleLabel",
        "externalLabel",
        "emptyMessage",
        "filterLabel",
        "translationLabel",
        "reviewsHeading",
      ].some((k) => !copy[k])
    ) {
      throw new Error(
        `Reviews Page ${copy.language}: required editorial content is missing`,
      );
    }
    actions.createPage({
      path: alternates.find((a) => a.language === copy.language).path,
      component: path.resolve("src/template/reviews.js"),
      context: {
        copy,
        categories,
        reviews: publicReviews,
        language: copy.language === "en" ? "en-US" : copy.language,
        sanityLanguage: copy.language,
        project,
        dataset,
        alternates,
      },
    });
  }
};
