'use client'

import { LocationData } from './types'

const RED = '#F9423A'

export default function LocationPageClient({ data }: { data: LocationData }) {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: '#fff', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '75vh' }}>
        <div style={{ background: RED, padding: '80px 48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 16 }}>{data.region} Region</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(72px, 12vw, 140px)', textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: -2, margin: '0 0 4px', color: '#fff' }}>{data.city}</h1>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 24, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,.6)', marginBottom: 32 }}>{data.state}</div>
          <div style={{ maxWidth: 360, marginBottom: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 8 }}>Address</div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: '#fff', whiteSpace: 'pre-line', marginBottom: 20 }}>{data.address}</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 8 }}>Phone</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 24 }}>{data.phone}</div>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {data.hours.map(h => (
              <div key={h.label}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 4 }}>{h.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{h.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '80%', height: '70%', background: 'rgba(255,255,255,.04)', borderRadius: 4, border: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.15)', letterSpacing: 2, textTransform: 'uppercase' }}>Map Embed</span>
          </div>
        </div>
      </section>

      <div style={{ background: RED, overflow: 'hidden', padding: '14px 0', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 24s linear infinite', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.9)' }}>
          {data.marqueeText}{data.marqueeText}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      <section style={{ padding: '64px 56px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{ width: 32, height: 2, background: RED }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>Services Available</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0 }}>
          {data.services.map((svc) => (
            <div
              key={svc.number}
              style={{ padding: '36px 32px', border: '1px solid rgba(255,255,255,.06)', cursor: 'pointer', transition: 'background .25s, border-color .25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = RED; e.currentTarget.style.borderColor = RED }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)' }}
            >
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: 'rgba(255,255,255,.08)', marginBottom: 12, transition: 'color .25s' }}>{svc.number}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{svc.name}</div>
              <p style={{ fontSize: 12, lineHeight: 1.7, opacity: 0.5, margin: 0 }}>{svc.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
