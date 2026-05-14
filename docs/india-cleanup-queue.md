# India Family — Cleanup Queue

Items to address in a dedicated cleanup pass AFTER all 12 page-type Clients ship (post-session 5g). Organized by category so the cleanup work can be sequenced sensibly.

## 1. Sanity schema additions

Fields the india Clients currently use via hardcoded fallbacks. Each entry names the schema, the field to add, the Client that surfaces the gap, and the intended shape.

- **personaPage**: add `callouts: callout[]` (optional) — `IndiaPersonaClient`'s ProTipsCallout section is currently skipped because the field doesn't exist.
- **personaPage**: add `photoTabSet` field (object: `photoTabSet`) — `IndiaPersonaClient` GlasseyTabs renders `SAMPLE_APPLICATIONS_TABS` hardcoded in the Client.
- **personaPage**: add `customerLogos` or `trustedClients` field — `IndiaPersonaClient` LogoCarousel renders `SAMPLE_TRUST_LOGOS` hardcoded.
- **personaPage**: upgrade `description` field from `type:'text'` to `blockContent` — currently synthesized into Portable Text blocks at render time by splitting on `\n\n`.
- **productLine**: add `advantages: string[]` — `IndiaProductLinesClient` TickCheckList synthesizes from `keySpecs` as `"{value} {label}"`, which reads awkwardly.
- **Brand**: add an `applications` (or `industries`) field — array of `{image, label}` — `IndiaBrandClient` PhotoGrid uses `APPLICATION_TILES_FALLBACK`.
- **Solution**: add the same `applications` field — `IndiaSolutionClient` PhotoGrid uses the same fallback.
- **personaPage**: add `featuredCaseStudies` field for the dark-card grid — `IndiaPersonaClient` currently sources from `featuredBrands` as a fallback.
- **All page-type docs**: add an optional `faq: array of {question, answer}` field — `IndiaFAQ` uses placeholder data; no schema field exists.
- **All page-type docs**: add an optional `leadForm` reference field — currently every Client falls back to `_shared/helpers.ts → SAMPLE_LEAD_FORM`.
- **teamMember**: add `expertise: string[]` (or structured `{label, description}[]`) — `IndiaTeamMemberClient` renders an `EXPERTISE_FALLBACK` hardcoded list.
- **teamMember**: add `email` and `department` string fields — `IndiaTeamMemberClient` shows them conditionally; the contact strip can't surface "Email" until the field exists.
- **classEvent**: schema has no `name`, `description`, `heroImage`, or `instructors` fields. `IndiaClassEventClient` derives display title from the dereferenced `course.title`, sources description from `course.description`, uses a placeholder hero image, and falls back to a hardcoded `INSTRUCTORS_FALLBACK`. Add at least: `instructors: array of {name, title, photo, initials?}` and `description: text`. Consider whether to add a `slug` field too (today the route uses `_id` as the slug param — see Section 5 architectural questions).
- **location**: add `heroImage` and `description` fields — `IndiaLocationClient` falls back to the existing `photo` field and renders no subtitle without `description`.
- **webinar**: review `speakers` schema — only `{initials, name, role}` today. Future additions like `photo`, `bio`, `linkedinUrl` would let `IndiaWebinarClient` render real speaker portraits in place of initial circles.
- **course**: review `modules` schema completeness — `{number, name, duration}` today. A `body: blockContent` or `description: text` per-module would let `IndiaCourseClient` render expanded module detail beyond the spine list.

## 2. GROQ projection updates

Fields that exist on the schema but aren't fetched in `src/lib/queries.ts`, so the india Clients never see them.

- **intent**: not pulled in any projection. Critical — without it, intent-gated forms never render beyond the hero.
- **callouts**: present on Brand and Solution per session 5a; not in any projection. ProTipsCallout sections render empty.
- **relatedBrands.description**, **relatedBrands.productLines**: dereferenced too shallowly in the Solution projection. `IndiaSolutionClient` PortfolioRow bodies read thin as a result.
- Any field added per Section 1 above will also need a matching projection update. This is automatic per-field once the schema work happens; no need to enumerate twice.

## 3. Real content sourcing

Where real images/data should replace hardcoded fallbacks once schemas land.

- **Industry application photography**: `sample_images/` has ~31 photos; map applicable ones to the industries listed on each Brand/Solution `applications` field.
- **Customer logos**: not yet present in `sample_images/`; need a separate source.
- **Per-page `photoTabSet` content**: needs to be authored for each Persona once the schema field exists.
- **Related-content hardcoded fallbacks**: every Group B/C/D Client that shows "related X" tiles uses a placeholder SVG/label fallback (CaseStudy related stories, Post related posts, Guide related guides, Webinar speaker portraits, ClassEvent instructor portraits). Real content sourcing follows the schema additions in Section 1.
- **Map data for `IndiaLocationClient`**: the map placeholder section is intentionally a styled "MAP" graphic; real Google Maps / Mapbox / static-image embedding is out of scope this session. See Section 4 entry.

