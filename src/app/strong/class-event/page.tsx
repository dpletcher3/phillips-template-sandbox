'use client'

import { useState } from 'react'
import Image from 'next/image'
import StrongNav from '@/components/strong/StrongNav'
import PulseRing from '@/components/strong/PulseRing'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ─────────────────────────────────── */
const RED    = '#F9423A'
const CYAN   = '#00D4FF'
const Z_BG      = '#09090B'
const Z_BORDER  = 'rgba(255,255,255,0.07)'
const Z_MID     = 'rgba(255,255,255,0.70)'
const Z_BRIGHT  = 'rgba(255,255,255,0.95)'

const L_BG     = '#ffffff'
const L_ALT    = '#F4F5F7'
const L_BORDER = '#E2E4E8'
const L_INK    = '#0D0D0E'
const L_MID    = '#3C3F45'
const L_DIM    = '#72777F'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── Schedule Data ─────────────────────────────────── */
type FilterType = 'all' | 'cnc' | 'federal'

interface ScheduleRow {
  day: string
  month: string
  course: string
  sub: string
  location: string
  seats: number
  federal: boolean
}

const SCHEDULE: ScheduleRow[] = [
  { day: '07', month: 'APR', course: 'Haas Maintenance & Repair',    sub: 'Foundation',                location: 'Charlotte NC',      seats: 12, federal: false },
  { day: '07', month: 'APR', course: 'Haas Maintenance & Repair',    sub: 'Foundation',                location: 'Knoxville TN',      seats: 8,  federal: false },
  { day: '14', month: 'APR', course: 'Advanced Lathe Service Training', sub: 'Advanced Service',       location: 'Charlotte NC',      seats: 8,  federal: false },
  { day: '14', month: 'APR', course: 'Advanced Mill Service Training',  sub: 'Advanced Service',       location: 'Knoxville TN',      seats: 6,  federal: false },
  { day: '21', month: 'APR', course: 'Basic Mill Operator Training',    sub: 'Operator Fundamentals',  location: 'Charlotte NC',      seats: 20, federal: false },
  { day: '05', month: 'MAY', course: 'Haas Maintenance & Repair',    sub: 'Foundation // Federal',     location: 'Charlotte NC',      seats: 12, federal: true  },
  { day: '05', month: 'MAY', course: '5-Axis & 4th-Axis Training',   sub: 'Advanced Programming',      location: 'Knoxville TN',      seats: 8,  federal: false },
  { day: '12', month: 'MAY', course: 'Advanced Lathe Programming',   sub: 'Programming // Virtual',    location: 'Virtual // Zoom',   seats: 16, federal: false },
]

/* ── Filter Pills ──────────────────────────────────── */
const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: 'all',     label: 'All Classes' },
  { key: 'cnc',     label: 'CNC' },
  { key: 'federal', label: 'Federal' },
]

/* ── Grid template for table columns ──────────────── */
const GRID_COLS = '68px 1fr 180px 72px 110px'

