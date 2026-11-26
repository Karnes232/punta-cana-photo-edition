# Homepage release — 25 November 2026

The owner authorized publication after reviewing the content and specifically requested correct images and no mobile overflow. This supersedes the earlier review-only restriction. No further publication approval is required.

## Final changes

The four editorial files retain the approved H1s and complete service explanations. French `eventsTitle` was shortened naturally to “Un Soutien pour Votre Événement” to avoid an awkward word break at 320 px; the approved H1 is unchanged.

Three homepage components required minimal changes after browser testing:

- `src/components/HomeComponents/HomeExperience.js`: inherited `overflow-wrap:anywhere` within the homepage prevents long translated words overflowing narrow containers.
- `src/components/HomeComponents/HeroSection.js`: base H1 size changes from 48 px to 36 px below the existing small breakpoint. Existing tablet/desktop sizes remain unchanged; long headings fit small phones without orphaned letters.
- `src/components/HomeComponents/ServiceCard.js`: the existing gradient is darker at its upper end to keep extended white descriptions legible over bright photographs.

No other application files, schemas, dependencies, routing, SEO or contact behavior changed. Original photographs, assets, crops, hotspots and alt text are preserved. Each reordered service card retains its original image object. No testimonials or review blocks were added.

## Review tooling corrections

`prepare.cjs` activates Gatsby's deferred image attributes in the script-free static review, so all photographs display. It mirrors the three production style adjustments and scopes contact-eyebrow replacement to the contact section, leaving the identical availability label in the trust strip intact. These preview adaptations do not modify production image loading or shared navigation.

## Verification before release

- Twelve isolated Chrome checks: English, Spanish, Portuguese and French at 320, 390 and 1440 px. All report zero measured homepage overflow and all seven main images loaded.
- Screenshots reviewed for image/service association, hero wrapping and card readability. The small-phone H1 was refined after visual inspection, beyond the numeric overflow checks.
- Four-document Sanity dry run passed. Existing drafts are absent; current revisions match the reviewed baseline. The planned updates preserve SEO, hero eyebrow and image objects.
- The first full application build and postbuild checks passed, including localization, commercial metadata, proposal checks and 286-page NUL-byte validation. A final build includes the last H1 size adjustment; its result and live checks are recorded in `release-validation.json`.
- No contact inquiry or WhatsApp message is submitted. Live verification checks the available form and link targets without creating a lead.

The integrated browser failed at startup; a separate local Chrome test profile supplied screenshots and measured layout. No personal browsing profile was used.

## Publication procedure

Release the three source adjustments through PR #42. Then patch only the four existing `homePage` documents, using revision guards, a saved backup, a dry run and exact readback. The existing Sanity webhook rebuilds production from main. No new hosting infrastructure or CMS model is created. Preserve all independent SEO fields and verify the deployed four-language homepages after the build.

Backups, mutation plans, transaction responses, detailed browser reports and screenshots remain in ignored `.tmp/homepage-review/`. No credential is included in Git. The original review report retains content-editing instructions and the word counts, which remain under 1,900 in every language.
