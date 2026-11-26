// Loopback-only static review. Forms/scripts are disabled by prepare.cjs.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'../../.tmp/homepage-review');
const index = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Sertuin homepage — local review</title><style>body{font:16px system-ui;margin:24px;background:#eee}nav{display:flex;gap:16px;flex-wrap:wrap}iframe{border:1px solid #aaa;background:white;display:block;margin-top:16px}button,select{font:inherit;padding:8px}p{max-width:900px}</style><h1>Homepage content review — unpublished</h1><p>Static visual preview using the current site's markup, styles and photographs. Forms and application scripts are disabled. Service links open the published site. This is not a Gatsby build or an authenticated Sanity draft preview.</p><nav><label>Language <select id="lang"><option>en</option><option>es</option><option>pt</option><option>fr</option></select></label><label>Version <select id="version"><option>after</option><option>before</option></select></label><label>Width <select id="width"><option value="390">Mobile — 390 px</option><option value="1440">Desktop — 1440 px</option><option value="320">Narrow mobile — 320 px</option></select></label><button id="load">Show preview</button></nav><iframe id="preview" title="Homepage preview" width="390" height="1000"></iframe><script>function show(){const f=document.getElementById('preview'); f.width=document.getElementById('width').value; f.src='/'+document.getElementById('lang').value+'-'+document.getElementById('version').value+'.html';}document.getElementById('load').onclick=show;show();</script></html>`;
http.createServer((req,res)=>{
 res.setHeader('X-Robots-Tag','noindex, nofollow');
 res.setHeader('Cache-Control','no-store');
 res.setHeader('Content-Type','text/html; charset=utf-8');
 if(req.url==='/') return res.end(index);
 if(!/^\/(en|es|pt|fr)-(before|after)\.html$/.test(req.url)) {res.statusCode=404; return res.end('Not found');}
 res.end(fs.readFileSync(path.join(root,req.url.slice(1))));
}).listen(4173,'127.0.0.1',()=>console.log('Local visual review: http://127.0.0.1:4173'));
