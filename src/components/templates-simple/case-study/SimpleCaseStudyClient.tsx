'use client'

import { CaseStudyData } from '@/components/templates/case-study/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'

const RED = '#F9423A'
const GOLD = '#F68B33'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimpleCaseStudyClient({ data }: { data: CaseStudyData }) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />

      {/* Dark hero */}
      <section style={{ background: '#000', color: '#fff', display: 'grid', gridTemplateColumns: '1fr 400px', gap: 56, padding: '64px 48px' }}>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {data.tags.map(t => (
              <span key={t} style={{ background: `${GOLD}20`, color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px' }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 44, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.05, margin: '0 0 16px' }}>
            {data.title.split(' ').slice(0, -2).join(' ')} <em style={{ color: RED, fontStyle: 'normal' }}>{data.title.split(' ').slice(-2).join(' ')}</em>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', margin: 0 }}>{data.byline}</p>
        </div>
        {/* Results card */}
        <div style={{ background: '#fff', color: '#1a1a1a', borderTop: `4px solid ${RED}`, padding: '28px 24px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREY, marginBottom: 20 }}>Key Results</div>
          {data.results.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '14px 0', borderBottom: i < data.results.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: RED, minWidth: 80 }}>{r.value}</span>
              <span style={{ fontSize: 13, color: GREY }}>{r.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, padding: '56px 48px' }}>
        <div>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px' }}>The Challenge</h3>
          {data.lede && <p style={{ fontSize: 14, lineHeight: 1.8, color: '#333', margin: '0 0 24px' }}>{data.lede}</p>}
          {data.bodyLeft.split('\n\n').map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#444', margin: '0 0 16px' }}>{p}</p>
          ))}

          {/* Pull quote */}
          {data.pullQuote && (
            <blockquote style={{ borderLeft: `3px solid ${RED}`, background: LIGHT, padding: '20px 24px', margin: '32px 0', fontSize: 15, fontStyle: 'italic', lineHeight: 1.7, color: '#333' }}>
              &ldquo;{data.pullQuote}&rdquo;
              {data.pullAuthor && <footer style={{ marginTop: 8, fontSize: 12, fontStyle: 'normal', color: GREY }}>— {data.pullAuthor}</footer>}
            </blockquote>
          )}

          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, textTransform: 'uppercase', letterSpacing: 1, margin: '32px 0 16px' }}>The Solution</h3>
          {data.bodyRight.split('\n\n').map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#444', margin: '0 0 16px' }}>{p}</p>
          ))}
        </div>

        {/* Sidebar */}
        <aside>
          <div style={{ background: LIGHT, padding: '24px', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREY, marginBottom: 12 }}>Industry</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{data.industry}</div>
          </div>
          <div style={{ background: LIGHT, padding: '24px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREY, marginBottom: 12 }}>{data.sidebarTitle}</div>
            {data.sidebarItems.map(item => (
              <div key={item} style={{ fontSize: 13, padding: '6px 0', color: '#444' }}>{item}</div>
            ))}
          </div>
        </aside>
      </section>

      {/* CTA */}
      <section style={{ background: '#000', padding: '56px 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, textTransform: 'uppercase', color: '#fff', margin: '0 0 20px' }}>See How We Can Help Your Team</h2>
        <button style={{ background: RED, color: '#fff', border: 'none', padding: '14px 36px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>Contact Us</button>
      </section>
    </main>
  )
}
