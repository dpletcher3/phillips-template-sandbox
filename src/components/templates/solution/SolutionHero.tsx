'use client'

import { SolutionData } from './types'

/* ----------------------------------------------------------------
   Sanity fields → SolutionHero mapping:
   - solution.offering  → breadcrumb label
   - solution.name      → large title
   - solution.shortDesc → description paragraph
   - solution.heroImage → right panel background
   ---------------------------------------------------------------- */

interface Props {
  data: SolutionData
}

export default function SolutionHero({ data }: Props) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Giant background number */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(200px, 30vw, 340px)',
          color: '#f5f5f1',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {data.offeringNumber}
      </div>

      {/* ---- LEFT: TEXT ---- */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 56px 64px',
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

        {/* Breadcrumb */}
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
            color: '#999',
            marginBottom: 16,
          }}
        >
          {data.offering}
          <span style={{ margin: '0 8px', color: '#ddd' }}>/</span>
          <span style={{ color: '#F9423A' }}>{data.name}</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(48px, 6vw, 72px)',
            textTransform: 'uppercase' as const,
            lineHeight: 0.95,
            letterSpacing: '-1px',
            color: '#000',
            margin: '0 0 24px',
          }}
        >
          {data.name}
        </h1>

        {/* Type pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 28 }}>
          {data.typePills.map(pill => (
            <span
              key={pill}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase' as const,
                padding: '6px 14px',
                border: '1px solid #e0e0e0',
                borderRadius: 3,
                color: '#666',
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Description with red left border */}
        <div
          style={{
            borderLeft: '3px solid #F9423A',
            paddingLeft: 20,
            marginBottom: 36,
            maxWidth: 420,
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 13,
              lineHeight: 1.85,
              color: '#777',
              margin: 0,
            }}
          >
            {data.description}
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href="#brands"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '13px 28px',
              background: '#000',
              color: '#fff',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'background .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F9423A' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#000' }}
          >
            View Brands
          </a>
          <a
            href="#specs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '13px 28px',
              background: 'transparent',
              color: '#000',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              border: '1px solid #ddd',
              borderRadius: 2,
              transition: 'border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F9423A' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd' }}
          >
            Compare Specs
          </a>
        </div>
      </div>

      {/* ---- RIGHT: IMAGE ---- */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#f7f7f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '70%',
            height: '60%',
            background: '#eeede9',
            borderRadius: 4,
          }}
        />
      </div>
    </section>
  )
}
