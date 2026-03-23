'use client'

import { useState, useEffect } from 'react'
import { GuideData } from '@/components/templates/guide/types'
import TemplateBadge from '@/components/TemplateBadge'

const RED = '#F9423A'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimpleGuideClient({ data }: { data: GuideData }) {
  const [activeSection, setActiveSection] = useState(data.sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { for (const e of entries) if (e.isIntersecting) setActiveSection(e.target.id) },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    data.sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [data.sections])

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />

      {/* Red breadcrumb bar */}
      <div style={{ background: RED, padding: '10px 48px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <a href="/" style={{ color: 'rgba(255,255,255,.7)', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none' }}>Sandbox</a>
        <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Guide</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 40px)' }}>
        {/* Sticky TOC */}
        <aside style={{ borderRight: `1px solid ${BORDER}`, padding: '32px 0', position: 'sticky', top: 0, alignSelf: 'start', maxHeight: '100vh', overflowY: 'auto' }}>
          <div style={{ padding: '0 24px 16px', fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREY }}>Contents</div>
          {data.sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} style={{
              display: 'flex', gap: 10, padding: '10px 24px', fontSize: 12, textDecoration: 'none',
              color: activeSection === s.id ? RED : '#444',
              borderLeft: activeSection === s.id ? `3px solid ${RED}` : '3px solid transparent',
              fontWeight: activeSection === s.id ? 600 : 400,
            }}>
              <span style={{ color: GREY, minWidth: 20 }}>0{i + 1}</span>
              {s.heading}
            </a>
          ))}
        </aside>

        {/* Main content */}
        <div style={{ padding: '40px 48px 64px' }}>
          <div style={{ fontSize: 12, color: GREY, letterSpacing: '1px', marginBottom: 8 }}>{data.docId}</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 40, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.05, margin: '0 0 20px' }}>
            {data.title}
          </h1>
          <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
            {data.metadata.map(m => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: RED, display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: GREY }}>{m.label}:</span>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{m.value}</span>
              </div>
            ))}
          </div>

          {data.sections.map(s => (
            <section key={s.id} id={s.id} style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: RED, marginBottom: 8 }}>Section</div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 26, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px' }}>{s.heading}</h2>
              {s.body.split('\n\n').map((p, i) => (
                <p key={i} style={{ fontSize: 14, lineHeight: 1.85, color: '#444', margin: '0 0 16px' }}>{p}</p>
              ))}

              {s.callout && (
                <div style={{ background: LIGHT, borderLeft: `3px solid ${RED}`, padding: '20px 24px', margin: '24px 0' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{s.callout.title}</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {s.callout.items.map((item, i) => (
                      <li key={i} style={{ fontSize: 13, lineHeight: 1.7, color: '#444', marginBottom: 4 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {s.specTable && s.specTable.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
                  <thead>
                    <tr>
                      {['Spec', 'Typical', 'Premium', 'Why It Matters'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY, borderBottom: `2px solid ${BORDER}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.specTable.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : LIGHT }}>
                        <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600 }}>{row.spec}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13, color: '#444' }}>{row.typical}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13, color: '#444' }}>{row.premium}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13, color: '#444' }}>{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
