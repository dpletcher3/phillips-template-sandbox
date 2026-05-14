import { PortableTextBlock } from '@portabletext/types'
import {
  IndiaContentHero,
  IndiaSectionBreak,
  IndiaLogoCarousel,
  IndiaPhotoGrid,
  IndiaRepeatableLeadForm,
  IndiaH2,
} from '@/components/india'
import { indiaPortableTextComponents } from '@/components/india/portableText'
import PortableText from '@/components/PortableText'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'

// Loose typing — caseStudyQuery does not project `intent`. Optional so
// the Client compiles today; gating lights up automatically once the
// query is updated.
export interface SanityCaseStudy {
  title?: string
  customer?: string
  industry?: string
  isFederal?: boolean
  heroImage?: unknown
  summary?: string
  body?: PortableTextBlock[]
  relatedBrands?: Array<{ name?: string; slug?: { current?: string }; logo?: unknown }>
  results?: Array<{ label?: string; value?: string }>
  pullQuote?: string
  pullQuoteAttribution?: string
  kickerTags?: string[]
  byline?: string
  intent?: string
}

// TBD-verify: related case studies hardcoded fallback. Future: pull from
// a GROQ companion query (top 3 case studies by industry or kickerTags).
const RELATED_CS_FALLBACK = [
  { label: 'Aerospace · 32% throughput gain', color: '#0a5f54' },
  { label: 'Defense · CMM cycle halved',       color: '#3F0017' },
  { label: 'Medical · ISO certification',     color: '#1b1e34' },
]

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='30' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function IndiaCaseStudyClient({ caseStudy }: { caseStudy: SanityCaseStudy }) {
  const intent = readIntent(caseStudy)
  const heroBg = sanityImageUrl(caseStudy.heroImage) ?? placeholderTileUrl(caseStudy.customer ?? 'CASE', '#3F0017')

  const metadata = [
    caseStudy.customer ? { label: 'Customer', value: caseStudy.customer } : null,
    caseStudy.industry ? { label: 'Industry', value: caseStudy.industry } : null,
    caseStudy.isFederal ? { label: 'Federal', value: 'Yes' } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  const results = (caseStudy.results ?? []).filter(r => r?.value)
  const logos = (caseStudy.relatedBrands ?? [])
    .map(b => ({
      src: sanityImageUrl(b.logo) ?? placeholderTileUrl(b.name ?? 'BRAND', '#1b1e34'),
      alt: b.name ?? 'Related brand',
    }))

  const relatedTiles = RELATED_CS_FALLBACK.map(t => ({
    image: placeholderTileUrl(t.label, t.color),
    alt: t.label,
    caption: t.label,
  }))

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      <IndiaContentHero
        eyebrow="CASE STUDY"
        title={caseStudy.title ?? 'Case study'}
        subtitle={caseStudy.summary}
        backgroundImage={{ src: heroBg, alt: caseStudy.title ?? '' }}
        metadata={metadata}
      />

      {/* 2. Results stat strip — inline, NOT a new composite */}
      {results.length > 0 && (
        <section style={{ background: '#fff', padding: '64px 24px' }}>
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(results.length, 4)}, 1fr)`,
              gap: 24,
            }}
          >
            {results.slice(0, 4).map((r, i) => (
              <div
                key={i}
                style={{
                  borderTop: `3px solid ${PHILLIPS_COLORS.red}`,
                  padding: '20px 0 0',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    ...F_DISPLAY,
                    fontSize: 48,
                    lineHeight: 1,
                    color: PHILLIPS_COLORS.red,
                    marginBottom: 12,
                  }}
                >
                  {r.value}
                </div>
                <div
                  style={{
                    ...F_LIGHT,
                    fontSize: 12,
                    letterSpacing: 2,
                    color: PHILLIPS_COLORS.grey,
                  }}
                >
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Pull quote — inline */}
      {caseStudy.pullQuote && (
        <section style={{ background: '#F2F4F6', padding: '80px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 28,
                lineHeight: 1.4,
                color: PHILLIPS_COLORS.black,
                margin: '0 0 24px',
              }}
            >
              &ldquo;{caseStudy.pullQuote}&rdquo;
            </p>
            {caseStudy.pullQuoteAttribution && (
              <>
                <div
                  style={{
                    ...F_DISPLAY,
                    fontSize: 12,
                    letterSpacing: 2,
                    color: PHILLIPS_COLORS.grey,
                    marginBottom: 12,
                  }}
                >
                  — {caseStudy.pullQuoteAttribution}
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: 48,
                    height: 3,
                    background: PHILLIPS_COLORS.red,
                  }}
                />
              </>
            )}
          </div>
        </section>
      )}

      {/* 4. Body */}
      {caseStudy.body && (
        <section style={{ padding: '80px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <PortableText value={caseStudy.body} components={indiaPortableTextComponents} />
          </div>
        </section>
      )}

      {/* 5. Related brands logo carousel */}
      {logos.length > 0 && (
        <IndiaLogoCarousel logos={logos} title="Related brands" />
      )}

      {/* 6. Intent-gated mid-page form */}
      {(intent === 'consideration' || intent === 'conversion') && (
        <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="mid-page" variant="inline" />
      )}

      {/* 7. Related case studies — hardcoded fallback. TBD-verify cleanup-queue §3 */}
      <IndiaSectionBreak headline="More case studies" />
      <div style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <IndiaH2 align="left">Related stories</IndiaH2>
          <div style={{ marginTop: 32 }}>
            <IndiaPhotoGrid tiles={relatedTiles} layout="3-up" />
          </div>
        </div>
      </div>

      {/* 8. Intent-gated bottom form */}
      {intent === 'conversion' && (
        <div style={{ background: '#F2F4F6' }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
    </main>
  )
}
