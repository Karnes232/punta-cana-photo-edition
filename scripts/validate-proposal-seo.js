const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rootUrl = "https://sertuinevents.com";
const publicDir = path.resolve(__dirname, "..", "public");
// Packages, names and form labels come from Sanity's public dataset (network
// access, no token), so a name translated in the Studio is expected here too.
const projectId = process.env.SANITY_PROJECT_ID || "mj6f2710";
const dataset = process.env.SANITY_DATASET || "production";
const query = `{
  "packages": *[_type == "proposalPackage" && !(_id in path("drafts.**"))] | order(price asc){ _id, price, "slug": slug.current },
  "pages": *[_type == "proposalPackagePage" && !(_id in path("drafts.**"))]{ language, "ref": package._ref, name },
  "texts": *[_type == "proposalPackageTexts" && !(_id in path("drafts.**"))]{ language, formTitle, formSubmitLabel }
}`;
const sanityLanguage = {
  "en-US": "en",
  es: "es",
  "pt-BR": "pt",
  "fr-FR": "fr",
};
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const routeFile = (route) =>
  path.join(publicDir, route.replace(/^\//, ""), "index.html");

const readRoute = (route) => {
  const filename = routeFile(route);
  assert.ok(fs.existsSync(filename), `Missing built route: ${route}`);
  return fs.readFileSync(filename, "utf8");
};

const schemasFromHtml = (html) => {
  const schemas = [];
  const scriptPattern =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = scriptPattern.exec(html))) {
    schemas.push(JSON.parse(match[1]));
  }

  return schemas;
};

const graphFromRoute = (route) => {
  const html = readRoute(route);
  const schema = schemasFromHtml(html).find((item) =>
    Array.isArray(item?.["@graph"]),
  );
  assert.ok(schema, `Missing JSON-LD graph: ${route}`);
  return { html, graph: schema["@graph"] };
};

const hasType = (node, type) =>
  node?.["@type"] === type ||
  (Array.isArray(node?.["@type"]) && node["@type"].includes(type));

const findNode = (graph, type, id) => {
  const node = graph.find(
    (item) => hasType(item, type) && (!id || item["@id"] === id),
  );
  assert.ok(node, `Missing ${type}${id ? ` ${id}` : ""}`);
  return node;
};

