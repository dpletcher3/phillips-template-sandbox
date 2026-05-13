# india family components

The **india family** is the lead-generation aesthetic of the sandbox — a sales-document feel that treats the contact form as a first-class hero citizen, photo-heavy with small precise red accents and italic uppercase Barlow Condensed type. It is one of six template families (alongside EyeCatching v2, EyeCatching, Simple, Appealing, Strong, Branded) and is being built incrementally on branch `feat/india-foundation` across several sessions.

**Canonical spec:** [docs/india-design-system.md](../../../docs/india-design-system.md). When this README and the spec diverge, the spec wins.

## Files in this folder (as of session 5b)

```
src/components/india/
├── README.md                   ← this file
├── portableText.ts             ← india-specific PortableTextComponents map; consumers pass it explicitly to <PortableText> at the call site
├── atoms/
│   ├── index.ts                ← re-exports all atoms
│   ├── IndiaH2.tsx             ← H2 with red-tick underline; alignable; can render as h3 semantically
│   ├── IndiaCtaButton.tsx      ← variant-bound CTA: 'hero' (orange) | 'body' (red). No free color escape hatch.
│   ├── IndiaGlassCard.tsx      ← translucent blue panel with intensity prop ('light' | 'medium' | 'heavy')
│   └── IndiaCaptionPill.tsx    ← translucent dark label for overlaying photo tiles; absolutely positioned
├── index.ts                    ← re-exports atoms + simple components
├── IndiaSectionBreak.tsx       ← pure-typography section-break band ("TRANSFORM YOUR MANUFACTURING PROCESS"); optional portrait inset
├── IndiaTickCheckList.tsx      ← red-tick bullet list for advantages/capabilities
├── IndiaLogoCarousel.tsx       ← customer-logo trust-bar; CSS-only infinite marquee with hover pause
└── IndiaPhotoGrid.tsx          ← N-up photo grid with caption pills; uses IndiaCaptionPill
```

**Not yet built (session 5c+):** `IndiaHeroWithForm`, `IndiaPortfolioRow`, `IndiaProTipsCallout`, `IndiaGlasseyTabs`, `IndiaDarkCategoryCard`, `IndiaRepeatableLeadForm`. See [docs/india-design-system.md §5](../../../docs/india-design-system.md) for specs.

## Conventions

- The scoped reproduction color **india-orange `#F15C30`** (used only on the hero CTA per [§2 footnote](../../../docs/india-design-system.md)) is defined inline in `atoms/IndiaCtaButton.tsx` only. It is **not** in `PHILLIPS_COLORS` and must **not** leak to globals.css or any other file.
- All other colors map to `PHILLIPS_COLORS` entries (`red`, `blue`, `maroon`, `black`, `grey`, `light`) via [src/lib/constants.ts](../../lib/constants.ts).
- Type uses the project's italic-uppercase Barlow Condensed system via `F_DISPLAY` / `F_BODY` / `F_LIGHT` (constants.ts) or `.f-display` / `.f-body` / `.f-light` (globals.css utility classes).
- No new dependencies are added in this folder. CSS animations only — no carousel/animation libraries.

## Build history (commits on `feat/india-foundation`)

- Session 5a — schema additions, Guide callouts migration, shared PortableText renderer (commits A–C)
- Session 5b — atoms + 4 simple components + primitives preview page (commits D–E)
- Session 5c+ — composite components and real india routes

The developer preview page lives at [/india/_primitives](../../app/india/_primitives/page.tsx) (noindex; not part of the production navigation system).
