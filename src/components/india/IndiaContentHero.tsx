import { PHILLIPS_COLORS, F_LIGHT, F_DISPLAY } from '@/lib/constants'
import { IndiaH2 } from './atoms'

export type IndiaContentHeroProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  backgroundImage: string | { src: string; alt: string }
  metadata?: Array<{ label: string; value: string }>
  overlayOpacity?: number
}

/**
 * Formless hero for long-form content templates (Groups B/C/D). Where
 * IndiaHeroWithForm pairs a glass-card headline with a lead-gen form,
 * this hero centers all content over a photo background with a red→maroon
 * gradient overlay. A metadata strip at the bottom shows labeled facts
 * (Published / Author / Read time / Date / Status / etc.).
 */
export default function IndiaContentHero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  metadata,
  overlayOpacity = 0.55,
}: IndiaContentHeroProps) {
  const bg =
    typeof backgroundImage === 'string'
      ? { src: backgroundImage, alt: '' }
      : backgroundImage
  const op = Math.max(0, Math.min(1, overlayOpacity))

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 480,
        overflow: 'hidden',
        background: PHILLIPS_COLORS.black,
        color: '#fff',
      }}
    >
      <style>{`
        .india-content-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 96px 48px;
          text-align: center;
        }
        .india-content-hero-meta {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 0;
          flex-wrap: wrap;
          margin-top: 56px;
        }
        .india-content-hero-meta-item {
          padding: 0 28px;
          border-left: 1px solid rgba(255,255,255,0.3);
        }
        .india-content-hero-meta-item:first-child { border-left: none; }
        @media (max-width: 760px) {
          .india-content-hero-inner { padding: 56px 20px; }
          .india-content-hero-meta { gap: 8px 0; margin-top: 36px; }
          .india-content-hero-meta-item { flex: 1 0 50%; padding: 8px 14px; border-left: none; border-top: 1px solid rgba(255,255,255,0.2); }
          .india-content-hero-meta-item:nth-child(-n+2) { border-top: none; }
        }
      `}</style>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bg.src}
        alt={bg.alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, rgba(249,66,58,${op}) 0%, rgba(63,0,23,${op}) 100%)`,
          zIndex: 0,
        }}
      />

      <div className="india-content-hero-inner">
        {eyebrow && (
          <div
            style={{
              ...F_LIGHT,
              fontSize: 12,
              letterSpacing: 3,
              color: '#fff',
              marginBottom: 20,
              opacity: 0.95,
            }}
          >
            {eyebrow}
          </div>
        )}
        <IndiaH2>{title}</IndiaH2>
        {subtitle && (
          <p
            style={{
              fontFamily: 'var(--font-barlow-condensed), sans-serif',
              fontSize: 18,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
              margin: '28px auto 0',
              maxWidth: 760,
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
        )}
        {metadata && metadata.length > 0 && (
          <div className="india-content-hero-meta">
            {metadata.map((m, i) => (
              <div key={i} className="india-content-hero-meta-item">
                <div
                  style={{
                    ...F_LIGHT,
                    fontSize: 10,
                    letterSpacing: 2,
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: 6,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    ...F_DISPLAY,
                    fontSize: 14,
                    color: '#fff',
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