const validateHub = ({ language, prefix, expectedPackages }) => {
  const route = `${prefix}/proposal/`.replace(/^\/\//, "/");
  const pageUrl = `${rootUrl}${route}`;
  const { html, graph } = graphFromRoute(route);
  const webpage = findNode(graph, "WebPage", `${pageUrl}#webpage`);
  const service = findNode(graph, "Service", `${pageUrl}#service`);
  const catalog = findNode(graph, "OfferCatalog", `${pageUrl}#offer-catalog`);

  assert.doesNotMatch(
    html,
    /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i,
    `${route} must remain indexable`,
  );

  assert.equal(webpage.mainEntity["@id"], service["@id"]);
  assert.equal(service.hasOfferCatalog["@id"], catalog["@id"]);
  assert.equal(catalog.numberOfItems, expectedPackages.length);
  assert.equal(catalog.itemListElement.length, expectedPackages.length);

  expectedPackages.forEach(([slug, name, price], index) => {
    const packageRoute = `${prefix}/packages/${slug}/`.replace(/^\/\//, "/");
    const packageUrl = `${rootUrl}${packageRoute}`;
    const offer = catalog.itemListElement[index];

    assert.equal(offer["@id"], `${packageUrl}#offer`);
    assert.equal(offer.url, packageUrl);
    assert.equal(offer.name, name);
    assert.equal(Number(offer.price), price);
    assert.equal(offer.priceCurrency, "USD");
    assert.equal(offer.itemOffered["@id"], `${packageUrl}#service`);
    assert.match(html, new RegExp(`href=["']${packageRoute}["']`));
  });

  assert.doesNotMatch(html, /ocean-of-love/i);
  return { language, route, pageUrl };
};

const validatePackage = ({ language, prefix, hub, expectedPackage, texts }) => {
  const [slug, name, price] = expectedPackage;
  const expectedName = name;
  const route = `${prefix}/packages/${slug}/`.replace(/^\/\//, "/");
  const pageUrl = `${rootUrl}${route}`;
  const { html, graph } = graphFromRoute(route);
  const webpage = findNode(graph, "WebPage", `${pageUrl}#webpage`);
  const service = findNode(graph, "Service", `${pageUrl}#service`);
  const offer = findNode(graph, "Offer", `${pageUrl}#offer`);
  const breadcrumb = findNode(graph, "BreadcrumbList", `${pageUrl}#breadcrumb`);
  const images = graph.filter((node) => hasType(node, "ImageObject"));

  assert.match(
    html,
    /<meta[^>]+name=["']robots["'][^>]+content=["']noindex, follow["']/i,
    `${route} must be noindex, follow`,
  );

  assert.equal(webpage.name, expectedName);
  assert.equal(webpage.inLanguage, language);
  assert.equal(webpage.isPartOf["@id"], `${hub.pageUrl}#webpage`);
  assert.equal(webpage.mainEntity["@id"], service["@id"]);
  assert.equal(service.isRelatedTo["@id"], `${hub.pageUrl}#service`);
  assert.equal(service.offers["@id"], offer["@id"]);
  assert.equal(service.provider["@id"], `${rootUrl}/#organization`);
  assert.equal(offer.itemOffered["@id"], service["@id"]);
  assert.equal(offer.url, pageUrl);
  assert.equal(Number(offer.price), price);
  assert.equal(offer.priceCurrency, "USD");
  assert.equal(breadcrumb.itemListElement.length, 3);
  assert.equal(breadcrumb.itemListElement[1].item, hub.pageUrl);
  assert.equal(breadcrumb.itemListElement[2].item, pageUrl);
  assert.ok(images.length > 0, `${name} has no ImageObject nodes`);
  assert.equal(service.image.length, images.length);

  assert.match(html, new RegExp(`href=["']${hub.route}["']`));
  assert.match(
    html,
    new RegExp(
      `<h3[^>]*package-booking-heading[^>]*>\\s*${escapeRegExp(texts.formTitle)}\\s*</h3>`,
    ),
  );
  assert.match(
    html,
    new RegExp(
      `<button[^>]*type=["']submit["'][^>]*>\\s*${escapeRegExp(texts.formSubmitLabel)}\\s*</button>`,
    ),
  );
  assert.doesNotMatch(html, /es uno de los 11 paquetes/i);
  assert.doesNotMatch(html, /one of the 11 (marriage )?proposal packages/i);
};

const readXmlFiles = (directory) =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) return readXmlFiles(filename);
      return entry.isFile() && entry.name.endsWith(".xml")
        ? [fs.readFileSync(filename, "utf8")]
        : [];
    })
    .join("\n");

const locales = [
  { language: "en-US", prefix: "" },
  { language: "es", prefix: "/es" },
  { language: "pt-BR", prefix: "/pt" },
  { language: "fr-FR", prefix: "/fr" },
];

const main = async () => {
  const url = `https://${projectId}.apicdn.sanity.io/v2025-09-19/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  assert.ok(response.ok, `Sanity query failed: ${response.status}`);
  const { packages, pages, texts } = (await response.json()).result;
  assert.equal(packages.length, 11);
  const expectedFor = (language) =>
    packages.map((item) => {
      const page = pages.find(
        (candidate) =>
          candidate.ref === item._id &&
          candidate.language === sanityLanguage[language],
      );
      assert.ok(page?.name, `${item.slug}: no ${language} Package Page`);
      return [item.slug, page.name, item.price];
    });

  for (const locale of locales) {
    const expectedPackages = expectedFor(locale.language);
    const localeTexts = texts.find(
      (item) => item.language === sanityLanguage[locale.language],
    );
    assert.ok(
      localeTexts?.formTitle && localeTexts?.formSubmitLabel,
      `${locale.language}: missing Package Page Texts form labels`,
    );
    const hub = validateHub({ ...locale, expectedPackages });
    expectedPackages.forEach((expectedPackage) =>
      validatePackage({ ...locale, hub, expectedPackage, texts: localeTexts }),
    );
  }

  const sitemapXml = readXmlFiles(publicDir);
  for (const { prefix } of locales) {
    const proposalUrl = `${rootUrl}${prefix}/proposal/`;
    assert.match(sitemapXml, new RegExp(`<loc>${proposalUrl}</loc>`));

    packages.forEach(({ slug }) => {
      const packageUrl = `${rootUrl}${prefix}/packages/${slug}/`;
      assert.doesNotMatch(sitemapXml, new RegExp(`<loc>${packageUrl}</loc>`));
    });
  }
  assert.doesNotMatch(sitemapXml, /ocean-of-love/i);

  console.log(
    `Validated ${packages.length} proposal offers in English, Spanish, Portuguese and French, their noindex directives, package schemas, breadcrumbs, images and sitemap exclusion.`,
  );
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
