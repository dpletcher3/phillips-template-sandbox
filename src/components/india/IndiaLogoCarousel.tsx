import { F_LIGHT, PHILLIPS_COLORS } from '@/lib/constants'

type Logo = { src: string; alt: string; href?: string }

type Props = {
  logos: Logo[]
  title?: string
  autoScroll?: boolean
}

/**
 * Customer-logo trust-bar per §5.6. CSS-only infinite marquee (no JS
 * library) that pauses on hover when autoScroll is enabled. Reuses the
 * marquee keyframes pattern from BrandPageClient.tsx:51-56.
 *
 * The logos array is duplicated in the DOM so the translateX(-50%) loop
 * appears seamless.
 */
export default function IndiaLogoCarousel({
  logos,
  title,
  autoScroll = true,
}: Props) {
  const items = autoScroll ? [...logos, ...logos] : logos
  return (
    <section style={{ background: '#fff', padding: '48px 48px' }}>
      <style>{`
        @keyframes india-logo-carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .india-logo-carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      {title && (
        <div
          style={{
            ...F_LIGHT,
            fontSize: 11,
            letterSpacing: 2,
            color: PHILLIPS_COLORS.grey,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        }}
      >
        <div
          className={autoScroll ? 'india-logo-carousel-track' : undefined}
          style={{
            display: 'inline-flex',
            gap: 56,
            alignItems: 'center',
            whiteSpace: 'nowrap',
            animation: autoScroll ? 'india-logo-carousel-scroll 24s linear infinite' : undefined,
          }}
        >
          {items.map((logo, i) => {
            const img = (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: 40,
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'grayscale(1) opacity(0.65)',
                  transition: 'filter 0.2s ease',
                }}
              />
            )
            return logo.href ? (
              <a key={i} href={logo.href} style={{ display: 'inline-flex' }}>
                {img}
              </a>
            ) : (
              <span key={i} style={{ display: 'inline-flex' }}>
                {img}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
