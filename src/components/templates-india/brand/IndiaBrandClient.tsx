import {
  IndiaHeroWithForm,
  IndiaPortfolioRow,
  IndiaSectionBreak,
  IndiaPhotoGrid,
  IndiaProTipsCallout,
  IndiaRepeatableLeadForm,
  type Callout,
} from '@/components/india'
import IndiaFAQ from '../_shared/IndiaFAQ'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'

// Loose typing — the existing GROQ Brand query (src/lib/queries.ts) does
// not project `intent` or `callouts`; both are typed as optional so the
// Client compiles today, and the gating + callout-rendering pathways
// light up automatically once a follow-up session updates the projection.
//
// TBD-verify: update brandQuery to include `intent` and `callouts` fields.
export interface SanityBrand {
  name?: string
  tagline?: string
  description?: string
  category?: string[]
  heroImage?: unknown
  taglineBarText?: string
  productLines?: Array<{
    name?: string
    seriesLabel?: string
    models?: string
    description?: string
    image?: unknown
    brochureUrl?: string
    modelDetails?: Array<{ name?: string; travel?: string; spindle?: string; url?: string }>
  }>
  intent?: string
  callouts?: Callout[]
  about?: { cta?: { label?: string; href?: string } }
}

const APPLICATION_TILES_FALLBACK = [
  { label: 'Aerospace', color: '#0a5f54' },
  { label: 'Defense', color: '#3F0017' },
  { label: 'Energy', color: '#1b1e34' },
  { label: 'Automotive', color: '#647883' },
  { label: 'Medical', color: '#F9423A' },
  { label: 'Industrial', color: '#000' },
] as const

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='36' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function IndiaBrandClient({ brand }: { brand: SanityBrand }) {
  const intent = readIntent(brand)

  const heroBg = sanityImageUrl(brand.heroImage) ?? placeholderTileUrl(brand.name ?? 'BRAND', '#3F0017')
  const aboutCta = brand.about?.cta
  const primaryCta =
    aboutCta?.label && aboutCta?.href
      ? { label: aboutCta.label, href: aboutCta.href }
      : undefined

  const portfolioRows = (brand.productLines ?? []).filter(pl => pl?.name)
  const firstCallout = brand.callouts?.[0]

  // TBD-verify: photo-grid tile sources. Today we render a hardcoded
  // 6-up Industrial Applications grid. Future: pull from a Sanity
  // `industries` or `applications` field on Brand, or derive from the
  // brand's category[] and a media library of per-industry hero photos.
  const applicationTiles = APPLICATION_TILES_FALLBACK.map(t => ({
    image: placeholderTileUrl(t.label, t.color),
    alt: t.label,
    caption: t.label,
  }))

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      {/* 1. Hero with form */}
      <IndiaHeroWithForm
        eyebrow={brand.tagline ? 'PHILLIPS' : undefined}
        title={brand.name ?? 'Brand'}
        subtitle={brand.tagline ?? brand.description ?? undefined}
        backgroundImage={{ src: heroBg, alt: brand.name ?? '' }}
        primaryCta={primaryCta}
        form={SAMPLE_LEAD_FORM}
      />

      {/* 2. "Our Portfolio of …" section break */}
      {portfolioRows.length > 0 && (
        <IndiaSectionBreak
          headline={brand.taglineBarText ?? `Our portfolio of ${brand.name ?? 'machines'}`}
        />
      )}

      {/* 3. Alternating brand-portfolio rows from productLines */}
      {portfolioRows.map((pl, i) => {
        const subActions = (pl.modelDetails ?? [])
          .slice(0, 4)
          .filter(m => m?.name && m?.url)
          .map(m => ({ label: m.name as string, href: m.url as string }))
        return (
          <IndiaPortfolioRow
            key={`${pl.name}-${i}`}
            index={i}
            image={sanityImageUrl(pl.image) ?? placeholderTileUrl(pl.name ?? 'PRODUCT', '#1b1e34')}
            brandLabel={pl.seriesLabel}
            title={pl.name ?? ''}
            body={pl.description ?? ''}
            subActions={subActions.length > 0 ? subActions : undefined}
            primaryCta={
              pl.brochureUrl ? { label: 'Brochure', href: pl.brochureUrl } : undefined
            }
          />
        )
      })}

      {/* 4. Industrial Applications photo grid */}
      <IndiaPhotoGrid tiles={applicationTiles} />

      {/* 5. ProTips callout — first callout if present (callouts field
          exists on Brand schema per 5a but is not yet in the GROQ
          projection; renders only when data is available). */}
      {firstCallout && firstCallout.body && (
        <div style={{ padding: '0 48px', maxWidth: 1240, margin: '0 auto' }}>
          <IndiaProTipsCallout callout={firstCallout} />
        </div>
      )}

      {/* 6. Pure-typography section-break band */}
      <IndiaSectionBreak
        headline="Transform your manufacturing process"
        tagline="Let us know your challenges and find the solution together."
      />

      {/* 7. Intent-gated mid-page form */}
      {(intent === 'consideration' || intent === 'conversion') && (
        <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="mid-page" variant="inline" />
      )}

      {/* 8. FAQ — placeholder list per §7 re-skin note. brand.faq field
          does not exist on the Sanity schema; flagged via IndiaFAQ's
          TBD-verify comment. */}
      <IndiaFAQ />

      {/* 9. Intent-gated page-bottom form (conversion only) */}
      {intent === 'conversion' && (
        <div style={{ background: '#F2F4F6' }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
    </main>
  )
}
