# Phillips Template Sandbox — Site Inventory

> Snapshot for use as context when designing additional templates. Generated 2026-05-08.

## 1. Project Overview

- **Framework**: Next.js 14.2.35 (App Router) + TypeScript (strict)
- **CMS**: Sanity v3.99 (with `next-sanity` 9.12)
- **Styling**: Tailwind CSS 3.4 + styled-components 6.3
- **Image handling**: `@sanity/image-url`, Next.js `Image` with remote patterns for Unsplash + Sanity CDN
- **Portable Text rendering** (added session 5a): `@portabletext/react` 6.2 + `@portabletext/types` 4.0 — shared renderer at [src/components/PortableText.tsx](../src/components/PortableText.tsx); india-specific components map at [src/components/india/portableText.ts](../src/components/india/portableText.ts)
- **Hosting target**: Vercel (image remote patterns, cache headers configured for `/studio`)
- **Build commands**: `next dev | next build | next start | next lint`
- **API**: `/api/revalidate/route.ts` for on-demand Sanity webhook revalidation

## 2. Styling System

### Color tokens (Tailwind + CSS variables)
| Token | Hex | Role |
|---|---|---|
| `p-red` | #F9423A | Phillips Red — primary accent |
| `p-blue` | #00AEEF | Phillips Blue — secondary accent |
| `p-gold` | #F68B33 | Tertiary |
| `p-maroon` | #3F0017 | Dark accent |
| `p-grey` | #647883 | Neutral |
| `p-light` | #D7DFE3 | Light neutral |
| `p-bg` | #F2F4F6 | Light background |
| `black` | #000000 | Base |

### Font system (core identity = Barlow Condensed, italic, uppercase)
Three-tier hierarchy:
1. **Display** — Barlow Condensed 700 italic uppercase → headings
2. **Body** — Barlow Condensed 400 italic uppercase → body, nav labels
3. **Light** — Barlow Condensed 300 italic uppercase → secondary/labels

Loaded via `next/font/google`:
- `--font-barlow-condensed` (300/400/600/700/800/900) — primary
- `--font-montserrat` (300–700) — body fallback
- `--font-mono` JetBrains Mono (400/500/700/800) — HUD labels (Strong only)
- `--font-inter` (400–900) — Strong display headlines
- `--font-serif` DM Serif Display (400) — secondary serif option

Global utility classes in [globals.css](../src/app/globals.css): `.f-display`, `.f-body`, `.f-light`.

## 3. Routes & Pages

### Root / sandbox
| Route | Purpose |
|---|---|
| `/` | Sandbox index — tabbed UI (Templates / Nav Samples) |
| `/font-test` | Font system showcase |
| `/nav-samples` | Nav samples viewer with iframe previews + modal |
| `/api/revalidate` | Sanity webhook revalidation |

### Four template families × 12 page types

Every family covers the same 12 page types: **Brand, Solution, Product Lines, Case Study, Blog Post, Guide, Webinar, Course, Class Calendar, Team Member, Location, Persona**.

| Family | Route prefix | Aesthetic | Data source |
|---|---|---|---|
| **EyeCatching v2** | `/eyecatching-v2/*` | High-visual static prototype | Static (no Sanity) |
| **EyeCatching** | `/ec/*/[slug]` | Dark immersive editorial | Sanity (dynamic) |
| **Appealing** | `/appealing/*/[slug]` | Rich, animated, interactive (gradients, 3D cards, timelines, flip cards, carousels) | Sanity |
| **Simple** | `/simple/*/[slug]` | Clean, minimal, light-themed corporate/docs | Sanity |
| **Strong** | `/strong/*` | Dark HUD/industrial, monospace HUD labels | Sanity |

**Strong has extra showcase routes**: `/strong/`, `/strong/catalog`, `/strong/class-event`, `/strong/product-line`.

Total: **48 template variants** (12 page types × 4 families) plus EyeCatching v2 static set.

## 4. Components Inventory (~67 files)

