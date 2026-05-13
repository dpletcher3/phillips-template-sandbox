import { PHILLIPS_COLORS, F_DISPLAY } from '@/lib/constants'

export type IndiaDarkCategoryCardProps = {
  image: string | { src: string; alt: string }
  title: string
  description?: string
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP: Record<
  NonNullable<IndiaDarkCategoryCardProps['size']>,
  { padding: string; titleSize: number; imageHeight: number }
> = {
  sm: { padding: '16px 16px', titleSize: 16, imageHeight: 120 },
  md: { padding: '24px 20px', titleSize: 18, imageHeight: 160 },
  lg: { padding: '32px 24px', titleSize: 22, imageHeight: 200 },
}

const TOP_EDGE_HEIGHT = 3 // TBD-verify: §5.9 says "thin red top edge (2–3px)"

/**
 * Dark machine-category card per §5.9. A black surface with a thin red
 * top edge — used in 3-up grids on Machines & Technology / vertical-market
 * pages. Tiled, not stand-alone.
 *
 * Hover: subtle scale via CSS transform (no JS). The whole card is a
 * link if href is provided; otherwise renders as a non-interactive tile.
 */
export default function IndiaDarkCategoryCard({
  image,
  title,
  description,
  href,
  size = 'md',
}: IndiaDarkCategoryCardProps) {
  const img = typeof image === 'string' ? { src: image, alt: '' } : image
  const sz = SIZE_MAP[size]

  const content = (
    <>
      {/* Red top edge */}
      <div
        aria-hidden="true"
        style={{
          height: TOP_EDGE_HEIGHT,
          background: PHILLIPS_COLORS.red,
        }}
      />
      <div style={{ padding: sz.padding }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          style={{
            display: 'block',
            width: '100%',
            height: sz.imageHeight,
            objectFit: 'contain',
            marginBottom: 16,
            opacity: 0.85,
          }}
        />
        <h3
          style={{
            ...F_DISPLAY,
            fontSize: sz.titleSize,
            lineHeight: 1.2,
            letterSpacing: 1,
            color: '#fff',
            margin: 0,
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontFamily: 'var(--font-barlow-condensed), sans-serif',
              fontSize: 12,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.65)',
              margin: '8px 0 0',
            }}
          >
            {description}
          </p>
        )}
      </div>
    </>
  )

  // Common container style. Hover scale is applied via CSS class.
  // Using a static class name is fine — many cards share the same hover.
  const containerStyle: React.CSSProperties = {
    background: PHILLIPS_COLORS.black,
    color: '#fff',
    display: 'block',
    textDecoration: 'none',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
  }

  return (
    <>
      <style>{`
        .india-dark-category-card { will-change: transform; }
        .india-dark-category-card:hover { transform: translateY(-3px); }
      `}</style>
      {href ? (
        <a href={href} className="india-dark-category-card" style={containerStyle}>
          {content}
        </a>
      ) : (
        <div className="india-dark-category-card" style={containerStyle}>
          {content}
        </div>
      )}
    </>
  )
}
