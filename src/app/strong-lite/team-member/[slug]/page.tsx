'use client'

import Image from 'next/image'
import StrongLiteNav from '@/components/strong-lite/StrongLiteNav'
import LiteEye from '@/components/strong-lite/LiteEye'
import LiteSection from '@/components/strong-lite/LiteSection'
import FinalCTA from '@/components/strong-lite/FinalCTA'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ─────────────────────────────────── */
const RED    = '#F9423A'
const CYAN   = '#00D4FF'

const Z_BG      = '#09090B'
const Z_DIM     = 'rgba(255,255,255,0.45)'
const Z_MID     = 'rgba(255,255,255,0.70)'
const Z_BRIGHT  = 'rgba(255,255,255,0.95)'

const L_BG      = '#FFFFFF'
const L_BORDER  = 'rgba(13,13,14,0.08)'
const L_INK     = '#0D0D0E'
const L_MID     = 'rgba(13,13,14,0.65)'
const L_DIM     = 'rgba(13,13,14,0.45)'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── Info Rows Data ────────────────────────────────── */
const INFO_ROWS = [
  { label: 'Title',   value: 'Chief Executive Officer', color: L_INK },
  { label: 'Company', value: 'Phillips Corporation',    color: L_INK },
  { label: 'Since',   value: '1994',                    color: CYAN },
  { label: 'HQ',      value: 'Hanover, PA',             color: L_INK },
  { label: 'Team',    value: 'Leadership',              color: RED },
]

/* ── Breathing Dot Keyframes ───────────────────────── */
const breathingKeyframes = `
@keyframes breathing {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.85); }
}
`

/* ── Page Component ────────────────────────────────── */
export default function TeamMemberLitePage() {
  return (
    <div style={{ background: L_BG, minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: breathingKeyframes }} />

      {/* ═══ 1. NAV ═══ */}
      <StrongLiteNav />

      {/* ═══ 2. HERO — Dark Panel (portrait + info) — stays dark ═══ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '73fr 127fr',
        minHeight: '260px',
        borderBottom: `1px solid ${L_BORDER}`,
      }}>
        {/* Left: Portrait */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: Z_BG,
        }}>
          <Image
            src={STRONG_IMAGES.executive}
            alt="Alan Phillips"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          {/* Gradient overlay — right edge fade */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(270deg, transparent 60%, #09090B 100%)',
            zIndex: 1,
          }} />
        </div>

        {/* Right: Info */}
        <div style={{
          background: Z_BG,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Top tag */}
          <div style={{
            fontFamily: MONO,
            fontSize: '9px',
            color: Z_DIM,
            letterSpacing: '2px',
          }}>
            {'// Phillips Leadership'}
          </div>

          {/* Middle: Name + Title + Badge */}
          <div>
            <h1 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: '50px',
              color: Z_BRIGHT,
              letterSpacing: '-1px',
              margin: '0 0 8px',
              lineHeight: 1.05,
            }}>
              Alan Phillips
            </h1>

            <div style={{
              fontFamily: MONO,
              fontSize: '11px',
              color: Z_MID,
              letterSpacing: '1px',
              margin: '0 0 20px',
            }}>
              Chief Executive Officer // Phillips Corp.
            </div>

            {/* Leadership badge with breathing dot */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: RED,
              padding: '6px 14px',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ffffff',
                animation: 'breathing 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: MONO,
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                color: '#ffffff',
              }}>
                Leadership
              </span>
            </div>
          </div>

          {/* Bottom spacer (justify space-between handles layout) */}
          <div />
        </div>
      </section>

      {/* ═══ 3. LIGHT BIO BODY ═══ */}
      <LiteSection>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 220px',
          gap: '40px',
        }}>
          {/* Left: Bio */}
          <div>
            <LiteEye label="About Alan" />

            <p style={{
              fontFamily: INTER,
              fontSize: '16px',
              lineHeight: 1.7,
              color: L_INK,
              margin: '0 0 20px',
            }}>
              Alan Phillips has led Phillips Corporation since 1994, building the company into one
              of the most respected names in manufacturing technology distribution across the
              Mid-Atlantic region. Under his leadership, Phillips has grown from a regional machine
              tool dealer into a full-service solutions provider supporting aerospace, defense,
              medical, and commercial manufacturers.
            </p>

            <p style={{
              fontFamily: INTER,
              fontSize: '15px',
              lineHeight: 1.7,
              color: L_MID,
              margin: '0 0 20px',
            }}>
              With deep expertise in CNC machining, additive manufacturing, and automated
              production systems, Alan has guided Phillips through multiple technology cycles
              while maintaining the company&apos;s commitment to applications engineering
              excellence and customer-first service. His strategic vision has expanded the
              company&apos;s footprint to include dedicated training centers, demo facilities,
              and federal programs supporting Navy and Air Force depots.
            </p>

            <p style={{
              fontFamily: INTER,
              fontSize: '15px',
              lineHeight: 1.7,
              color: L_MID,
              margin: 0,
            }}>
              Alan is a recognized leader in the manufacturing distribution industry, frequently
              speaking at industry events on topics ranging from workforce development to the
              adoption of Industry 4.0 technologies. He serves on the board of several industry
              associations and remains actively involved in day-to-day operations, visiting
              customer facilities and staying close to the shop floor challenges that drive
              Phillips&apos; solution design approach.
            </p>
          </div>

          {/* Right: Info Sidebar */}
          <div style={{
            borderLeft: `1px solid ${L_BORDER}`,
            paddingLeft: '24px',
          }}>
            {INFO_ROWS.map((row, i) => (
              <div key={row.label} style={{
                marginBottom: i < INFO_ROWS.length - 1 ? '20px' : 0,
              }}>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  textTransform: 'uppercase' as const,
                  color: L_DIM,
                  marginBottom: '4px',
                }}>
                  {row.label}
                </div>
                <div style={{
                  fontFamily: INTER,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: row.color,
                }}>
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </LiteSection>

      {/* ═══ 4. FINAL CTA (stays dark) ═══ */}
      <FinalCTA
        tag="// Meet the Team"
        headline="Talk to our leadership team."
        accentWord="leadership team."
        description="Connect with the people who drive Phillips forward. Our leadership team is always ready to discuss how we can support your manufacturing goals."
      />
    </div>
  )
}
