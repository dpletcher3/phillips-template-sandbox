'use client'

import { useState, useEffect } from 'react'
import { GuideData } from './types'
import TemplateBadge from '@/components/TemplateBadge'

const RED = '#F9423A'
const BG = '#0d0d0d'

export default function GuidePageClient({ data }: { data: GuideData }) {
  const [activeSection, setActiveSection] = useState(data.sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    data.sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [data.sections])

  return (
    <main style={{ background: BG, minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge />
      <div style={{ background: RED, padding: '10px 56px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <a href="/" style={{ color: 'rgba(255,255,255,.7)', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none' }}>Sandbox</a>
        <span style={{ color: 'rgba(255,255,255,.4)' }}>/</span>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{data.topic}</span>
      </div>

      <section style={{ padding: '64px 56px 48px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: 16 }}>{data.docId}</div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 5vw, 64px)', textTransform: 'uppercase', lineHeight: 1, letterSpacing: 1, margin: '0 0 24px' }}>{data.title}</h1>
        <div style={{ display: 'flex', gap: 32 }}>
          {data.metadata.map(m => (
            <div key={m.label}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginRight: 8 }}>{m.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>{m.value}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, padding: '48px 56px 96px' }}>
        <nav style={{ position: 'sticky', top: 48, alignSelf: 'start' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: 16 }}>Contents</div>
          {data.sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                display: 'block',
                padding: '8px 0 8px 14px',
                fontSize: 11,
                fontWeight: activeSection === s.id ? 600 : 400,
                color: activeSection === s.id ? RED : 'rgba(255,255,255,.3)',
                borderLeft: activeSection === s.id ? `2px solid ${RED}` : '2px solid transparent',
                textDecoration: 'none',
                transition: 'color .2s',
              }}
            >
              {s.heading}
            </a>
          ))}
        </nav>

        <article style={{ maxWidth: 720 }}>
          {data.sections.map(s => (
            <section key={s.id} id={s.id} style={{ marginBottom: 56 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px' }}>{s.heading}</h2>
              {s.body.split('\n\n').map((p, i) => (
                <p key={i} style={{ fontSize: 13, lineHeight: 1.9, color: 'rgba(255,255,255,.45)', margin: '0 0 14px' }}>{p}</p>
              ))}

              {s.callout && (
                <div style={{ background: 'rgba(249,66,58,.06)', border: '1px solid rgba(249,66,58,.15)', borderRadius: 6, padding: '24px 28px', marginTop: 20 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: RED, marginBottom: 14 }}>{s.callout.title}</div>
                  {s.callout.items.map((item, i) => (
                    <div key={i} style={{ fontSize: 12, lineHeight: 1.75, color: 'rgba(255,255,255,.5)', padding: '8px 0', borderBottom: i < s.callout!.items.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>{item}</div>
                  ))}
                </div>
              )}

              {s.specTable && (
                <div style={{ marginTop: 20, border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', background: 'rgba(255,255,255,.03)', padding: '12px 20px' }}>
                    {['Specification', 'Typical', 'Premium', 'Why It Matters'].map(h => (
                      <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>{h}</div>
                    ))}
                  </div>
                  {s.specTable.map((row) => (
                    <div key={row.spec} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,.04)' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>{row.spec}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)' }}>{row.typical}</div>
                      <div style={{ fontSize: 12, color: RED, fontWeight: 600 }}>{row.premium}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)' }}>{row.why}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}
