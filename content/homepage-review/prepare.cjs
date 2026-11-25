// Read-only preparation. No Sanity mutation client, credentials or publish action.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const out = path.resolve(__dirname, '../../.tmp/homepage-review');
fs.mkdirSync(out, {recursive:true});
const read = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const write = (p, v) => fs.writeFileSync(path.join(out,p), JSON.stringify(v,null,2)+'\n');
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
const languages = ['en','es','pt','fr'];
const headings = [
 'Event Planner in Punta Cana — Planning, Production and Coordination',
 'Planificación, Producción y Coordinación de Eventos en Punta Cana',
 'Planejamento, Produção e Coordenação de Eventos em Punta Cana',
 'Planification, Production et Coordination d’Événements à Punta Cana'
];
const fields = ['heroHeading','heroIntro','eventsEyebrow','eventsTitle','eventsIntro','eventCardLinkLabel','whatEyebrow','whatTitle','whatParagraphs','whatItems','processEyebrow','processTitle','processIntro','commitmentEyebrow','commitmentTitle','commitmentBody','contactEyebrow','contactTitle','contactBody','whatsappLabel','callLabel','emailLabel','whatsappMessage'];
const prefix = lang => lang === 'en' ? '' : '/'+lang;
async function get(url) {
 const r = await fetch(url);
 assert(r.ok, `${r.status}: ${url}`);
 return r;
}
async function main() {
 const query = '*[_type == "homePage" && !(_id in path("drafts.**"))]';
 const {result: baseline} = await (await get('https://mj6f2710.api.sanity.io/v2025-01-01/data/query/production?query='+encodeURIComponent(query))).json();
 write('baseline.json',baseline);
 const patches=[], documents=[], report={preparedAt:new Date().toISOString(), mode:'Offline content review; no CMS writes', languages:{}};
 for(const [i,lang] of languages.entries()) {
   const old = baseline.find(x=>x.language===lang);
   assert(old, `Missing published homepage ${lang}`);
   const copy = read(path.join(__dirname,lang+'.json'));
   assert.equal(copy.heroHeading,headings[i]);
   assert.equal(copy.steps.length,3);
   assert.equal(copy.cards.length,5);
   assert.deepEqual(Object.keys(copy).sort(), [...fields,'primaryCtaLabel','secondaryCtaLabel','commitmentCtaLabel','cards','steps'].sort());
   const set = Object.fromEntries(fields.map(k=>[k,copy[k]]));
   for(const k of ['primaryCta','secondaryCta','commitmentCta']) set[k] = {...old[k], label:copy[k+'Label']};
   // The existing contextual CTA provides a verified localized contact destination.
   set.commitmentCta.url = '/contact/';
   set.eventCards = copy.cards.map(c=>{
     const original=old.eventCards.find(x=>x.link===c.link);
     assert(original, `Unknown service route ${c.link}`);
     return {...original,title:c.title,description:c.description};
   });
   set.processSteps = copy.steps.map((s,i)=>({...old.processSteps[i],...s}));
   const prepared={...old,...set};
   for(const key of Object.keys(old).filter(k=>!Object.hasOwn(set,k))) assert.deepEqual(prepared[key],old[key]);
   for(const c of prepared.eventCards) assert.deepEqual(c.image,old.eventCards.find(x=>x.link===c.link).image);
   assert.deepEqual(prepared.seo,old.seo);
   assert.equal(prepared.heroEyebrow,old.heroEyebrow);
   patches.push({patch:{id:old._id,ifRevisionID:old._rev,set}});
   documents.push(prepared);
   const url='https://sertuinevents.com'+prefix(lang)+'/';
   let original = await (await get(url)).text();
   fs.writeFileSync(path.join(out,lang+'-published.html'),original);
   let html=original;
   // Modify only main's rendered editorial text. Keep the original head verbatim.
   const mainMatch=html.match(/<main\b[^>]*>[\s\S]*?<\/main>/);
   assert(mainMatch, 'Homepage main missing');
   let body=mainMatch[0];
   function replaceText(from,to) {
     const needle='>'+esc(from)+'<';
     assert(body.includes(needle), `Live content drift in ${lang}: ${String(from).slice(0,70)}`);
     body=body.replace(needle,()=>'>'+esc(to)+'<');
   }
   // Replace whole card nodes in the approved order, preserving their markup/photos.
   const cardNodes=[...body.matchAll(/<article class="group\b[\s\S]*?<\/article>/g)].map(x=>x[0]);
   assert.equal(cardNodes.length,5);
   const cards=prepared.eventCards.map(c=>{
     const prev=old.eventCards.find(x=>x.link===c.link);
     let node=cardNodes.find(x=>x.includes(esc(prev.description)));
     assert(node,'Card missing');
     node=node.split(esc(prev.title)).join(esc(c.title));
     node=node.replace(esc(prev.description),()=>esc(c.description));
     return node.replace(esc(old.eventCardLinkLabel),()=>esc(prepared.eventCardLinkLabel));
   });
   assert(body.includes(cardNodes.join('')), 'Cards not contiguous');
   body=body.replace(cardNodes.join(''),()=>cards.join(''));
   const paragraphNodes=old.whatParagraphs.map(p=>{
     const node=[...body.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/g)].find(x=>x[0].includes(esc(p)));
     assert(node,'Missing what paragraph'); return node[0];
   });
   const pOpen=paragraphNodes[0].match(/^<p[^>]*>/)[0];
   body=body.replace(paragraphNodes.join(''),()=>prepared.whatParagraphs.map(p=>pOpen+esc(p)+'</p>').join(''));
   for(let j=0;j<old.whatItems.length;j++) replaceText(old.whatItems[j],prepared.whatItems[j]);
   for(let j=0;j<3;j++) for(const k of ['title','body']) replaceText(old.processSteps[j][k],prepared.processSteps[j][k]);
   for(const k of fields.filter(k=>!['whatParagraphs','whatItems','eventCardLinkLabel','whatsappMessage'].includes(k))) replaceText(old[k],prepared[k]);
   // Locate CTA by its exact original text, so identical hero/commitment labels stay distinct.
   for(const k of ['primaryCta','secondaryCta','commitmentCta']) {
     const label=esc(old[k].label);
     const nodes=[...body.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].filter(x=>x[0].includes(label));
     assert(nodes.length,`Missing CTA ${k}`);
     const node=k==='commitmentCta'?nodes.at(-1)[0]:nodes[0][0];
     const dest=prepared[k].url.startsWith('#')?prepared[k].url:prefix(lang)+prepared[k].url;
     const replacement=node.replace(/href="[^"]*"/,'href="'+esc(dest)+'"').replace(label,()=>esc(prepared[k].label));
     body=body.replace(node,()=>replacement);
   }
   body=body.replace(/(https:\/\/api\.whatsapp\.com\/send\?phone=[^"&]+(?:&amp;|&)text=)[^"]*/g,(_,p)=>p+encodeURIComponent(prepared.whatsappMessage));
   html=html.replace(mainMatch[0],()=>body);
   assert.equal(html.match(/<head>[\s\S]*?<\/head>/)?.[0],original.match(/<head>[\s\S]*?<\/head>/)?.[0]);
   // A static local visual review is intentionally non-interactive: no hydration, analytics or submissions.
   const offline = content => content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<link\b[^>]*rel="(?:preload|modulepreload)"[^>]*>/g,'').replace('<head>','<head><base href="https://sertuinevents.com/">').replace(/<form\b[^>]*>/g,'<form onsubmit="return false">').replace(/<button\b/g,'<button disabled').replace(/<input\b/g,'<input disabled').replace(/<select\b/g,'<select disabled').replace(/<textarea\b/g,'<textarea disabled');
   fs.writeFileSync(path.join(out,lang+'-before.html'),offline(original));
   fs.writeFileSync(path.join(out,lang+'-after.html'),offline(html));
   const visible=body.replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/g,'').replace(/<[^>]+>/g,' ').replace(/&#x27;|&#39;/g,"'").replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim();
   // Conservative count: includes all form option labels and contact details, even collapsed ones.
   const words=visible.split(/\s+/).filter(x=>/[\p{L}\p{N}]/u.test(x)).length;
   assert(words<=1900, `${lang} exceeds word limit: ${words}`);
   report.languages[lang]={document:old._id,baselineRevision:old._rev,words,h1:prepared.heroHeading,seoUnchanged:true,imagesUnchanged:true,headUnchanged:true,processSteps:3,cards:5};
 }
 write('prepared-documents.json',documents);
 write('review-patches.json',{notice:'REVIEW ONLY. Not executed. Refresh revisions and review current drafts before any approved CMS operation.',mutations:patches});
 const links = [];
 for(const lang of languages) {
   const destinations=['/',...documents.find(x=>x.language===lang).eventCards.map(x=>x.link),'/contact/'];
   const checks=await Promise.all(destinations.map(async p=>{
     const url='https://sertuinevents.com'+prefix(lang)+p;
     const response=await get(url); const html=await response.text();
     const htmlLang=html.match(/<html[^>]*\blang="([^"]+)"/)?.[1];
     assert(htmlLang?.startsWith(lang),`Wrong language for ${url}: ${htmlLang}`);
     assert.equal(new URL(response.url).pathname,prefix(lang)+p, 'Unexpected route redirect');
     return {url,status:response.status,htmlLang};
   }));
   links.push(...checks);
 }
 report.links=links;
 write('validation.json',report);
 console.log(JSON.stringify(report,null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1});
