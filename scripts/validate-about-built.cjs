const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
for(const locale of ['', 'es/', 'pt/', 'fr/']){
 const route=`/${locale}about/`;
 const html=fs.readFileSync(path.join('public',locale,'about/index.html'),'utf8');
 const ctx=JSON.parse(fs.readFileSync(path.join('public/page-data',locale,'about/page-data.json'),'utf8')).result.pageContext;
 assert.equal(ctx.aboutNoIndex,true);assert(html.includes('noindex, nofollow'));
 assert(html.includes(`href="https://sertuinevents.com${route}"`));assert.equal((html.match(/<h1/g)||[]).length,1);
 assert.equal((html.match(/class="about-card(?: about-card-current)?"/g)||[]).length,7);
 assert.equal((html.match(/<button[^>]*disabled/g)||[]).length,2);
 assert(ctx.copy.brands.filter(b=>!b.homepageUrl).every(b=>b.homepageLinkEnabled===true));
 assert(!html.includes('SANITY_READ_TOKEN'));assert(!html.includes('href="#"'));
}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const f of walk('public').filter(f=>path.basename(f).startsWith('sitemap')&&f.endsWith('.xml')))assert(!fs.readFileSync(f,'utf8').includes('/about/'));
console.log('Built About: four localized routes, canonical URLs, noindex/sitemap exclusion, seven cards and two disabled buttons passed.');
