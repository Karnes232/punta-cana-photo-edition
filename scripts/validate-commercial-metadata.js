const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const metadata = require('../src/data/commercialMetadata.json');
const root = path.resolve(__dirname, '..');
const languages = ['en-US', 'es', 'pt', 'fr'];
const titles = new Set(), descriptions = new Set();
const decode = value => value.replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, hex, dec) => String.fromCodePoint(parseInt(hex || dec, hex ? 16 : 10)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
// The home and contact pages' titles and descriptions are edited in Sanity (SEO tab).
assert.equal(Object.keys(metadata).length, 15, 'Four service pages and eleven package pages');
assert.equal(metadata['/'], undefined, 'Home page SEO lives in Sanity');
assert.equal(metadata['/contact/'], undefined, 'Contact page SEO lives in Sanity');
assert.equal(metadata['/proposal/'], undefined, 'Proposal landing pages are excluded');
for (const [route, translations] of Object.entries(metadata)) {
  assert.deepEqual(Object.keys(translations), languages, route + ': all languages required');
  for (const [language, {title, description}] of Object.entries(translations)) {
    const label = route + ' ' + language;
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
      const prefix = language === 'en-US' ? '' : language;
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
      assert.equal(/noindex/.test(tags.find(t => t.name === 'robots')?.content || ''), route.startsWith('/packages/'), label + ': intentional indexation policy');
    }
  }
}
assert.match(metadata['/puntacana-wedding-planner/']['en-US'].title, /^Wedding Planner in Punta Cana\b/);
console.log('Commercial metadata: 60 unique localized pairs within 60/160; proposal excluded' + (process.argv.includes('--built') ? '; built HTML verified.' : '.'));