### Utility (root of `src/components/`)
- `SanityImage.tsx` — Sanity URL-optimized image wrapper
- `SimpleBreadcrumb.tsx` — breadcrumb (Simple family)
- `TemplateBadge.tsx` — fixed top-right badge marking active template variant (red/maroon/white/cyan)
- `PortableText.tsx` (added session 5a) — shared Portable Text renderer wrapping `@portabletext/react`; merges a passed `components` map over project defaults; consumed by family-specific overrides

### India family (`src/components/india/`) — added session 5a
- `portableText.ts` — india-specific `PortableTextComponents` map; currently overrides only `listItem.bullet` with the red-tick treatment from design system §3 / §5.4. Other india primitives (Hero, Tabs, etc.) land in session 5b.

### Navigation (`src/components/nav/`)
- `SimpleNav.tsx` — minimal black bar; logo + 4 menu items + red "Get a Quote" CTA
- `AppealingNav.tsx` — elevated/gradient variant for Appealing family

### Sandbox UI (`src/components/sandbox/`)
- `TabBar.tsx` — top tabs ("Templates" 12 / "Nav Samples" 2)
- `TemplatesGrid.tsx` — 48 template cards
- `NavSampleCard.tsx` — iframe preview card with modal viewer + full-screen
- `NavSamplesGrid.tsx` — grid container

### Strong design system (`src/components/strong/`)
`StrongHero`, `StrongNav`, `DarkSection`, `LightSection`, `DarkEye`, `LightEye`, `BarFill` (spec bar), `DataStrip` (horizontal stats), `FinalCTA`, `PulseRing` (animated accent).

### Core templates (`src/components/templates/`)
**Brand**: `BrandHero` (split hero, last-2-letter accent, stats bar), `BrandPageClient`, `ProductLineScroll`, `SpecBars`.
**Solution**: `SolutionHero`, `SolutionPageClient`, `BrandMatrix`, `SpecStripe`.
**Persona**: `PersonaHero`, `PersonaFilterTabs`, `ContentGrid`, `PersonaPageClient`.
**Single-type clients**: `CaseStudyPageClient`, `PostPageClient`, `GuidePageClient`, `WebinarPageClient`, `CoursePageClient`, `ClassCalendarPageClient`, `TeamMemberPageClient`, `LocationPageClient`, `ProductLinesPageClient`.

### Simple variants (`src/components/templates-simple/`)
12 `Simple*Client.tsx` files — light backgrounds, Montserrat + Barlow Condensed, minimal animation.

### Appealing variants (`src/components/templates-appealing/`)
12 `Appealing*Client.tsx` files. Distinguishing patterns per page type:
- Brand → 3D card rotation, gradient hero
- Case Study → timeline
- Post → flip cards
- Guide → progress bar
- Webinar → countdown
- Course → module selector
- Team Member → gradient profile
- Location → image reveal
- Product Lines → comparison carousel

## 5. Sanity Schema

Located in `sanity/schemas/`. Total = **10 documents + 6 objects + 3 singletons** (objects updated session 5a; singleton count corrected — was previously listed as 2). <!-- TBD: verify template-variant total below; original "48 variants" claim predates Branded and india families -->

**Session 5a additions:**
- `callouts: callout[]` added (optional) to **Brand** and **Solution** documents
- `intent: 'awareness' | 'consideration' | 'conversion'` added (optional) to 10 documents + personaPage (11 schemas total). Per docs/india-design-system.md §10 item 5; ProductLines intentionally excluded (it's an embedded `productLine[]` object on Brand, not a top-level document; Brand's intent covers it transitively)
- 3 new shared object types: `leadForm`, `photoTabSet`, `callout` (see Objects section below)
- Guide's `callouts` field migrated from anonymous inline `{ label, body: text }` to shared `callout` type (data migration: 0 documents touched — no production Guides had callouts)

