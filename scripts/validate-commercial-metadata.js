// Checks the search titles and descriptions of the proposal package pages,
// edited in Sanity (each Package Page's SEO tab): all four languages, within
// 60/160 characters, unique, and in the company's own voice. With --built it
// also checks the published HTML heads. Reads the public dataset, so it needs
// network access but no token. The other pages' SEO is checked where they are
// built from Sanity.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const projectId = process.env.SANITY_PROJECT_ID || 'mj6f2710';
const dataset = process.env.SANITY_DATASET || 'production';
const languages = ['en', 'es', 'fr', 'pt'];
const query = `*[_type == "proposalPackagePage" && !(_id in path("drafts.**")) && defined(package->slug.current)]{
  language, "slug": package->slug.current, "title": seo.title, "description": seo.description
}`;
const decode = value => value.replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, hex, dec) => String.fromCodePoint(parseInt(hex || dec, hex ? 16 : 10)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const main = async () => {
  const url = `https://${projectId}.apicdn.sanity.io/v2025-09-19/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  assert.ok(response.ok, `Sanity query failed: ${response.status}`);
  const pages = (await response.json()).result;
  assert.ok(fs.existsSync(path.join(root, 'src/data/commercialMetadata.json')) === false, 'Package SEO lives in Sanity, not commercialMetadata.json');

  const bySlug = new Map();
  for (const page of pages) bySlug.set(page.slug, [...(bySlug.get(page.slug) || []), page.language]);
  assert.equal(bySlug.size, 11, 'The eleven proposal package pages');
  for (const [slug, found] of bySlug) assert.deepEqual([...found].sort(), languages, `/packages/${slug}/: all languages required`);

  const titles = new Set(), descriptions = new Set();
  for (const { language, slug, title, description } of pages) {
    const route = `/packages/${slug}/`;
    const label = `${route} ${language}`;
    for (const [value, max] of [[title, 60], [description, 160]]) {
      assert.ok(value && [...value].length <= max, label + ': length limit ' + max);
      assert.equal(value, value.trim(), label + ': surrounding whitespace');
      assert.doesNotMatch(value, /[\r\n]/, label + ': line breaks');
    }
    assert.ok(!titles.has(title), label + ': duplicate title'); titles.add(title);
    assert.ok(!descriptions.has(description), label + ': duplicate description'); descriptions.add(description);
    assert.doesNotMatch(description, /Sertuin (?:Events )?(?:coordinates|coordina|organizes|organiza)/i, label + ': third-person voice');
    assert.doesNotMatch(title, /Sertuin/i, label + ': service titles prioritize the offer');
    if (process.argv.includes('--built')) {
      const prefix = language === 'en' ? '' : language;
      const html = fs.readFileSync(path.join(root, 'public', prefix, route, 'index.html'), 'utf8');
      const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
      assert.ok(head, label + ': missing head');
      const actualTitles = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
      assert.equal(actualTitles.length, 1, label + ': one SEO title');
      assert.equal(decode(actualTitles[0][1]), title, label + ': published title');
      const tags = [...head.matchAll(/<meta\b([^>]+)>/gi)].map(([, attrs]) => Object.fromEntries([...attrs.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)])));
      const desc = tags.filter(t => t.name === 'description');
      assert.equal(desc.length, 1, label + ': one description');
      assert.equal(desc[0].content, description, label + ': published description');
      for (const [property, value] of [['og:title', title], ['og:description', description]]) assert.equal(tags.find(t => t.property === property)?.content, value, label + ': ' + property);
      assert.match(tags.find(t => t.name === 'robots')?.content || '', /noindex/, label + ': package pages stay out of search results');
    }
  }
  console.log('Package SEO: ' + titles.size + ' unique localized pairs within 60/160' + (process.argv.includes('--built') ? '; built HTML verified.' : '.'));
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
