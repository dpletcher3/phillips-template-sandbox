import SanityImage from '@/components/SanityImage'
import IndiaCaptionPill from './atoms/IndiaCaptionPill'

type Tile = {
  image: string | unknown // string URL or raw Sanity image object
  alt: string
  caption: string
  href?: string
}

type Props = {
  tiles: Tile[]
  layout?: '6-up' | '4-up' | '3-up'
}

const DESKTOP_COLUMNS: Record<NonNullable<Props['layout']>, number> = {
  '6-up': 6,
  '4-up': 4,
  '3-up': 3,
}

/**
 * N-up photo grid with caption pills per §5.7. Desktop columns are
 * controlled by `layout`; tablet always 2-column; mobile single-column.
 *
 * Mobile breakpoint behavior is implemented via CSS @media so the grid
 * is fully static (no JS resize listeners).
 */
export default function IndiaPhotoGrid({ tiles, layout = '6-up' }: Props) {
  const cols = DESKTOP_COLUMNS[layout]
  // Use a unique class so the @media rules are scoped to this grid instance pattern.
  // Multiple <IndiaPhotoGrid> instances on a single page all share the same class,
  // which is fine — they all want the same responsive behavior.
  return (
    <section style={{ background: '#fff', padding: '48px 0' }}>
      <style>{`
        .india-photo-grid {
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
          gap: 12px;
        }
        @media (max-width: 1024px) {
          .india-photo-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .india-photo-grid { grid-template-columns: 1fr !important; }
        }
        .india-photo-grid-tile {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          display: block;
          background: #f2f4f6;
        }
        .india-photo-grid-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .india-photo-grid-tile:hover img {
          transform: scale(1.04);
        }
      `}</style>
      <div className="india-photo-grid">
        {tiles.map((tile, i) => {
          const isStringUrl = typeof tile.image === 'string'
          const inner = (
            <>
              {isStringUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tile.image as string} alt={tile.alt} />
              ) : (
                <SanityImage image={tile.image} alt={tile.alt} fill />
              )}
              <IndiaCaptionPill position="bottom-left">{tile.caption}</IndiaCaptionPill>
            </>
          )
          return tile.href ? (
            <a
              key={i}
              href={tile.href}
              className="india-photo-grid-tile"
              aria-label={tile.alt}
            >
              {inner}
            </a>
          ) : (
            <div key={i} className="india-photo-grid-tile" role="img" aria-label={tile.alt}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
