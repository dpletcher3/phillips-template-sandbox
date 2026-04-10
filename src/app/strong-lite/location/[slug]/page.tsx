'use client'

import Image from 'next/image'
import StrongLiteNav from '@/components/strong-lite/StrongLiteNav'
import LiteEye from '@/components/strong-lite/LiteEye'
import LiteSection from '@/components/strong-lite/LiteSection'
import FinalCTA from '@/components/strong-lite/FinalCTA'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ─────────────────────────────────── */
const RED       = '#F9423A'

const Z_BG      = '#09090B'
const Z_SURFACE = '#111113'
const Z_BORDER  = 'rgba(255,255,255,0.07)'
const Z_DIM     = 'rgba(255,255,255,0.45)'
const Z_MID     = 'rgba(255,255,255,0.70)'
const Z_BRIGHT  = 'rgba(255,255,255,0.95)'

const L_BG      = '#FFFFFF'
const L_BORDER  = 'rgba(13,13,14,0.08)'
const L_INK     = '#0D0D0E'
const L_MID     = 'rgba(13,13,14,0.65)'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── Service Cards Data ────────────────────────────── */
const SERVICE_CARDS = [
  {
    num: '01',
    title: 'Sales',
    img: STRONG_IMAGES.engineer,
    desc: 'Application engineers who know your industry and your machines.',
  },
  {
    num: '02',
    title: 'Service',
    img: STRONG_IMAGES.machineShop,
    desc: 'Certified technicians, OEM parts, guaranteed response times.',
  },
  {
    num: '03',
    title: 'Demo Center',
    img: STRONG_IMAGES.machine5axis,
    desc: 'Cut your actual parts on our showroom floor before you buy.',
  },
]

/* ── Page Component ────────────────────────────────── */
export default function LocationLitePage() {
  return (
    <div style={{ background: L_BG, minHeight: '100vh' }}>
      {/* ═══ 1. NAV ═══ */}
      <StrongLiteNav />

      {/* ═══ 2. HERO — Dark Split (stays dark) ═══ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '340px',
        borderBottom: `1px solid ${L_BORDER}`,
      }}>
        {/* Left: Location Info */}
        <div style={{
          background: Z_BG,
          padding: '44px',
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
            {'// Mid-Atlantic Region'}
          </div>

          {/* Middle: City + Address + Phone */}
          <div>
            <h1 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: '60px',
              color: Z_BRIGHT,
              letterSpacing: '-2px',
              lineHeight: 0.88,
              margin: '0 0 24px',
            }}>
              Charlotte<br />NC
            </h1>

            <div style={{
              fontFamily: MONO,
              fontSize: '13px',
              color: Z_BRIGHT,
              lineHeight: 1.7,
              marginBottom: '12px',
            }}>
              4101 Stuart Andrew Blvd<br />
              Charlotte, NC 28217
            </div>

            <div style={{
              fontFamily: MONO,
              fontSize: '17px',
              fontWeight: 700,
              color: RED,
              marginBottom: '24px',
            }}>
              (704) 525-5990
            </div>

            {/* Hours grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '24px',
            }}>
              <div style={{
                background: Z_SURFACE,
                border: `1px solid ${Z_BORDER}`,
                padding: '10px 12px',
              }}>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: Z_MID,
                  marginBottom: '2px',
                }}>
                  Mon&ndash;Fri
                </div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: Z_MID,
                  fontWeight: 700,
                }}>
                  07:30&ndash;17:00
                </div>
              </div>
              <div style={{
                background: Z_SURFACE,
                border: `1px solid ${Z_BORDER}`,
                padding: '10px 12px',
              }}>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: Z_MID,
                  marginBottom: '2px',
                }}>
                  Saturday
                </div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: Z_MID,
                  fontWeight: 700,
                }}>
                  By Appt.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Directions CTA */}
          <div>
            <button style={{
              background: 'transparent',
              border: `1px solid ${RED}`,
              color: RED,
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              padding: '10px 22px',
              cursor: 'pointer',
            }}>
              Get Directions &rarr;
            </button>
          </div>
        </div>

        {/* Right: Building Image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Image
            src={STRONG_IMAGES.building}
            alt="Phillips Charlotte location"
            fill
            priority
            style={{ objectFit: 'cover', filter: 'brightness(.85)' }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(270deg, transparent 40%, #09090B 100%)',
            zIndex: 1,
          }} />
        </div>
      </section>

      {/* ═══ 3. SERVICES (Light) ═══ */}
      <LiteSection>
        <LiteEye label="Services" />
        <h2 style={{
          fontFamily: INTER,
          fontSize: '28px',
          fontWeight: 800,
          color: L_INK,
          margin: '0 0 32px',
          letterSpacing: '-0.5px',
        }}>
          Everything your shop needs.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {SERVICE_CARDS.map((card) => (
            <div key={card.num} style={{
              background: L_BG,
              border: `1px solid ${L_BORDER}`,
              overflow: 'hidden',
            }}>
              {/* Image section */}
              <div style={{
                position: 'relative',
                height: '150px',
                overflow: 'hidden',
              }}>
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(.85)' }}
                />
              </div>

              {/* Body */}
              <div style={{ padding: '20px 18px' }}>
                <h3 style={{
                  fontFamily: MONO,
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  color: L_INK,
                  margin: '0 0 8px',
                  letterSpacing: '1px',
                }}>
                  {card.num} {'// '}{card.title}
                </h3>
                <p style={{
                  fontFamily: INTER,
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: L_MID,
                  margin: 0,
                }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LiteSection>

      {/* ═══ 4. FINAL CTA (stays dark) ═══ */}
      <FinalCTA
        tag="// Visit Us"
        headline="Come see the machines in person."
        accentWord="in person."
        description="Schedule a visit to our Charlotte showroom. Cut your actual parts on our demo machines, meet our applications engineers, and see why Phillips is the Mid-Atlantic's trusted machine tool partner."
      />
    </div>
  )
}
