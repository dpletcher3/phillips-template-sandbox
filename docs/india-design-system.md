# India Family — Design System Specification

Session 4 of the WordPress → Next.js migration. **Spec only — no `src/` files modified, no components built, no routes added.** Grounded against the 4 reference captures in `docs/inspiration/` and the existing sandbox conventions in [src/lib/constants.ts](../src/lib/constants.ts), [src/app/globals.css](../src/app/globals.css), [docs/inventory.md](inventory.md), and the three reference clients ([SimpleBrandClient](../src/components/templates-simple/brand/SimpleBrandClient.tsx), [AppealingBrandClient](../src/components/templates-appealing/brand/AppealingBrandClient.tsx), [StrongHero](../src/components/strong/StrongHero.tsx)).

All measurements marked **TBD-verify** are proposed reasonable values that need to be confirmed against the live page in DevTools (or against larger crops of the screenshots) before implementation begins in session 5+.

---

## 1. Identity statement

The india family is the **lead-generation aesthetic** of the sandbox: a sales-document feel that treats the contact form as a first-class hero citizen, not a footer afterthought. Every page is a category-landing → narrative → social-proof → conversion funnel rendered in flat photography, generous whitespace, italic uppercase typography, and small precise red accents. Where Strong is HUD and Appealing is animated and EyeCatching is editorial-dark, **india is the brochure** — a confident, photo-heavy, conversion-tuned layout that reuses the existing Phillips brand palette but redistributes it with strict rules (blue lives on glass, maroon stays in the footer, orange is reserved for the hero CTA, red carries everything else). A developer landing on an india page should immediately read it as "the page that sells," distinct from the five other families that prioritize browsing, exploration, or storytelling.

---

## 2. Color system

