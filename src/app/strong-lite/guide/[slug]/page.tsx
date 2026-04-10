'use client'

import Image from 'next/image'
import StrongLiteNav from '@/components/strong-lite/StrongLiteNav'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ──────────────────────────────────── */
const RED   = '#F9423A'
const CYAN  = '#00D4FF'
const GOLD  = '#F68B33'

const Z_BG       = '#09090B'
const Z_DIM       = 'rgba(255,255,255,0.45)'
const Z_MID       = 'rgba(255,255,255,0.70)'
const Z_BRIGHT    = 'rgba(255,255,255,0.95)'

const L_BG     = '#FFFFFF'
const L_ALT    = '#F2F4F6'
const L_BORDER = 'rgba(13,13,14,0.08)'
const L_INK    = '#0D0D0E'
const L_MID    = 'rgba(13,13,14,0.65)'
const L_DIM    = 'rgba(13,13,14,0.45)'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── TOC Data ────────────────────────────────────────── */
const TOC_SECTIONS = [
  {
    num: '01',
    items: [
      { label: 'Introduction', active: true },
      { label: 'Key Components', active: false },
      { label: 'How VMCs Work', active: false },
    ],
  },
  {
    num: '02',
    items: [
      { label: 'Types of VMCs', active: false },
      { label: 'Choosing the Right VMC', active: false },
    ],
  },
  {
    num: '03',
    items: [
      { label: 'Applications', active: false },
      { label: 'Maintenance & Best Practices', active: false },
    ],
  },
]

/* ── Performance Metrics ─────────────────────────────── */
const METRICS = [
  { label: 'Spindle Speed Range', value: '8,000–15,000 RPM', percent: 75 },
  { label: 'X-Travel', value: '508–1270mm', percent: 80 },
  { label: 'Positioning Accuracy', value: '±0.005mm', percent: 90 },
  { label: 'Surface Finish', value: 'Ra 0.4μm', percent: 85 },
]

