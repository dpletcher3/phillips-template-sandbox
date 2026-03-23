'use client'

import { useState } from 'react'
import BrandHero from './BrandHero'
import ProductLineScroll from './ProductLineScroll'
import SpecBars from './SpecBars'
import { BrandData } from './types'

type Tab = 'specs' | 'about' | 'cases'

export default function BrandPageClient({ brand }: { brand: BrandData }) {
  const [activeTab, setActiveTab] = useState<Tab>('specs')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'specs', label: 'Specifications' },
    { key: 'about', label: `About ${brand.name}` },
    { key: 'cases', label: 'Case Studies' },
  ]

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      {/* ---- SECTION 1: HERO ---- */}
      <BrandHero data={brand} />

      {/* ---- SECTION 2: RED MARQUEE ---- */}
      <div
        style={{
          background: '#F9423A',
          overflow: 'hidden',
          padding: '14px 0',
          whiteSpace: 'nowrap' as const,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'marquee 24s linear infinite',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 3,
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,.9)',
          }}
        >
          {brand.marqueeText}
          {brand.marqueeText}
        </div>
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ---- SECTION 3: PRODUCT LINE SCROLL ---- */}
      <ProductLineScroll productLines={brand.productLines} />

      {/* ---- SECTION 4: TABS ---- */}
      <section style={{ padding: '0 56px 96px' }}>
        <div
          style={{
            display: 'flex',
            gap: 0,
            borderBottom: '1px solid rgba(255,255,255,.08)',
            marginBottom: 48,
          }}
        >
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === t.key ? '2px solid #F9423A' : '2px solid transparent',
                padding: '16px 28px',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 2,
                textTransform: 'uppercase' as const,
                color: activeTab === t.key ? '#fff' : 'rgba(255,255,255,.3)',
                cursor: 'pointer',
                transition: 'color .2s, border-color .2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'specs' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <SpecBars specs={brand.specs} />
            <div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase' as const, letterSpacing: 1, margin: '0 0 16px' }}>
                Built for Micron-Level <span style={{ color: '#F9423A' }}>Precision</span>
              </h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', margin: '0 0 24px' }}>
                {brand.about.description}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase' as const, letterSpacing: 1, margin: '0 0 20px' }}>
                {brand.about.title || <>About <span style={{ color: '#F9423A' }}>{brand.name}</span></>}
              </h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', margin: 0 }}>
                {brand.about.description}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignContent: 'start' }}>
              {brand.about.stats.map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, padding: '28px 24px' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#fff', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.3)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {brand.caseStudies.map(cs => (
              <div
                key={cs.slug}
                style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, padding: '32px 28px', transition: 'border-color .2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,66,58,.3)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)' }}
              >
                <div style={{ display: 'inline-block', fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#F68B33', marginBottom: 14 }}>{cs.industry}</div>
                <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: '#fff', margin: '0 0 10px' }}>{cs.title}</h4>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>{cs.customer}</div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,.35)', margin: '0 0 20px' }}>{cs.summary}</p>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#F9423A' }}>Read Case Study →</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
