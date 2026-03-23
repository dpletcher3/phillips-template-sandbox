'use client'

import { useState } from 'react'
import { ClassCalendarData } from '@/components/templates/class-calendar/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'

const RED = '#F9423A'
const BLUE = '#00AEEF'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimpleClassCalendarClient({ data }: { data: ClassCalendarData }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? data.events : data.events.filter(e => e.track === filter)

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />

      <section style={{ padding: '48px 48px 64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 40, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 4px' }}>
              Class <span style={{ color: RED }}>Calendar</span>
            </h1>
            <p style={{ fontSize: 13, color: GREY, margin: 0 }}>{data.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {data.tracks.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  background: filter === t ? '#000' : LIGHT,
                  color: filter === t ? '#fff' : '#444',
                  border: 'none', padding: '7px 16px', fontSize: 11, fontWeight: 600,
                  letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer',
                  borderRadius: 2,
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 160px 80px 120px', background: LIGHT, padding: '12px 16px', borderBottom: `2px solid ${BORDER}` }}>
          {['Dates', 'Course', 'Location', 'Seats', ''].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((evt, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 160px 80px 120px',
            padding: '14px 16px', alignItems: 'center',
            borderBottom: `1px solid ${BORDER}`,
            borderLeft: evt.isFederal ? `3px solid ${BLUE}` : '3px solid transparent',
          }}>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20 }}>
                {evt.dates.split(' ')[1]}
              </div>
              <div style={{ fontSize: 10, color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {evt.dates.split(' ')[0]}
              </div>
            </div>
            <div>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{evt.course}</span>
              {evt.isFederal && (
                <span style={{ marginLeft: 8, background: `${BLUE}15`, color: BLUE, fontSize: 9, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 2 }}>Federal</span>
              )}
            </div>
            <span style={{ fontSize: 13, color: GREY }}>{evt.location}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: evt.seats <= 5 ? RED : '#1a1a1a' }}>{evt.seats}</span>
            <button style={{
              background: 'transparent', color: RED, border: `1px solid ${RED}`,
              padding: '7px 16px', fontSize: 10, fontWeight: 700,
              letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
            }}>Register</button>
          </div>
        ))}
      </section>
    </main>
  )
}
