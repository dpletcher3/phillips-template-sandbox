'use client'

import Image from 'next/image'
import StrongNav from '@/components/strong/StrongNav'
import LightEye from '@/components/strong/LightEye'
import LightSection from '@/components/strong/LightSection'
import FinalCTA from '@/components/strong/FinalCTA'
import PulseRing from '@/components/strong/PulseRing'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ── */
const RED = '#F9423A'
const CYAN = '#00D4FF'
const GOLD = '#F68B33'

const Z_BG = '#09090B'
const Z_CARD = '#18181B'
const Z_DIM = 'rgba(255,255,255,0.45)'
const Z_MID = 'rgba(255,255,255,0.70)'
const Z_BRIGHT = 'rgba(255,255,255,0.95)'

const L_ALT = '#F4F5F7'
const L_BORDER = '#E2E4E8'
const L_INK = '#0D0D0E'
const L_MID = '#3C3F45'

const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── KPI Data ── */
const kpis = [
  { value: '40%', label: 'Cycle Time Cut' },
  { value: '6', label: 'Setups Eliminated' },
  { value: '$1.2M', label: 'Annual Savings' },
]

/* ── Timeline Data ── */
const timeline = [
  {
    phase: 'Challenge',
    title: 'Legacy equipment bottleneck',
    body: 'Legacy 3-axis equipment required 6 separate setups for each structural component, creating massive lead times and tying up critical floor space across the depot.',
  },
  {
    phase: 'Solution',
    title: 'Phillips delivered 5-axis capability',
    body: 'Phillips delivered two Hermle C 42 U 5-axis machining centers with custom fixturing designed specifically for F/A-18 structural repair geometries.',
  },
  {
    phase: 'Result',
    title: 'Transformational performance gains',
    body: 'Cycle times dropped 40%. Six setups consolidated to one. Annual savings exceeded $1.2M within the first full year of operation.',
  },
]

/* ── Solutions Sidebar ── */
const solutions = [
  '5-Axis Machining Centers',
  'Custom Fixturing',
  'Process Optimization',
  'Training Program',
]

/* ── Results Sidebar ── */
const results = [
  { value: '40%', label: 'Cycle Time' },
  { value: '6\u21921', label: 'Setups' },
  { value: '$1.2M', label: 'Savings' },
]

