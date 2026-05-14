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

// Loose typing — the existing solutionQuery does not project intent or
// callouts. Same TBD-verify as IndiaBrandClient for the projection update.
export interface SanitySolution {
  name?: string
  offering?: string
  shortDesc?: string
  description?: unknown
  heroImage?: unknown
  taglineBarText?: string
  relatedBrands?: Array<{
    name?: string
    slug?: { current?: string }
    tagline?: string
    logo?: unknown
  }>
  intent?: string
  callouts?: Callout[]
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

export default function IndiaSolutionClient({ solution }: { solution: SanitySolution }) {
  const intent = readIntent(solution)

  const heroBg = sanityImageUrl(solution.heroImage) ?? placeholderTileUrl(solution.name ?? 'SOLUTION', '#1b1e34')
  const portfolioRows = (solution.relatedBrands ?? []).filter(b => b?.name)
  const firstCallout = solution.callouts?.[0]

  // TBD-verify: relatedBrand projection lacks `description` and
  // `productLines`. We render the row body from `tagline` and skip
  // subActions until the projection is expanded (or until we move
  // to a richer dereferenced shape in queries.ts).
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
        eyebrow={solution.offering?.toUpperCase()}
        title={solution.name ?? 'Solution'}
        subtitle={solution.shortDesc ?? undefined}
        backgroundImage={{ src: heroBg, alt: solution.name ?? '' }}
        form={SAMPLE_LEAD_FORM}
      />

      {/* 2. "Our Portfolio of …" section break */}
      {portfolioRows.length > 0 && (
        <IndiaSectionBreak
          headline={solution.taglineBarText ?? `Our portfolio of ${solution.name ?? 'solutions'}`}
        />
      )}

      {/* 3. Alternating portfolio rows from relatedBrands */}
      {portfolioRows.map((brand, i) => (
        <IndiaPortfolioRow
          key={`${brand.name}-${i}`}
          index={i}
          image={sanityImageUrl(brand.logo) ?? placeholderTileUrl(brand.name ?? 'BRAND', '#3F0017')}
          brandLabel={brand.name}
          title={brand.tagline ?? brand.name ?? ''}
          body={brand.tagline ?? ''}
          primaryCta={
            brand.slug?.current
              ? { label: `Explore ${brand.name}`, href: `/india/brand/${brand.slug.current}` }
              : undefined
          }
        />
      ))}

      {/* 4. Section-break before applications */}
      <IndiaSectionBreak headline="Transform your manufacturing process" />

      {/* 5. Intent-gated mid-page form */}
      {(intent === 'consideration' || intent === 'conversion') && (
        <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="mid-page" variant="inline" />
      )}

      {/* 6. Industrial Applications grid */}
      <IndiaPhotoGrid tiles={applicationTiles} />

      {/* 7. ProTips callout — first callout if present */}
      {firstCallout && firstCallout.body && (
        <div style={{ padding: '0 48px', maxWidth: 1240, margin: '0 auto' }}>
          <IndiaProTipsCallout callout={firstCallout} />
        </div>
      )}

      {/* 8. FAQ */}
      <IndiaFAQ />

      {/* 9. Intent-gated page-bottom form */}
      {intent === 'conversion' && (
        <div style={{ background: '#F2F4F6' }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
    </main>
  )
}
