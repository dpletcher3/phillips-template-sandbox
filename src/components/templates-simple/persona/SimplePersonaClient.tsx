'use client'

import { useState } from 'react'
import { PersonaData } from '@/components/templates/persona/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'

const RED = '#F9423A'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

type Tab = 'overview' | 'solutions' | 'brands' | 'federal'

export default function SimplePersonaClient({ persona }: { persona: PersonaData }) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'solutions', label: 'Solutions' },
    { key: 'brands', label: 'Brands' },
    { key: 'federal', label: 'Federal' },
  ]

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />

      {/* Split hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '42fr 58fr', minHeight: '55vh' }}>
        {/* Left dark panel */}
        <div style={{ background: '#111', padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#fff' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 16 }}>I&apos;m a {persona.persona}</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 40, textTransform: 'uppercase', lineHeight: 1.05, margin: '0 0 16px' }}>
            {persona.headline.replace(persona.headlineAccent, '').trim()} <em style={{ color: RED, fontStyle: 'normal' }}>{persona.headlineAccent}</em>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,.5)', margin: '0 0 28px', maxWidth: 400 }}>{persona.description}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href={persona.ctaUrl} style={{ background: RED, color: '#fff', border: 'none', padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>{persona.ctaLabel}</a>
            <button style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,.2)', padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>Learn More</button>
          </div>
        </div>

        {/* Right panel with tabs */}
        <div style={{ padding: '0' }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${BORDER}` }}>
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                style={{
                  flex: 1, padding: '16px 0', fontSize: 11, fontWeight: 700,
                  letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
                  background: 'transparent', border: 'none',
                  color: activeTab === t.key ? RED : GREY,
                  borderBottom: activeTab === t.key ? `2px solid ${RED}` : '2px solid transparent',
                }}
              >{t.label}</button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ padding: '40px 48px' }}>
            {activeTab === 'overview' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                  {persona.tabs.stats.map(s => (
                    <div key={s.label} style={{ background: LIGHT, padding: '20px', borderRadius: 4 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: RED }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: GREY, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px' }}>Key Solutions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
                  {persona.tabs.solutions.slice(0, 4).map(s => (
                    <a key={s.label} href={s.href} style={{ border: `1px solid ${BORDER}`, borderRadius: 4, padding: '16px 20px', textDecoration: 'none', color: '#1a1a1a', cursor: 'pointer' }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: GREY, lineHeight: 1.5 }}>{s.description}</div>
                    </a>
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px' }}>Top Brands</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {persona.tabs.brands.slice(0, 4).map(b => (
                    <a key={b.label} href={b.href} style={{ border: `1px solid ${BORDER}`, borderRadius: 4, padding: '16px', textDecoration: 'none', color: '#1a1a1a', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}>{b.label}</div>
                    </a>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'solutions' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {persona.tabs.solutions.map(s => (
                  <a key={s.label} href={s.href} style={{ border: `1px solid ${BORDER}`, borderRadius: 4, padding: '20px', textDecoration: 'none', color: '#1a1a1a' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: GREY, lineHeight: 1.5 }}>{s.description}</div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === 'brands' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {persona.tabs.brands.map(b => (
                  <a key={b.label} href={b.href} style={{ border: `1px solid ${BORDER}`, borderRadius: 4, padding: '24px 20px', textDecoration: 'none', color: '#1a1a1a' }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', marginBottom: 6 }}>{b.label}</div>
                    <div style={{ fontSize: 12, color: GREY, lineHeight: 1.5 }}>{b.description}</div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === 'federal' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {persona.tabs.federal.map(f => (
                  <div key={f.label} style={{ border: `1px solid ${BORDER}`, borderRadius: 4, padding: '20px' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 12, color: GREY, lineHeight: 1.5 }}>{f.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
