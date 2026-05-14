# india family components

The **india family** is the lead-generation aesthetic of the sandbox — a sales-document feel that treats the contact form as a first-class hero citizen, photo-heavy with small precise red accents and italic uppercase Barlow Condensed type. It is one of six template families (alongside EyeCatching v2, EyeCatching, Simple, Appealing, Strong, Branded) and is being built incrementally on branch `feat/india-foundation` across several sessions.

**Canonical spec:** [docs/india-design-system.md](../../../docs/india-design-system.md). When this README and the spec diverge, the spec wins.

## Cleanup queue

Known gaps, schema additions, projection updates, and stylistic deltas vs reference are tracked in [docs/india-cleanup-queue.md](../../../docs/india-cleanup-queue.md). Items get addressed in a dedicated cleanup pass after the full 12-page-type family ships.

## Files in this folder (as of session 5c)

```
src/components/india/
├── README.md                       ← this file
├── types.ts                        ← shared TS shapes (LeadForm, PhotoTab, Callout) mirroring 5a Sanity object schemas
├── portableText.ts                 ← india-specific PortableTextComponents map; consumers pass it explicitly at the call site
├── atoms/
│   ├── index.ts                    ← re-exports all atoms
│   ├── IndiaH2.tsx                 ← H2 with red-tick underline; alignable; can render as h3 semantically
│   ├── IndiaCtaButton.tsx          ← variant-bound CTA: 'hero' (orange) | 'body' (red). No free color escape hatch.
│   ├── IndiaGlassCard.tsx          ← translucent blue panel with intensity prop ('light' | 'medium' | 'heavy')
│   └── IndiaCaptionPill.tsx        ← translucent dark label for overlaying photo tiles; absolutely positioned
├── index.ts                        ← re-exports atoms + simple + composites + types
├── IndiaSectionBreak.tsx           ← (5b) pure-typography section-break band ("TRANSFORM YOUR MANUFACTURING PROCESS"); optional portrait inset
├── IndiaTickCheckList.tsx          ← (5b) red-tick bullet list for advantages/capabilities
├── IndiaLogoCarousel.tsx           ← (5b) customer-logo trust-bar; CSS-only infinite marquee with hover pause
├── IndiaPhotoGrid.tsx              ← (5b) N-up photo grid with caption pills
├── IndiaHeroWithForm.tsx           ← (5c) hero with right-rail lead-gen form; tap-to-reveal form on mobile; composes IndiaRepeatableLeadForm
├── IndiaPortfolioRow.tsx           ← (5c) alternating-side image+narrative row; body accepts string or PortableTextBlock[]
├── IndiaProTipsCallout.tsx         ← (5c) bordered red-outline editorial callout; consumes the shared `callout` Sanity type
├── IndiaGlasseyTabs.tsx            ← (5c) photo-tab strip with red-gradient overlays; <details> accordion on mobile
├── IndiaDarkCategoryCard.tsx       ← (5c) black card with red top edge; sm/md/lg size variants
└── IndiaRepeatableLeadForm.tsx     ← (5c) mid-page form repeat; inline or card variant; placement-aware padding/background
```

**Where page-type Clients live:** Real india page-type Clients (`IndiaBrandClient`, `IndiaSolutionClient`, `IndiaCaseStudyClient`, etc.) live under [src/components/templates-india/](../templates-india/), NOT this folder. This folder (`src/components/india/`) is for family-shared atoms, simple components, and composites — the visual-language primitives. The `templates-india/` folder is for page-type Clients that compose those primitives into full pages. Group A Clients shipped in session 5d; Group B/C/D Clients shipped in session 5e. See [docs/india-design-system.md §8](../../../docs/india-design-system.md) for the page-type × component matrix.

## Conventions

- The scoped reproduction color **india-orange `#F15C30`** (used only on the hero CTA per [§2 footnote](../../../docs/india-design-system.md)) is defined inline in `atoms/IndiaCtaButton.tsx` only. It is **not** in `PHILLIPS_COLORS` and must **not** leak to globals.css or any other file.
- All other colors map to `PHILLIPS_COLORS` entries (`red`, `blue`, `maroon`, `black`, `grey`, `light`) via [src/lib/constants.ts](../../lib/constants.ts).
- Type uses the project's italic-uppercase Barlow Condensed system via `F_DISPLAY` / `F_BODY` / `F_LIGHT` (constants.ts) or `.f-display` / `.f-body` / `.f-light` (globals.css utility classes).
- No new dependencies are added in this folder. CSS animations only — no carousel/animation libraries.

## Build history (commits on `feat/india-foundation`)

- Session 5a — schema additions, Guide callouts migration, shared PortableText renderer (commits A–C)
- Session 5b — atoms + 4 simple components + primitives preview page (commits D–E)
- Session 5c — 6 composite components + composites preview page (commits F–G)
- Session 5d+ — real india page-type clients and `/india/*` production routes

Developer preview pages (both noindex; not part of production navigation):
- [/india/primitives-preview](../../app/india/primitives-preview/page.tsx) — atoms + simple components
- [/india/composites-preview](../../app/india/composites-preview/page.tsx) — composites + an assembled mini-page
