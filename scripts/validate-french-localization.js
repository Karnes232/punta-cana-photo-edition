const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { transformFileSync } = require("@babel/core");
const presetEnv = require("@babel/preset-env");

const projectRoot = path.resolve(__dirname, "..");
const sourceModuleCache = new Map();
const loadSourceModule = (modulePath) => {
  const requestedPath = path.isAbsolute(modulePath)
    ? modulePath
    : path.resolve(projectRoot, modulePath);
  const filename = path.extname(requestedPath)
    ? requestedPath
    : `${requestedPath}.js`;
  if (sourceModuleCache.has(filename)) {
    return sourceModuleCache.get(filename).exports;
  }

  const transformed = transformFileSync(filename, {
    filename,
    presets: [
      [presetEnv, { targets: { node: "current" }, modules: "commonjs" }],
    ],
    sourceType: "module",
  });
  const module = { exports: {} };
  sourceModuleCache.set(filename, module);
  const localRequire = (request) =>
    request.startsWith(".")
      ? loadSourceModule(path.resolve(path.dirname(filename), request))
      : require(request);
  const execute = new Function(
    "require",
    "module",
    "exports",
    transformed.code,
  );
  execute(localRequire, module, module.exports);
  return module.exports;
};

const { publishedBlogSlugs } = require("../src/data/publishedBlogSlugs");
const { frenchBlogContent } = loadSourceModule("src/data/frenchBlogContent.js");
const { frenchProposalPackageContent } = loadSourceModule(
  "src/data/frenchProposalPackageContent.js",
);
const { proposalPackageDetails } = loadSourceModule(
  "src/data/proposalPackageDetails.js",
);
const { SITE_LANGUAGES, localizedPath } = loadSourceModule(
  "src/utils/siteLocales.js",
);

assert.deepEqual(SITE_LANGUAGES, ["en-US", "es", "pt", "fr"]);
assert.equal(localizedPath("/proposal/", "fr"), "/fr/proposal/");

const publishedSlugs = [...publishedBlogSlugs].sort();
assert.deepEqual(
  Object.keys(frenchBlogContent).sort(),
  publishedSlugs,
  "Every published article must have exactly one French translation",
);

for (const [slug, article] of Object.entries(frenchBlogContent)) {
  const seoTitle = article.seoTitle || article.title;
  assert.ok(article.title?.trim(), `${slug}: missing French title`);
  assert.ok(
    article.description?.trim(),
    `${slug}: missing French meta description`,
  );
  assert.ok(
    article.directAnswer?.trim(),
    `${slug}: missing French direct answer`,
  );
  assert.ok(
    article.sections?.length >= 2,
    `${slug}: French article body is incomplete`,
  );
  assert.ok(
    seoTitle.length <= 65,
    `${slug}: French SEO title exceeds 65 characters`,
  );
  assert.ok(
    article.description.length >= 110 && article.description.length <= 165,
    `${slug}: French meta description must contain 110–165 characters`,
  );
}

const packageIds = proposalPackageDetails.map((item) => item.id).sort();
assert.deepEqual(
  Object.keys(frenchProposalPackageContent).sort(),
  packageIds,
  "Every live proposal package must have French content",
);
for (const [id, content] of Object.entries(frenchProposalPackageContent)) {
  assert.ok(content.summary?.trim(), `${id}: missing French summary`);
  assert.ok(content.setup?.length, `${id}: missing French inclusions`);
  assert.ok(content.exclusions?.length, `${id}: missing French exclusions`);
}

const englishLocale = JSON.parse(
  fs.readFileSync(
    path.join(projectRoot, "src/locales/en-US/index.json"),
    "utf8",
  ),
);
const frenchLocale = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "src/locales/fr/index.json"), "utf8"),
);
assert.deepEqual(
  Object.keys(frenchLocale).sort(),
  Object.keys(englishLocale).sort(),
  "French global UI translations must cover every English key",
);

const packageSlugs = new Map([
  ["infinity-love", "infinity-love-proposal"],
  ["golden-whisper", "golden-whisper"],
  ["amour-essence", "amour-essence"],
  ["sign-of-love", "sign-of-love-proposal"],
  ["amour-by-the-sea", "amour-by-the-sea"],
  ["coral-passion", "coral-passion"],
  ["romantic-hoopa", "romantic-huppa-proposal"],
  ["white-serenity", "white-serenity-proposal"],
  ["romantic-dinner-marriage-proposal", "romantic-dinner-marriage-proposal"],
  ["cozy-love", "cozy-love"],
  ["eternal-passion", "eternal-passion"],
]);
const corePaths = [
  "/fr/",
  "/fr/contact/",
  "/fr/event-planner/",
  "/fr/gender-reveal-punta-cana/",
  "/fr/proposal/",
  "/fr/punta-cana-elopement-packages/",
  "/fr/puntacana-wedding-planner/",
  "/fr/blog/",
];
const expectedFrenchPaths = [
  ...corePaths,
  ...publishedSlugs.map((slug) => `/fr/blog/${slug}/`),
  ...packageIds.map((id) => `/fr/packages/${packageSlugs.get(id)}/`),
];
assert.equal(expectedFrenchPaths.length, 34);
assert.equal(new Set(expectedFrenchPaths).size, 34);

const gatsbyNodeSource = fs.readFileSync(
  path.join(projectRoot, "gatsby-node.js"),
  "utf8",
);
assert.match(gatsbyNodeSource, /fr:\s*\{\s*path:\s*["']fr["']/);
assert.match(gatsbyNodeSource, /\["pt",\s*"fr"\]\.forEach/);
assert.match(
  gatsbyNodeSource,
  /path:\s*`\/\$\{derivedLanguage\}\/blog\/\$\{slug\}`/,
);
assert.match(
  gatsbyNodeSource,
  /path:\s*`\/\$\{derivedLanguage\}\/packages\/\$\{node\.urlSlug/,
);

console.log(
  `Validated ${expectedFrenchPaths.length} French sitemap routes: ${publishedSlugs.length} articles, ${packageIds.length} proposal packages, the blog index and 7 core pages.`,
);
