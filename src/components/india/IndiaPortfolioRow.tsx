import type { PortableTextBlock } from '@portabletext/types'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'
import PortableText from '@/components/PortableText'
import { IndiaCtaButton } from './atoms'
import { indiaPortableTextComponents } from './portableText'

export type IndiaPortfolioRowProps = {
  /** 0-based row index; even = image left, odd = image right (desktop/tablet only). */
  index: number
  image: string | { src: string; alt: string }
  /** Small uppercase brand or partner name above the title. */
  brandLabel?: string
  title: string
  /** Plain text (rendered as a paragraph) or Portable Text blocks. */
  body: string | PortableTextBlock[]
  /** Small text-button links under the body, chevron-prefixed. */
  subActions?: Array<{ label: string; href: string }>
  primaryCta?: { label: string; href: string }
}

/**
 * Alternating-side image+narrative row per §5.2. Used 3–5× per page on
 * brand-portfolio sections (HAAS / APEC / HERMLE / Reichenbacher / Kitamura
 * on the 5-axis-machining page).
 *
 * Desktop/tablet: 50/50 split, image side alternates by index parity.
 * Mobile: always image-above-content regardless of index.
 */
export default function IndiaPortfolioRow({
  index,
  image,
  brandLabel,
  title,
  body,
  subActions,
  primaryCta,
}: IndiaPortfolioRowProps) {
  const imageLeft = index % 2 === 0
  const img = typeof image === 'string' ? { src: image, alt: '' } : image
  const bodyIsBlocks = typeof body !== 'string'

  // Unique class so the responsive @media swap targets just these rows.
  return (
    <section
      style={{
        padding: '48px 48px',
        background: '#fff',
        color: PHILLIPS_COLORS.black,
      }}
    >
      <style>{`
        .india-portfolio-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          max-width: 1240px;
          margin: 0 auto;
        }
        @media (max-width: 760px) {
          .india-portfolio-row {
            grid-template-columns: 1fr !important;
            gap: 24px;
            padding-left: 0;
            padding-right: 0;
          }
          .india-portfolio-image-col { order: 0 !important; }
          .india-portfolio-content-col { order: 1 !important; }
        }
      `}</style>

      <div className="india-portfolio-row">
        <div
          className="india-portfolio-image-col"
          style={{ order: imageLeft ? 0 : 1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            style={{
              width: '100%',
              aspectRatio: '4 / 3',
              objectFit: 'cover',
              display: 'block',
              background: PHILLIPS_COLORS.light,
            }}
          />
        </div>

        <div
          className="india-portfolio-content-col"
          style={{ order: imageLeft ? 1 : 0 }}
        >
          {brandLabel && (
            <div
              style={{
                ...F_LIGHT,
                fontSize: 11,
                letterSpacing: 2,
                color: PHILLIPS_COLORS.red,
                marginBottom: 12,
              }}
            >
              {brandLabel}
            </div>
          )}
          <h3
            style={{
              ...F_DISPLAY,
              fontSize: 24,
              lineHeight: 1.2,
              letterSpacing: 1,
              margin: '0 0 16px',
              color: PHILLIPS_COLORS.black,
            }}
          >
            {title}
          </h3>
          {bodyIsBlocks ? (
            <div style={{ marginBottom: 20 }}>
              <PortableText value={body as PortableTextBlock[]} components={indiaPortableTextComponents} />
            </div>
          ) : (
            <p
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 14,
                lineHeight: 1.85,
                color: PHILLIPS_COLORS.grey,
                margin: '0 0 20px',
              }}
            >
              {body as string}
            </p>
          )}

          {subActions && subActions.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: 20,
                flexWrap: 'wrap',
                marginBottom: primaryCta ? 24 : 0,
              }}
            >
              {subActions.map(a => (
                <a
                  key={a.href}
                  href={a.href}
                  style={{
                    fontFamily: 'var(--font-barlow-condensed), sans-serif',
                    fontSize: 12,
                    fontWeight: 700,
                    fontStyle: 'italic',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    color: PHILLIPS_COLORS.red,
                    textDecoration: 'none',
                  }}
                >
                  <span aria-hidden="true" style={{ marginRight: 6 }}>›</span>
                  {a.label}
                </a>
              ))}
            </div>
          )}

          {primaryCta && (
            <IndiaCtaButton variant="body" size="md" href={primaryCta.href}>
              {primaryCta.label}
            </IndiaCtaButton>
          )}
        </div>
      </div>
    </section>
  )
}
