const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { transformFileSync } = require("@babel/core");
const presetEnv = require("@babel/preset-env");

const loadSourceModule = (relativePath) => {
  const filename = path.resolve(__dirname, "..", relativePath);
  const transformed = transformFileSync(filename, {
    filename,
    presets: [
      [presetEnv, { targets: { node: "current" }, modules: "commonjs" }],
    ],
    sourceType: "module",
  });
  const module = { exports: {} };
  const execute = new Function(
    "require",
    "module",
    "exports",
    transformed.code,
  );
  execute(require, module, module.exports);
  return module.exports;
};

const { buildProposalPackageSchema, buildProposalSchema } = loadSourceModule(
  "src/utils/proposalSeo.js",
);
const { proposalPackageDetails } = loadSourceModule(
  "src/data/proposalPackageDetails.js",
);

const rootUrl = "https://sertuinevents.com";
const expectedPrices = new Map([
  ["infinity-love", 999],
  ["golden-whisper", 1089],
  ["amour-essence", 1099],
  ["sign-of-love", 1169],
  ["amour-by-the-sea", 1189],
  ["coral-passion", 1199],
  ["romantic-hoopa", 1239],
  ["white-serenity", 1389],
  ["romantic-dinner-marriage-proposal", 1399],
  ["cozy-love", 1489],
  ["eternal-passion", 1799],
]);

assert.equal(proposalPackageDetails.length, 11);
assert.deepEqual(
  proposalPackageDetails.map((item) => item.id),
  [...expectedPrices.keys()],
);
proposalPackageDetails.forEach((item) => {
  assert.equal(item.price, expectedPrices.get(item.id));
});

const packageCards = proposalPackageDetails.map((item) => ({
  title: item.name,
  price: item.price,
  packagePage: { urlSlug: item.id },
}));

for (const { language, prefix } of [
  { language: "en-US", prefix: "" },
  { language: "es", prefix: "/es" },
]) {
  const proposalPageUrl = `${rootUrl}${prefix}/proposal/`;
  const hubSchema = buildProposalSchema({
    siteUrl: rootUrl,
    pageUrl: proposalPageUrl,
    language,
    title: "Proposal packages",
    description: "Proposal packages in Punta Cana",
    packages: packageCards,
  });
  const hubGraph = hubSchema["@graph"];
  const catalog = hubGraph.find((node) => node["@type"] === "OfferCatalog");
  const hubService = hubGraph.find(
    (node) => node["@id"] === `${proposalPageUrl}#service`,
  );

  assert.ok(catalog);
  assert.equal(catalog.numberOfItems, 11);
  assert.equal(catalog.itemListElement.length, 11);
  assert.equal(hubService.hasOfferCatalog["@id"], catalog["@id"]);

  proposalPackageDetails.forEach((item, index) => {
    const pageUrl = `${rootUrl}${prefix}/packages/${item.id}/`;
    const hubOffer = catalog.itemListElement[index];
    assert.equal(hubOffer["@id"], `${pageUrl}#offer`);
    assert.equal(hubOffer.url, pageUrl);
    assert.equal(hubOffer.itemOffered["@id"], `${pageUrl}#service`);

    const packageSchema = buildProposalPackageSchema({
      siteUrl: rootUrl,
      pageUrl,
      proposalPageUrl,
      language,
      packageName: item.name,
      description: item.copy[language === "es" ? "es" : "en"].summary,
      price: item.price,
      images: [
        {
          url: `https://images.example.com/${item.id}.webp`,
          title: item.name,
        },
      ],
    });
    const packageGraph = packageSchema["@graph"];
    const webpage = packageGraph.find(
      (node) => node["@id"] === `${pageUrl}#webpage`,
    );
    const service = packageGraph.find(
      (node) => node["@id"] === `${pageUrl}#service`,
    );
    const offer = packageGraph.find(
      (node) => node["@id"] === `${pageUrl}#offer`,
    );
    const breadcrumb = packageGraph.find(
      (node) => node["@type"] === "BreadcrumbList",
    );

    assert.equal(webpage.isPartOf["@id"], `${proposalPageUrl}#webpage`);
    assert.equal(webpage.mainEntity["@id"], service["@id"]);
    assert.equal(service.isRelatedTo["@id"], `${proposalPageUrl}#service`);
    assert.equal(service.offers["@id"], offer["@id"]);
    assert.equal(offer["@id"], hubOffer["@id"]);
    assert.equal(offer.itemOffered["@id"], service["@id"]);
    assert.equal(offer.price, item.price);
    assert.equal(breadcrumb.itemListElement[1].item, proposalPageUrl);
    assert.equal(breadcrumb.itemListElement[2].item, pageUrl);
    assert.equal(service.image.length, 1);
  });
}

const detailsSource = fs.readFileSync(
  path.resolve(
    __dirname,
    "..",
    "src/components/ProposalComponents/ProposalPackageDetails.js",
  ),
  "utf8",
);
assert.doesNotMatch(detailsSource, /es uno de los 11 paquetes/i);
assert.doesNotMatch(
  detailsSource,
  /one of the 11 (marriage )?proposal packages/i,
);

console.log(
  "Validated the 11 shared proposal offers, localized URLs, package relationships, prices, breadcrumbs and image references at source level.",
);
