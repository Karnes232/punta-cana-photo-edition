# Multilingual wedding guide drafts

Status on November 18, 2026: **90 of 100 article versions are saved and read back from this branch. The project is incomplete.** All three auxiliary agents stopped with the workspace-out-of-credits error. Nothing is published or merged; zero article versions have a verified Sanity import.

## Scope

Only editorial JSON and documentation beneath `editorial-drafts/wedding-guides/` are added. Application code, routes, blog templates, styles, dependencies, Sanity schemas and configuration are unchanged. This directory is not consumed by the build. Merging it would not import or publish articles.

## Exact remaining writing

- Topic 11: Spanish and Brazilian Portuguese are missing; English and French are saved.
- Topic 12: all four languages are missing.
- Topic 16: all four languages are missing.
- Thirty existing first-pass versions still need substantial expansion: topic 06 ES/PT/FR; topics 07/08/09 all languages; topic 13 ES/PT/FR; topics 15/19/22 all languages.
- Topic 13 English was expanded; localize its additional walkthrough, privacy, coordination and decision sections into the other three versions.
- Topic 21 is intentionally shorter because the confirmed case evidence does not justify invented details. Its four versions are anonymous, avoid exact dates and unconfirmed ritual names, and distinguish evidence from recommendations.
- Some topic metadata files and the final cross-language editorial review remain incomplete. `inventory.json` is the latest authoritative file-level snapshot, including actual word counts. Older per-topic metadata may reflect the first pass.

The remaining saved versions are substantial drafts, not publication-ready articles. Length alone is not a completion criterion. Source accuracy, language, links, images and rendered content still need final review.

## Validation completed

All 90 article files were fetched back from GitHub and parsed successfully. Checks found no errors in draft ID prefix, `blogPost` type, section type/keys or the established CTA path. Branch comparison showed only added editorial files, with no source-code modifications or deletions. Word counts cover title, direct answer, section headings/body/steps/bullets/notes and FAQs; they exclude CTA, source labels and metadata.

## Existing CMS conventions

A Blog Guide holds a shared slug, image, taxonomy and related references. Each Blog Post contains one language. Portuguese uses `pt`; slugs are shared across languages. The new proposed references require resolution before import. Topic 02 uses the existing draft guide `baa18c57-5f7f-456c-9d8b-2630c8ea38a0` and shared slug `wedding-planner-cost-punta-cana`.

The CTA stores `/puntacana-wedding-planner/` in every language because the existing site applies the language prefix. Absolute source links retain explicit localized paths. Existing section fields are used; no new rich-text format or heading nesting was introduced.

## Research and editorial safeguards

The catalog preserves the user's approved starting keywords; these are not search-volume claims. Per-topic metadata records research queries and primary sources. Company offers are dated observations, not guaranteed future quotations. Numerical teaching examples are clearly hypothetical. Hotel-specific prices, capacities, religious permissions and legal outcomes are not generalized.

Hard Rock's English and Spanish wedding-information pages displayed conflicting deposit and cancellation details during review. Topic 14 explains the need for current written terms without choosing one version as authoritative. Its French title clarifies that the subject is supplier contracts, not matrimonial property arrangements.

## Required before CMS completion

1. Finish the missing writing, expansion and multilingual editorial review described above.
2. Select and inspect authorized images, then write accurate localized `heroAlt`. Image fields were not fabricated.
3. Resolve the proposed guide references, shared slugs and related-guide assignments within the existing CMS conventions.
4. Verify existing same-language links and rendered layout. Localized service navigation exposes the shared-slug routes; some direct research fetches returned cache misses, which are not evidence of404 errors.
5. Import through an authorized content-only workflow and verify persistence. The earlier visual Studio attempt displayed article text transiently and then lost it after saving; the underlying cause was not established. No code workaround was attempted.
6. Keep drafts unpublished until the requested review and publication process is complete. No prospective unpublished article links have been invented.

The repository preserves the work completed so far. It is not a deployable import bundle, and no import script, CLI operation or schema change is included.
