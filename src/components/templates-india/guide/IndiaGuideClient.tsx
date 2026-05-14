import { PortableTextBlock } from '@portabletext/types'
import {
  IndiaContentHero,
  IndiaSectionBreak,
  IndiaPhotoGrid,
  IndiaProTipsCallout,
  IndiaRepeatableLeadForm,
  type Callout,
} from '@/components/india'
import { indiaPortableTextComponents } from '@/components/india/portableText'
import PortableText from '@/components/PortableText'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'

export interface SanityGuide {
  title?: string
  topic?: string
  heroImage?: unknown
  intro?: string
  body?: PortableTextBlock[]
  docNumber?: string
  readTime?: string
  level?: string
  tableOfContents?: Array<{ sectionNumber?: string; title?: string; subsections?: string[] }>
  callouts?: Callout[]
  intent?: string
}

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='30' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function IndiaGuideClient({ guide }: { guide: SanityGuide }) {
  const intent = readIntent(guide)
  const heroBg = sanityImageUrl(guide.heroImage) ?? placeholderTileUrl(guide.title ?? 'GUIDE', '#1b1e34')

  const eyebrow = guide.level ? `GUIDE: ${guide.level.toUpperCase()}` : 'GUIDE'
  const subtitle = guide.intro && guide.intro.length > 200 ? guide.intro.slice(0, 200) + '…' : guide.intro

  const metadata = [
    guide.topic     ? { label: 'Topic',      value: guide.topic } : null,
    guide.readTime  ? { label: 'Read time',  value: guide.readTime } : null,
    guide.docNumber ? { label: 'Doc number', value: guide.docNumber } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  const callouts = guide.callouts ?? []
  const firstCallout = callouts[0]
  const remainingCallouts = callouts.slice(1)

  // TBD-verify: related guides hardcoded fallback (cleanup-queue §3).
  const relatedTiles = [
    { image: placeholderTileUrl('5-axis Setup', '#3F0017'), alt: '5-axis Setup', caption: '5-axis Setup' },
    { image: placeholderTileUrl('Probe Cycles', '#0a5f54'), alt: 'Probe Cycles', caption: 'Probe Cycles' },
    { image: placeholderTileUrl('CMM Tips',     '#1b1e34'), alt: 'CMM Tips',     caption: 'CMM Tips' },
  ]

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      <IndiaContentHero
        eyebrow={eyebrow}
        title={guide.title ?? 'Guide'}
        subtitle={subtitle}
        backgroundImage={{ src: heroBg, alt: guide.title ?? '' }}
        metadata={metadata}
      />

      <style>{`
        .india-guide-grid {
          display: grid;
          grid-template-columns: minmax(0, 7fr) minmax(0, 3fr);
          gap: 56px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px;
        }
        .india-guide-toc-desktop { display: block; }
        .india-guide-toc-mobile  { display: none; }
        @media (max-width: 900px) {
          .india-guide-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 20px;
          }
          .india-guide-toc-desktop { display: none; }
          .india-guide-toc-mobile  { display: block; }
        }
      `}</style>

      <div className="india-guide-grid">
        {/* Main column — TOC then body */}
        <article style={{ minWidth: 0 }}>
          {guide.tableOfContents && guide.tableOfContents.length > 0 && (
            <>
              <div
                className="india-guide-toc-desktop"
                style={{
                  borderLeft: `3px solid ${PHILLIPS_COLORS.red}`,
                  paddingLeft: 16,
                  marginBottom: 40,
                }}
              >
                <div style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 2, color: PHILLIPS_COLORS.grey, marginBottom: 12 }}>
                  CONTENTS
                </div>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {guide.tableOfContents.map((t, i) => (
                    <li key={i} style={{ ...F_DISPLAY, fontSize: 14, lineHeight: 1.6, color: PHILLIPS_COLORS.black, marginBottom: 6 }}>
                      {t.sectionNumber ? `${t.sectionNumber} · ` : ''}{t.title ?? ''}
                    </li>
                  ))}
                </ol>
              </div>
              <details
                className="india-guide-toc-mobile"
                style={{
                  borderLeft: `3px solid ${PHILLIPS_COLORS.red}`,
                  paddingLeft: 16,
                  marginBottom: 32,
                }}
              >
                <summary
                  style={{
                    listStyle: 'none',
                    cursor: 'pointer',
                    ...F_DISPLAY,
                    fontSize: 14,
                    letterSpacing: 1,
                    color: PHILLIPS_COLORS.black,
                  }}
                >
                  Contents
                </summary>
                <ol style={{ listStyle: 'none', padding: '12px 0 0', margin: 0 }}>
                  {guide.tableOfContents.map((t, i) => (
                    <li key={i} style={{ ...F_DISPLAY, fontSize: 14, lineHeight: 1.6, color: PHILLIPS_COLORS.black, marginBottom: 6 }}>
                      {t.sectionNumber ? `${t.sectionNumber} · ` : ''}{t.title ?? ''}
                    </li>
                  ))}
                </ol>
              </details>
            </>
          )}

          {guide.body ? (
            <PortableText value={guide.body} components={indiaPortableTextComponents} />
          ) : (
            guide.intro && (
              <p style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: 14, lineHeight: 1.85, color: PHILLIPS_COLORS.grey }}>
                {guide.intro}
              </p>
            )
          )}
        </article>

        {/* Sidebar — first callout (if any) */}
        <aside style={{ minWidth: 0 }}>
          {firstCallout && firstCallout.body && (
            <IndiaProTipsCallout callout={firstCallout} />
          )}
        </aside>
      </div>

      {/* Remaining callouts inline as a stacked section */}
      {remainingCallouts.length > 0 && (
        <section style={{ padding: '24px 24px 80px', background: '#fff' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {remainingCallouts.map((c, i) =>
              c?.body ? <IndiaProTipsCallout key={i} callout={c} /> : null
            )}
          </div>
        </section>
      )}

      <IndiaSectionBreak headline="Related guides" />
      <div style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <IndiaPhotoGrid tiles={relatedTiles} layout="3-up" />
        </div>
      </div>

      {/* Intent-gated bottom form (conversion only) */}
      {intent === 'conversion' && (
        <div style={{ background: '#F2F4F6' }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
    </main>
  )
}
