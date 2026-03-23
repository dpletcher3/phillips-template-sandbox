'use client'

import { ProductLinesData } from './types'

const RED = '#F9423A'
const GOLD = '#F68B33'

export default function ProductLinesPageClient({ data }: { data: ProductLinesData }) {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      <section style={{ padding: '96px 56px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: RED }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>Product Lines · {data.brandName}</span>
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(56px, 8vw, 96px)', textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: -1, margin: '0 0 32px' }}>
          Machines Built to <span style={{ color: RED }}>Cut Metal</span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 800 }}>
          <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', margin: 0 }}>Every Haas machine is designed, built, and serviced in Oxnard, California. From the castings to the spindle assemblies, Haas controls the entire manufacturing process — delivering consistent quality and the industry&apos;s lowest cost of ownership.</p>
          <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', margin: 0 }}>Phillips Corporation is an authorized Haas Factory Outlet (HFO) serving the Northeast and Mid-Atlantic. We provide sales, applications engineering, service, and training for the complete Haas product line.</p>
        </div>
      </section>

      <section style={{ padding: '0 56px 72px' }}>
        <div style={{ border: '1px solid rgba(255,255,255,.06)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data.series.length}, 1fr)`, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            {data.series.map(s => (
              <div key={s.name} style={{ padding: 32, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ height: 120, background: 'rgba(255,255,255,.03)', borderRadius: 4, marginBottom: 16 }} />
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{s.name}</div>
                <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.15)', borderRadius: 2, padding: '8px 20px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', cursor: 'pointer' }}>More Info</button>
              </div>
            ))}
          </div>
          {['type', 'xTravel', 'spindleSpeed', 'tableLoad', 'bestFor'].map((key, ri) => {
            const labels: Record<string, string> = { type: 'Machine Type', xTravel: 'X Travel', spindleSpeed: 'Spindle Speed', tableLoad: 'Table Load', bestFor: 'Best For' }
            return (
              <div key={key} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', borderBottom: ri < 4 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>
                <div style={{ padding: '14px 24px', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', borderRight: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center' }}>{labels[key]}</div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data.series.length}, 1fr)` }}>
                  {data.series.map(s => (
                    <div key={s.name} style={{ padding: '14px 24px', fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: 'rgba(255,255,255,.7)', borderRight: '1px solid rgba(255,255,255,.04)', textAlign: 'center' }}>
                      {String((s as unknown as Record<string, string>)[key] ?? '')}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {data.series.map((s, i) => {
        const isReversed = i % 2 === 1

        const textBlock = (
          <div style={{ padding: '64px 0' }} key={`text-${s.name}`}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Series {String(i + 1).padStart(2, '0')}</div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1, margin: '0 0 12px' }}>{s.name}</h2>
            <p style={{ fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,.5)', margin: '0 0 20px' }}>{s.tagline}</p>
            <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', margin: '0 0 28px', maxWidth: 440 }}>{s.description}</p>

            {s.keySpecs && (
              <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                {s.keySpecs.map(ks => (
                  <div key={ks.label} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, padding: '16px 20px', minWidth: 100 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, color: '#fff', lineHeight: 1, marginBottom: 4 }}>{ks.value}</div>
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>{ks.label}</div>
                  </div>
                ))}
              </div>
            )}

            {s.models.map(m => (
              <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                <div>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: 1, marginRight: 16 }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,.3)' }}>{m.travel}</span>
                </div>
                <span style={{ color: RED, fontSize: 14 }}>→</span>
              </div>
            ))}
          </div>
        )

        const imageBlock = (
          <div key={`img-${s.name}`} style={{ background: 'rgba(255,255,255,.03)', borderRadius: 6, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '70%', height: '50%', background: 'rgba(255,255,255,.03)', borderRadius: 4, minHeight: 200 }} />
          </div>
        )

        return (
          <section key={s.name} style={{ padding: '0 56px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              {isReversed ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
            </div>
          </section>
        )
      })}

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,.06)', marginTop: 48 }}>
        {[
          { label: 'Talk to an Engineer', desc: 'Get expert guidance on machine selection and configuration.' },
          { label: 'Download Spec Sheet', desc: 'Full specifications for every Haas model in one PDF.' },
          { label: 'See Case Studies', desc: 'Real results from real shops running Haas equipment.' },
        ].map((cta, i) => (
          <a
            key={cta.label}
            href="#"
            style={{ padding: '40px 36px', borderRight: i < 2 ? '1px solid rgba(255,255,255,.06)' : 'none', textDecoration: 'none', color: '#fff', transition: 'background .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,66,58,.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{cta.label}</div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,.35)', margin: '0 0 16px' }}>{cta.desc}</p>
            <span style={{ color: RED, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>Get Started →</span>
          </a>
        ))}
      </section>
    </main>
  )
}
