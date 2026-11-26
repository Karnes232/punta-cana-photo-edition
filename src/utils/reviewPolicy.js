// Shared by build-time filtering and the renderer. Never accept a general business URL.
const validGoogleReviewUrl = (value) => {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return false;
    if (url.hostname === "www.google.com" || url.hostname === "google.com") {
      return (
        url.pathname.startsWith("/maps/") &&
        (/^Ch[0-9A-Za-z_-]{10,}$/.test(
          url.searchParams.get("reviewid") || "",
        ) ||
          /!1sCh[0-9A-Za-z_-]{10,}/.test(url.pathname) ||
          // Current Google share links use Ci identifiers on the review route.
          /^\/maps\/reviews\/data=.*!1sCi[0-9A-Za-z_-]{10,}(?:!|$)/.test(
            url.pathname,
          ))
      );
    }
    return false;
  } catch {
    return false;
  }
};
const safeLink = (value, internalOnly = false) => {
  if (typeof value !== "string" || /[\\\s\u0000-\u001f]/.test(value))
    return false;
  if (/^\/(?!\/)/.test(value)) return true;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      (!internalOnly || url.hostname === "sertuinevents.com")
    );
  } catch {
    return false;
  }
};
const eligibleReview = (review) =>
  Boolean(
    review &&
      !review._id?.startsWith("drafts.") &&
      review.clientName?.trim() &&
      review.text?.trim() &&
      (review.photo == null ||
        (review.photo?.asset &&
          review.photo?.alt?.trim() &&
          review.photoAuthorized === true)) &&
      review.originalLanguage &&
      (review.rating == null ||
        (Number.isInteger(review.rating) &&
          review.rating >= 1 &&
          review.rating <= 5)) &&
      review.verificationStatus === "verified" &&
      validGoogleReviewUrl(review.googleReviewUrl) &&
      review.category?._ref,
  );
const byOrder = (a, b) =>
  (a.order || 0) - (b.order || 0) || a._id.localeCompare(b._id);
const visibleCategories = (categories, reviews) =>
  categories
    .filter(
      (category) =>
        category.enabled === true &&
        !category._id.startsWith("drafts.") &&
        reviews.some(
          (review) =>
            eligibleReview(review) && review.category._ref === category._id,
        ),
    )
    .sort(byOrder);
module.exports = {
  validGoogleReviewUrl,
  safeLink,
  eligibleReview,
  visibleCategories,
  byOrder,
};
