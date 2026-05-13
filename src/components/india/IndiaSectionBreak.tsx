import { F_DISPLAY, F_BODY, PHILLIPS_COLORS } from '@/lib/constants'

type Props = {
  headline: string
  tagline?: string
  surface?: 'light' | 'dark'
  portrait?: { src: string; alt: string }
}

/**
 * Pure-typography section-break band per §5.3 — the "TRANSFORM YOUR
 * MANUFACTURING PROCESS" treatment. Two surface variants and an optional
 * portrait inset (anchored left third on desktop, stacks above on mobile).
 *
 * No CTA, no image apart from the optional portrait — austere by design.
 */
export default function IndiaSectionBreak({
  headline,
  tagline,
  surface = 'light',
  portrait,
}: Props) {
  const isDark = surface === 'dark'
  return (
    <section
      style={{
        background: isDark ? PHILLIPS_COLORS.black : '#fff',
        color: isDark ? '#fff' : PHILLIPS_COLORS.black,
        padding: '80px 48px',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: portrait ? 'grid' : 'block',
          gridTemplateColumns: portrait ? '280px 1fr' : undefined,
          gap: portrait ? 48 : 0,
          alignItems: 'center',
        }}
      >
        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portrait.src}
            alt={portrait.alt}
            style={{
              width: 280,
              height: 280,
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
        <div style={{ textAlign: portrait ? 'left' : 'center' }}>
          <h2
            style={{
              ...F_DISPLAY,
              fontSize: 32,
              lineHeight: 1.1,
              letterSpacing: 2,
              margin: 0,
              color: 'inherit',
            }}
          >
            {headline}
          </h2>
          {tagline && (
            <p
              style={{
                ...F_BODY,
                fontStyle: 'normal',
                textTransform: 'none',
                fontSize: 14,
                lineHeight: 1.5,
                color: isDark ? 'rgba(255,255,255,0.7)' : PHILLIPS_COLORS.grey,
                marginTop: 12,
                marginBottom: 0,
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
              }}
            >
              {tagline}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
