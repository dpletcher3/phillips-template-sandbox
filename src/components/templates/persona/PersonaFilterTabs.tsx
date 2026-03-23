'use client'

import { useState } from 'react'
import { TabContent, StatCell } from './types'
import ContentGrid from './ContentGrid'

/* ----------------------------------------------------------------
   Sanity fields → PersonaFilterTabs mapping:
   - personaPage.featuredSolutions[] → Solutions tab grid
   - personaPage.featuredBrands[]    → Brands tab grid
   - Stats and Federal tabs are persona-specific content
   ---------------------------------------------------------------- */

interface Props {
  tabs: TabContent
}

type TabKey = 'overview' | 'solutions' | 'brands' | 'federal'

function StatStrip({ stats }: { stats: StatCell[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        gap: 0,
        marginBottom: 0,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            padding: '28px 24px',
            borderBottom: '1px solid #eee',
            borderRight: i < stats.length - 1 ? '1px solid #eee' : 'none',
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 36,
              color: '#F9423A',
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              color: '#999',
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PersonaFilterTabs({ tabs }: Props) {
  const [active, setActive] = useState<TabKey>('overview')

  const tabDefs: { key: TabKey; label: string }[] = [
    { key: 'overview',  label: 'Overview' },
    { key: 'solutions', label: 'Solutions' },
    { key: 'brands',    label: 'Brands' },
    { key: 'federal',   label: 'Federal' },
  ]

  return (
    <div
      style={{
        width: '55%',
        background: '#fff',
        color: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid #eee',
          paddingLeft: 40,
          paddingTop: 24,
        }}
      >
        {tabDefs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: active === t.key ? '2px solid #F9423A' : '2px solid transparent',
              padding: '14px 24px',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              color: active === t.key ? '#000' : '#bbb',
              cursor: 'pointer',
              transition: 'color .2s, border-color .2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div style={{ flex: 1, padding: '32px 40px 48px', overflowY: 'auto' as const }}>
        {/* Overview tab */}
        {active === 'overview' && (
          <div>
            <StatStrip stats={tabs.stats} />
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 24, height: 2, background: '#F9423A' }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#999' }}>
                  Top Solutions
                </span>
              </div>
              <ContentGrid cells={tabs.solutions.slice(0, 4)} columns={2} />
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 24, height: 2, background: '#F9423A' }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#999' }}>
                  Featured Brands
                </span>
              </div>
              <ContentGrid cells={tabs.brands} columns={4} />
            </div>
          </div>
        )}

        {/* Solutions tab */}
        {active === 'solutions' && (
          <div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, textTransform: 'uppercase' as const, letterSpacing: 1, margin: '0 0 24px', color: '#000' }}>
              Solutions for <span style={{ color: '#F9423A' }}>Manufacturers</span>
            </h3>
            <ContentGrid cells={tabs.solutions} columns={3} />
          </div>
        )}

        {/* Brands tab */}
        {active === 'brands' && (
          <div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, textTransform: 'uppercase' as const, letterSpacing: 1, margin: '0 0 24px', color: '#000' }}>
              Our <span style={{ color: '#F9423A' }}>Brands</span>
            </h3>
            <ContentGrid cells={tabs.brands} columns={2} />
          </div>
        )}

        {/* Federal tab */}
        {active === 'federal' && (
          <div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, textTransform: 'uppercase' as const, letterSpacing: 1, margin: '0 0 24px', color: '#000' }}>
              Federal &amp; <span style={{ color: '#F9423A' }}>DoD Programs</span>
            </h3>
            <ContentGrid cells={tabs.federal} columns={2} />
          </div>
        )}
      </div>
    </div>
  )
}