### Documents
1. **Brand** — name, slug, **intent**, logo, heroImage, category[], tagline, description, productLines[], stats (max 3), taglineBarText, about{Title,Body,Stats}, marqueeItems[], caseStudiesIntro, **callouts: callout[]**, seo
2. **Solution** — name, slug, **intent**, offering, heroImage, shortDesc, description (blockContent), relatedBrands[], bgNumber, typePills[], specStripe[], specBars[], spec/cta sections, **callouts: callout[]**, seo
3. **Case Study** — title, slug, **intent**, customer, industry, isFederal, heroImage, summary, body, relatedBrands[], results[{metric,value}], pullQuote+attribution, kickerTags[], byline, seo
4. **Post** — title, slug, **intent**, publishedAt, author→teamMember, categories[], mainImage, excerpt, body, readTime, heroImageCaption, pullQuote, tableOfContents[], seo
5. **Guide** — title, slug, **intent**, topic, heroImage, intro, body, docNumber, readTime, level (Beginner/Intermediate/Advanced), tableOfContents[], **callouts: callout[]** (migrated session 5a from inline `{label,body:text}` to shared `callout` type), seo
6. **Webinar** — title, slug, **intent**, scheduledAt, status (Upcoming/Live/On-Demand), registrationUrl, recordingUrl, description, relatedBrands[], speakers[], agenda[{time,topic}], formTitle, seo
7. **Course** — title, slug, **intent**, track (CNC/AM/Software/Automation), audience (Professional/Workforce/Federal), duration, description, relatedBrands[], modules[{number,name,duration}], prerequisites[], machineLabel, seo
8. **Class Event** — **intent**, name, date, location, seats, instructors[ref], registrationUrl, description, seo
9. **Team Member** — name, **intent**, slug, title, department, photo, bio, linkedinUrl, email, expertise[], seo
10. **Location** — name, slug, **intent**, address, city/state/zip, country, phone, hours, heroImage, description, services[], seo

### Objects
- **blockContent** — Portable Text (paragraphs, h2–h4, lists, images, code, custom blocks)
- **productLine** — name, seriesLabel, models[], description, image, xTravel, spindleSpeed, tableLoad, axes, bestFor, brochureUrl, tagline, type, keySpecs[], modelDetails[]
- **seoBlock** — metaTitle, metaDescription, ogImage, keywords[], canonicalUrl
- **leadForm** (session 5a) — title, subtitle, fields: leadFormField[{name, type ('text'|'email'|'tel'|'select'|'textarea'), required, options[]}], submitLabel, destinationId, regionScope. Per design system §10 item 3
- **photoTabSet** (session 5a) — tabs: photoTab[{image, label, body (blockContent), ctaUrl?}]. Per design system §10 item 3
- **callout** (session 5a) — type ('note'|'tip'|'protips'|'warning'|'callout'), title, body (blockContent), chipLabel?. Per design system §10 item 3; consumed by `IndiaProTipsCallout` (session 5b)

### Singletons
- **personaPage** — persona (Manufacturer/Federal-DoD/Machinist/Researcher/Partner-Distributor), **intent**, headline, heroImage, description, featuredSolutions[], featuredBrands[], cta, forLabel, stats (max 3), filterTabs[{id,label,solutions[],brands[]}], seo
- **siteSettings** — siteName, siteDescription, navigationMenu[], footerLinks[], socialLinks, contactInfo
<!-- TBD: verify — homePage singleton also exists (sanity/schemas/singletons/homePage.ts) but is not documented here. Predates session 5a. -->

### Migrations (added session 5a)
- [migrations/2026-05-13-guide-callouts-to-shared-type.mjs](../migrations/2026-05-13-guide-callouts-to-shared-type.mjs) — Guide `callouts` inline → shared type. Idempotent; supports `--dry-run`.
- [migrations/rollback-2026-05-13-guide-callouts-to-shared-type.mjs](../migrations/rollback-2026-05-13-guide-callouts-to-shared-type.mjs) — inverse. Safety net.

Run with `node --env-file=.env.local migrations/<script>.mjs [--dry-run]`. Live runs require `SANITY_API_TOKEN` in `.env.local`.

### GROQ queries (`src/lib/queries.ts`)
Per document type: `<type>Query` (single by slug, joins) + `all<Type>SlugsQuery` (for static generation).

## 6. Static HTML Prototypes — Nav Samples

