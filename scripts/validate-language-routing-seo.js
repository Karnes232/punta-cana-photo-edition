#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const publicDir = path.join(__dirname, "..", "public");
const sourceRoot = path.join(__dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(publicDir, relativePath), "utf8");
const page = (relativePath) =>
  read(path.join(relativePath, "index.html")).replace(/\\/g, "");
const visibleText = (html) =>
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#xA0;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

const spanishWedding = page("es/puntacana-wedding-planner");
const spanishGenderReveal = page("es/gender-reveal-punta-cana");
const spanishElopement = page("es/punta-cana-elopement-packages");
const spanishHome = page("es");
const portugueseWedding = page("pt/puntacana-wedding-planner");
const portugueseGenderReveal = page("pt/gender-reveal-punta-cana");
const portugueseElopement = page("pt/punta-cana-elopement-packages");
const portugueseHome = page("pt");
const frenchWedding = page("fr/puntacana-wedding-planner");
const frenchGenderReveal = page("fr/gender-reveal-punta-cana");
const frenchElopement = page("fr/punta-cana-elopement-packages");
const frenchHome = page("fr");
const gatsbyConfig = fs.readFileSync(
  path.join(sourceRoot, "gatsby-config.js"),
  "utf8",
);

assert.match(
  gatsbyConfig,
  /resolve:\s*["'`]gatsby-plugin-react-i18next["'`][\s\S]*?redirect:\s*false/,
);

assert.match(
  spanishWedding,
  /<title[^>]*>Planificación de Bodas en Punta Cana \| Servicio Completo<\/title>/i,
);
assert.doesNotMatch(
  visibleText(spanishWedding),
  /\bwedding (?:planner|planning)\b/i,
);

assert.match(
  spanishGenderReveal,
  /<title[^>]*>Revelación de Género en Punta Cana \| Evento a Medida<\/title>/i,
);
assert.doesNotMatch(visibleText(spanishGenderReveal), /\bgender\s*reveal/i);

assert.match(
  spanishElopement,
  /<title[^>]*>Boda Íntima en Punta Cana \| Paquetes Desde US\$999<\/title>/i,
);
assert.doesNotMatch(visibleText(spanishElopement), /\belopements?\b/i);

for (const spanishPage of [
  spanishHome,
  spanishWedding,
  spanishGenderReveal,
  spanishElopement,
]) {
  const copy = visibleText(spanishPage);
  assert.doesNotMatch(copy, /\bAll content Copyright\b/i);
  assert.doesNotMatch(copy, /\bPaquetes de elopements?\b/i);
}
assert.doesNotMatch(visibleText(spanishHome), /\belopements?\b/i);

assert.match(
  portugueseWedding,
  /<title[^>]*>Wedding Planner em Punta Cana \| Planejamento Completo<\/title>/i,
);
assert.match(
  portugueseGenderReveal,
  /<title[^>]*>Chá Revelação em Punta Cana \| Planejamento Personalizado<\/title>/i,
);
assert.match(
  portugueseElopement,
  /<title[^>]*>Elopement em Punta Cana \| Pacotes a Partir de US\$\s?999<\/title>/i,
);
for (const portuguesePage of [
  portugueseHome,
  portugueseWedding,
  portugueseGenderReveal,
  portugueseElopement,
]) {
  assert.match(portuguesePage, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(
    portuguesePage,
    /hreflang=["']pt-BR["'][^>]+href=["']https:\/\/sertuinevents\.com\/pt\//i,
  );
}

assert.match(
  frenchWedding,
  /<title[^>]*>Wedding Planner à Punta Cana \| Organisation Complète<\/title>/i,
);
assert.match(
  frenchGenderReveal,
  /<title[^>]*>Gender Reveal à Punta Cana \| Organisation Sur Mesure<\/title>/i,
);
assert.match(
  frenchElopement,
  /<title[^>]*>Elopement à Punta Cana \| Forfaits Dès 999 USD<\/title>/i,
);
for (const frenchPage of [
  frenchHome,
  frenchWedding,
  frenchGenderReveal,
  frenchElopement,
]) {
  assert.match(frenchPage, /<html[^>]+lang=["']fr-FR["']/i);
  assert.match(
    frenchPage,
    /hreflang=["']fr-FR["'][^>]+href=["']https:\/\/sertuinevents\.com\/fr\//i,
  );
}
assert.doesNotMatch(
  visibleText(frenchHome),
  /\b(?:We listen|We organize|We take responsibility|Planning an event is not simply)\b/i,
);

const southAsianHeadingPattern =
  /south[\s-]*asian|sur\s+de\s+asia|sudeste[\s-]*asi[aá]tic[oa]s?|sud[\s-]*asiati(?:que|ques)|sul[\s-]*asi[aá]tic[oa]s?|indian|sikh/i;
const countSouthAsianPackageHeadings = (html) =>
  [
    ...html.matchAll(
      /<h3\b[^>]*data-wedding-package-title[^>]*>([\s\S]*?)<\/h3>/gi,
    ),
  ]
    .map((match) => visibleText(match[1]))
    .filter((heading) => southAsianHeadingPattern.test(heading)).length;

assert.equal(
  countSouthAsianPackageHeadings(spanishWedding),
  1,
  "Spanish wedding planning must show one South Asian package card",
);
assert.equal(
  countSouthAsianPackageHeadings(portugueseWedding),
  1,
  "Portuguese wedding planning must show one South Asian package card",
);
assert.equal(
  countSouthAsianPackageHeadings(frenchWedding),
  1,
  "French wedding planning must show one South Asian package card",
);

for (const [homePath, prefix] of [
  ["index.html", ""],
  [path.join("es", "index.html"), "/es"],
  [path.join("pt", "index.html"), "/pt"],
  [path.join("fr", "index.html"), "/fr"],
]) {
  const home = read(homePath);
  assert.match(
    home,
    new RegExp(`href=["']${prefix}/puntacana-wedding-planner/`),
  );
  assert.match(
    home,
    new RegExp(`href=["']${prefix}/gender-reveal-punta-cana/`),
  );
  assert.match(
    home,
    new RegExp(`href=["']${prefix}/punta-cana-elopement-packages/`),
  );
}

const sitemap = read("sitemap-0.xml");
for (const url of [
  "https://sertuinevents.com/",
  "https://sertuinevents.com/es/",
  "https://sertuinevents.com/gender-reveal-punta-cana/",
  "https://sertuinevents.com/es/gender-reveal-punta-cana/",
  "https://sertuinevents.com/puntacana-wedding-planner/",
  "https://sertuinevents.com/es/puntacana-wedding-planner/",
  "https://sertuinevents.com/punta-cana-elopement-packages/",
  "https://sertuinevents.com/es/punta-cana-elopement-packages/",
]) {
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(
    sitemap,
    new RegExp(
      `<loc>${escapedUrl}</loc>[\\s\\S]*?<lastmod>2026-08-29(?:T00:00:00\\.000Z)?</lastmod>`,
    ),
  );
}

for (const url of [
  "https://sertuinevents.com/fr/",
  "https://sertuinevents.com/fr/gender-reveal-punta-cana/",
  "https://sertuinevents.com/fr/puntacana-wedding-planner/",
  "https://sertuinevents.com/fr/punta-cana-elopement-packages/",
]) {
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(
    sitemap,
    new RegExp(
      `<loc>${escapedUrl}</loc>[\\s\\S]*?<lastmod>2026-08-30(?:T00:00:00\\.000Z)?</lastmod>`,
    ),
  );
}

for (const url of [
  "https://sertuinevents.com/pt/",
  "https://sertuinevents.com/pt/gender-reveal-punta-cana/",
  "https://sertuinevents.com/pt/puntacana-wedding-planner/",
  "https://sertuinevents.com/pt/punta-cana-elopement-packages/",
]) {
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(
    sitemap,
    new RegExp(
      `<loc>${escapedUrl}</loc>[\\s\\S]*?<lastmod>2026-08-30(?:T00:00:00\\.000Z)?</lastmod>`,
    ),
  );
}

console.log(
  "Validated Spanish, Portuguese and French language separation, Home service links, hreflang and accurate sitemap modification dates.",
);