/* ── Inline Light Bar ────────────────────────────────── */
function LightBar({ label, value, percent }: { label: string; value: string; percent: number }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 500, color: L_MID }}>
          {label}
        </span>
        <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: RED }}>
          {value}
        </span>
      </div>
      <div style={{
        height: '2px',
        background: L_BORDER,
        borderRadius: '1px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percent}%`,
          background: `linear-gradient(90deg, ${RED}, ${CYAN})`,
          borderRadius: '1px',
          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────── */
export default function StrongLiteGuidePage() {
  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── 1. NAV ──────────────────────────────────── */}
      <StrongLiteNav />

      {/* ── 2. DARK HERO (stays dark) ───────────────── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 48px 48px',
        background: Z_BG,
      }}>
        {/* BG image */}
        <Image
          src={STRONG_IMAGES.machineVMC}
          alt="Vertical Machining Center"
          fill
          priority
          style={{ objectFit: 'cover', opacity: 0.14 }}
        />
        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${Z_BG} 0%, transparent 40%, transparent 70%, ${Z_BG} 100%)`,
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(90deg, ${Z_BG} 0%, transparent 60%)`,
          zIndex: 1,
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          {/* Breadcrumb */}
          <div style={{
            fontFamily: MONO,
            fontSize: '11px',
            color: Z_DIM,
            marginBottom: '20px',
            letterSpacing: '1px',
          }}>
            Knowledge Hub <span style={{ margin: '0 6px' }}>&rsaquo;</span> VMC Guide
          </div>

          {/* Guide number */}
          <div style={{
            fontFamily: MONO,
            fontSize: '11px',
            color: Z_MID,
            marginBottom: '16px',
            letterSpacing: '1px',
          }}>
            Guide <span style={{ color: CYAN }}>#CNC-001</span>
          </div>

          {/* h1 */}
          <h1 style={{
            fontFamily: INTER,
            fontWeight: 900,
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: Z_BRIGHT,
            margin: '0 0 24px',
          }}>
            What Is a<br />
            <span style={{ color: RED }}>Vertical Machining</span><br />
            Center?
          </h1>

          {/* Metadata chips */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {/* TOPIC chip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', background: RED,
                display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: MONO, fontSize: '10px', color: Z_MID,
                letterSpacing: '1.5px', textTransform: 'uppercase' as const,
              }}>
                TOPIC: CNC Machining
              </span>
            </div>
            {/* READ chip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', background: CYAN,
                display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: MONO, fontSize: '10px', color: Z_MID,
                letterSpacing: '1.5px', textTransform: 'uppercase' as const,
              }}>
                READ: 12 min
              </span>
            </div>
            {/* Level chip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', background: GOLD,
                display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: MONO, fontSize: '10px', color: Z_MID,
                letterSpacing: '1.5px', textTransform: 'uppercase' as const,
              }}>
                Foundational
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. LIGHT BODY — 2-column grid ───────────── */}
      <section style={{
        borderTop: `1px solid ${L_BORDER}`,
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        minHeight: '80vh',
      }}>
        {/* ── LEFT — TOC ────────────────────────────── */}
        <aside style={{
          background: L_ALT,
          borderRight: `1px solid ${L_BORDER}`,
          padding: '28px 20px',
          position: 'sticky',
          top: '80px',
          alignSelf: 'start',
        }}>
          <div style={{
            fontFamily: MONO,
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase' as const,
            color: L_DIM,
            marginBottom: '20px',
          }}>
            {'// Contents'}
          </div>

          {TOC_SECTIONS.map((section) => (
            <div key={section.num} style={{ marginBottom: '18px' }}>
              {/* Section number */}
              <div style={{
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 700,
                color: RED,
                marginBottom: '8px',
                letterSpacing: '1px',
              }}>
                {section.num}
              </div>
              {/* Items */}
              {section.items.map((item) => (
                <div
                  key={item.label}
                  style={{
                    paddingLeft: '12px',
                    marginBottom: '6px',
                    borderLeft: item.active ? `2px solid ${RED}` : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontFamily: INTER,
                    fontSize: '12px',
                    fontWeight: item.active ? 600 : 400,
                    color: item.active ? RED : L_MID,
                    lineHeight: 1.6,
                  }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* ── RIGHT — Content ───────────────────────── */}
        <main style={{
          background: L_BG,
          paddingTop: '44px',
          paddingLeft: '32px',
          paddingRight: '48px',
          paddingBottom: '64px',
          maxWidth: '820px',
        }}>
          {/* Section label */}
          <div style={{
            fontFamily: MONO,
            fontSize: '10px',
            fontWeight: 700,
            color: RED,
            letterSpacing: '2px',
            marginBottom: '12px',
          }}>
            {'// Section 01'}
          </div>

          {/* Section heading */}
          <h2 style={{
            fontFamily: INTER,
            fontWeight: 800,
            fontSize: '26px',
            lineHeight: 1.2,
            color: L_INK,
            margin: '0 0 20px',
            letterSpacing: '-0.5px',
          }}>
            Introduction to Vertical Machining Centers
          </h2>

          {/* Body paragraphs */}
          <p style={{
            fontFamily: INTER,
            fontSize: '16px',
            color: L_INK,
            lineHeight: 1.75,
            margin: '0 0 16px',
          }}>
            A Vertical Machining Center (VMC) is a CNC milling machine where the spindle axis
            is oriented vertically. The spindle holds the cutting tool and rotates it at high
            speeds while the workpiece is secured to the table below. VMCs are among the most
            widely used machine tools in modern manufacturing, found in job shops, production
            facilities, and aerospace clean rooms alike.
          </p>
          <p style={{
            fontFamily: INTER,
            fontSize: '16px',
            color: L_INK,
            lineHeight: 1.75,
            margin: '0 0 16px',
          }}>
            Their popularity stems from a combination of versatility, accessibility, and
            precision. VMCs can perform milling, drilling, boring, and tapping operations in
            a single setup. With the addition of 4th-axis rotary tables or 5-axis trunnion
            configurations, they become capable of producing complex 3D geometries that would
            otherwise require multiple machines and setups.
          </p>
          <p style={{
            fontFamily: INTER,
            fontSize: '16px',
            color: L_INK,
            lineHeight: 1.75,
            margin: '0 0 28px',
          }}>
            At Phillips Corporation, VMCs represent a cornerstone of our machine tool portfolio.
            We partner with leading builders including Haas, Hermle, and GF Machining Solutions
            to deliver VMC platforms tailored to specific applications, from high-volume
            automotive production to single-piece aerospace prototyping.
          </p>

          {/* Callout box */}
          <div style={{
            borderLeft: `3px solid ${CYAN}`,
            background: L_ALT,
            padding: '16px',
            marginBottom: '36px',
          }}>
            <div style={{
              fontFamily: MONO,
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: CYAN,
              marginBottom: '8px',
            }}>
              Key Concept
            </div>
            <p style={{
              fontFamily: INTER,
              fontSize: '14px',
              color: L_MID,
              lineHeight: 1.7,
              margin: 0,
            }}>
              The vertical column design gives VMCs an inherent advantage in chip evacuation.
              Gravity pulls chips away from the cut, reducing recutting and improving surface
              finish quality. This makes VMCs particularly well-suited for pocket milling,
              cavity work, and any operation where chip management is critical to tool life
              and part quality.
            </p>
          </div>

          {/* Performance Metrics heading */}
          <div style={{
            fontFamily: MONO,
            fontSize: '10px',
            fontWeight: 700,
            color: RED,
            letterSpacing: '2px',
            marginBottom: '12px',
          }}>
            {'// Performance Metrics'}
          </div>

          <h3 style={{
            fontFamily: INTER,
            fontWeight: 800,
            fontSize: '20px',
            color: L_INK,
            margin: '0 0 20px',
          }}>
            Typical VMC Performance Ranges
          </h3>

          {/* Light-themed inline bars */}
          <div style={{ maxWidth: '560px' }}>
            {METRICS.map((m) => (
              <LightBar key={m.label} label={m.label} value={m.value} percent={m.percent} />
            ))}
          </div>
        </main>
      </section>
    </div>
  )
}
