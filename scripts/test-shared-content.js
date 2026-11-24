const fs=require("fs"),assert=require("node:assert/strict"),parser=require("@babel/parser");
const seed=JSON.parse(fs.readFileSync("scripts/migrations/shared-content.json","utf8"));
const keys=new Set(seed.labels.map(l=>l.key));
const files=["Layout/Navbar/Logo.js","Layout/Navbar/HamburgerMenu.js","Layout/Navbar/SideBarMenu.js","Layout/Navbar/SideBarInside.js","Layout/Navbar/RomanticEvents.js","Layout/Footer/Footer.js","Layout/Footer/Sitemap.js","Layout/Footer/Copyright.js","Layout/Footer/SocialMedia.js","CookieConsent/CookieConsent.js","FloatingButtonComponents/ExpandableMessengerButton.js","LanguageSwitcherComponents/LanguageSwitcher.js"];
for(const file of files){
 const ast=parser.parse(fs.readFileSync("src/components/"+file,"utf8"),{sourceType:"module",plugins:["jsx"]});
 function scan(n){if(!n||typeof n!=="object")return;
  if(n.type==="JSXText")assert(!/[\p{L}\p{N}]/u.test(n.value),`${file}: literal editorial text ${n.value}`);
  if(n.type==="CallExpression"&&n.callee?.name==="t"&&n.arguments[0]?.type==="StringLiteral")assert(keys.has(n.arguments[0].value),`${file}: missing CMS label ${n.arguments[0].value}`);
  for(const v of Object.values(n))if(Array.isArray(v))v.forEach(scan);else if(v&&typeof v==="object")scan(v);
 }scan(ast);
}
for(const label of seed.labels)for(const lang of ["en","es","pt","fr"])assert(label.text[lang],`Missing ${lang} for ${label.key}`);
assert(seed.navigation.some(n=>n.url==="/reviews/"));
assert.equal(new Set(seed.languages.map(l=>l.code)).size,4);
console.log(`Shared editorial audit passed: ${files.length} components, ${keys.size} CMS labels, four languages, Reviews navigation.`);
