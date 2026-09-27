const assert = require("node:assert/strict");
const metadata = require("../src/data/weddingGuideMetadata.json");
const bodies = require("../src/data/weddingGuideBodies.json");
const { publishedBlogSlugs } = require("../src/data/publishedBlogSlugs");
const langs = ["en-US", "es", "pt", "fr"];
assert.equal(Object.keys(metadata).length, 50);
assert.deepEqual(Object.keys(bodies), Object.keys(metadata));
let count = 0, links = 0;
for (const [slug, versions] of Object.entries(metadata)) {
  assert(publishedBlogSlugs.has(slug));
  assert.deepEqual(Object.keys(versions).sort(), [...langs].sort());
  for (const lang of langs) {
    const a = versions[lang], html = bodies[slug][lang];
    const prefix = lang === "en-US" ? "" : "/" + lang;
    assert(a.title && a.seoTitle && a.description && a.author);
    assert(html.length > 1500 && (html.match(/<h2>/g) || []).length >= 3, slug + ": incomplete body");
    assert(!/<h1|<script|javascript:|\son\w+=/i.test(html), slug + ": unsafe markup or duplicate H1");
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    assert.equal(hrefs.filter(h => h === `https://sertuinevents.com${prefix}/puntacana-wedding-planner/`).length, 1);
    for (const href of hrefs) {
      if (!href.startsWith("https://sertuinevents.com/")) continue;
      const path = new URL(href).pathname;
      assert(path.startsWith(prefix + "/"), slug + ": wrong language link");
      const match = path.match(/\/blog\/([^/]+)\//);
      if (match) { assert(publishedBlogSlugs.has(match[1]), slug + ": unknown blog target"); links++; }
    }
    count++;
  }
}
assert.equal(count, 200);
console.log(`Wedding guides: ${count} complete versions; localized commercial links and ${links} valid article links.`);