export default function CaseStudyPage() {
  return (
    <div style={{ background: Z_BG, minHeight: '100vh' }}>
      {/* ═══ 1. NAV ═══ */}
      <StrongNav />

      {/* ═══ 2. DARK HERO ═══ */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        background: Z_BG,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* BG Image */}
        <Image
          src={STRONG_IMAGES.defense}
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.18 }}
          priority
        />
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${Z_BG} 0%, rgba(9,9,11,.7) 50%, rgba(9,9,11,.4) 100%)`,
          zIndex: 1,
        }} />

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          padding: '80px 48px 64px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 48,
          alignItems: 'center',
        }}>
          {/* Left Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <PulseRing size={10} />
              <span style={{
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: GOLD,
              }}>
                {'// Aerospace & Defense'}
              </span>
            </div>

            <h1 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              margin: '0 0 24px',
              color: Z_BRIGHT,
            }}>
              NAVAIR<br />
              Navy Depot<br />
              <span style={{ color: RED }}>Transformation.</span>
            </h1>

            {/* Red rule */}
            <div style={{ width: 56, height: 3, background: RED, marginBottom: 16 }} />

            {/* Customer / Location */}
            <p style={{
              fontFamily: MONO,
              fontSize: 11,
              color: Z_MID,
              letterSpacing: 1,
              margin: '0 0 32px',
            }}>
              NAVAIR Fleet Readiness Center East &middot; Cherry Point, NC
            </p>

            {/* KPI Row */}
            <div style={{ display: 'flex', gap: 32 }}>
              {kpis.map((k) => (
                <div key={k.label}>
                  <div style={{
                    fontFamily: MONO,
                    fontSize: 32,
                    fontWeight: 700,
                    color: RED,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {k.value}
                  </div>
                  <div style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: Z_DIM,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}>
                    {k.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Stat Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Card 1 */}
            <div style={{
              background: Z_CARD,
              borderTop: `2px solid ${RED}`,
              padding: 24,
              borderRadius: 0,
            }}>
              <div style={{
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: GOLD,
                marginBottom: 12,
              }}>
                {'// Result 01'}
              </div>
              <p style={{
                fontFamily: INTER,
                fontSize: 16,
                fontWeight: 700,
                color: Z_BRIGHT,
                lineHeight: 1.5,
                margin: 0,
              }}>
                40% faster cycle times across F/A-18 structural repairs.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              background: RED,
              padding: 24,
              borderRadius: 0,
            }}>
              <div style={{
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.80)',
                marginBottom: 12,
              }}>
                {'// Result 02'}
              </div>
              <p style={{
                fontFamily: INTER,
                fontSize: 16,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.5,
                margin: 0,
              }}>
                $1.2M annual savings through setup consolidation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. LIGHT BODY ═══ */}
      <LightSection>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: 48,
        }}>
          {/* Left Column */}
          <div>
            <LightEye label="The Story" />
            <h2 style={{
              fontFamily: INTER,
              fontSize: 28,
              fontWeight: 800,
              color: L_INK,
              margin: '0 0 40px',
              letterSpacing: '-0.5px',
            }}>
              Challenge. Solution. Result.
            </h2>

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timeline.map((item, i) => (
                <div key={item.phase} style={{
                  display: 'grid',
                  gridTemplateColumns: '24px 1fr',
                  gap: 20,
                  paddingBottom: i < timeline.length - 1 ? 36 : 0,
                }}>
                  {/* Dot + Line */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: RED,
                      flexShrink: 0,
                      marginTop: 4,
                    }} />
                    {i < timeline.length - 1 && (
                      <div style={{
                        width: 3,
                        flex: 1,
                        background: `linear-gradient(180deg, ${RED} 0%, ${CYAN} 50%, ${L_BORDER} 100%)`,
                        marginTop: 4,
                      }} />
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <div style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      color: RED,
                      marginBottom: 8,
                    }}>
                      {item.phase}
                    </div>
                    <div style={{
                      fontFamily: INTER,
                      fontSize: 16,
                      fontWeight: 700,
                      color: L_INK,
                      marginBottom: 8,
                      lineHeight: 1.4,
                    }}>
                      {item.title}
                    </div>
                    <p style={{
                      fontFamily: INTER,
                      fontSize: 15,
                      color: L_MID,
                      lineHeight: 1.7,
                      margin: 0,
                    }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Block */}
            <blockquote style={{
              borderLeft: `3px solid ${RED}`,
              paddingLeft: 24,
              margin: '48px 0 0',
            }}>
              <p style={{
                fontFamily: INTER,
                fontSize: 17,
                fontStyle: 'italic',
                color: L_INK,
                lineHeight: 1.7,
                margin: '0 0 12px',
              }}>
                &ldquo;The Hermle machines changed everything for our depot operations.&rdquo;
              </p>
              <cite style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 700,
                color: RED,
                fontStyle: 'normal',
                letterSpacing: 1,
              }}>
                &mdash; CDR James Mitchell, NAVAIR FRC East
              </cite>
            </blockquote>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Solutions Used Card */}
            <div style={{
              background: L_ALT,
              border: `1px solid ${L_BORDER}`,
              padding: 20,
            }}>
              <div style={{
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: RED,
                marginBottom: 16,
              }}>
                Solutions Used
              </div>
              {solutions.map((s, i) => (
                <div key={s} style={{
                  fontFamily: INTER,
                  fontSize: 13,
                  color: L_INK,
                  padding: '10px 0',
                  borderBottom: i < solutions.length - 1 ? `1px solid ${L_BORDER}` : 'none',
                }}>
                  {s}
                </div>
              ))}
            </div>

            {/* Results at a Glance Card */}
            <div style={{
              background: Z_BG,
              padding: 20,
            }}>
              <div style={{
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: GOLD,
                marginBottom: 20,
              }}>
                Results at a Glance
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {results.map((r) => (
                  <div key={r.label}>
                    <div style={{
                      fontFamily: MONO,
                      fontSize: 32,
                      fontWeight: 700,
                      color: GOLD,
                      lineHeight: 1,
                      marginBottom: 4,
                    }}>
                      {r.value}
                    </div>
                    <div style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: Z_MID,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}>
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LightSection>

      {/* ═══ 4. FINAL CTA ═══ */}
      <FinalCTA
        tag="// Your Success Story"
        headline="Ready to transform? Start here."
        accentWord="Start here."
        description="Whether you're modernizing a depot, retooling a production line, or exploring additive manufacturing, Phillips has the expertise to deliver results."
      />
    </div>
  )
}
