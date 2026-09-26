// Checks the published blog guides in Sanity: the topic map, every language's
// text and the editorial rules. Reads the public dataset, so it needs network
// access but no token. Run: node scripts/validate-knowledge-graph.js
const assert = require("node:assert/strict");
const { retiredBlogSlugs } = require("../src/data/retiredBlogRedirects");

const projectId = process.env.SANITY_PROJECT_ID || "mj6f2710";
const dataset = process.env.SANITY_DATASET || "production";
const languages = ["en", "es", "pt", "fr"];
const query = `{
  "guides": *[_type == "blogGuide" && !(_id in path("drafts.**"))]{
    _id, "slug": slug.current, "category": category->key,
    "related": related[]._ref, "next": next._ref, heroImage, updatedAt
  },
  "posts": *[_type == "blogPost" && !(_id in path("drafts.**"))]{
    _id, language, "guide": guide._ref, title, description, directAnswer, heroAlt,
    sections, faqs, authorName, reviewedAt
  }
}`;

const main = async () => {
  const url = `https://${projectId}.apicdn.sanity.io/v2025-09-19/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  assert.ok(response.ok, `Sanity query failed: ${response.status}`);
  const { guides, posts } = (await response.json()).result;
  const ids = new Set(guides.map((guide) => guide._id));

  assert.ok(guides.length > 0, "No published blog guides");
  assert.equal(new Set(guides.map((g) => g.slug)).size, guides.length, "Guide addresses must be unique");
  for (const guide of guides) {
    const name = guide.slug || guide._id;
    assert.match(guide.slug || "", /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${name}: invalid address`);
    assert.equal(retiredBlogSlugs.has(guide.slug), false, `${name}: reuses a retired address`);
    assert.ok(guide.category, `${name}: missing event type`);
    assert.ok(guide.heroImage?.asset && guide.updatedAt, `${name}: missing photo or last-updated date`);
    assert.ok(guide.related?.length, `${name}: missing related guides`);
    for (const target of guide.related) {
      assert.ok(ids.has(target), `${name}: related guide ${target} is not published`);
      assert.notEqual(target, guide._id, `${name}: related to itself`);
    }
    assert.ok(guides.some((other) => other.related?.includes(guide._id)), `${name}: no other guide links to it`);
    if (guide.next) assert.ok(guide.related.includes(guide.next), `${name}: next guide must be related`);

    for (const language of languages) {
      const matches = posts.filter((post) => post.guide === guide._id && post.language === language);
      assert.equal(matches.length, 1, `${name}: expected one ${language} text, found ${matches.length}`);
      const article = matches[0];
      assert.ok(article.title && article.description && article.directAnswer && article.heroAlt, `${name} ${language}: missing introduction fields`);
      assert.ok(article.sections?.length >= 4, `${name} ${language}: fewer than 4 sections`);
      for (const section of article.sections) {
        assert.ok(
          section.heading && (section.paragraphs?.length || section.bullets?.length || section.steps?.length || section.sources?.length),
          `${name} ${language}: section "${section.heading}" is empty`,
        );
      }
      assert.ok(article.reviewedAt, `${name} ${language}: missing review date`);
      if (guide.category === "weddings") assert.equal(article.authorName, "Grecia Mejía", `${name} ${language}: wedding guides are by Grecia Mejía`);
      if (guide.category === "corporate") assert.equal(article.authorName, "Alex Castro", `${name} ${language}: corporate guides are by Alex Castro`);

      const text = JSON.stringify(article);
      assert.doesNotMatch(text, /\{\{\w+\}\}/, `${name} ${language}: leftover placeholder`);
      // Retired or unconfirmed promises the owner removed from the site.
      assert.doesNotMatch(text, /two to three hours|dos (?:o|a) tres horas|duas a três horas|deux à trois heures|wholesale travel agency/i, `${name} ${language}: unconfirmed corporate estimate promise`);
      if (guide.slug === "how-to-prepare-for-a-marriage-proposal-in-punta-cana") {
        assert.doesNotMatch(text, /up to two guests|hasta dos invitados|pareja y dos invitados|casal e dois convidados|couple et deux invités/i, `${name} ${language}: retired guest inclusion returned`);
      }
      if (guide.slug === "keep-gender-reveal-result-secret-punta-cana") {
        assert.match(article.sections[5]?.paragraphs?.[0] || "", /deleted|eliminan|excluídos|supprimés/, `${name} ${language}: result deletion missing`);
      }
    }
  }
  const orphans = posts.filter((post) => !ids.has(post.guide));
  assert.equal(orphans.length, 0, `Texts without a published guide: ${orphans.map((p) => p._id).join(", ")}`);

  console.log(`Validated ${guides.length} blog guides and ${posts.length} language texts in Sanity: addresses, topic map, authors and editorial rules.`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
