import {
  IndiaHeroWithForm,
  IndiaTickCheckList,
  IndiaPhotoGrid,
  IndiaRepeatableLeadForm,
} from '@/components/india'
import { PHILLIPS_COLORS, F_DISPLAY } from '@/lib/constants'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'

// Loose typing — receives a Brand document with productLines[]. The
// route uses brandProductLinesQuery (existing, unmodified).
export interface SanityBrandProductLines {
  name?: string
  slug?: { current?: string }
  tagline?: string
  logo?: unknown
  intent?: string
  productLines?: Array<{
    name?: string
    tagline?: string
    seriesLabel?: string
    models?: string
    description?: string
    image?: unknown
    brochureUrl?: string
    xTravel?: string
    spindleSpeed?: string
    tableLoad?: string
    axes?: string
    bestFor?: string
    type?: string
    keySpecs?: Array<{ value?: string; label?: string }>
    modelDetails?: Array<{ name?: string; travel?: string; spindle?: string }>
  }>
}

const PARTS_TILES_FALLBACK = [
  { label: 'Bracket', color: '#1b1e34' },
  { label: 'Spindle', color: '#3F0017' },
  { label: 'Frame', color: '#0a5f54' },
  { label: 'Mount', color: '#647883' },
  { label: 'Housing', color: '#F9423A' },
  { label: 'Flange', color: '#000' },
] as const

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

export default function IndiaProductLinesClient({ brand }: { brand: SanityBrandProductLines }) {
  const intent = readIntent(brand)

  // TBD-verify: single-product spotlight defaults to the FIRST productLine
  // in the brand's array. The brief's spec allows for an array-index or
  // productLine slug parameter to pick a specific line; a follow-up session
  // can add that routing once we settle on the URL shape (e.g.
  // /india/product-lines/[brand-slug]/[line-index] or a query param).
  const spotlight = brand.productLines?.[0]

  if (!spotlight) {
    return (
      <main style={{ background: '#fff', minHeight: '100vh', padding: 48, color: '#1a1a1a' }}>
        <TemplateBadge label="INDIA" color="#F9423A" />
        <h1>No product lines available for {brand.name ?? 'this brand'}.</h1>
        <p style={{ color: PHILLIPS_COLORS.grey }}>
          The brand document needs at least one entry in <code>productLines[]</code> to
          render this page. Check the Sanity Studio for {brand.name ?? 'the brand'}.
        </p>
      </main>
    )
  }

  const heroBg =
    sanityImageUrl(spotlight.image) ??
    placeholderTileUrl(spotlight.name ?? 'PRODUCT', '#1b1e34')
  const spotlightImageUrl =
    sanityImageUrl(spotlight.image) ??
    placeholderTileUrl(spotlight.name ?? 'PRODUCT', '#000')

  // TBD-verify: "Advantages" list source. Today we derive from keySpecs
  // (the closest existing field — "{value} {label}" tokens). A future
  // schema session could add a dedicated `advantages: string[]` field on
  // productLine.
  const advantages: string[] =
    spotlight.keySpecs?.map(s => `${s.value ?? ''} ${s.label ?? ''}`.trim()).filter(Boolean) ??
    [
      'Maintenance-free fiber laser source',
      '24/7 production-ready uptime',
      'Compatible with existing fixturing',
      'Cuts through 25mm steel with ease',
    ]

  const partsTiles = PARTS_TILES_FALLBACK.map(t => ({
    image: placeholderTileUrl(t.label, t.color),
    alt: t.label,
    caption: t.label,
  }))
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
        eyebrow={brand.name?.toUpperCase()}
        title={spotlight.name ?? 'Product Line'}
        subtitle={spotlight.tagline ?? spotlight.seriesLabel ?? undefined}
        backgroundImage={{ src: heroBg, alt: spotlight.name ?? '' }}
        primaryCta={
          spotlight.brochureUrl
            ? { label: 'Download brochure', href: spotlight.brochureUrl }
            : undefined
        }
        form={SAMPLE_LEAD_FORM}
      />

      {/* 2. Inline product spotlight — large image + narrative + key specs.
          Built inline (not a reusable composite) per the §5d brief. */}
      <section style={{ background: '#fff', padding: '64px 48px' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={spotlightImageUrl}
            alt={spotlight.name ?? ''}
            style={{
              width: '100%',
              aspectRatio: '4 / 3',
              objectFit: 'cover',
              display: 'block',
              background: PHILLIPS_COLORS.light,
            }}
          />
          <div>
            {spotlight.seriesLabel && (
              <div
                style={{
                  fontFamily: 'var(--font-barlow-condensed), sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  color: PHILLIPS_COLORS.red,
                  marginBottom: 12,
                }}
              >
                {spotlight.seriesLabel}
              </div>
            )}
            <h2
              style={{
                ...F_DISPLAY,
                fontSize: 28,
                lineHeight: 1.15,
                letterSpacing: 1.5,
                margin: '0 0 16px',
                color: PHILLIPS_COLORS.black,
              }}
            >
              {spotlight.name}
            </h2>
            {spotlight.description && (
              <p
                style={{
                  fontFamily: 'var(--font-barlow-condensed), sans-serif',
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: PHILLIPS_COLORS.grey,
                  margin: '0 0 24px',
                }}
              >
                {spotlight.description}
              </p>
            )}

            {/* Quick spec strip */}
            {(spotlight.xTravel || spotlight.spindleSpeed || spotlight.tableLoad) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[
                  { label: 'X Travel', value: spotlight.xTravel },
                  { label: 'Spindle', value: spotlight.spindleSpeed },
                  { label: 'Table Load', value: spotlight.tableLoad },
                ]
                  .filter(s => s.value)
                  .map(s => (
                    <div
                      key={s.label}
                      style={{
                        padding: '12px 14px',
                        background: PHILLIPS_COLORS.bg,
                      }}
                    >
                      <div
                        style={{
                          ...F_DISPLAY,
                          fontSize: 18,
                          color: PHILLIPS_COLORS.red,
                          marginBottom: 4,
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-barlow-condensed), sans-serif',
                          fontSize: 10,
                          fontWeight: 700,
                          fontStyle: 'italic',
                          textTransform: 'uppercase',
                          letterSpacing: 1.5,
                          color: PHILLIPS_COLORS.grey,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Advantages checklist */}
      <section style={{ background: PHILLIPS_COLORS.bg, padding: '64px 48px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h3
            style={{
              ...F_DISPLAY,
              fontSize: 22,
              letterSpacing: 1,
              margin: '0 0 24px',
              color: PHILLIPS_COLORS.black,
            }}
          >
            Advantages
          </h3>
          <IndiaTickCheckList items={advantages} />
        </div>
      </section>

      {/* 4. Parts gallery — 6-up of representative parts */}
      <IndiaPhotoGrid tiles={partsTiles} />

      {/* 5. Intent-gated mid-page form */}
      {(intent === 'consideration' || intent === 'conversion') && (
        <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="mid-page" variant="inline" />
      )}

      {/* 6. Industrial applications grid — second photo grid (distinct
          from parts gallery per the fiber-laser-cutting reference page). */}
      <IndiaPhotoGrid tiles={applicationTiles} />

      {/* 7. Intent-gated page-bottom form */}
      {intent === 'conversion' && (
        <div style={{ background: '#F2F4F6' }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
      {/* No FAQ for ProductLines per the fiber-laser-cutting/metal-forming
          reference rhythm — this is a hot lead-gen page. */}
    </main>
  )
}