## 4. Stylistic / structural deltas vs reference

Things that aren't broken but don't match the reference rhythm. Each entry: which Client, which reference, what's different, suggested fix.

- **IndiaSolutionClient**: testimonials section present in reference, not in spec, not implemented. Add as §7 re-skin work or document the omission.
- **IndiaProductLinesClient**: black product-band spotlight from reference shipped as a light-surface 50/50 split. Stylistic tightening pass needed.
- **IndiaBrandClient**: industrial applications grid uses placeholders (covered by Section 1 schema work).
- **IndiaPersonaClient**: structurally accurate but content-thin until schema enrichment lands.
- **IndiaLocationClient — map placeholder**: section renders a styled "MAP" graphic with the address overlaid. Real integration (Google Maps embed, Mapbox tile, or static map image) is a follow-up; needs an API key decision and the place where to store/inject it.
- **Speaker/Instructor card pattern in `IndiaWebinarClient` / `IndiaClassEventClient`**: both render dark person-cards inline (initials circle, name, role/title). This is not formalized as a composite component — if a third use case appears, extract into `IndiaPersonCard` or similar. For now the inline implementation is intentional and noted here so it's a discoverable cleanup item.
- **`IndiaCourseClient` numbered-module spine vs `IndiaClassEventClient` seats bar**: both are inline implementations rather than reusable composites. Same fold-out logic applies — promote to composites only if a third consumer appears.

## 5. Architectural questions (decisions, not bugs)

Items that surfaced as judgment calls and need a real decision before the family is "complete."

- **Raw Sanity shape vs normalized data layer**: India Clients consume raw Sanity documents directly; other families consume normalized `BrandData` / `SolutionData`. Is India's approach the right long-term pattern, or should India retrofit to match? See session 5d summary, "Places where reference pages and spec disagreed" #4.
- **§8 page-type × component matrix reconciliation**: the matrix lists composites for ProductLines/Persona that the shipped Clients don't render. Pick a winner per cell.
- **TemplateBadge red vs the India family's electric-blue chip** in the sandbox grid: cosmetic; document the chosen pattern and apply it consistently.
- **ClassEvent route uses `_id` as the `[slug]` segment**: classEvent has no slug field on its schema (the schema's `preview.select.title` reads `course.title`). The `/india/class-event/[slug]/page.tsx` route binds the `[slug]` param to the document `_id`. This is functional but unusual. Either: (a) add a real `slug` field to the classEvent schema; or (b) consider whether ClassEvent should be addressable at all — `/india/class-calendar/` could be the only entry point and ClassEvent stays as embedded objects on a calendar view. Decide before promoting the india family beyond the sandbox.
- **Inline GROQ query in `src/app/india/class-event/[slug]/page.tsx`**: the single-document classEvent projection is inlined in the route file rather than added to `src/lib/queries.ts`, because (a) the existing `classCalendarQuery` is list-shape, and (b) the session 5e brief said reuse queries unmodified. Promote to a named `classEventQuery` + `allClassEventIdsQuery` in `queries.ts` during cleanup, alongside any decision about the schema slug question above.

## 6. Known TBD-verify comments by file

A flat list of every `TBD-verify` comment in `src/components/india/` and `src/components/templates-india/`. Generated by grep at cleanup time; no need to enumerate now — see grep output at cleanup time.

Session 5e added approximately 15–20 new `TBD-verify` comments across the 8 new Clients, covering: hardcoded related-content tiles, hardcoded instructor/speaker portraits, schema-gap placeholder values (classEvent.name, classEvent.description, classEvent.instructors, teamMember.expertise, location.heroImage, location.description, course.duration display), and inline-component patterns awaiting promotion to composites if reused.

## 7. Other family adaptations

`IndiaGuideClient` consumes the migrated callout shape (`{type, title, body, chipLabel?}`) added in session 5a. Four other family Guide Clients still read the legacy `{label, body: text}` shape and will fail to render any new-shape callout authored against the unified schema.

Files to adapt:

- `src/app/simple/guide/[slug]/page.tsx` (around lines 42-46 per 5a NOTES.md)
- `src/app/ec/guide/[slug]/page.tsx` (around lines 42-46)
- `src/app/appealing/guide/[slug]/page.tsx` (around lines 42-46)
- `src/components/templates-branded/BrandedGuideClient.tsx` (around lines 100-108 — renders `c.body` as raw string, would print `[object Object]`)

Adaptation pattern: replace the legacy callout read with the shared PortableText component using a family-appropriate components map (or the default map for families without a custom override). This work is part of the broader `.split('\n\n')` flattening cleanup deferred per §10 item 4 of india-design-system.md.

---

Last updated: end of session 5e (all 12 page-type Clients shipped; cleanup-queue items from Groups B/C/D and the ClassEvent slug question added).
Will be appended to as sessions 5f, 5g surface more gaps.
