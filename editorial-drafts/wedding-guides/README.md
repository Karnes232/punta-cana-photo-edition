# Multilingual wedding guide editorial delivery

Completed November 18, 2026: **100 article versions — 25 topics in English, Spanish, Brazilian Portuguese and French.** All are editorial drafts on this branch. No articles have a verified Sanity import and nothing has been published or merged.

## Scope

Only content and documentation beneath `editorial-drafts/wedding-guides/` are added. Application code, routes, templates, styles, dependencies, schemas and the existing blog structure remain unchanged. This directory is not consumed by the website build; merging it would not publish or import these articles.

## Contents and validation

- Each topic contains four localized article JSON files and research/editorial metadata.
- `inventory.json` lists all 100 versions, final titles, keywords, word counts, references, sources and links.
- `image-selection.json` records four visually inspected photographs already published on Sertuin's website and their topic assignments. Every article includes localized, image-specific `heroAlt`.
- `link-validation.json` records rendered browser verification of all 24 existing related-guide destinations (six guides in four languages).
- Articles use existing blogPost, blogSection, blogStep, blogSource and faqItem fields. Draft IDs, references, section keys, required editorial fields, language-specific related links and CTA paths are checked before final commit and by remote readback.
- Topic 21 is intentionally shorter: its anonymous four-day Hard Rock case is limited to the user's confirmed evidence. It does not invent exact dates, names, a ritual itinerary, quotations or historical photographs. Selected images are illustrative, not photographs documenting that case.

Word counts cover title, direct answer, section headings, introductions, paragraphs, bullets, steps, notes and FAQs. They exclude CTA copy, source labels and metadata. Length is not a substitute for useful, substantiated content.

## Existing CMS conventions

A Blog Guide holds a shared slug, image, taxonomy and related references. Each Blog Post contains one language; Brazilian Portuguese uses the existing `pt` code. New guide references and proposed shared slugs require CMS reconciliation. Topic 02 retains existing guide `baa18c57-5f7f-456c-9d8b-2630c8ea38a0` and shared slug `wedding-planner-cost-punta-cana`.

All CTA buttons store `/puntacana-wedding-planner/` because the site adds the language prefix. Absolute source links retain their explicit localized paths. No links to prospective unpublished articles are inserted.

## Research notes

Catalog keywords are the user's approved starting terms, not search-volume claims. Topic metadata retains research queries, source observations and editorial limits. Dated offers are not guaranteed future quotations. Numerical teaching examples are explicitly hypothetical. Venue policies, religious permissions, capacities and legal outcomes are not generalized.

Hard Rock's English and Spanish wedding pages showed conflicting deposit and cancellation information. Topic 14 directs readers to current written terms without selecting one conflicting page as authoritative. Its French title identifies supplier contracts rather than matrimonial property agreements.

## CMS handoff still required

The editorial writing and repository review are complete. Website publication is a separate, unperformed step:

1. Reconcile proposed guide references, shared slugs, categories and related-guide references within the current CMS.
2. Assign the selected existing image to each shared guide, preserving the illustrative-image distinction.
3. Import through an authorized content-only workflow and verify saved persistence.
4. Preview every locale with the existing templates and confirm images, layout and rendered links before publication.

An earlier visual Studio attempt did not retain article text after saving; its cause was not established. No code workaround or import script is included. These files are editorial source material, not a deployable import bundle.
