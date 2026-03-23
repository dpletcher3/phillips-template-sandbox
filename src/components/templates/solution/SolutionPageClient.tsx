'use client'

import { useEffect, useRef, useState } from 'react'
import SolutionHero from '@/components/templates/solution/SolutionHero'
import SpecStripe from '@/components/templates/solution/SpecStripe'
import BrandMatrix from '@/components/templates/solution/BrandMatrix'
import { SolutionData, SpecBar } from '@/components/templates/solution/types'
import TemplateBadge from '@/components/TemplateBadge'

function AnimatedSpecBars({ specs }: { specs: SpecBar[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {specs.map((s, i) => {
        const pct = (s.value / s.max) * 100
        return (
          <div key={s.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#999' }}>
                {s.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, color: '#000' }}>
                  {typeof s.value === 'number' && s.value < 1 ? `\u00b1${s.value}` : s.value.toLocaleString()}
                </span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: 1 }}>
                  {s.unit}
                </span>
              </div>
            </div>
            <div style={{ height: 6, background: '#f0f0ee', borderRadius: 3, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: triggered ? `${pct}%` : '0%',
                  background: i === 0 ? '#F9423A' : '#000',
                  borderRadius: 3,
                  transition: `width 1s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
                }}
              />
            </div>
            {s.note && (
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: '#bbb', marginTop: 6 }}>
                {s.note}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function SolutionPageClient({ sol }: { sol: SolutionData }) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#000' }}>
      <TemplateBadge />
      {/* ---- SECTION 1: HERO ---- */}
      <SolutionHero data={sol} />

      {/* ---- SECTION 2: BLACK SPEC STRIPE ---- */}
      <SpecStripe specs={sol.specNumbers} />

      {/* ---- SECTION 3: BRAND MATRIX ---- */}
      <BrandMatrix brands={sol.relatedBrands} />

      {/* ---- SECTION 4: SPEC BARS ---- */}
      <section id="specs" style={{ background: '#fff', padding: '72px 56px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 32, height: 2, background: '#F9423A' }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#999' }}>
            Specifications
          </span>
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, textTransform: 'uppercase' as const, color: '#000', letterSpacing: 1, margin: '0 0 40px' }}>
          {sol.specsHeading}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <AnimatedSpecBars specs={sol.specs} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, lineHeight: 1.85, color: '#777', margin: 0 }}>
              {sol.specsDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ---- SECTION 5: DARK END CTA ---- */}
      <section style={{ position: 'relative', background: '#000', padding: '96px 56px', overflow: 'hidden' }}>
        {/* Decorative rings */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            border: '1px solid rgba(255,255,255,.04)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 240,
            height: 240,
            border: '1px solid rgba(255,255,255,.03)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 48,
              textTransform: 'uppercase' as const,
              lineHeight: 1.05,
              letterSpacing: 1,
              color: '#fff',
              margin: '0 0 20px',
            }}
          >
            {sol.ctaHeading}{' '}
            <span style={{ color: '#F9423A' }}>{sol.ctaAccent}</span>
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 13,
              lineHeight: 1.85,
              color: 'rgba(255,255,255,.4)',
              margin: '0 0 36px',
              maxWidth: 440,
            }}
          >
            {sol.ctaDescription}
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="#quote"
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
              {sol.ctaPrimaryLabel ?? 'Request a Quote'}
            </a>
            <a
              href="#test-cut"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '13px 28px',
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
              {sol.ctaSecondaryLabel ?? 'Schedule a Test Cut'}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