Six of the eight india tokens map to existing values in `PHILLIPS_COLORS` ([src/lib/constants.ts:1-10](../src/lib/constants.ts#L1-L10)) — scoped re-uses, not new colors. Two tokens (`india-white`, `india-orange`) are family-scoped literals defined only in the india stylesheet and **not** added to `PHILLIPS_COLORS`; see the notes after the table. The "Where it does NOT appear" column is enforced as part of the family's identity.

| Token | Hex | Maps to | Role | Where it appears | Where it does NOT appear |
|---|---|---|---|---|---|
| `india-red` | `#F9423A` | `PHILLIPS_COLORS.red` | Body-zone CTA, all micro-marks, accent text on key words | Body-section CTAs, H2 underline ticks, check-list bullet ticks, dark-card top edge, FAQ accordion accent, footer top stripe, glassey-tab red gradient overlay | Hero-zone CTAs (those are orange), large flat fills (no red-flood backgrounds), body copy color |
| `india-orange` | `#F15C30` | scoped reproduction color — defined only in `src/components/india/` stylesheet, **NOT** added to `PHILLIPS_COLORS` | Hero-zone CTA only | Hero-zone primary CTA (the one inside or directly under the blue glass card), occasional small eyebrow chip | Body-section CTAs, any non-hero button, dividers, ticks, underlines, body copy, large fills |
| `india-blue` | `#00AEEF` | `PHILLIPS_COLORS.blue` | Glass-surface signal color | Hero translucent left card background, lead-gen form panel background (hero + repeats), blue testimonial card variant, occasional inline link accent | Body section backgrounds, CTAs, ticks, dividers, body copy. Blue is **for glass and forms only** in this family. |
| `india-maroon` | `#3F0017` | `PHILLIPS_COLORS.maroon` | Footer surface; medical-industry glassey-tab red-gradient anchor | Footer background, one stop in the glassey-tab overlay gradient | Anywhere else. **Footer-only** in the body of the page. |
| `india-black` | `#000000` | `PHILLIPS_COLORS.black` | Dark-section backgrounds, primary body type on light surfaces | Section-break bands when type-only, dark product-spotlight bands ("PLC Series"), dark machine-category cards, testimonials section background, headline + body type on white sections | Light surfaces (those use white), CTA fills (those are red or orange) |
| `india-white` | `#FFFFFF` | literal `#FFFFFF` (Branded precedent — `--branded-white` in [globals.css:52](../src/app/globals.css#L52); not in `PHILLIPS_COLORS`) | Primary surface, type on dark sections | Section backgrounds, card interiors, type on dark bands and in the hero glass card | — |
| `india-gray` | `#647883` | `PHILLIPS_COLORS.grey` | Secondary body type, subtle dividers, gallery captions | Body paragraphs on light surfaces, gray testimonial card variant, comparison-table body, attribution chips | Headlines, primary CTAs, large fills |
| `india-light` | `#D7DFE3` | `PHILLIPS_COLORS.light` | Subtle dividers, table-row alternation, photo-grid pill borders | Specs table row stripe, photo-grid caption-pill outline, hairline dividers | Section backgrounds (those are white or black), CTA surfaces |

**Note on `india-white`:** `PHILLIPS_COLORS` does not include pure white — only `#F2F4F6` (`bg`) and `#D7DFE3` (`light`). The Branded family already established the precedent of a `--branded-white: #FFFFFF` literal in [globals.css:52](../src/app/globals.css#L52) for the same reason. India follows that precedent rather than introducing a new entry in `PHILLIPS_COLORS`.

### Two-tone CTA grammar

> **Hero-zone CTAs are `india-orange`. Body-zone CTAs are `india-red`. They are never mixed within a zone, and never substituted across zones.**

"Hero zone" means inside or directly attached to the blue glass card at the top of the page (the first viewport's primary CTA). Every other CTA — section CTAs, repeated GET IN TOUCH forms, "EXPLORE MORE", "READ CASE STUDY", footer CTAs — is red. The two-tone rule is enforced at the component level (see `IndiaCtaButton` in §6, which takes a `variant: 'hero' | 'body'` prop, not free color), not at the consumer level.

### Note on `india-orange` (`#F15C30`) vs Phillips brand orange (`#F68B33`)

The four WordPress reference pages in `docs/inspiration/` use `#F15C30` (a redder, more saturated orange) as the hero CTA color, with 38–45 occurrences per page in the rendered HTML. The Phillips brand orange in `PHILLIPS_COLORS.gold` is `#F68B33` — a warmer, yellower shade. The two are visibly different at button scale, and the india family's conversion-tuned hero feel depends on the redder, more urgent `#F15C30`.

Three approaches were considered: (a) override to `PHILLIPS_COLORS.gold` and accept a warmer hero CTA than the references; (b) add `#F15C30` to `PHILLIPS_COLORS` as a new top-level brand token; (c) define `#F15C30` as a family-scoped literal in the india stylesheet only, leaving `PHILLIPS_COLORS` unchanged. Option (c) was chosen — it preserves the brand-system discipline (`PHILLIPS_COLORS` remains the single source of truth for cross-family tokens) while letting the india family faithfully reproduce its source aesthetic. The precedent is the Branded family's `--branded-white: #FFFFFF` in [globals.css:52](../src/app/globals.css#L52), which is similarly a family-local literal that did not graduate to `PHILLIPS_COLORS`. The brand-discipline tradeoff: `india-orange` is intentionally outside the cross-family palette and cannot be referenced from any non-india component.

---

## 3. Typography

The india family stays inside the existing Phillips type system — **Barlow Condensed, italic, uppercase**, in three weights (300 / 400 / 700), per [src/lib/constants.ts:12-31](../src/lib/constants.ts#L12-L31). No new font face is introduced. The utility classes `.f-display`, `.f-body`, `.f-light` from [globals.css:29-34](../src/app/globals.css#L29-L34) are reused directly.

### Type scale (proposed; sizes measured from desktop 1440px captures)

| Step | Use | Weight | Size (px) | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `display` | Hero headline (inside blue glass card) | 700 | 44 — TBD-verify | 1.05 | 1px |
| `h1` | Page-intro H1 ("PHILLIPS FIBER LASER CUTTING MACHINE — PRECISION, SPEED & EFFICIENCY!") | 700 | 36 — TBD-verify | 1.1 | 1px |
| `h2` | Centered section titles ("OUR PORTFOLIO OF CNC METAL FORMING MACHINES") | 700 | 28 — TBD-verify | 1.15 | 1.5px |
| `h3` | Row title ("JFY INTERNATIONAL"), card title | 700 | 20 — TBD-verify | 1.2 | 1px |
| `h4` | Sub-heading inside cards, accordion question | 700 | 16 — TBD-verify | 1.3 | 1px |
| `body-large` | Hero card body, page-intro lead | 400 | 16 | 1.7 | 0 |
| `body` | Default paragraph | 400 | 14 | 1.7 | 0 |
| `small` | Caption, eyebrow, chip label, attribution | 400 | 11 | 1.5 | 1.5px (uppercase) |

All headline rows are **italic uppercase** by family rule. Body and body-large keep italic when used as eyebrow or chip text; they are upright sentence-case when used as long-form paragraph text (the only deliberate break from the all-caps rule — needed for the "Advantages" check-list readability on the fiber-laser-cutting page).

### Section-break treatment — `.india-section-break`

The recurring "TRANSFORM YOUR MANUFACTURING PROCESS" band: pure typography, no image, no CTA when in its base variant. Visible on metal-forming, fiber-laser-cutting, and 5-axis-machining (see [docs/inspiration/metal-forming/desktop.png](inspiration/metal-forming/desktop.png) at the band between "Industrial Applications" and "Reimagine Your Manufacturing").

| Property | Value |
|---|---|
| Container background | `india-white` (base) or `india-black` (inverted variant on 5-axis-machining) |
| H2 size | 32px — TBD-verify |
| H2 weight / style | 700 italic uppercase |
| H2 color | `india-black` on white surface, `india-white` on black surface |
| Tagline beneath H2 | `body` size, `india-gray`, single line, sentence-case allowed |
| Tagline margin-top | 12px |
| Section vertical padding | 64px top, 64px bottom (TBD-verify — looks generous in screenshots) |
| Optional portrait inset | square photo, ~280px × 280px — TBD-verify, anchored at the left third on the `withPortrait` variant (fiber-laser-cutting uses this) |
| H2 red-tick underline | **excluded** from this section — the section-break band is intentionally austere |

### H2 red-tick underline

Centered H2s on body sections get a short red horizontal tick directly below the text. Left-aligned H2s (e.g. "ADVANTAGES" on fiber-laser-cutting) do **not** get a tick.

| Property | Value |
|---|---|
| Width | 48px — TBD-verify (visually ~40–60px) |
| Height | 3px — TBD-verify |
| Color | `india-red` |
| Position | Centered horizontally beneath the H2 text |
| Margin-top from H2 baseline | 14px — TBD-verify |
| Margin-bottom (gap to section content) | 36px |
| Border-radius | 0 (sharp rectangle, not pill) |

Render as a `<span aria-hidden="true">` block element, not a `::after` pseudo-element, so it can be themed via a single CSS variable when other families pick up the pattern.

---

## 4. Spacing & layout

### Container max-widths

| Breakpoint | Container max-width | Side padding |
|---|---|---|
| Desktop (≥1024px) | 1240px — TBD-verify (visually ~1200–1280) | 48px |
| Tablet (≥768px) | 100% width minus padding | 32px |
| Mobile (<768px) | 100% width minus padding | 20px |

Matches the existing sandbox convention seen in [AppealingBrandClient](../src/components/templates-appealing/brand/AppealingBrandClient.tsx) (`maxWidth: '1280px'` + `padding: 48px`) and is consistent with the other families. No new spacing scale is introduced.

### Section vertical padding scale

| Class | Use | Padding (Y) |
|---|---|---|
| `section-tight` | Consent strip, breadcrumb | 12px |
| `section-base` | Default body section | 64px |
| `section-loose` | Hero, terminal CTA, section-break bands | 80px |
| `section-edge` | Dark spotlight band ("PLC Series") | 96px |

### Hero height behavior

- Desktop: `min-height: 540px` — TBD-verify (looks ~540–600px in screenshots).
- Tablet: `min-height: 480px` (form panel stacks below blue glass card; both remain in the first viewport).
- Mobile: `min-height: auto`; blue glass card and form stack vertically; the hero photograph becomes a 16:9 banner above them.
- Hero photograph: `object-fit: cover`, always with a dark gradient overlay (left→right, `rgba(0,0,0,0.45)` → `rgba(0,0,0,0)`) to keep the glass card legible on bright spark photography.

### Alternating-row gutter (brand-portfolio rows)

- Image column: ~480px / 40% of container — TBD-verify.
- Narrative column: ~640px / 55% of container — TBD-verify.
- Inter-column gutter: 48px desktop / 32px tablet / 24px mobile.
- Inter-row vertical gap: 64px.
- Even rows: image-left, copy-right. Odd rows: copy-left, image-right. Index from 0; configured by component, not by consumer.

---

## 5. Component inventory — new components

All components below live under `src/components/india/`, named with the `India` prefix.

> Prop sketches reflect the shipped 5b/5c implementations; refer to the actual TS types in [src/components/india/types.ts](../src/components/india/types.ts) and individual component files for canonical signatures.

### 5.1 `IndiaHeroWithForm`

- **Path:** `src/components/india/IndiaHeroWithForm.tsx`
- **Visual:** Full-bleed photographic background with a dark left-to-right gradient overlay. Left side: a `IndiaGlassCard` (blue translucent panel) containing the headline H1, optional sub-list check items, body copy, and a single orange `IndiaCtaButton variant="hero"`. Right side: a 4–6 field lead-gen form panel on a flat `india-blue` surface with white labels and a red submit button.
- **Reference:** [docs/inspiration/metal-forming/desktop.png](inspiration/metal-forming/desktop.png) (top 540px), also identical structure on all four reference pages.
- **Props sketch (as shipped in 5c):** The `form` prop uses the `LeadForm` type from `src/components/india/types.ts`; the hero composes `IndiaRepeatableLeadForm` internally with `placement='hero'` and an internal `__internalFromHero` flag that suppresses the soft guardrail warning. **The hero always renders the form** — there is no formless variant. If a page needs a formless hero, use a different hero component (TBD; not part of the §5 inventory).
  ```ts
  import type { LeadForm } from '@/components/india'

  type IndiaHeroWithFormProps = {
    eyebrow?: string
    title: string
    subtitle?: string
    backgroundImage: string | { src: string; alt: string }
    primaryCta?: { label: string; href: string }
    form: LeadForm
  }
  ```
- **Mobile:** Glass card and form stack vertically. Photo becomes a 16:9 banner. Form moves below the glass card; CTA stays above the form for fold-priority.
- **Tokens consumed:** `india-blue` (glass + form panel), `india-white` (type), `india-orange` (CTA via `IndiaCtaButton variant="hero"`), `india-red` (form submit button via the form's own internal styling).
- **Dependencies:** `IndiaGlassCard`, `IndiaCtaButton`, `IndiaRepeatableLeadForm`, `IndiaTickCheckList` (when `bullets` is provided).

### 5.2 `IndiaPortfolioRow`

- **Path:** `src/components/india/IndiaPortfolioRow.tsx`
- **Visual:** A single horizontal row split image / narrative. Image (~40% width) shows a product photo; narrative side (~55% width) shows a small brand logo, an H3 row title, descriptive paragraph, and a red `IndiaCtaButton variant="body"`. Row sides alternate by index.
- **Reference:** [docs/inspiration/5-axis-machining/desktop.png](inspiration/5-axis-machining/desktop.png) — the five-row HAAS → APEC → HERMLE → Reichenbacher → Kitamura strip is the canonical example. [docs/inspiration/metal-forming/desktop.png](inspiration/metal-forming/desktop.png) has the three-row variant.
- **Props sketch (as shipped in 5c):**
  ```ts
  type IndiaPortfolioRowProps = {
    index: number                                   // even = image left, odd = image right (desktop/tablet only)
    image: string | { src: string; alt: string }
    brandLabel?: string                             // small uppercase brand or partner name above the title
    title: string
    body: string | PortableTextBlock[]              // plain text → <p>; blocks → routed via shared PortableText + india components
    subActions?: Array<{ label: string; href: string }>  // chevron-prefixed text links under the body
    primaryCta?: { label: string; href: string }    // IndiaCtaButton variant='body'
  }
  ```
- **Mobile:** Always stacks image-above-copy regardless of `index`. The alternation rule is desktop/tablet only.
- **Tokens consumed:** `india-white` (background), `india-black` (title), `india-gray` (body), `india-red` (CTA + subAction chevrons).
- **Dependencies:** `IndiaCtaButton`, `PortableText` (when `body` is blocks).

### 5.3 `IndiaSectionBreak`

- **Path:** `src/components/india/IndiaSectionBreak.tsx`
- **Visual:** Pure-typography band, no image, no CTA. Centered H2 with optional one-line tagline below. Two surface variants: `surface="light"` (white background, black type) and `surface="dark"` (black background, white type). Optional `portrait` prop adds a square photograph inset on the left.
- **Reference:** [docs/inspiration/metal-forming/desktop.png](inspiration/metal-forming/desktop.png) "TRANSFORM YOUR MANUFACTURING PROCESS" band — the pure-type variant. [docs/inspiration/fiber-laser-cutting/desktop.png](inspiration/fiber-laser-cutting/desktop.png) shows the portrait-inset variant.
- **Props sketch:**
  ```ts
  interface IndiaSectionBreakProps {
    headline: string;
    tagline?: string;
    surface?: 'light' | 'dark';      // default 'light'
    portrait?: { src: string; alt: string }; // when provided, anchors left third
  }
  ```
- **Mobile:** Portrait, when present, drops to a 1:1 image above the type, full-width. Padding compresses to 48px Y.
- **Tokens consumed:** `india-white` / `india-black` per `surface`, `india-gray` for tagline.
- **Dependencies:** none.

### 5.4 `IndiaProTipsCallout`

- **Path:** `src/components/india/IndiaProTipsCallout.tsx`
- **Visual:** White-interior card framed by a thick red outline. Chip label "PRO TIPS" (or per-`type` default, see mapping below) on a small red chip in the top-left of the frame, breaking through the border. Title H3 inside the frame. Body is rendered via the shared PortableText renderer (§10 RESOLVED item 4); bulleted lists in the body get the india red-tick treatment via the `indiaPortableTextComponents` map the component passes explicitly at render.
- **Reference:** [docs/inspiration/5-axis-machining/desktop.png](inspiration/5-axis-machining/desktop.png) — the "PRO TIPS / 5-AXIS MACHINING ESSENTIALS" card is the canonical example. **This is the most idiosyncratic component on any of the four reference pages.**
- **Props sketch:** The component consumes the shared `callout` Sanity object directly (see §10 RESOLVED Open Question 3 — the new named type, added to Brand and Solution, with Guide migrated into it).
  ```ts
  import type { PortableTextBlock } from '@portabletext/types'

  type Callout = {
    type: string                                      // discriminator — see Type → chip label mapping
    title: string
    body: PortableTextBlock[]
    chipLabel?: string                                // optional explicit override
  }

  type IndiaProTipsCalloutProps = {
    callout: Callout
    style?: 'default' | 'inverted'                    // visual treatment
  }
  ```
- **Mobile:** Same composition, padding compresses; border-width may step from 3px down to 2px (TBD-verify) to avoid feeling over-heavy on a narrow viewport.
- **Tokens consumed:** `india-red` (border + chip background + red-tick on body list items), `india-white` (interior + chip type), `india-black` (body type).
- **Dependencies:** Shared PortableText renderer established in §10 RESOLVED item 4. India primitives pass the india-specific components map (`indiaPortableTextComponents` from `src/components/india/portableText.ts`) explicitly at the call site; that map applies the red-tick list-item treatment.
- **Border:** 3px solid `india-red` — TBD-verify (the screenshot suggests 3–4px).

#### Type → chip label mapping

The `type` discriminator determines the default chip label when `chipLabel` is not explicitly set:

| `type` value | default `chipLabel` |
|---|---|
| `'protips'` | `PRO TIPS` |
| `'tip'`     | `TIP` |
| `'warning'` | `WARNING` |
| `'note'`    | `NOTE` |
| `'callout'` | `CALLOUT` |

If `chipLabel` is explicitly set on the callout, it overrides the mapping. If the `type` is unknown, fall back to uppercasing the `type` value.

**Schema authoring note:** The `callout` schema (§10 RESOLVED item 3) fully specifies the `type` enum. Authors writing a pro-tip callout (`type: 'protips'`) must compose `body` as a Portable Text **bulleted list** — not paragraphs with line breaks — for the red-tick list-item rendering to apply correctly. The schema's `body` field description should carry this guidance.

### 5.5 `IndiaGlasseyTabs`

- **Path:** `src/components/india/IndiaGlasseyTabs.tsx`
- **Visual:** A horizontal strip of 4–6 photo-card tabs. Each tab is a vertical card with a full-bleed photo, a red-to-maroon gradient overlay (top-to-bottom or bottom-up — TBD-verify), and a centered or bottom-anchored white italic-uppercase label. Selected tab gets a slightly stronger red accent (top edge or border). Below the strip, the selected tab's body renders via the shared PortableText renderer (§10 RESOLVED item 4), with `indiaPortableTextComponents` passed explicitly at render.
- **Reference:** [docs/inspiration/medical-industry/desktop.png](inspiration/medical-industry/desktop.png) — the "APPLICATIONS" 6-up tab strip is the canonical example. Source uses EAEL `eael-tabs-glassey`; we re-implement in React without the WordPress dependency.
- **Props sketch:** Shape mirrors the new `photoTabSet` Sanity object type (see §10 RESOLVED Open Question 3) 1:1; the component does no shape adaptation.
  ```ts
  import type { PortableTextBlock } from '@portabletext/types'

  type PhotoTab = {
    image: unknown                                    // raw Sanity image object — same shape SanityImage.tsx consumes
    label: string
    body: PortableTextBlock[]                         // blockContent array off Sanity
    ctaUrl?: string
  }

  type IndiaGlasseyTabsProps = {
    tabs: PhotoTab[]
    initialTabIndex?: number                          // default 0
  }
  ```
- **Mobile:** Strip becomes a vertical stacked-card accordion. Each card expands in place; only one open at a time. The body renders identically across breakpoints — only the container chrome (horizontal-strip vs stacked-accordion) differs. (This is the duplicate "Applications" rendering visible in the medical-industry HTML — DOM contains both layouts with `eael-d-block` / `eael-d-none` toggles by breakpoint; we use a single component with responsive logic.)
- **Tokens consumed:** `india-red`, `india-maroon` (gradient stops), `india-white` (labels), `india-black` (body content surface).
- **Dependencies:** Relies on the shared PortableText renderer established in §10 RESOLVED item 4. India primitives pass `indiaPortableTextComponents` (from `src/components/india/portableText.ts`) explicitly at the call site.
- **Gradient:** `linear-gradient(180deg, rgba(249,66,58,0) 0%, rgba(63,0,23,0.85) 100%)` — TBD-verify; the screenshot shows red→deep-red darkening toward the bottom of each card.

### 5.6 `IndiaLogoCarousel`

- **Path:** `src/components/india/IndiaLogoCarousel.tsx`
- **Visual:** A horizontal strip of customer logos, monochrome (`#000` or `india-gray`), evenly spaced, scrolling infinitely. Subhead "TRUSTED BY MEDICAL LEADERS" or similar above the strip.
- **Reference:** [docs/inspiration/medical-industry/desktop.png](inspiration/medical-industry/desktop.png) — the "SOME OF OUR ESTEEMED CLIENTS" section.
- **Props sketch:**
  ```ts
  interface IndiaLogoCarouselProps {
    logos: Array<{ src: string; alt: string; href?: string }>;
    title?: string;             // optional headline above the strip
    autoScroll?: boolean;       // default true
  }
  ```
  Pause-on-hover is always on when `autoScroll` is enabled (not a separate prop). Scroll speed is fixed at the family-level default (CSS animation, no JS library). Reuse the marquee keyframes pattern from [BrandPageClient.tsx:51-56](../src/components/templates/brand/BrandPageClient.tsx#L51-L56).
- **Mobile:** Same infinite scroll; logos may scale 0.8×. Title stacks above.
- **Tokens consumed:** `india-white` (background), `india-black` / `india-gray` (logo treatment), `india-gray` (headline).
- **Dependencies:** none. (Reuse animation keyframes pattern from [BrandPageClient.tsx:51-56](../src/components/templates/brand/BrandPageClient.tsx#L51-L56) — the marquee already in the sandbox.)

### 5.7 `IndiaPhotoGrid`

- **Path:** `src/components/india/IndiaPhotoGrid.tsx`
- **Visual:** A 6-up grid of square photo tiles. Each tile has a translucent dark caption pill anchored at the bottom-left with an italic-uppercase Barlow Condensed label. The whole tile is a link.
- **Reference:** [docs/inspiration/metal-forming/desktop.png](inspiration/metal-forming/desktop.png) — "INDUSTRIAL APPLICATIONS" section. Identical pattern on fiber-laser-cutting and 5-axis-machining.
- **Props sketch:**
  ```ts
  interface IndiaPhotoGridProps {
    tiles: Array<{ image: string | unknown; alt: string; caption: string; href?: string }>;
    layout?: '6-up' | '4-up' | '3-up';   // default '6-up'
  }
  ```
  `image` accepts either a string URL or a raw Sanity image object (passed through to `SanityImage`). `layout` controls the desktop column count; tablet always 2-column; mobile always single-column scroll.
- **Mobile:** Single-column scroll; tile aspect stays 1:1; caption pill scales down to `small` type.
- **Tokens consumed:** `india-white` (background), `india-black` at 0.55 alpha (caption pill fill), `india-white` (pill type).
- **Dependencies:** `IndiaCaptionPill`.

### 5.8 `IndiaTickCheckList`

- **Path:** `src/components/india/IndiaTickCheckList.tsx`
- **Visual:** A vertical list of items, each prefixed by a small red check-tick. Items are upright sentence-case body type (the only typographic exception in the family — all-caps becomes hard to read at list density).
- **Reference:** [docs/inspiration/fiber-laser-cutting/desktop.png](inspiration/fiber-laser-cutting/desktop.png) "ADVANTAGES" section. Also used as the in-hero sub-category list on medical-industry.
- **Props sketch:**
  ```ts
  interface IndiaTickCheckListProps {
    items: string[];
    variant?: 'default' | 'inverted';   // 'default' = dark type on light surface; 'inverted' = light type on dark surface
  }
  ```
- **Mobile:** Stacks vertically with slightly tighter line-height; ticks shrink from 14px → 12px (TBD-verify).
- **Tokens consumed:** `india-red` (tick), `india-black` or `india-white` (type, based on `variant`).
- **Dependencies:** none.

### 5.9 `IndiaDarkCategoryCard`

- **Path:** `src/components/india/IndiaDarkCategoryCard.tsx`
- **Visual:** A deep-black card with a thin red top edge (2–3px). Contains a faint background machine product photo (low opacity), a small label/eyebrow, an H3 title in white italic uppercase, and an optional secondary line. Hover state: red top edge thickens, photo opacity steps up. Cards composed in a 3-up grid.
- **Reference:** [docs/inspiration/medical-industry/desktop.png](inspiration/medical-industry/desktop.png) — "MACHINES & TECHNOLOGY" section.
- **Props sketch (as shipped in 5c):**
  ```ts
  type IndiaDarkCategoryCardProps = {
    image: string | { src: string; alt: string }
    title: string
    description?: string
    href?: string
    size?: 'sm' | 'md' | 'lg'           // controls padding + image height + title size
  }
  ```
- **Mobile:** Cards stack to single column; image scales with the size prop.
- **Tokens consumed:** `india-black` (background), `india-red` (top edge), `india-white` (type), white-translucent (description).
- **Dependencies:** none.

### 5.10 `IndiaRepeatableLeadForm`

- **Path:** `src/components/india/IndiaRepeatableLeadForm.tsx`
- **Visual:** A 4–6 field lead-gen form on a flat `india-blue` panel. Labels above inputs, white text, white-stroke inputs with `india-white` interior on focus. Single red submit button at the bottom-right. Heading "GET IN TOUCH" or per-placement override.
- **Reference:** Appears on every one of the 4 reference pages. The hero variant is on every page; the mid-page variant repeats on fiber-laser-cutting, 5-axis-machining, and medical-industry (the latter has three placements total).
- **Props sketch:** The `form` prop is shaped to be passed directly from a Sanity query on the new `leadForm` object type (see §10 RESOLVED Open Question 3). The component does no shape adaptation — what comes off Sanity is what it consumes.
  ```ts
  type LeadFormField = {
    name: string
    type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
    required?: boolean
    options?: string[]                                  // for type: 'select'
  }

  type LeadForm = {
    title: string
    subtitle?: string
    fields: LeadFormField[]
    submitLabel: string
    destinationId: string                               // D365 form ID or webhook handle
    regionScope?: 'in' | 'us' | 'me' | 'my' | 'global'
  }

  type IndiaRepeatableLeadFormProps = {
    form: LeadForm
    placement: 'hero' | 'mid-page' | 'page-bottom'
    variant?: 'inline' | 'card'                         // visual treatment
  }
  ```
- **Mobile:** Fields stack to single column; submit button becomes full-width.
- **Tokens consumed:** `india-blue` (panel surface), `india-white` (labels + input type), `india-red` (submit), `india-gray` (placeholder text).
- **Dependencies:** none directly, but `IndiaHeroWithForm` and any intent-aware page-type client compose this component into their layout. Placement is intent-driven per the `intent` field formalized in §10 RESOLVED item 5: `'awareness'` (or unset) renders nothing beyond the hero form; `'consideration'` mounts one instance with `placement='mid-page'`; `'conversion'` mounts two (`'mid-page'` + `'page-bottom'`).

---

## 6. Shared atoms

### 6.1 `IndiaH2`

- **Path:** `src/components/india/atoms/IndiaH2.tsx`
- **Visual:** Italic uppercase Barlow Condensed 700 H2 with the red-tick underline baked in. Centered by default; left-aligned via prop (which suppresses the tick).
- **Props:** `{ children: ReactNode; align?: 'left' | 'center'; as?: 'h2' | 'h3' }`. The `as` prop lets the component render as a semantic `<h3>` while keeping the visual H2 treatment (useful for nested sections that shouldn't break heading-level outline). The red-tick underline always renders; alignment defaults to centered.
- **Tokens:** `india-black` (type, default), `india-white` (`onDark` variant — handled by parent surface color, not a prop), `india-red` (tick).

### 6.2 `IndiaCtaButton`

- **Path:** `src/components/india/atoms/IndiaCtaButton.tsx`
- **Visual:** Solid-fill rectangular button with italic uppercase Barlow Condensed 700 label, 11px font, 2px letter-spacing. Hover: 8% darken on fill. **Color is bound to `variant`** — there is no free-color escape hatch.
- **Props:** `{ variant: 'hero' | 'body'; children: ReactNode; href?: string; onClick?: () => void; size?: 'sm' | 'md' | 'lg' }`
- **Tokens:** `variant="hero"` → `india-orange` fill, `india-white` type. `variant="body"` → `india-red` fill, `india-white` type.
- **Enforces:** the two-tone CTA grammar from §2.

### 6.3 `IndiaGlassCard`

- **Path:** `src/components/india/atoms/IndiaGlassCard.tsx`
- **Visual:** A translucent `india-blue` panel with subtle white inner border. Used in the hero (anchored over the photograph) and over any photo-on-photo section where text needs a legible surface.
- **Props:** `{ children: ReactNode; intensity?: 'light' | 'medium' | 'heavy'; className?: string }`. `intensity` controls both the backdrop-filter blur amount and the background-color opacity in discrete steps (no free numbers). `className` is a pass-through so consumers can adjust layout positioning without re-styling the panel surface.
- **Tokens:** `india-blue` at discrete alphas (`light` ≈ 0.15, `medium` ≈ 0.25, `heavy` ≈ 0.88 — TBD-verify against screenshots), `india-white` (inner border, type).

### 6.4 `IndiaCaptionPill`

- **Path:** `src/components/india/atoms/IndiaCaptionPill.tsx`
- **Visual:** A short rounded-rectangle label with translucent dark fill, white italic-uppercase Barlow Condensed text, used as an overlay caption on the photo grid tiles and (in a smaller variant) as eyebrows on cards.
- **Props:** `{ children: ReactNode; position?: 'bottom-left' | 'bottom-center' | 'top-left' }`. Designed to be positioned absolutely over an image; parent must be `position: relative`. Typography size is fixed by the family scale (no size prop — pill is always `small` per §3); position determines absolute-positioning anchor.
- **Tokens:** `rgba(0,0,0,0.55)` background (`india-black` at 0.55 alpha — TBD-verify), `india-white` type.
- **Border-radius:** 4px (TBD-verify; the photo-grid pills in the screenshots look mildly rounded, not pill-shaped).

---

## 7. Re-skin notes for already-covered patterns

The existing sandbox families already implement these patterns in their own aesthetics; the india family does not need new components, only styling adjustments. Notes are aimed at the developer who will port the existing client into the india route prefix in session 5+.

- **FAQ accordion** — Reuse the [BrandPageClient](../src/components/templates/brand/BrandPageClient.tsx) tab-content pattern as the structural base, but render in white-surface mode with bottom-border separators (1px `india-light`), centered `IndiaH2` ("FREQUENTLY ASKED QUESTIONS"), plus-sign icon affordance on the right of each question (rotates to minus on open), italic uppercase question, sentence-case body. Accent color on the active row's left edge: `india-red`.

- **Flat-color testimonial cards** — 3-up grid on `india-black` background. Each card is a flat solid-color block (`india-blue`, `india-red`, `india-gray`) with a single quote in `india-white` italic uppercase Barlow Condensed (smaller than H3, larger than body — ~18px), and a small attribution chip in the bottom-left corner. **No portrait, no avatar** — that is the differentiator from the other families' testimonial patterns. Direct re-skin of the pattern observed on [docs/inspiration/metal-forming/desktop.png](inspiration/metal-forming/desktop.png).

- **Mega-menu navigation** — The india pages use a heavier mega-menu than the existing nav variants. For session 5+, port the existing [SimpleNav](../src/components/nav/SimpleNav.tsx) structure but: keep the black bar background; thicken the row to ~72px; add a top thin red marquee strip (1px) to echo the body sections; add a country/locale chip next to the logo (India flag, "IN") — `IndiaTopBar` would be the new atom if it grows beyond the existing nav variants. **No new nav component required at this stage; flag for session 5 decision.**

- **Footer** — `india-maroon` background, `india-white` type, four-column link layout, Phillips lockup top-left, social-icon row bottom-right, address block under the lockup. Echoes the WordPress footer faithfully and matches the existing footer treatment in [BrandedFooter](../src/components/branded/BrandedFooter.tsx) sufficiently that the Branded footer may simply be aliased with the india color tokens.

- **Breadcrumb** — Re-use [SimpleBreadcrumb](../src/components/SimpleBreadcrumb.tsx) styling intent (Home > Section > Page) but render with a small red separator chevron (`›`) instead of the slash, italic uppercase italic Barlow Condensed, color `india-gray` for non-active crumbs, `india-black` for the active crumb. Lives under the nav, above the hero, with a subtle 1px `india-light` bottom border.

- **Stats / metric strip** — Existing families use grid stats (SimpleBrandClient's 2x2 hero stats grid). For india, lean into the **hero-card-embedded sub-category check-list** pattern from medical-industry (`IndiaTickCheckList` inside `IndiaGlassCard`) rather than a separate stats strip. If a numeric stats strip is still needed for a specific page type (Brand, Solution), render it as a 4-column horizontal strip on `india-black` with `india-red` value digits in display-700 italic uppercase and `india-gray` labels in `small` size beneath — matching the existing pattern in [BrandPageClient.tsx:121-127](../src/components/templates/brand/BrandPageClient.tsx#L121-L127) but inverted color-wise.

---

## 8. Page-type × component matrix

Rows = the 12 page types from the existing families (per [docs/inventory.md](inventory.md)). Columns = the 10 new components from §5. **REQ** = required for that page type, **OPT** = optional, **—** = not applicable. Most page types use 3–6 components, not all 10.

Reference-page anchors (the spec is grounded in real examples, not invented):
- **metal-forming** ≈ Solution (directory)
- **fiber-laser-cutting** ≈ Product Lines (single product spotlight)
- **5-axis-machining** ≈ Brand (deep-dive)
- **medical-industry** ≈ Persona (vertical-market)

| Page type | HeroWithForm | PortfolioRow | SectionBreak | ProTipsCallout | GlasseyTabs | LogoCarousel | PhotoGrid | TickCheckList | DarkCategoryCard | RepeatableLeadForm |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Brand** (anchor: 5-axis-machining) | REQ | REQ | REQ | OPT | — | OPT | REQ | OPT | OPT | OPT |
| **Solution** (anchor: metal-forming) | REQ | REQ | REQ | — | — | OPT | REQ | OPT | — | OPT |
| **Product Lines** (anchor: fiber-laser-cutting) | REQ | — | REQ | OPT | — | — | REQ | REQ | OPT | REQ |
| **Persona** (anchor: medical-industry) | REQ | — | OPT | — | REQ | REQ | OPT | REQ | REQ | REQ |
| Case Study | REQ | — | OPT | OPT | — | OPT | OPT | OPT | — | OPT |
| Blog Post | OPT | — | OPT | OPT | — | — | — | OPT | — | OPT |
| Guide | OPT | — | OPT | REQ | — | — | OPT | REQ | — | OPT |
| Webinar | REQ | — | OPT | — | — | OPT | — | OPT | — | REQ |
| Course | REQ | — | OPT | OPT | OPT | OPT | OPT | REQ | — | REQ |
| Class Calendar | OPT | — | OPT | — | — | — | — | — | — | OPT |
| Team Member | OPT | — | OPT | — | — | — | OPT | — | — | OPT |
| Location | OPT | — | OPT | — | — | — | OPT | — | — | OPT |

Heaviest usage: **Persona** (8 of 10) and **Brand** (8 of 10) — both deep-dive landing experiences. Lightest usage: **Class Calendar**, **Team Member**, **Location** — utility pages that just need a hero + body + footer.

> **Note on the `RepeatableLeadForm` column.** REQ/OPT markings reflect the *default* authoring expectation per page type. Actual on-page placement is **intent-driven** per §10 RESOLVED item 5: a document with `intent` unset or `'awareness'` renders **only** the hero form (via `IndiaHeroWithForm`); `'consideration'` adds **one** mid-page `IndiaRepeatableLeadForm`; `'conversion'` adds **two** (mid-page + above the FAQ). A REQ cell means the page type's default authoring intent is at least `'consideration'`; an OPT cell means the page type defaults to `'awareness'` and only renders the extra forms if a content editor flips `intent` upward. The cells are not promises about the rendered DOM — they are guidance for typical authoring.

---

## 9. The "intent" page question

**Recommendation: Option B — add an `intent` prop to existing page-type clients.**

```ts
interface IndiaPageProps {
  intent?: 'awareness' | 'consideration' | 'conversion'; // default 'awareness'
  ...
}
```

`'awareness'` renders the page without mid-page form repeats. `'consideration'` adds one `IndiaRepeatableLeadForm` after the second body section. `'conversion'` adds two (mid-page + above the FAQ), reproducing the medical-industry triple-form composition (hero + mid + above-FAQ). The placement logic lives inside each page-type client and is driven entirely by the `intent` prop; consumers don't compose form placements manually.

**Justification:** A 13th page type (Option A) doubles the page-type matrix for a single composition concern — every other content type would still need a normal + conversion variant. A pure component-placement approach (Option C) pushes the policy into every individual page consumer and risks inconsistent placements. The prop approach (no new Sanity document type; the object-type and field additions in §10 RESOLVED items 3 and 5, plus the one-time Guide `callouts` migration, are family-agnostic and serve other families too) pushes the conversion decision into Sanity as the `intent` enum field on each existing document (formalized in §10 RESOLVED item 5), and lets a content editor flip a brand from "awareness" to "conversion" without a developer changing code. It also keeps the india family's signature "this is the page that sells" identity legible — any india page can become the sales page just by flipping the prop.

---

## 10. Open questions

Five resolution items captured below — the three open questions from the original draft, plus two follow-on items surfaced during reconciliation: a PortableText renderer and the intent enum field. No remaining open questions block session 5a.

1. **india-orange divergence — RESOLVED.** `india-orange` is `#F15C30`, defined only in the india family's stylesheet and **not** added to `PHILLIPS_COLORS`. Option (c) was chosen — a family-scoped literal mirroring the Branded family's `--branded-white` precedent. See the §2 footnote ("Note on `india-orange`") for the full rationale and brand-discipline tradeoff.

2. **Route prefix — RESOLVED.** The india family is mounted at **`/india/*`**, mirroring the `/strong/*`, `/branded/*`, `/appealing/*`, `/simple/*` precedent used by the other template families in the sandbox. The collision with the live WordPress `/india/` subsite is acceptable because the sandbox is not yet on production phillipscorp.com; the parallel-run cutover will replace the WordPress India subsite with the india family's content (not coexist with it). Future regional-India-homepage demos should be mounted at `/india/home` or `/regional/india` to avoid colliding with this family's sandbox routes.

3. **Sanity schema additions — RESOLVED.** Hybrid additive approach. None of the new types are india-prefixed; all three are family-agnostic shapes the india family happens to be first to use, available for any future family.

   - **New shared object type `leadForm`** — fields: `title` (string), `subtitle` (string, optional), `fields[]` of `{ name: string, type: 'text' | 'email' | 'tel' | 'select' | 'textarea', required: boolean, options?: string[] }`, `submitLabel` (string), `destinationId` (string — routing key for form-handler / Sanity webhook), `regionScope` (string — e.g. `'india'`, `'global'`). Used by both `IndiaHeroWithForm` (composed) and `IndiaRepeatableLeadForm` (direct). Referenced as an optional field on any document that may host a form.
   - **New shared object type `photoTabSet`** — fields: `tabs[]` of `{ image: image, label: string, body: blockContent, ctaUrl?: url }`. Used by `IndiaGlasseyTabs`. **Do NOT extend `personaPage.filterTabs`** — that field has a different shape (id, label, solutions[], brands[]) and serves a different purpose (filterable content directory, not a tab content switcher). The two coexist as distinct object types.
   - **New shared named object type `callout`** (NOT india-prefixed) — defined with the following shape:

     ```ts
     {
       type: string         // enum: 'note' | 'tip' | 'protips' | 'warning' | 'callout'
       title: string
       body: blockContent   // Portable Text
       chipLabel?: string   // optional override of the type → label mapping in §5.4
     }
     ```

     **Migrate Guide's existing inline `callouts` shape** (currently `{ label: string, body: text }` per [sanity/schemas/documents/guide.ts:18](../sanity/schemas/documents/guide.ts#L18) — anonymous inline objects, no shared type) into the new named `callout` type:

     - `type` → defaults to `'note'` for all existing records
     - `title` → existing `label` value
     - `body` → existing plain-text body wrapped as a single Portable Text block:
       ```js
       [{ _type: 'block', children: [{ _type: 'span', text: <existing-text> }] }]
       ```
     - `chipLabel` → unset

     Migration runs once, server-side, via a Sanity migration script. Reversible (the script can be inverted). After migration, Guide consumes the same shared `callout` type as Brand and Solution.

     Add `callouts: callout[]` (optional) to the **Brand** and **Solution** document schemas. Used by `IndiaProTipsCallout` (§5.4), which maps `type` to a chip label via the §5.4 table.

     **Why this option:** the alternative (a separate `indiaCallout` type) directly contradicts the family-agnostic schema rule we set in the original §10 resolution. Carrying two parallel callout shapes forever to avoid a one-time migration is the wrong tradeoff.

   Schema additions are otherwise purely additive — no existing field is renamed, retyped, or removed outside of the Guide `callouts` migration above. The three new shared types (`leadForm`, `photoTabSet`, `callout`) are non-india-specific and can be consumed by any current or future template family.

4. **PortableText renderer (infrastructure) — RESOLVED.**

   No project-wide Portable Text renderer exists today; current templates flatten body fields with `.split('\n\n')` (see [PostPageClient.tsx:68](../src/components/templates/post/PostPageClient.tsx#L68), [SimpleGuideClient.tsx:72](../src/components/templates-simple/guide/SimpleGuideClient.tsx#L72)), which loses headings, lists, links, and images. The india family forces this gap closed.

   Session 5a will:

   - Install `@portabletext/react` and `@portabletext/types`.
   - Create the canonical shared renderer at `src/components/PortableText.tsx`.
   - Export a default components map for the existing 5 families (no behavior change for them).
   - Export an india-specific components override map from `src/components/india/portableText.ts` that styles list items with the red-tick treatment from §3.
   - india primitives that render Portable Text pass the india components map explicitly at the call site:
     ```tsx
     <PortableText value={...} components={indiaPortableTextComponents} />
     ```
   - No React context, no theme provider, no `<IndiaPortableText>` wrapper component. Explicit per-render is the pattern.

   Other families do not migrate from their `.split('\n\n')` flattening as part of session 5a — that's separate cleanup, family by family, deferred.

   [docs/inventory.md](inventory.md) will be updated at the end of session 5a to reflect the new dependency and the new shared component.

5. **Intent enum field (Option B from §9) — RESOLVED.**

   §9 selected the prop-driven `intent` approach for triple-form lead-capture page compositions, sourced from a Sanity field on each document. That field is not yet captured in items 1–4 — this is the additive schema work that makes §9 implementable.

   Add an **optional** `intent` field to all 11 page-type schemas the india family covers — Brand, Solution, CaseStudy, Post, Guide, Webinar, Course, ClassEvent, TeamMember, Location (10 documents), plus personaPage (singleton). The Product Lines page is **not** a separate document — it renders off the embedded `productLine[]` array inside Brand, so Brand's `intent` already controls it. No `productLines` document is added.

   ```ts
   intent?: 'awareness' | 'consideration' | 'conversion'
   ```

   The field is optional on every document. An unset value is treated as `'awareness'` by the india family's intent-aware components (e.g. `IndiaRepeatableLeadForm` placement logic in §5.10). Other families ignore the field — it has no effect outside the india family until they adopt it.

   **Why on all 11, not just the conversion-likely ones** (Brand, Solution, Persona, Webinar, Course; Product Lines is covered transitively via Brand): hardcoding which page types *can* be conversion surfaces couples authoring intent to schema shape. The family system should give every page the option even if the default is awareness — a case study can be a conversion piece, a class calendar can be lead-gen, etc. Marginal schema cost; significant authoring flexibility.

   This field is family-agnostic. The naming and enum values do not reference india. Any future family can read it for its own purposes (e.g. a Strong family variant might render a different industrial-style sticky CTA when `intent === 'conversion'`).

   Session 5a will add this field to all 11 schemas alongside the `leadForm` / `photoTabSet` / `callout` work.

---

**File written:** `docs/india-design-system.md` (this document, uncommitted).
