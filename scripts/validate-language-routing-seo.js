#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const publicDir = path.join(__dirname, "..", "public");
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

for (const [homePath, prefix] of [
  ["index.html", ""],
  [path.join("es", "index.html"), "/es"],
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
      `<loc>${escapedUrl}</loc>[\\s\\S]*?<lastmod>2026-08-29</lastmod>`,
    ),
  );
}

console.log(
  "Validated Spanish-language separation, Home service links and accurate sitemap modification dates.",
);
