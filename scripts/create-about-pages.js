const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const { projection } = require("./about-query");
const { validateAbout } = require("../src/utils/aboutPolicy");
// Production builds consume published Sanity content only. Local review remains
// explicitly opt-in and cannot be used in a hosted build.
module.exports = async ({ actions, fetchContent = fetch }) => {
  const localReview = process.env.ABOUT_LOCAL_REVIEW === "1";
  if (localReview && (process.env.NETLIFY || process.env.CI))
    throw new Error(
      "Local About review must not run in CI or hosted deployment",
    );
  const source = process.env.ABOUT_CONTENT_FILE;
  if (localReview && !source)
    throw new Error(
      "ABOUT_CONTENT_FILE must point to the local review snapshot",
    );
  let pages;
  if (localReview) pages = JSON.parse(fs.readFileSync(source, "utf8")).pages;
  else {
    const project = process.env.SANITY_PROJECT_ID || "mj6f2710";
    const dataset = process.env.SANITY_DATASET || "production";
    const response = await fetchContent(
      `https://${project}.api.sanity.io/v2025-02-19/data/query/${dataset}?perspective=published&query=${encodeURIComponent(projection)}`,
      { timeout: 30000 },
    );
    if (!response.ok)
      throw new Error(
        `About published content request failed (${response.status})`,
      );
    pages = (await response.json()).result;
    if (!Array.isArray(pages))
      throw new Error("Invalid About published response");
  }
  const supported = ["en", "es", "pt", "fr"];
  const alternates = pages.map((p) => ({
    language: p.language,
    path: p.language === "en" ? "/about/" : `/${p.language}/about/`,
  }));
  if (new Set(pages.map((p) => p.language)).size !== pages.length)
    throw new Error("Duplicate About locale");
  for (const copy of pages) {
    if (!supported.includes(copy.language))
      throw new Error("Unsupported About locale");
    validateAbout(copy);
    actions.createPage({
      path: alternates.find((a) => a.language === copy.language).path,
      component: path.resolve("src/template/about.js"),
      context: {
        copy,
        aboutNoIndex: localReview,
        language: copy.language === "en" ? "en-US" : copy.language,
        sanityLanguage: copy.language,
        alternates,
      },
    });
  }
};
