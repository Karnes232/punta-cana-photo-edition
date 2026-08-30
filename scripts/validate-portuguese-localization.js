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
const { portugueseBlogContent } = loadSourceModule(
  "src/data/portugueseBlogContent.js",
);
const { portugueseProposalPackageContent } = loadSourceModule(
  "src/data/portugueseProposalPackageContent.js",
);
const { proposalPackageDetails } = loadSourceModule(
  "src/data/proposalPackageDetails.js",
);
const { SITE_LANGUAGES, localizedPath } = loadSourceModule(
  "src/utils/siteLocales.js",
);

assert.deepEqual(SITE_LANGUAGES, ["en-US", "es", "pt"]);
assert.equal(localizedPath("/proposal/", "pt"), "/pt/proposal/");

const publishedSlugs = [...publishedBlogSlugs].sort();
const translatedSlugs = Object.keys(portugueseBlogContent).sort();
assert.deepEqual(
  translatedSlugs,
  publishedSlugs,
  "Every published article must have exactly one Portuguese translation",
);

for (const [slug, article] of Object.entries(portugueseBlogContent)) {
  assert.ok(article.title?.trim(), `${slug}: missing Portuguese title`);
  assert.ok(
    article.description?.trim(),
    `${slug}: missing Portuguese meta description`,
  );
  assert.ok(
    article.directAnswer?.trim(),
    `${slug}: missing Portuguese direct answer`,
  );
  assert.ok(
    article.sections?.length >= 2,
    `${slug}: Portuguese article body is incomplete`,
  );
}

const packageIds = proposalPackageDetails.map((item) => item.id).sort();
assert.deepEqual(
  Object.keys(portugueseProposalPackageContent).sort(),
  packageIds,
  "Every live proposal package must have Portuguese content",
);
for (const [id, content] of Object.entries(portugueseProposalPackageContent)) {
  assert.ok(content.summary?.trim(), `${id}: missing Portuguese summary`);
  assert.ok(content.setup?.length, `${id}: missing Portuguese inclusions`);
  assert.ok(content.exclusions?.length, `${id}: missing Portuguese exclusions`);
}

const englishLocale = JSON.parse(
  fs.readFileSync(
    path.join(projectRoot, "src/locales/en-US/index.json"),
    "utf8",
  ),
);
const portugueseLocale = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "src/locales/pt/index.json"), "utf8"),
);
assert.deepEqual(
  Object.keys(portugueseLocale).sort(),
  Object.keys(englishLocale).sort(),
  "Portuguese global UI translations must cover every English key",
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
  "/pt/",
  "/pt/contact/",
  "/pt/event-planner/",
  "/pt/gender-reveal-punta-cana/",
  "/pt/proposal/",
  "/pt/punta-cana-elopement-packages/",
  "/pt/puntacana-wedding-planner/",
  "/pt/blog/",
];
const expectedPortuguesePaths = [
  ...corePaths,
  ...publishedSlugs.map((slug) => `/pt/blog/${slug}/`),
  ...packageIds.map((id) => `/pt/packages/${packageSlugs.get(id)}/`),
];
assert.equal(expectedPortuguesePaths.length, 34);
assert.equal(new Set(expectedPortuguesePaths).size, 34);

const gatsbyNodeSource = fs.readFileSync(
  path.join(projectRoot, "gatsby-node.js"),
  "utf8",
);
assert.match(gatsbyNodeSource, /pt:\s*\{\s*path:\s*["']pt["']/);
assert.match(gatsbyNodeSource, /path:\s*`\/pt\/blog\/\$\{slug\}`/);
assert.match(gatsbyNodeSource, /path:\s*`\/pt\/packages\/\$\{node\.urlSlug/);

console.log(
  `Validated ${expectedPortuguesePaths.length} Portuguese sitemap routes: ${publishedSlugs.length} articles, ${packageIds.length} proposal packages, the blog index and 7 core pages.`,
);
