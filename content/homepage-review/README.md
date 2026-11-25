# Sertuin Events — homepage owner review

Prepared 25 November 2026. **Editorial review ready; visual and integration acceptance pending. Nothing has been written to Sanity or deployed.**

## Editorial delivery

| Language | Approved visible H1 in prepared content | Conservative visible word count |
| --- | --- | ---: |
| English | Event Planner in Punta Cana — Planning, Production and Coordination | 988 |
| Spanish | Planificación, Producción y Coordinación de Eventos en Punta Cana | 1044 |
| Brazilian Portuguese | Planejamento, Produção e Coordenação de Eventos em Punta Cana | 1073 |
| French | Planification, Production et Coordination d’Événements à Punta Cana | 1063 |

Counts cover main-page headings, descriptions, repeated CTA labels, existing highlights, contact details and all form option labels, including collapsed options. Navigation, footer, metadata, scripts and image alt text are excluded. There is no minimum-length padding. All four versions carry equivalent information.

The five service cards explain intended customers, planning responsibilities and scope. Corporate copy covers complete planning and local production support. Proposal copy distinguishes selected inclusions from upgrades; elopement copy distinguishes the base symbolic ceremony, separately priced décor and conditional legal service. Gender reveal copy explains custom quotations and venue permission. Existing paragraphs explain birthdays, private celebrations, custom productions, supplier coordination and the questions customers need answered before booking. The existing three process cards cover all six requested stages in pairs.

**The Wedding Planning section focuses on the professional planning, guidance and coordination services we provide, without unnecessary comparisons with other wedding products.**

No customer reviews or testimonials section was added to the homepage. The optional reviews link was deferred. Client names and experience statistics were omitted because their approved use was not established. Existing authentic event photography is retained; no synthetic or replacement photography was introduced.

## Implementation and files

This is a content-only proposal using the current Sanity model. **Zero frontend components changed, zero schema changes, zero new dependencies.** No existing application, SEO, routing, contact, About Us or Reviews file was modified.

All added files are confined to `content/homepage-review/`:

| File | Purpose |
| --- | --- |
| `en.json` | Complete English editorial changes |
| `es.json` | Complete Latin American Spanish editorial changes |
| `pt.json` | Complete Brazilian Portuguese editorial changes |
| `fr.json` | Complete French editorial changes |
| `plan.md` | Existing component/field mapping and verification sources |
| `prepare.cjs` | Read-only local preparation, protection checks, word counts and route checks |
| `serve.cjs` | Loopback-only static review server; never part of the site build |
| `validation.json` | Executed content and route verification results |
| `README.md` | Delivery status, editing guidance and limitations |

The two utilities are review tooling, not application code. `prepare.cjs` uses only built-in Node modules and HTTP GET requests. It prepares field-only, revision-guarded patches without sending them. It preserves existing document IDs, image objects, CTA types, card keys and process keys. The full snapshots and HTML outputs stay in ignored `.tmp/homepage-review/` and are not included in deployments.

## Sanity editing and staging

Prepared replacement snapshots correspond to `homePage-en`, `homePage-es`, `homePage-pt` and `homePage-fr`. They exist **locally only**, not as new Sanity documents or production drafts. The repository's existing production reader has no authenticated draft-preview configuration. No separate staging dataset was established or assumed, and no publication token was read.

In the existing Studio Home Page document for each language:

- Edit the H1 under **Hero → Heading** (`heroHeading`).
- Edit the introduction and button labels under **Hero**.
- Edit descriptions, titles and order under **Events → Event cards**. The service links retain base paths; `siteLink` adds `/es`, `/pt` or `/fr` automatically.
- Edit coordination, birthdays and custom-production copy under **What we do → Paragraphs**.
- Edit the three paired stages under **Process → Steps**.
- Edit venue logistics in the existing **Commitment** group.
- Edit the closing invitation and contact labels under **Contact**. The existing form labels stay in `src/content/homeContent.js`, unchanged.

