const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
for(const locale of ['', 'es/', 'pt/', 'fr/']){
 const route=`/${locale}about/`;
 const html=fs.readFileSync(path.join('public',locale,'about/index.html'),'utf8');
 const ctx=JSON.parse(fs.readFileSync(path.join('public/page-data',locale,'about/page-data.json'),'utf8')).result.pageContext;
 assert.equal(ctx.aboutNoIndex,false);assert(!html.includes('noindex, nofollow'));
 assert(html.includes('https://cdn.sanity.io/images/mj6f2710/production/'));assert(!html.includes('/__about-review__/'));
 assert(html.includes(`href="https://sertuinevents.com${route}"`));assert.equal((html.match(/<h1/g)||[]).length,1);
 assert.equal((html.match(/class="about-card(?: about-card-current)?"/g)||[]).length,7);
 assert.equal((html.match(/<button[^>]*disabled/g)||[]).length,2);
 assert(ctx.copy.brands.filter(b=>!b.homepageUrl).every(b=>b.homepageLinkEnabled===true));
 assert(!html.includes('SANITY_READ_TOKEN'));assert(!html.includes('href="#"'));
}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const sitemap=walk('public').filter(f=>path.basename(f).startsWith('sitemap')&&f.endsWith('.xml')).map(f=>fs.readFileSync(f,'utf8')).join('');
for(const locale of ['', 'es/', 'pt/', 'fr/'])assert(sitemap.includes(`https://sertuinevents.com/${locale}about/`));
console.log('Built About: four published localized routes, canonical URLs, sitemap inclusion, Sanity image, seven cards and two disabled buttons passed.');
