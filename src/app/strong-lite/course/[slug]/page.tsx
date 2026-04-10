'use client'

import { useState } from 'react'
import Image from 'next/image'
import StrongLiteNav from '@/components/strong-lite/StrongLiteNav'
import LiteEye from '@/components/strong-lite/LiteEye'
import LiteSection from '@/components/strong-lite/LiteSection'
import FinalCTA from '@/components/strong-lite/FinalCTA'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ─────────────────────────────────── */
const RED    = '#F9423A'

const Z_BG      = '#09090B'
const Z_BORDER  = 'rgba(255,255,255,0.07)'
const Z_DIM     = 'rgba(255,255,255,0.45)'
const Z_MID     = 'rgba(255,255,255,0.70)'
const Z_BRIGHT  = 'rgba(255,255,255,0.95)'

const L_BG      = '#FFFFFF'
const L_SURFACE = '#FFFFFF'
const L_CARD    = '#F7F8FA'
const L_BORDER  = 'rgba(13,13,14,0.08)'
const L_MID     = 'rgba(13,13,14,0.65)'
const L_INK     = '#0D0D0E'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── Course Details ────────────────────────────────── */
const COURSE_DETAILS = [
  { label: 'Duration',  value: '3 Days' },
  { label: 'Format',    value: 'In-Person' },
  { label: 'Level',     value: 'Advanced' },
  { label: 'Machine',   value: 'Haas ST-30', accent: true },
]

/* ── Module Data ───────────────────────────────────── */
const MODULES = [
  { sys: 'SYS.01', title: 'Crash Recovery',      desc: 'Identify and document crash damage',                    duration: '3 hours' },
  { sys: 'SYS.02', title: 'Geometry Inspection',  desc: 'Test bar inspection and alignment',                    duration: '2 hours' },
  { sys: 'SYS.03', title: 'Geometry Correction',  desc: 'Squareness and tram correction',                       duration: '2 hours' },
  { sys: 'SYS.04', title: 'Spindle Replacement',  desc: 'Full spindle R&R procedure',                           duration: '4 hours' },
  { sys: 'SYS.05', title: 'Guide Rail Service',   desc: 'Linear guide inspection and replacement',              duration: '3 hours' },
  { sys: 'SYS.06', title: 'Ballscrew Service',    desc: 'Ballscrew inspection, adjustment, R&R',                duration: '3 hours' },
]

/* ── Training Locations ────────────────────────────── */
const LOCATIONS = ['Knoxville, TN', 'Mooresville, NC']

