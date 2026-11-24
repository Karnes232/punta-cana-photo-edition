const path = require("path");
const fs = require("fs");
const { validateAbout } = require("../src/utils/aboutPolicy");
// Explicit opt-in, loopback-only review data. Ordinary production/PR builds do
// not create this unpublished page or fetch private Sanity content.
module.exports = async ({ actions }) => {
  if (process.env.ABOUT_LOCAL_REVIEW !== "1") return;
  if (process.env.NETLIFY || process.env.CI)
    throw new Error(
      "Local About review must not run in CI or hosted deployment",
    );
  const source = process.env.ABOUT_CONTENT_FILE;
  if (!source)
    throw new Error(
      "ABOUT_CONTENT_FILE must point to the local review snapshot",
    );
  const pages = JSON.parse(fs.readFileSync(source, "utf8")).pages;
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
        aboutNoIndex: true,
        language: copy.language === "en" ? "en-US" : copy.language,
        sanityLanguage: copy.language,
        alternates,
      },
    });
  }
};
