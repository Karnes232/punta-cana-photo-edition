const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rootUrl = "https://sertuinevents.com";
const publicDir = path.resolve(__dirname, "..", "public");
const expectedPackages = [
  ["infinity-love-proposal", "Infinity Love", 999],
  ["golden-whisper", "Golden Whisper", 1089],
  ["amour-essence", "Amour Essence", 1099],
  ["sign-of-love-proposal", "Sign of Love", 1169],
  ["amour-by-the-sea", "Amour by the Sea", 1189],
  ["coral-passion", "Coral Passion", 1199],
  ["romantic-huppa-proposal", "Romantic Hoopa", 1239],
  ["white-serenity-proposal", "White Serenity", 1389],
  [
    "romantic-dinner-marriage-proposal",
    "Romantic Dinner Marriage Proposal",
    1399,
  ],
  ["cozy-love", "Cozy Love", 1489],
  ["eternal-passion", "Eternal Passion", 1799],
];

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

const validateHub = ({ language, prefix }) => {
  const route = `${prefix}/proposal/`.replace(/^\/\//, "/");
  const pageUrl = `${rootUrl}${route}`;
  const { html, graph } = graphFromRoute(route);
  const webpage = findNode(graph, "WebPage", `${pageUrl}#webpage`);
  const service = findNode(graph, "Service", `${pageUrl}#service`);
  const catalog = findNode(graph, "OfferCatalog", `${pageUrl}#offer-catalog`);

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

const validatePackage = ({ language, prefix, hub, expectedPackage }) => {
  const [slug, name, price] = expectedPackage;
  const route = `${prefix}/packages/${slug}/`.replace(/^\/\//, "/");
  const pageUrl = `${rootUrl}${route}`;
  const { html, graph } = graphFromRoute(route);
  const webpage = findNode(graph, "WebPage", `${pageUrl}#webpage`);
  const service = findNode(graph, "Service", `${pageUrl}#service`);
  const offer = findNode(graph, "Offer", `${pageUrl}#offer`);
  const breadcrumb = findNode(graph, "BreadcrumbList", `${pageUrl}#breadcrumb`);
  const images = graph.filter((node) => hasType(node, "ImageObject"));

  assert.equal(webpage.name, name);
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
      `<h3[^>]*package-booking-heading[^>]*>\\s*${
        language === "es" ? "Solicita tu propuesta" : "Request your proposal"
      }\\s*</h3>`,
    ),
  );
  assert.match(
    html,
    new RegExp(
      `<button[^>]*type=["']submit["'][^>]*>\\s*${
        language === "es"
          ? "Enviar solicitud de propuesta"
          : "Send proposal request"
      }\\s*</button>`,
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
];

for (const locale of locales) {
  const hub = validateHub(locale);
  expectedPackages.forEach((expectedPackage) =>
    validatePackage({ ...locale, hub, expectedPackage }),
  );
}

const sitemapXml = readXmlFiles(publicDir);
for (const { prefix } of locales) {
  const proposalUrl = `${rootUrl}${prefix}/proposal/`;
  assert.match(sitemapXml, new RegExp(`<loc>${proposalUrl}</loc>`));

  expectedPackages.forEach(([slug]) => {
    const packageUrl = `${rootUrl}${prefix}/packages/${slug}/`;
    assert.match(sitemapXml, new RegExp(`<loc>${packageUrl}</loc>`));
  });
}
assert.doesNotMatch(sitemapXml, /ocean-of-love/i);

console.log(
  `Validated ${expectedPackages.length} proposal offers in English and Spanish, their package schemas, breadcrumbs, images and sitemap entries.`,
);
