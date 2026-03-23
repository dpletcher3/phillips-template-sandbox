'use client'

import { useState } from 'react'
import { ClassCalendarData } from '@/components/templates/class-calendar/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'

interface Props {
  data: ClassCalendarData
}

const trackColors: Record<string, string> = {
  CNC: '#F9423A',
  AM: '#F68B33',
  Software: '#00AEEF',
  Automation: '#647883',
}

export default function AppealingClassCalendarClient({ data }: Props) {
  const [activeTrack, setActiveTrack] = useState('all')

  const filteredEvents = activeTrack === 'all'
    ? data.events
    : data.events.filter(evt => evt.track === activeTrack)

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* ── Dark Gradient Header ── */}
      <section style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
        padding: '48px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: '44px',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            margin: '0 0 8px 0',
          }}>
            <span style={{ color: '#fff' }}>Class </span>
            <span style={{ color: '#F9423A' }}>Calendar</span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,.5)',
            fontSize: '14px',
            margin: '0 0 24px 0',
          }}>
            {data.subtitle}
          </p>

          {/* Filter buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {data.tracks.map(track => {
              const isActive = activeTrack === track
              return (
                <button
                  key={track}
                  onClick={() => setActiveTrack(track)}
                  style={{
                    background: isActive ? '#F9423A' : 'transparent',
                    color: '#fff',
                    border: isActive ? '1px solid #F9423A' : '1px solid rgba(255,255,255,.25)',
                    padding: '8px 20px',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    fontFamily: '"Barlow Condensed", sans-serif',
                  }}
                >
                  {track === 'all' ? 'All' : track}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Column Headers ── */}
      <div style={{
        background: '#F2F4F6',
        padding: '14px 48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '100px 1fr 180px 80px 140px',
          maxWidth: '1280px',
          margin: '0 auto',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#647883',
          fontFamily: '"Barlow Condensed", sans-serif',
        }}>
          <span>Date</span>
          <span>Course</span>
          <span>Location</span>
          <span>Seats</span>
          <span>Register</span>
        </div>
      </div>

      {/* ── Data Rows ── */}
      <div>
        {filteredEvents.map((evt, i) => {
          const dateParts = evt.dates.match(/^([A-Za-z]+)\s+(.+)$/)
          const month = dateParts ? dateParts[1] : ''
          const dayNum = dateParts ? dateParts[2].split('–')[0] : evt.dates
          const trackColor = trackColors[evt.track] || '#647883'
          const isLowSeats = evt.seats < 5

          return (
            <div
              key={i}
              style={{
                background: '#fff',
                padding: '16px 48px',
                borderBottom: '1px solid #D7DFE3',
                borderLeft: evt.isFederal ? '3px solid #00AEEF' : '3px solid transparent',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#F2F4F6'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#fff'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 180px 80px 140px',
                alignItems: 'center',
                maxWidth: '1280px',
                margin: '0 auto',
              }}>
                {/* Date */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: '24px',
                    color: '#F9423A',
                    lineHeight: 1.1,
                  }}>
                    {dayNum}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#647883',
                  }}>
                    {month}
                  </span>
                </div>

                {/* Course */}
                <div>
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    {evt.course}
                    {evt.isFederal && (
                      <span style={{
                        display: 'inline-block',
                        background: '#00AEEF',
                        color: '#fff',
                        fontSize: '8px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        textTransform: 'uppercase',
                      }}>
                        FED
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: trackColor,
                    marginTop: '4px',
                  }}>
                    {evt.track}
                  </div>
                </div>

                {/* Location */}
                <div style={{
                  fontSize: '13px',
                  color: '#647883',
                }}>
                  {evt.location}
                </div>

                {/* Seats */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#F9423A',
                    animation: isLowSeats ? 'pulse 2.5s infinite' : 'none',
                  }}>
                    {evt.seats}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    color: '#647883',
                  }}>
                    seats
                  </span>
                </div>

                {/* Register */}
                <div>
                  <button style={{
                    background: '#F9423A',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 20px',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontFamily: '"Barlow Condensed", sans-serif',
                    animation: 'pulse 2.5s infinite',
                  }}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