`primaryCtaLabel`, `secondaryCtaLabel`, `commitmentCtaLabel`, `cards` and `steps` in the editorial JSON are review aliases; the preparation utility maps them to the existing nested Sanity fields. Do not import those source JSON files as CMS documents. The prepared contextual commitment CTA points to the verified `/contact/` route, localized by the existing renderer.

Before any separately authorized CMS action, refresh current documents and drafts, compare them with this proposal and resolve intervening editorial changes. Do not import full snapshots over production. The local patches include `ifRevisionID` but are **not publication authorization**. Publishing production documents activates the existing Sanity → Netlify webhook; no such action was performed.

## SEO protection

The visible H1 was updated in the four **prepared local versions**. Independent SEO settings and metadata were preserved without modification. Production H1s remain unchanged pending approval and implementation.

Automated checks compare the complete `seo` object, all unmodified document fields, image references and the original rendered `<head>` before constructing the local review wrapper. `heroEyebrow` is intentionally preserved because `src/pages/index.js` also uses it as the meta subject. The preview wrapper adds a resource base URL and removes application scripts for static review only; the loopback server returns `X-Robots-Tag: noindex, nofollow`. No production indexing setting was changed.

## Verification and limitations

Executed successfully:

- Parsed all four JSON files; matched each approved H1 exactly.
- Confirmed matching field sets, five existing service cards and exactly three process cards per language.
- Compared preserved SEO fields, images, document fields and rendered page head.
- Checked the 1,900-word limit against rendered main-page content.
- Checked 28 public routes: four homepages, 20 service routes and four contact routes. All returned HTTP 200, stayed at their expected paths and declared their expected language.
- Generated before/after static HTML from the published site's actual markup and styles, replacing only homepage editorial content.
- Checked Node syntax and Git whitespace integrity.

Not claimed as passed:

- **Gatsby build:** not run. The production build still reads published Sanity documents, so it would not test these offline replacements. No application code or dependencies changed.
- **Sanity Studio schema validation:** not run against a staging dataset. Local checks cover the reused shape, required content, key preservation and image preservation; they do not replace official Studio validation.
- **Desktop/mobile screenshots and visual acceptance:** blocked. The integrated browser kernel failed twice at startup. No screenshots or no-overflow claim are supplied. Inspect all four languages at 1440 px, 390 px and 320 px, especially long H1s, narrow service cards and CTA wrapping.
- **Contact form and WhatsApp end-to-end:** not executed. Original production source is unchanged; preview controls are disabled and no lead was submitted. The generated WhatsApp href retains the original phone and uses the localized message.
- **Language switching/navigation interaction:** not exercised in a browser. Route and language declarations were verified by HTTP.

## Review locally

From the repository root, with Node 22 or later:

```text
node content/homepage-review/prepare.cjs
node content/homepage-review/serve.cjs
```

Open http://127.0.0.1:4173 and select language, before/after and viewport width. The server binds only to loopback. This is a static visual aid using the published assets, **not an authenticated Sanity preview or a functional Gatsby build**. No analytics or form submissions run. Internet access is required for current styles and photographs. The original navigation and service links open published pages.

## GitHub and deployment

Branch: `feature/sertuin-homepage-multilingual-content`, based on `origin/main` at `70fc619`. The original About Us worktree remains untouched. No merge is performed. The repository has no GitHub Actions workflows. Webhook enumeration requires an unavailable admin scope, so no claim is made that every remote integration was inspected.

Local content commit: `f73e25e`. The owner explicitly authorized uploading these review files to the public repository and creating the Draft PR. Production publication and merging remain unauthorized. The files remain an offline editorial proposal; merging them alone would not update the published Sanity homepage.

The local commit includes `[skip netlify]`; the planned Draft PR title will also include it to suppress Netlify branch builds and Deploy Previews without changing project configuration. This follows [Netlify's documented skip controls](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/#skip-a-deploy). The local review is the only prepared preview; the editorial files are not consumed by production.

**READY FOR OWNER REVIEW — NOT DEPLOYED TO PRODUCTION**
