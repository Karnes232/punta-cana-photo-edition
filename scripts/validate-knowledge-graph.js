const assert = require("node:assert/strict");
const { nodes, clusters } = require("../src/data/knowledgeGraph");
const articles = require("../src/data/knowledgeArticles.json");
const { publishedBlogSlugs } = require("../src/data/publishedBlogSlugs");
const languages = ["en-US", "es", "pt", "fr"];
const ids = new Set(nodes.map(n => n.id));
assert.equal(ids.size, nodes.length, "Conceptual IDs must be unique");
assert.deepEqual(new Set(nodes.map(n=>n.slug)), publishedBlogSlugs, "Preserve the current approved route set");
for(const node of nodes){
  assert(clusters.some(c=>c.id===node.cluster), node.id+": missing parent");
  assert(node.related.length>0,node.id+": missing related guides");
  assert(nodes.some(other=>other.related.includes(node.id)),node.id+": no meaningful inbound article link");
  for(const target of node.related){assert(ids.has(target),node.id+": unknown target "+target);assert.notEqual(target,node.id)}
  if(node.next)assert(node.related.includes(node.next),node.id+": next decision must be related");
  assert.equal(node.translationGroup,node.id);
  for(const language of languages){
    const article=articles[node.slug]?.[language];assert(article,node.id+": missing "+language);
    assert(article.title&&article.description&&article.directAnswer);
    assert(article.sections.length>=4,node.id+": insufficient structure");
    assert.equal(new Set(article.sections.map(s=>s.id)).size,article.sections.length,"Duplicate section anchors");
    for(const section of article.sections)assert(section.heading&&(section.paragraphs?.length||section.bullets?.length||section.steps?.length||section.sources?.length));
    assert.equal(article.reviewedAt,"2026-09-07");
    assert.equal(article.author,node.cluster==='weddings'?'Grecia Mejía':node.cluster==='corporate'?'Alex Castro':article.author);
    if(node.id==='proposal-timeline')assert(!/up to two guests|hasta dos invitados|pareja y dos invitados|casal e dois convidados|couple et deux invités/i.test(JSON.stringify(article)),"Retired guest inclusion returned");
    if(node.id==='corporate-brief')assert(!/two to three hours|dos o tres horas|duas a três horas|deux à trois heures|wholesale travel agency/i.test(JSON.stringify(article)),"Unconfirmed corporate promise returned");
    if(node.id==='reveal-privacy')assert(article.sections[5].paragraphs[0].match(/deleted|eliminan|excluídos|supprimés/),"Result deletion missing");
  }
}
console.log(`Validated ${nodes.length} conceptual nodes, ${nodes.length*4} localized articles, approved URLs, inbound/outbound relationships, authors and corrected operational rules.`);
