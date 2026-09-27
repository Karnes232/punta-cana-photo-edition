const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { transformFileSync } = require("@babel/core");
const presetEnv = require("@babel/preset-env");

const sourceModuleCache = new Map();
const loadSourceModule = (modulePath) => {
  const requestedPath = path.isAbsolute(modulePath)
    ? modulePath
    : path.resolve(__dirname, "..", modulePath);
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

const { buildProposalPackageSchema, buildProposalSchema } = loadSourceModule(
  "src/utils/proposalSeo.js",
);
const { retiredPackageSlugs } = require("../src/data/retiredPackageSlugs");

// The packages come from Sanity's public dataset (network access, no token).
const projectId = process.env.SANITY_PROJECT_ID || "mj6f2710";
const dataset = process.env.SANITY_DATASET || "production";
const query = `{
  "packages": *[_type == "proposalPackage" && !(_id in path("drafts.**"))] | order(price asc){ _id, name, price, "slug": slug.current },
  "pages": *[_type == "proposalPackagePage" && !(_id in path("drafts.**"))]{ language, "ref": package._ref, name, summary }
}`;

const rootUrl = "https://sertuinevents.com";

const main = async () => {
  const url = `https://${projectId}.apicdn.sanity.io/v2025-09-19/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  assert.ok(response.ok, `Sanity query failed: ${response.status}`);
  const { packages, pages } = (await response.json()).result;

  assert.equal(packages.length, 11);
  assert.equal(
    new Set(packages.map((item) => item.slug)).size,
    11,
    "Package addresses must be unique",
  );
  packages.forEach((item) => {
    assert.ok(
      Number.isFinite(item.price) && item.price > 0,
      `${item.name}: missing price`,
    );
    assert.ok(item.slug, `${item.name}: missing address`);
    assert.equal(
      retiredPackageSlugs.has(item.slug),
      false,
      `${item.slug} is a retired address`,
    );
  });
  const pageFor = (item, language) =>
    pages.find((page) => page.ref === item._id && page.language === language);

  for (const { language, sanityLanguage, prefix } of [
    { language: "en-US", sanityLanguage: "en", prefix: "" },
    { language: "es", sanityLanguage: "es", prefix: "/es" },
    { language: "pt", sanityLanguage: "pt", prefix: "/pt" },
    { language: "fr", sanityLanguage: "fr", prefix: "/fr" },
  ]) {
    for (const item of packages) {
      const page = pageFor(item, sanityLanguage);
      assert.ok(
        page?.name && page?.summary,
        `${item.slug} ${sanityLanguage}: missing Package Page name or summary`,
      );
    }
    const packageCards = packages.map((item) => ({
      title: pageFor(item, sanityLanguage).name,
      price: item.price,
      packagePage: { urlSlug: item.slug },
    }));
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

    packages.forEach((item, index) => {
      const page = pageFor(item, sanityLanguage);
      const pageUrl = `${rootUrl}${prefix}/packages/${item.slug}/`;
      const hubOffer = catalog.itemListElement[index];
      assert.equal(hubOffer["@id"], `${pageUrl}#offer`);
      assert.equal(hubOffer.url, pageUrl);
      assert.equal(hubOffer.itemOffered["@id"], `${pageUrl}#service`);

      const packageSchema = buildProposalPackageSchema({
        siteUrl: rootUrl,
        pageUrl,
        proposalPageUrl,
        language,
        packageName: page.name,
        description: page.summary,
        price: item.price,
        images: [
          {
            url: `https://images.example.com/${item.slug}.webp`,
            title: page.name,
          },
        ],
        faqs: [
          {
            title: "How does booking work?",
            content: { content: "Choose a package and request a date." },
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
      const faqPage = packageGraph.find((node) => node["@type"] === "FAQPage");

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
      assert.equal(
        faqPage.inLanguage,
        language === "pt" ? "pt-BR" : language === "fr" ? "fr-FR" : language,
      );
      assert.equal(faqPage.mainEntity.length, 1);
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

  const packageTemplateSource = fs.readFileSync(
    path.resolve(__dirname, "..", "src/template/package.js"),
    "utf8",
  );
  const gatsbyConfigSource = fs.readFileSync(
    path.resolve(__dirname, "..", "gatsby-config.js"),
    "utf8",
  );
  assert.match(packageTemplateSource, /robots="noindex, follow"/);
  assert.match(gatsbyConfigSource, /!isPackageDetailPath\(page\.path\)/);

  console.log(
    "Validated the 11 shared proposal offers in four languages, localized URLs, noindex policy, package relationships, prices, breadcrumbs and image references at source level.",
  );
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
