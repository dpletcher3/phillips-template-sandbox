'use client'

import { useState } from 'react'
import { ClassCalendarData } from './types'

const RED = '#F9423A'
const BLUE = '#00AEEF'

export default function ClassCalendarPageClient({ data }: { data: ClassCalendarData }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? data.events : data.events.filter(e => e.track === filter)

  return (
    <main style={{ background: '#060606', minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      <section style={{ padding: '88px 56px 40px' }}>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(48px, 6vw, 72px)', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: 1, margin: '0 0 8px' }}>
          Class <span style={{ color: RED }}>Calendar</span>
        </h1>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 16, color: 'rgba(255,255,255,.3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 32 }}>
          {data.subtitle}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {data.tracks.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                padding: '8px 18px',
                background: filter === t ? RED : 'transparent',
                border: filter === t ? 'none' : '1px solid rgba(255,255,255,.1)',
                borderRadius: 3,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: filter === t ? '#fff' : 'rgba(255,255,255,.4)',
                cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {t === 'all' ? 'All Tracks' : t}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 56px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 180px 80px 140px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          {['Dates', 'Course', 'Location', 'Seats', ''].map(h => (
            <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.25)' }}>{h}</div>
          ))}
        </div>

        {filtered.map((evt) => (
          <div
            key={`${evt.dates}-${evt.course}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 180px 80px 140px',
              padding: '18px 20px',
              borderBottom: '1px solid rgba(255,255,255,.04)',
              borderLeft: evt.isFederal ? `3px solid ${BLUE}` : '3px solid transparent',
              alignItems: 'center',
              transition: 'background .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff' }}>{evt.dates}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,.8)' }}>{evt.course}</span>
              {evt.isFederal && (
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '3px 8px', background: `${BLUE}20`, color: BLUE, borderRadius: 2 }}>Federal</span>
              )}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>{evt.location}</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: evt.seats <= 4 ? RED : 'rgba(255,255,255,.6)' }}>{evt.seats}</div>
            <a
              href={evt.registrationUrl || '#'}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '8px 20px', background: 'transparent',
                border: '1px solid rgba(255,255,255,.12)', borderRadius: 2,
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11,
                letterSpacing: 2, textTransform: 'uppercase', color: '#fff', textDecoration: 'none',
                transition: 'background .2s, border-color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = RED; e.currentTarget.style.borderColor = RED }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)' }}
            >
              Register
            </a>
          </div>
        ))}
      </section>
    </main>
  )
}
