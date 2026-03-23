'use client'

import { BrandCell } from './types'

/* ----------------------------------------------------------------
   Sanity fields → BrandMatrix mapping:
   - solution.relatedBrands[] → references to brand documents
   - brand.name               → cell heading
   - brand.description        → cell body
   ---------------------------------------------------------------- */

interface Props {
  brands: BrandCell[]
}

export default function BrandMatrix({ brands }: Props) {
  return (
    <section
      id="brands"
      style={{
        background: '#fff',
        padding: '72px 56px',
      }}
    >
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 32, height: 2, background: '#F9423A' }} />
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 3,
            textTransform: 'uppercase' as const,
            color: '#999',
          }}
        >
          Brands We Represent
        </span>
      </div>
      <h2
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 40,
          textTransform: 'uppercase' as const,
          color: '#000',
          letterSpacing: 1,
          margin: '0 0 36px',
        }}
      >
        World-Class <span style={{ color: '#F9423A' }}>Partners</span>
      </h2>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${brands.length}, 1fr)`,
          gap: 0,
        }}
      >
        {brands.map((b, i) => (
          <a
            key={b.slug}
            href={`/brand?slug=${b.slug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '36px 32px',
              border: '1px solid #eee',
              borderLeft: i > 0 ? 'none' : '1px solid #eee',
              textDecoration: 'none',
              color: '#000',
              minHeight: 200,
              transition: 'background .25s, color .25s, border-color .25s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.background = '#F9423A'
              el.style.borderColor = '#F9423A'
              el.style.color = '#fff'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.background = '#fff'
              el.style.borderColor = '#eee'
              el.style.color = '#000'
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                  textTransform: 'uppercase' as const,
                  letterSpacing: 1,
                  margin: '0 0 12px',
                }}
              >
                {b.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  lineHeight: 1.75,
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                {b.description}
              </p>
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                marginTop: 24,
                alignSelf: 'flex-end',
              }}
            >
              →
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
