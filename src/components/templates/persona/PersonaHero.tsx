'use client'

import { PersonaData } from './types'

/* ----------------------------------------------------------------
   Sanity fields → PersonaHero mapping:
   - personaPage.persona    → headline role
   - personaPage.headline   → large heading text
   - personaPage.heroImage  → left panel background
   - personaPage.description→ body text
   ---------------------------------------------------------------- */

interface Props {
  data: PersonaData
}

export default function PersonaHero({ data }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        width: '45%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 48px 60px',
        overflow: 'hidden',
      }}
    >
      {/* Photo placeholder overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,.03)',
          zIndex: 0,
        }}
      />

      {/* Maroon gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(63,0,23,.92) 0%, rgba(0,0,0,.88) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Back link */}
        <a
          href="/"
          style={{
            position: 'absolute',
            top: -40,
            left: 0,
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

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 5vw, 64px)',
            textTransform: 'uppercase' as const,
            lineHeight: 1.0,
            letterSpacing: 2,
            color: 'rgba(255,255,255,.4)',
            margin: '0 0 4px',
          }}
        >
          {data.headline}
        </h1>
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(48px, 6vw, 80px)',
            textTransform: 'uppercase' as const,
            lineHeight: 0.95,
            letterSpacing: 2,
            color: '#F9423A',
            margin: '0 0 28px',
          }}
        >
          {data.headlineAccent}
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            lineHeight: 1.85,
            color: 'rgba(255,255,255,.45)',
            maxWidth: 340,
            margin: '0 0 32px',
          }}
        >
          {data.description}
        </p>

        {/* CTA */}
        <a
          href={data.ctaUrl}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '13px 28px',
            background: '#F9423A',
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
          onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#F9423A'; e.currentTarget.style.color = '#fff' }}
        >
          {data.ctaLabel}
        </a>
      </div>
    </div>
  )
}
