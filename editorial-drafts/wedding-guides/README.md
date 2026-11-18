# Multilingual wedding guide drafts

Status: partial editorial work. Four article drafts for topic 02 are stored in this branch. Zero of the 100 required language versions have been verified as complete saved articles in Sanity. Nothing is published.

## Scope

Only files beneath `editorial-drafts/wedding-guides/` are added. Application code, routes, templates, styles, dependencies, Sanity schemas and configuration are unchanged. This directory is not connected to the site's build. Merging these files would not import or publish the articles.

The JSON documents follow the existing `blogPost`, `blogSection`, `blogSource`, `faqItem` and `cta` field shapes. They are editorial working data, not a deployable import bundle. Each proposed article ID begins with `drafts.`. They reference the existing draft guide `baa18c57-5f7f-456c-9d8b-2630c8ea38a0`, whose actual shared slug is `wedding-planner-cost-punta-cana`. Do not publish the guide to work around the editor issue.

## Current content

- Topic 02: wedding planner fees; English, Spanish, Brazilian Portuguese and French drafts, approximately 2,000–2,300 words per version, including FAQs and metadata. Counts depend on whether metadata and link labels are included.
- Topic 21: owner-confirmed evidence and unresolved details only; no article yet.
- `inventory.json`: all 100 required language versions, with actual progress. `drafting` means repository work and does not mean saved in Sanity.

The separate general wedding-budget article (topic 01) remains distinct from topic 02. Topic 02 explains professional fees and scope without claiming a verified local market average. The 10% arithmetic and USD 2,000/2,800 comparison are explicitly hypothetical.

## Research and sources

Consulted November 18, 2026:

- https://sertuinevents.com/puntacana-wedding-planner/
- https://sertuinevents.com/es/puntacana-wedding-planner/
- https://sertuinevents.com/pt/puntacana-wedding-planner/
- https://sertuinevents.com/fr/puntacana-wedding-planner/
- https://dominicanweddingplanner.com/rates/

The first four are the company's published service offers. Publication/update dates were not established. Treat them as dated observations, not irrevocable future quotations. The other provider is based on the north coast, not a Punta Cana price benchmark. Its fee model illustrates why an entire calculation must be read. Its old legal-fee information and inconsistent advance-payment dates are not used in the articles.

Search intent was examined independently with these Google queries: `wedding planner cost Punta Cana`; `cuanto cuesta un wedding planner en Punta Cana`; `quanto custa assessoria casamento Punta Cana`; `tarif wedding planner Punta Cana`. Results were personalized and showed a Dominican Republic geographic context. This is qualitative terminology research, not a ranking report or a measurement of search volume. AI overview prices were not adopted as evidence. Brazilian wording uses `assessoria` naturally alongside the approved `wedding planner` target. French uses `honoraires`, `forfait` and `coordination du jour J`. Primary targets remain aligned with the approved brief.

## Existing CMS conventions preserved

A Blog Guide holds the shared slug, photo, taxonomy and related-guide references. One Blog Post holds each language's text. The current schema uses `pt` for Portuguese. The same slug is shared between languages; creating four independent slugs would require a structural change and is outside this task.

The CTA field stores `/puntacana-wedding-planner/` in every language. The existing site adds the language prefix; do not put `/es`, `/pt` or `/fr` into this field. Absolute URLs in section sources remain explicit.

Sections use the existing heading, paragraphs and sources fields. Related reading is represented through supported links rather than adding unsupported rich-text markup or new fields. Contextual inline hyperlinks and H3 nesting are not introduced by changing the schema.

## Remaining work before CMS completion

1. Resolve or use an authorized content-only route around the observed Studio save failure. In the new English and Spanish documents, text appeared transiently and disappeared after saving, including after reopening. The guide's slug and category persisted. The underlying cause is not established.
2. Select and inspect a legitimate existing media-library photo for topic 02. Add its shared image reference and an accurate `heroAlt` in each language. These required fields are intentionally absent rather than fabricated.
3. Confirm the shared guide's required order, related references and image in the existing editor. Existing candidates include `blogGuide-wedding-first-meeting` and `blogGuide-wedding-venue`; both were observed in the CMS.
4. Recheck direct access to each related public article. English and Spanish related URLs were exposed in the service page navigation. Portuguese and French versions were also linked there, but the research fetch returned cache misses; no claim of a 404 is made. Their article links remain pending in the inventory.
5. Review the saved CMS content and rendered preview, including factual consistency, language, formatting and actual link destinations. A repository parse check does not replace CMS verification.
6. Continue research and writing for the remaining 24 topics in all four languages. Topic 21 must use only the confirmed evidence; do not invent exact dates, a daily program, ritual names or client testimonials.
7. After explicit publication approval, add links among newly published articles. No links to the prospective unpublished articles are included now.

No import commands, executable scripts or code changes are supplied. No Sanity API or CLI was used to create these files or to work around the UI failure.
