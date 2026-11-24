const assert = require("node:assert/strict"),
  fs = require("fs"),
  path = require("path"),
  vm = require("vm"),
  React = require("react"),
  babel = require("@babel/core");
const { renderToStaticMarkup: render } = require("react-dom/server");
const policy = require("../src/utils/aboutPolicy");
const pages = JSON.parse(
  fs.readFileSync(".tmp/about-local-content.json", "utf8"),
).pages;
const load = (file) => {
  const mod = { exports: {} };
  const code = babel.transformFileSync(file, {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-react",
    ],
    babelrc: false,
    configFile: false,
  }).code;
  vm.runInNewContext(code, {
    module: mod,
    exports: mod.exports,
    URL,
    require: (id) => {
      if (id.endsWith(".css")) return {};
      if (id === "gatsby") return { graphql: () => null };
      if (id.endsWith("/Layout/Layout"))
        return {
          default: ({ children }) => React.createElement("div", null, children),
          __esModule: true,
        };
      if (id.startsWith("."))
        return load(path.resolve(path.dirname(file), id + ".js"));
      return require(id);
    },
  });
  return mod.exports;
};
const template = load(path.resolve("src/template/about.js"));
const data = {
  site: { siteMetadata: { siteUrl: "https://sertuinevents.com" } },
  sanityGeneralLayout: {},
};
const context = (p) => ({
  copy: p,
  language: p.language === "en" ? "en-US" : p.language,
  sanityLanguage: p.language,
  aboutNoIndex: true,
  alternates: pages.map((p) => ({
    language: p.language,
    path: p.language === "en" ? "/about/" : `/${p.language}/about/`,
  })),
});
const html = (p) =>
  render(
    React.createElement(template.default, { data, pageContext: context(p) }),
  );
for (const p of pages) {
  policy.validateAbout(p);
  const out = html(p);
  assert.equal((out.match(/<h1/g) || []).length, 1);
  assert.equal(
    (out.match(/class="about-card(?: about-card-current)?"/g) || []).length,
    7,
  );
  assert.equal((out.match(/<button[^>]*disabled/g) || []).length, 2);
  assert.equal((out.match(/about-card-current/g) || []).length, 1);
  assert(out.includes("founders.jpeg"));
  assert(!out.includes('href="#"'));
  assert(!out.includes('target="_blank"'));
  const head = render(
    React.createElement(template.Head, { data, pageContext: context(p) }),
  );
  assert(head.includes("noindex, nofollow"));
  assert(head.includes('rel="canonical"'));
  assert(head.includes("AboutPage"));
  const graph = JSON.parse(head.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1])[
    "@graph"
  ];
  assert.equal(graph.filter((n) => n["@type"] === "Brand").length, 7);
  assert.equal(graph.filter((n) => n["@type"] === "Person").length, 2);
  assert.equal(
    graph.find((n) => n["@type"] === "Organization").name,
    "Sertuin SRL",
  );
  assert(!head.includes("AggregateRating"));
  const edit = structuredClone(p);
  edit.heading = "Owner edited heading";
  edit.brands[5].homepageUrl = "https://example.com/";
  edit.brands[5].homepageButtonLabel[p.language] = "Owner edited button";
  assert(html(edit).includes("Owner edited heading"));
  assert(html(edit).includes('href="https://example.com/"'));
  assert(html(edit).includes("Owner edited button"));
  edit.brands[5].homepageUrl = "";
  assert.equal((html(edit).match(/<button[^>]*disabled/g) || []).length, 2);
  edit.valuesEnabled = false;
  edit.directoryEnabled = false;
  assert(!html(edit).includes('class="about-values-grid"'));
  assert(!html(edit).includes('class="about-brands"'));
  edit.heading = "";
  assert.throws(() => policy.validateAbout(edit), /missing heading/);
}
for (const url of [
  "http://example.com",
  "javascript:alert(1)",
  "//example.com",
  "https://user:pass@example.com",
  "https://example.com\n",
])
  assert(!policy.httpsUrl(url));
assert(policy.httpsUrl("https://sertuinevents.com/"));
const ast = require("@babel/parser").parse(
  fs.readFileSync("src/template/about.js", "utf8"),
  { sourceType: "module", plugins: ["jsx"] },
);
function audit(n) {
  if (!n || typeof n !== "object") return;
  if (n.type === "JSXText")
    assert(!/[\p{L}\p{N}]/u.test(n.value), "Hardcoded editorial content");
  for (const v of Object.values(n))
    if (Array.isArray(v)) v.forEach(audit);
    else if (v && typeof v === "object") audit(v);
}
audit(ast);
const image = load(path.resolve("src/utils/aboutImage.js")).aboutImageAsset({
  asset: {
    url: "https://cdn.sanity.io/images/a/b/image.jpg",
    width: 1000,
    height: 2000,
  },
  crop: { left: 0.1, right: 0.1, top: 0.1, bottom: 0.1 },
});
assert.equal(image.width, 800);
assert.equal(image.height, 1600);
assert(image.url.includes("rect=100,200,800,1600"));
(async () => {
  const create = require("./create-about-pages");
  const previous = process.env.ABOUT_LOCAL_REVIEW;
  delete process.env.ABOUT_LOCAL_REVIEW;
  let calls = 0;
  await create({
    actions: { createPage: () => calls++ },
    fetchContent: async (url) => {
      assert(url.includes("perspective=published"));
      return { ok: true, json: async () => ({ result: [] }) };
    },
  });
  assert.equal(calls, 0);
  process.env.ABOUT_LOCAL_REVIEW = "1";
  process.env.CI = "true";
  await assert.rejects(
    () => create({ actions: { createPage() {} } }),
    /must not run in CI/,
  );
  delete process.env.CI;
  if (previous) process.env.ABOUT_LOCAL_REVIEW = previous;
  else delete process.env.ABOUT_LOCAL_REVIEW;
  console.log(
    "About: four-language SSR, seven cards, CMS edits, disabled URL transitions, image crop, metadata, content audit and production isolation passed.",
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
