'use client'

import { BrandData } from './types'

/* ----------------------------------------------------------------
   Sanity fields → BrandHero mapping:
   - brand.name        → giant heading
   - brand.tagline     → tagline row
   - brand.description → body text
   - brand.heroImage   → right panel background
   - brand.category[]  → category pills
   - heroStats[]       → stat strip (derived / manual in Sanity)
   ---------------------------------------------------------------- */

interface Props {
  data: BrandData
}

/** Split brand name so last 2 letters render in accent color */
function splitName(name: string) {
  if (name.length <= 2) return { main: '', accent: name }
  return { main: name.slice(0, -2), accent: name.slice(-2) }
}

export default function BrandHero({ data }: Props) {
  const { main, accent } = splitName(data.name)

  return (
    <section
      style={{
        position: 'relative',
        height: '70vh',
        minHeight: 560,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* ---- LEFT: TEXT PANEL ---- */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 56px 48px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Back link */}
        <a
          href="/"
          style={{
            position: 'absolute',
            top: 24,
            left: 56,
            color: '#F9423A',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
            fontWeight: 700,
            textDecoration: 'none',
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          ← Sandbox
        </a>

        {/* Brand name */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(80px, 13vw, 160px)',
            textTransform: 'uppercase' as const,
            lineHeight: 0.88,
            letterSpacing: '-2px',
            margin: '0 0 24px',
          }}
        >
          {main}
          <span style={{ color: '#F9423A' }}>{accent}</span>
        </h1>

        {/* Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 40, height: 3, background: '#F9423A', borderRadius: 2 }} />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,.6)',
            }}
          >
            {data.tagline}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,.4)',
            maxWidth: 360,
            margin: '0 0 32px',
          }}
        >
          {data.description}
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 'auto' }}>
          <a
            href="#product-lines"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 28px',
              background: '#fff',
              color: '#000',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'background .2s, color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F9423A'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
          >
            Explore Machines
          </a>
          <a
            href="#quote"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 28px',
              background: 'transparent',
              color: '#fff',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,.2)',
              borderRadius: 2,
              transition: 'border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F9423A' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)' }}
          >
            Get a Quote
          </a>
        </div>

        {/* Stat strip */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            borderTop: '1px solid rgba(255,255,255,.06)',
            paddingTop: 20,
            marginTop: 32,
          }}
        >
          {data.heroStats.map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                paddingLeft: i > 0 ? 24 : 0,
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,.08)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: 1,
                  color: '#fff',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: 'uppercase' as const,
                  color: 'rgba(255,255,255,.3)',
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- RIGHT: IMAGE PANEL ---- */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Placeholder for heroImage */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,.04)',
          }}
        />

        {/* Left-edge gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #000 0%, transparent 40%)',
            zIndex: 1,
          }}
        />

        {/* Category pills */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 28,
            display: 'flex',
            gap: 8,
            zIndex: 2,
            flexWrap: 'wrap' as const,
            justifyContent: 'flex-end',
          }}
        >
          {data.categories.map(cat => (
            <span
              key={cat}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase' as const,
                padding: '6px 14px',
                background: 'rgba(0,0,0,.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 3,
                color: 'rgba(255,255,255,.7)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