/* ── Page Component ────────────────────────────────── */
export default function CourseLitePage() {
  const [selectedModules, setSelectedModules] = useState<Set<number>>(new Set())

  const toggleModule = (idx: number) => {
    setSelectedModules(prev => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        next.add(idx)
      }
      return next
    })
  }

  return (
    <div style={{ background: L_BG, minHeight: '100vh' }}>
      {/* ═══ 1. NAV ═══ */}
      <StrongLiteNav />

      {/* ═══ 2. DARK HERO (stays dark) ═══ */}
      <section style={{
        position: 'relative',
        minHeight: '56vh',
        background: Z_BG,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* BG Image */}
        <Image
          src={STRONG_IMAGES.machineShop}
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.14 }}
          priority
        />
        {/* Gradient Overlay — vertical */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${Z_BG} 0%, transparent 30%, transparent 70%, ${Z_BG} 100%)`,
          zIndex: 1,
        }} />
        {/* Gradient Overlay — horizontal */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, ${Z_BG} 0%, rgba(9,9,11,.4) 60%)`,
          zIndex: 1,
        }} />

        {/* Hero Content — 2-column grid */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          padding: '80px 48px 64px',
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 48,
          alignItems: 'center',
        }}>
          {/* Left Column */}
          <div>
            {/* Chip */}
            <span style={{
              display: 'inline-block',
              background: RED,
              color: '#ffffff',
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 3,
              padding: '4px 12px',
              textTransform: 'uppercase' as const,
              marginBottom: 24,
            }}>
              {'// CNC Training Track'}
            </span>

            {/* Headline */}
            <h1 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: 'clamp(30px, 5vw, 50px)',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              margin: '0 0 20px',
              color: Z_BRIGHT,
            }}>
              Advanced Lathe<br />
              <span style={{ color: RED }}>Service Training</span>
            </h1>

            {/* Level */}
            <p style={{
              fontFamily: MONO,
              fontSize: 11,
              color: Z_MID,
              letterSpacing: 1,
              margin: '0 0 16px',
            }}>
              Advanced Level // For Professionals
            </p>

            {/* Description */}
            <p style={{
              fontFamily: INTER,
              fontSize: 15,
              lineHeight: 1.7,
              color: Z_MID,
              margin: '0 0 12px',
              maxWidth: 500,
            }}>
              A comprehensive, hands-on training program designed for experienced service
              technicians covering advanced lathe diagnostics, geometry correction, spindle
              replacement, and guide rail service procedures on Haas turning centers.
            </p>

            {/* Prerequisites */}
            <p style={{
              fontFamily: MONO,
              fontSize: 10,
              color: Z_DIM,
              letterSpacing: 1,
              margin: '0 0 32px',
            }}>
              Prerequisite: Basic Lathe Operator Training
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{
                background: RED,
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}>
                Enroll Now
              </button>
              <button style={{
                background: 'transparent',
                color: Z_BRIGHT,
                border: '1px solid rgba(255,255,255,.3)',
                padding: '14px 32px',
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}>
                View Dates
              </button>
            </div>
          </div>

          {/* Right Column — Course Details Card (dark card in hero) */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${Z_BORDER}`,
            borderTop: `2px solid ${RED}`,
            padding: 22,
          }}>
            {COURSE_DETAILS.map((row, i) => (
              <div key={row.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: i < COURSE_DETAILS.length - 1 ? `1px solid ${Z_BORDER}` : 'none',
              }}>
                <span style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: 1,
                  textTransform: 'uppercase' as const,
                  color: Z_DIM,
                }}>
                  {row.label}
                </span>
                <span style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  fontWeight: 600,
                  color: row.accent ? RED : Z_BRIGHT,
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. LIGHT MODULE SECTION ═══ */}
      <LiteSection alt>
        <LiteEye label="// What You'll Learn" />

        {/* 3-column module grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginTop: 32,
        }}>
          {MODULES.map((mod, i) => {
            const isSelected = selectedModules.has(i)
            return (
              <div
                key={mod.sys}
                onClick={() => toggleModule(i)}
                style={{
                  position: 'relative',
                  background: L_SURFACE,
                  border: `1px solid ${isSelected ? RED : L_BORDER}`,
                  borderTop: isSelected ? `2px solid ${RED}` : `1px solid ${isSelected ? RED : L_BORDER}`,
                  padding: 20,
                  cursor: 'pointer',
                  transition: 'border-color .2s ease',
                }}
              >
                {/* Selected checkmark badge */}
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: RED,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: 12,
                    fontWeight: 700,
                  }}>
                    &#10003;
                  </div>
                )}

                {/* System code */}
                <div style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: L_INK,
                  marginBottom: 8,
                }}>
                  {mod.sys}
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: INTER,
                  fontSize: 14,
                  fontWeight: 700,
                  color: L_INK,
                  marginBottom: 8,
                }}>
                  {mod.title}
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: INTER,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: L_MID,
                  margin: '0 0 16px',
                }}>
                  {mod.desc}
                </p>

                {/* Duration badge */}
                <span style={{
                  display: 'inline-block',
                  background: L_CARD,
                  border: `1px solid ${L_BORDER}`,
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 600,
                  color: L_MID,
                  padding: '3px 10px',
                  letterSpacing: 1,
                }}>
                  {mod.duration}
                </span>
              </div>
            )
          })}
        </div>

        {/* Centered CTA */}
        <div style={{ textAlign: 'center' as const, marginTop: 36 }}>
          <button style={{
            background: selectedModules.size > 0 ? RED : 'transparent',
            color: selectedModules.size > 0 ? '#ffffff' : L_MID,
            border: selectedModules.size > 0 ? 'none' : `1px solid ${L_BORDER}`,
            padding: '14px 36px',
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
            cursor: selectedModules.size > 0 ? 'pointer' : 'default',
            transition: 'all .25s ease',
          }}>
            Enroll with Selected Modules
          </button>
        </div>
      </LiteSection>

      {/* ═══ 4. TRAINING LOCATIONS ═══ */}
      <LiteSection>
        <LiteEye label="Training Locations" />
        <div>
          {LOCATIONS.map((loc, i) => (
            <div key={loc} style={{
              padding: '16px 0',
              borderBottom: i < LOCATIONS.length - 1 ? `1px solid ${L_BORDER}` : 'none',
              fontFamily: INTER,
              fontSize: 14,
              fontWeight: 600,
              color: L_INK,
            }}>
              {loc}
            </div>
          ))}
        </div>
      </LiteSection>

      {/* ═══ 5. FINAL CTA (stays dark) ═══ */}
      <FinalCTA
        tag="// Start Learning"
        headline="Master advanced lathe service."
        accentWord="lathe service."
        description="Enroll in our hands-on training program and gain the skills to diagnose, repair, and maintain Haas turning centers at the highest level."
      />
    </div>
  )
}
