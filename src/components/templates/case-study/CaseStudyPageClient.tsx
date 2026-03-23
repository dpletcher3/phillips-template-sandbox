'use client'

import { CaseStudyData } from './types'
import TemplateBadge from '@/components/TemplateBadge'

const RED = '#F9423A'
const CREAM = '#f9f7f3'
const SERIF = "'Georgia', 'Times New Roman', serif"

export default function CaseStudyPageClient({ data }: { data: CaseStudyData }) {
  return (
    <main style={{ background: CREAM, minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge />
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      {/* ---- MASTHEAD ---- */}
      <header style={{ padding: '80px 56px 32px', borderBottom: '2px solid #1a1a1a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'baseline', gap: 32, marginBottom: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#999' }}>{data.subtitle}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: 'italic', fontSize: 28, textAlign: 'center', margin: 0, color: '#1a1a1a' }}>Phillips Results</h1>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#999', textAlign: 'right' }}>{data.date}</div>
        </div>
      </header>

      {/* ---- RED KICKER BAR ---- */}
      <div style={{ background: RED, padding: '12px 56px', display: 'flex', gap: 16, alignItems: 'center' }}>
        {data.tags.map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.85)' }}>{t}</span>
        ))}
      </div>

      {/* ---- MAIN 2-COL ---- */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, padding: '48px 56px 64px' }}>
        <div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 36, lineHeight: 1.3, margin: '0 0 20px', color: '#1a1a1a' }}>{data.title}</h2>
          <div style={{ height: 2, background: '#1a1a1a', margin: '0 0 16px', width: 80 }} />
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 28 }}>By {data.byline} · {data.industry}</div>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#444', margin: '0 0 32px', fontWeight: 500 }}>{data.lede}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {data.bodyLeft.split('\n\n').map((p, i) => (
              <p key={`l${i}`} style={{ fontSize: 13, lineHeight: 1.85, color: '#666', margin: 0, gridColumn: '1' }}>{p}</p>
            ))}
            {data.bodyRight.split('\n\n').map((p, i) => (
              <p key={`r${i}`} style={{ fontSize: 13, lineHeight: 1.85, color: '#666', margin: 0, gridColumn: '2' }}>{p}</p>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: '#1a1a1a', borderRadius: 6, padding: '32px 28px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: RED, marginBottom: 24 }}>Key Results</div>
            {data.results.map((r, i) => (
              <div key={r.label} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,.06)' : 'none', padding: '16px 0' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#fff', lineHeight: 1 }}>{r.value}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginTop: 4 }}>{r.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 6, padding: '28px 24px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>{data.sidebarTitle}</div>
            {data.sidebarItems.map(item => (
              <div key={item} style={{ fontSize: 13, color: '#444', padding: '8px 0', borderBottom: '1px solid #f0ede8' }}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PULL QUOTE ---- */}
      <section style={{ background: RED, padding: '56px 56px', textAlign: 'center' }}>
        <blockquote style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, lineHeight: 1.6, color: '#fff', maxWidth: 700, margin: '0 auto 12px', fontWeight: 400 }}>{data.pullQuote}</blockquote>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.6)' }}>{data.pullAuthor}</div>
      </section>
    </main>
  )
}
