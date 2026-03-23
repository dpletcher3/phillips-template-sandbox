'use client'

import { WebinarData } from './types'

const RED = '#F9423A'
const BG = '#05050f'

export default function WebinarPageClient({ data }: { data: WebinarData }) {
  return (
    <main style={{ background: BG, minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      <section style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 400px', gap: 56, padding: '96px 56px 72px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, border: '1px solid rgba(249,66,58,.08)', borderRadius: '50%', animation: 'pulse-ring 4s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, border: '1px solid rgba(249,66,58,.05)', borderRadius: '50%', animation: 'pulse-ring 4s ease-in-out infinite 1s', pointerEvents: 'none' }} />
        <style>{`
          @keyframes pulse-ring {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.08); opacity: 0.5; }
          }
        `}</style>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: data.status === 'upcoming' ? '#4ade80' : '#60a5fa', boxShadow: data.status === 'upcoming' ? '0 0 8px rgba(74,222,128,.5)' : '0 0 8px rgba(96,165,250,.5)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: data.status === 'upcoming' ? '#4ade80' : '#60a5fa' }}>{data.status === 'upcoming' ? 'Upcoming' : 'On-Demand'}</span>
          </div>

          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 4vw, 52px)', textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: 1, margin: '0 0 24px', maxWidth: 560 }}>{data.title}</h1>

          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            {[{ label: 'Date', value: data.date }, { label: 'Time', value: data.time }, { label: 'Duration', value: data.duration }].map(d => (
              <div key={d.label}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: 4 }}>{d.label}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>{d.value}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', maxWidth: 480, margin: 0 }}>{data.description}</p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, background: '#fff', borderRadius: 8, overflow: 'hidden', alignSelf: 'start' }}>
          <div style={{ height: 4, background: RED }} />
          <div style={{ padding: '32px 28px' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', letterSpacing: 1, color: '#000', margin: '0 0 20px' }}>{data.formTitle}</h3>
            {['Full Name', 'Work Email', 'Company', 'Job Title'].map(label => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 6 }}>{label}</div>
                <div style={{ height: 40, background: '#f5f5f5', borderRadius: 4, border: '1px solid #e8e8e8' }} />
              </div>
            ))}
            <button style={{ width: '100%', padding: '14px 0', background: RED, color: '#fff', border: 'none', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', marginTop: 8 }}>Register →</button>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 32, height: 2, background: RED }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>Speakers</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data.speakers.length}, 1fr)`, gap: 20 }}>
          {data.speakers.map(sp => (
            <div key={sp.name} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, padding: '28px 24px' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,.06)', marginBottom: 16 }} />
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', marginBottom: 4 }}>{sp.name}</div>
              <div style={{ fontSize: 11, color: RED, fontWeight: 600, marginBottom: 10 }}>{sp.title}</div>
              <div style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,.35)' }}>{sp.bio}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 56px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 32, height: 2, background: RED }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>Agenda</span>
        </div>
        <div style={{ maxWidth: 600 }}>
          {data.agenda.map((a, i) => (
            <div key={a.time} style={{ display: 'flex', gap: 24, padding: '16px 0', borderBottom: i < data.agenda.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: RED, minWidth: 80 }}>{a.time}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>{a.item}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