`public/nav-samples/`:
- **simple.html** — black bar (#000), Phillips logo left, menu (Solutions / Brands / Training / Resources), red "Get a Quote" right. Barlow Condensed 800, uppercase, 11–14px.
- **strong.html** — dark HUD nav for Strong family; Barlow Condensed uppercase italic, likely with PulseRing/accent bars.

Both rendered as scaled iframes (0.219 scale, 180px viewport) inside `NavSampleCard` with modal full-screen viewer.

## 7. Assets

### `sample_images/` (31 files, ~8.4 MB)
- **Haas CNC** (mills/lathes/automation): vf3yt, vf4ss, st10, umc750 family, umc1000ss, gear cutting, lathe, mill closeup, inventory banner
- **EOS / Markforged / Meltio 3D printers**: Formiga P110 (FDR + Velocis), Integra P450, M300-4, P396, P500, P770, polymer studio, Markforged Metal X & Onyx One, Meltio robot arm DED
- **Phillips corporate**: office exterior, team intro photo, training banner, UMC1000 laser additive closeup
- `image-inventory.xlsx` — image metadata/licensing spreadsheet

### `public/`
`favicon.ico`, `nav-samples/{simple,strong}.html`. Most imagery loaded from `sample_images/` via mapping helpers (`eyecatching-images.ts`, `appealing-images.ts`, `strong-images.ts`).

### Fonts
No local font files — all via `next/font/google`.

## 8. Library / Utilities

### `src/lib/constants.ts`
- `PHILLIPS_COLORS` (8 tokens above)
- `F_DISPLAY` / `F_BODY` / `F_LIGHT` — CSS-in-JS Barlow Condensed objects
- `NAV_ITEMS`: I'm a… · Solutions · Brands · Training & Education · Resources · About

### Image mapping helpers
`eyecatching-images.ts`, `appealing-images.ts`, `strong-images.ts` — per-page image URL maps for non-Sanity static variants.

## 9. Navigation Patterns

| Variant | File | Background | Type style | Use |
|---|---|---|---|---|
| Simple | `nav/SimpleNav.tsx` + `simple.html` | Black | Barlow Cond. 800 uppercase | Simple family |
| Appealing | `nav/AppealingNav.tsx` | Gradient/animated | Barlow Cond. italic | Appealing family |
| Strong | `strong/StrongNav.tsx` + `strong.html` | Dark HUD (#09090B) | JetBrains Mono labels + Barlow Cond. | Strong family |

Common menu spine: I'm a… (persona dropdown) · Solutions · Brands · Training & Education · Resources · About + Phillips logo (L) + "Get a Quote" CTA (R).

## 10. Recent Direction (last ~15 commits)

Most recent first:
- **Font system locked in**: Barlow Condensed 300/400/700 italic uppercase as core identity; rolled out to nav prototypes and all sandbox UI chrome (commits 7d99455, decc993, 07b23a3).
- **EyeCatching v2 static set**: 12 image-rich pages (43114f8).
- **Nav Samples tab**: dedicated `/nav-samples` route + simple.html + strong.html prototypes with iframe + modal viewer (adb3787, d0e5f1d, 1a1197b).
- **Strong family**: all 12 page types built out (ff7d4a2).
- **Appealing family**: full route set + image integration + sandbox tab (132ff52, 6b836aa, 858e453).
- **Simple family**: wired to Sanity with dual revalidation (5201bf8).
- **Earlier**: refactor moving original templates under `/ec/` (ab16497).

**Trajectory**: four parallel design families (EC, Simple, Appealing, Strong) covering identical content surface, sharing a Barlow Condensed identity but diverging in chroma (light vs dark), interaction (static vs animated), and label voice (Barlow vs JetBrains Mono). Nav is treated as a first-class design differentiator, prototyped as standalone HTML before being componentized.

## Summary

| Category | Count |
|---|---|
| Routes | 67 |
| Components | ~67 |
| Sanity document types | 10 |
| Sanity object types | 3 |
| Sanity singletons | 2 |
| Template families | 4 |
| Page types per family | 12 |
| Total template variants | 48 |
| Nav prototypes | 2 |
| Sample images | 31 |
| Brand color tokens | 8 |
| Font families loaded | 5 |
| Barlow Condensed weights | 6 (300/400/600/700/800/900) |
