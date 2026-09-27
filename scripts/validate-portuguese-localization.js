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

const { SITE_LANGUAGES, localizedPath } = loadSourceModule(
  "src/utils/siteLocales.js",
);

assert.deepEqual(SITE_LANGUAGES, ["en-US", "es", "pt", "fr"]);
assert.equal(localizedPath("/proposal/", "pt"), "/pt/proposal/");

// Proposal package pages live in Sanity; validate-proposal-schema-source.js
// checks that every package has a Portuguese name and summary.

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
const expectedPortuguesePaths = corePaths;
assert.equal(expectedPortuguesePaths.length, 8);
assert.equal(new Set(expectedPortuguesePaths).size, 8);

const gatsbyNodeSource = fs.readFileSync(
  path.join(projectRoot, "gatsby-node.js"),
  "utf8",
);
assert.match(gatsbyNodeSource, /pt:\s*\{\s*path:\s*["']pt["']/);
assert.match(gatsbyNodeSource, /allSanityProposalPackagePage/);
assert.match(
  gatsbyNodeSource,
  /path:\s*`\$\{langPrefix\}\/packages\/\$\{slug\}`/,
);

console.log(
  `Validated ${expectedPortuguesePaths.length} Portuguese routes: the blog index and 7 core pages (guide and package pages come from Sanity; see validate-knowledge-graph.js and validate-proposal-schema-source.js).`,
);