/* ── Page Component ────────────────────────────────── */
export default function ClassEventPage() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredRows = SCHEDULE.filter(row => {
    if (filter === 'all') return true
    if (filter === 'cnc') return !row.federal
    if (filter === 'federal') return row.federal
    return true
  })

  return (
    <div style={{ background: Z_BG, minHeight: '100vh' }}>
      {/* ═══ 1. NAV ═══ */}
      <StrongNav />

      {/* ═══ 2. DARK HEADER ═══ */}
      <section style={{
        position: 'relative',
        background: Z_BG,
        padding: '50px 48px 38px',
        overflow: 'hidden',
      }}>
        {/* BG Image */}
        <Image
          src={STRONG_IMAGES.trainingRoom}
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.08 }}
          priority
        />
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${Z_BG} 0%, transparent 40%, transparent 60%, ${Z_BG} 100%)`,
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, ${Z_BG} 0%, rgba(9,9,11,.4) 60%)`,
          zIndex: 1,
        }} />

        {/* Header Content — 2-column flex */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          {/* Left */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <PulseRing size={10} />
              <span style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase' as const,
                color: RED,
              }}>
                Training &amp; Education
              </span>
            </div>

            <h1 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: 40,
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
              margin: '0 0 12px',
              color: Z_BRIGHT,
            }}>
              Class<br />
              <span>
                {'Cal'}
                <span style={{ color: RED }}>{'endar'}</span>
              </span>
            </h1>

            <p style={{
              fontFamily: MONO,
              fontSize: 11,
              color: Z_MID,
              letterSpacing: 1,
              margin: 0,
            }}>
              Spring 2026 // Upcoming scheduled classes
            </p>
          </div>

          {/* Right — Filter Pills */}
          <div style={{ display: 'flex', gap: 8 }}>
            {FILTER_OPTIONS.map(opt => {
              const isActive = filter === opt.key
              return (
                <button
                  key={opt.key}
                  onClick={() => setFilter(opt.key)}
                  style={{
                    background: isActive ? 'rgba(249,66,58,.1)' : 'transparent',
                    color: isActive ? RED : Z_MID,
                    border: `1px solid ${isActive ? RED : Z_BORDER}`,
                    fontFamily: MONO,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: 'uppercase' as const,
                    padding: '8px 18px',
                    cursor: 'pointer',
                    transition: 'all .2s ease',
                  }}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ 3. CALENDAR TABLE ═══ */}
      <section style={{ background: L_BG, borderTop: `1px solid ${L_BORDER}` }}>
        {/* Column Headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: GRID_COLS,
          background: L_ALT,
          padding: '10px 44px',
        }}>
          {['Date', 'Course', 'Location', 'Seats', 'Register'].map(col => (
            <span key={col} style={{
              fontFamily: MONO,
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              color: L_DIM,
            }}>
              {col}
            </span>
          ))}
        </div>

        {/* Schedule Rows */}
        {filteredRows.map((row) => (
          <div
            key={`${row.day}-${row.month}-${row.course}-${row.location}`}
            style={{
              display: 'grid',
              gridTemplateColumns: GRID_COLS,
              padding: '15px 44px',
              borderBottom: `1px solid ${L_BORDER}`,
              borderLeft: row.federal ? `2px solid ${CYAN}` : '2px solid transparent',
              alignItems: 'center',
              transition: 'background .15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = L_ALT }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
          >
            {/* Date */}
            <div>
              <div style={{
                fontFamily: INTER,
                fontSize: 28,
                fontWeight: 700,
                color: L_INK,
                lineHeight: 1,
              }}>
                {row.day}
              </div>
              <div style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 600,
                color: L_DIM,
                letterSpacing: 2,
                marginTop: 2,
              }}>
                {row.month}
              </div>
            </div>

            {/* Course */}
            <div>
              <div style={{
                fontFamily: INTER,
                fontSize: 14,
                fontWeight: 600,
                color: L_INK,
                marginBottom: 2,
              }}>
                {row.course}
              </div>
              <div style={{
                fontFamily: MONO,
                fontSize: 10,
                color: L_DIM,
                letterSpacing: 1,
              }}>
                {row.sub}
              </div>
            </div>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontFamily: INTER,
                fontSize: 13,
                color: L_MID,
              }}>
                {row.location}
              </span>
              {row.federal && (
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(0,212,255,.1)',
                  color: CYAN,
                  fontFamily: MONO,
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: 2,
                  padding: '2px 8px',
                  textTransform: 'uppercase' as const,
                }}>
                  Federal
                </span>
              )}
            </div>

            {/* Seats */}
            <div>
              <span style={{
                fontFamily: INTER,
                fontSize: 20,
                fontWeight: 700,
                color: RED,
                lineHeight: 1,
              }}>
                {row.seats}
              </span>
              <div style={{
                fontFamily: MONO,
                fontSize: 9,
                color: L_DIM,
                letterSpacing: 1,
                marginTop: 1,
              }}>
                seats
              </div>
            </div>

            {/* Register */}
            <button style={{
              background: 'transparent',
              border: `1px solid ${RED}`,
              color: RED,
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              padding: '8px 0',
              cursor: 'pointer',
              transition: 'all .2s ease',
            }}>
              Register
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}
