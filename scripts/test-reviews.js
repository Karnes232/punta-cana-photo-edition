const assert = require("node:assert/strict");
const {
  validGoogleReviewUrl,
  safeLink,
  eligibleReview,
  visibleCategories,
} = require("../src/utils/reviewPolicy");
const url =
  "https://www.google.com/maps/reviews/?reviewid=ChExampleIndividualReview";
const review = {
  _id: "review-1",
  originalLanguage: "en",
  clientName: "Test fixture",
  text: "Test fixture only",
  photo: { asset: { _ref: "image-test" }, alt: "Fixture" },
  photoAuthorized: true,
  verificationStatus: "verified",
  googleReviewUrl: url,
  category: { _ref: "category-1" },
};
assert(validGoogleReviewUrl(url));
const currentGoogleShareUrl =
  "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2s5aWVVdHdlamhmZVRKbmNrNU1heTFhTVVNelNWRRAB!2m1!1s0x0:0x960641785ff65e84!3m1!1s2@1:CAIQACodChtycF9oOk9ieUtwejhfeTJnck5May1aMUMzSVE%7C%7C";
assert(validGoogleReviewUrl(currentGoogleShareUrl));
assert(
  !validGoogleReviewUrl(
    currentGoogleShareUrl.replace("/maps/reviews/", "/maps/place/"),
  ),
);
for (const bad of [
  "https://google.com/maps/place/business",
  "https://maps.app.goo.gl/test",
  "javascript:alert(1)",
  "https://google.com.evil.test/maps/reviews/?reviewid=x",
  "https://attacker@google.com/maps/reviews/?reviewid=x",
])
  assert(!validGoogleReviewUrl(bad), bad);
assert(eligibleReview(review));
for (const patch of [
  { _id: "drafts.review-1" },
  { photoAuthorized: false },
  { verificationStatus: "pending" },
  { text: "" },
  { photo: { asset: { _ref: "x" }, alt: "" } },
  { googleReviewUrl: "https://google.com/maps/" },
  { category: null },
])
  assert(!eligibleReview({ ...review, ...patch }), JSON.stringify(patch));
const categories = [
  { _id: "category-1", enabled: true, order: 2 },
  { _id: "empty", enabled: true, order: 1 },
  { _id: "hidden", enabled: false },
];
assert.deepEqual(
  visibleCategories(categories, [review]).map((c) => c._id),
  ["category-1"],
);
assert.deepEqual(visibleCategories(categories, []), []);
assert.deepEqual(
  visibleCategories(categories, [{ ...review, photoAuthorized: false }]),
  [],
);
for (const value of [
  "//evil.test",
  "/\\evil.test",
  "javascript:alert(1)",
  "data:text/html,test",
  "https://user:pass@evil.test/",
])
  assert(!safeLink(value), value);
assert(safeLink("/proposal/", true));
assert(!safeLink("https://evil.test/", true));
// Frontend content audit: JSX text nodes must not introduce editorial defaults.
const fs = require("fs");
const parser = require("@babel/parser");
const ast = parser.parse(fs.readFileSync("src/template/reviews.js", "utf8"), {
  sourceType: "module",
  plugins: ["jsx"],
});
function walk(node) {
  if (!node || typeof node !== "object") return;
  if (node.type === "JSXText")
    assert(
      !/[\p{L}\p{N}]/u.test(node.value),
      `Hardcoded JSX copy: ${node.value}`,
    );
  for (const value of Object.values(node))
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") walk(value);
}
walk(ast);
// Render the actual component with a fixture; no fixture is sent to Sanity.
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const vm = require("node:vm");
const babel = require("@babel/core");
const transpile = (file) =>
  babel.transformFileSync(file, {
    configFile: false,
    babelrc: false,
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-react",
    ],
  }).code;
function load(file, overrides = {}) {
  const mod = { exports: {} };
  vm.runInNewContext(transpile(file), {
    module: mod,
    exports: mod.exports,
    require: (id) =>
      Object.prototype.hasOwnProperty.call(overrides, id)
        ? overrides[id]
        : require(id),
    URL,
  });
  return mod.exports;
}
const locales = load("src/utils/siteLocales.js");
const component = load("src/template/reviews.js", {
  gatsby: { graphql: () => null },
  "../components/Layout/Layout": ({ children }) =>
    React.createElement("div", null, children),
  "../utils/siteLocales": locales,
  "../utils/reviewPolicy": require("../src/utils/reviewPolicy"),
  "../styles/reviews.css": {},
});
const copy = {
  hero: { heading: "CMS hero", enabled: true, description: "CMS paragraph" },
  reviewsHeading: "CMS reviews",
  allReviews: "CMS filter",
  googleLabel: "CMS source",
  externalLabel: "CMS external",
  emptyMessage: "CMS empty",
  seo: { title: "CMS SEO", description: "CMS metadata" },
};
const fixture = {
  ...review,
  rating: 5,
  originalLanguage: "en",
  photo: { asset: { _ref: "image-abc123-800x600-jpg" }, alt: "CMS photograph" },
};
const context = {
  copy,
  reviews: [fixture],
  categories: [{ _id: "category-1", name: { en: "CMS category" } }],
  sanityLanguage: "en",
  language: "en-US",
  project: "mj6f2710",
  dataset: "production",
  alternates: [{ language: "en", path: "/reviews/" }],
};
const data = {
  sanityGeneralLayout: {},
  site: { siteMetadata: { siteUrl: "https://sertuinevents.com" } },
};
const render = (ctx) =>
  renderToStaticMarkup(
    React.createElement(component.default, { data, pageContext: ctx }),
  );
const html = render(context);
assert.equal(
  html.split(`href="${url}"`).length - 1,
  2,
  "Photo and source button must share the exact URL; testimonial text is not a link",
);
assert(
  html.includes("CMS hero") &&
    html.includes("CMS paragraph") &&
    html.includes("CMS source"),
);
const updated = render({
  ...context,
  copy: {
    ...copy,
    hero: { heading: "Updated CMS heading", enabled: false },
    googleLabel: "Updated CMS source",
  },
});
assert(
  updated.includes("Updated CMS heading") &&
    updated.includes("Updated CMS source"),
);
assert(!updated.includes("CMS paragraph"));
const localized = render({
  ...context,
  sanityLanguage: "fr",
  language: "fr",
  reviews: Array.from({ length: 20 }, (_, i) => ({
    ...fixture,
    _id: `review-${i}`,
    clientName: `Customer ${i}`,
    text: "Original Spanish text",
    originalLanguage: "es",
    translation: {
      en: `English testimonial ${i}`,
      fr: `Témoignage français ${i}`,
    },
  })),
});
assert(
  localized.includes("Témoignage français 19"),
  "All reviews must exist in server HTML, including slides beyond the old page limit",
);
assert(
  !localized.includes("Original Spanish text") &&
    !localized.includes("English testimonial"),
  "Show only the page language",
);
assert(
  localized.includes('class="reviews-stars"') &&
    localized.includes('class="reviews-carousel"'),
);
const metadata = renderToStaticMarkup(
  React.createElement(component.Head, { data, pageContext: context }),
);
assert(
  metadata.includes("CMS SEO") &&
    metadata.includes("https://sertuinevents.com/reviews/"),
);
assert(
  !metadata.includes("AggregateRating") &&
    !metadata.includes('"@type":"Review"'),
);
console.log(
  "Reviews eligibility, category visibility, destination policy, SSR link synchronization, CMS edits, SEO and JSX editorial audit passed.",
);
