// Checks the wedding planning packages in Sanity: the shared price list and
// every language's package texts. Reads the public dataset, so it needs
// network access but no token. Run: node scripts/validate-wedding-packages.js
const assert = require("node:assert/strict");

const projectId = process.env.SANITY_PROJECT_ID || "mj6f2710";
const dataset = process.env.SANITY_DATASET || "production";
const query = `{
  "packages": *[_type == "weddingPackage" && !(_id in path("drafts.**"))]{ _id, name, price, southAsian, icon },
  "pages": *[_type == "weddingPlannerPage" && !(_id in path("drafts.**"))]{ language, "texts": packages[]{ title, "ref": package._ref } }
}`;

const main = async () => {
  const url = `https://${projectId}.apicdn.sanity.io/v2025-09-19/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  assert.ok(response.ok, `Sanity query failed: ${response.status}`);
  const { packages, pages } = (await response.json()).result;

  assert.ok(packages.length > 0, "No published wedding packages");
  assert.equal(packages.filter((item) => item.southAsian).length, 1, "Exactly one wedding package must be the South Asian one");
  for (const item of packages) {
    assert.ok(Number.isFinite(item.price) && item.price > 0, `${item.name}: missing price`);
    assert.ok(item.icon, `${item.name}: missing icon`);
  }
  assert.deepEqual(pages.map((page) => page.language).sort(), ["en", "es", "fr", "pt"], "Expected one Wedding Planner Page per language");
  for (const page of pages) {
    const refs = (page.texts || []).map((text) => text.ref).sort();
    assert.deepEqual(refs, packages.map((item) => item._id).sort(), `${page.language}: every package needs exactly one text`);
    for (const text of page.texts) assert.ok(text.title, `${page.language}: package ${text.ref} has no title`);
  }
  console.log(`Validated ${packages.length} wedding packages (1 South Asian) and their texts in ${pages.length} languages.`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
