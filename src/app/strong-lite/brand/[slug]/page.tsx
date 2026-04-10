'use client'

import { useState } from 'react'
import Image from 'next/image'
import StrongLiteNav from '@/components/strong-lite/StrongLiteNav'
import LiteSection from '@/components/strong-lite/LiteSection'
import LiteEye from '@/components/strong-lite/LiteEye'
import DataStrip from '@/components/strong-lite/DataStrip'
import BarFill from '@/components/strong-lite/BarFill'
import FinalCTA from '@/components/strong-lite/FinalCTA'
import PulseRing from '@/components/strong-lite/PulseRing'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ─────────────────────────────────── */
const RED    = '#F9423A'
const CYAN   = '#00D4FF'
const GOLD   = '#F68B33'

/* Dark tokens (hero + image breaks) */
const Z_BG      = '#09090B'
const Z_DIM     = 'rgba(255,255,255,0.45)'
const Z_MID     = 'rgba(255,255,255,0.70)'
const Z_BRIGHT  = 'rgba(255,255,255,0.95)'

/* Light tokens (body sections) */
const L_BG      = '#F2F4F6'
const L_SURFACE = '#FFFFFF'
const L_CARD    = '#F7F8FA'
const L_BORDER  = 'rgba(13,13,14,0.08)'
const L_DIM     = 'rgba(13,13,14,0.45)'
const L_MID     = 'rgba(13,13,14,0.65)'
const L_INK     = '#0D0D0E'

const MONO   = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER  = 'var(--font-inter, Inter), sans-serif'

/* ── Mock Data ─────────────────────────────────────── */
const SPEC_CARDS = [
  { sys: 'SYS.01', label: 'Spindle Speed',   value: '15,000 RPM' },
  { sys: 'SYS.02', label: 'X-Travel',         value: '762mm (30")' },
  { sys: 'SYS.03', label: 'Y-Travel',         value: '406mm (16")' },
  { sys: 'SYS.04', label: 'Z-Travel',         value: '508mm (20")' },
  { sys: 'SYS.05', label: 'Table Size',       value: '914\u00D7356mm' },
  { sys: 'SYS.06', label: 'Max Part Weight',  value: '1361 kg' },
  { sys: 'SYS.07', label: 'Tool Capacity',    value: '24+1 ATC' },
  { sys: 'SYS.08', label: 'Rapid Traverse',   value: '25.4 m/min' },
]

const FEATURE_PANELS = [
  { stat: '15,000', unit: 'RPM', title: 'Spindle Speed', desc: 'Inline direct-drive spindle delivers consistent torque across the full RPM range, enabling aggressive material removal on hardened steels and exotic alloys.', img: STRONG_IMAGES.spindleClose, num: '01' },
  { stat: '30"',    unit: 'X-Axis', title: 'X-Axis Travel', desc: 'Extended X-axis travel provides the envelope for long aluminum extrusions, mold components, and multi-fixture setups without re-clamping.', img: STRONG_IMAGES.machineVMC, num: '02' },
  { stat: '24+1',   unit: 'Tools', title: 'Tool Capacity', desc: 'High-speed side-mount tool changer cycles in under 2 seconds, minimizing non-cutting time on complex multi-operation parts.', img: STRONG_IMAGES.cncClose, num: '03' },
  { stat: '5-Axis', unit: 'Simultaneous', title: 'Simultaneous Machining', desc: 'Full 5-axis simultaneous capability enables single-setup machining of complex aerospace and medical geometries with superior surface finish.', img: STRONG_IMAGES.machine5axis, num: '04' },
]

const COMPARE_MACHINES = [
  { model: 'VF-1',  travel: '20\u00D716\u00D720"', spindle: '8,100 RPM', tools: '20+1', table: '26\u00D714"',  featured: false },
  { model: 'VF-2',  travel: '30\u00D716\u00D720"', spindle: '8,100 RPM', tools: '24+1', table: '36\u00D714"',  featured: true },
  { model: 'VF-4',  travel: '50\u00D720\u00D725"', spindle: '8,100 RPM', tools: '24+1', table: '52\u00D718"',  featured: false },
]

const SERVICE_CARDS = [
  { title: 'Sales', desc: 'Our applications engineers help you select the right machine for your parts, materials, and production volume.', img: STRONG_IMAGES.engineer },
  { title: 'Training', desc: 'On-site and virtual training programs get your operators cutting parts on day one.', img: STRONG_IMAGES.trainingRoom },
  { title: 'Service', desc: 'Factory-trained technicians and 24/7 parts support keep your spindle turning.', img: STRONG_IMAGES.machineShop },
]

const GALLERY_ITEMS = [
  { src: STRONG_IMAGES.machine5axis,    label: '5-Axis VMC' },
  { src: STRONG_IMAGES.spindleClose,    label: 'Spindle Detail' },
  { src: STRONG_IMAGES.cncClose,        label: 'Tool Changer' },
  { src: STRONG_IMAGES.machineFloor,    label: 'Shop Floor' },
  { src: STRONG_IMAGES.machineTurning,  label: 'Turning Center' },
  { src: STRONG_IMAGES.machineShop,     label: 'Production Line' },
]

const HUD_STATS = [
  { value: '15K',  label: 'RPM' },
  { value: '30"',  label: 'X-Travel' },
  { value: '40+1', label: 'Tools' },
  { value: '5',    label: 'Axes' },
]

/* ── Page Component ────────────────────────────────── */
export default function StrongLiteBrandPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null)

  return (
    <div style={{ background: L_BG, color: L_INK, minHeight: '100vh' }}>
      {/* ── NAV ──────────────────────────────────────── */}
      <StrongLiteNav />

      {/* ── 1. HERO (DARK) ───────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: Z_BG,
        color: Z_BRIGHT,
      }}>
        {/* Background image */}
        <Image
          src={STRONG_IMAGES.machineVMC}
          alt="VMC Machine background"
          fill
          priority
          style={{ objectFit: 'cover', opacity: 0.18 }}
        />
        {/* Gradient overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #09090B 0%, transparent 25%, transparent 70%, #09090B 100%)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #09090B 0%, rgba(9,9,11,.4) 60%)',
          zIndex: 1,
        }} />

        {/* Left Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 48px',
          maxWidth: '700px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <PulseRing size={10} />
            <span style={{
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: RED,
            }}>
              Authorized Haas Factory Outlet &middot; Mid-Atlantic
            </span>
          </div>

          <h1 style={{
            fontFamily: INTER,
            fontWeight: 900,
            fontSize: 'clamp(48px, 7vw, 86px)',
            lineHeight: 0.92,
            letterSpacing: '-2px',
            margin: '0 0 24px',
            color: Z_BRIGHT,
          }}>
            Machine<br />
            Tools That<br />
            <span style={{ color: RED }}>Perform.</span>
          </h1>

          <div style={{ width: '48px', height: '3px', background: RED, marginBottom: '20px' }} />

          <p style={{
            fontFamily: INTER,
            fontSize: '16px',
            fontWeight: 600,
            color: Z_MID,
            margin: '0 0 12px',
            letterSpacing: '-0.3px',
          }}>
            Haas CNC Machine Tools
          </p>

          <p style={{
            fontFamily: INTER,
            fontSize: '15px',
            lineHeight: 1.7,
            color: Z_DIM,
            margin: '0 0 32px',
            maxWidth: '520px',
          }}>
            From high-speed vertical machining centers to full 5-axis simultaneous platforms,
            Phillips delivers the machines, applications support, and service that keep your
            shop running at peak output.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              background: RED,
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              cursor: 'pointer',
            }}>
              Request a Quote
            </button>
            <button style={{
              background: 'transparent',
              color: Z_BRIGHT,
              border: `1px solid rgba(255,255,255,.3)`,
              padding: '14px 32px',
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              cursor: 'pointer',
            }}>
              Explore Models
            </button>
          </div>
        </div>

        {/* Right: Product Image Frame */}
        <div style={{
          position: 'absolute',
          right: '160px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          zIndex: 2,
        }}>
          <div style={{ position: 'relative' }}>
            {/* Main image */}
            <div style={{
              position: 'relative',
              width: '400px',
              height: '320px',
              border: '1px solid rgba(255,255,255,.08)',
              overflow: 'hidden',
            }}>
              <Image
                src={STRONG_IMAGES.machine5axis}
                alt="Haas VF-2 5-Axis"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Red corner accent - top left */}
            <div style={{ position: 'absolute', top: '-6px', left: '-6px' }}>
              <div style={{ width: '34px', height: '3px', background: RED }} />
              <div style={{ width: '3px', height: '34px', background: RED }} />
            </div>

            {/* Red corner accent - bottom right */}
            <div style={{ position: 'absolute', bottom: '-6px', right: '-6px' }}>
              <div style={{ width: '34px', height: '3px', background: RED, marginLeft: 'auto' }} />
              <div style={{ width: '3px', height: '34px', background: RED, marginLeft: 'auto', marginTop: '-34px', position: 'relative', top: '0', left: '31px' }} />
            </div>

            {/* Red outline frame */}
            <div style={{
              position: 'absolute',
              inset: '-8px',
              border: `1px solid rgba(249,66,58,.2)`,
              pointerEvents: 'none',
            }} />

            {/* Label below */}
            <div style={{
              fontFamily: MONO,
              fontSize: '8px',
              fontWeight: 500,
              letterSpacing: '3px',
              color: Z_DIM,
              textTransform: 'uppercase' as const,
              marginTop: '16px',
              textAlign: 'center' as const,
            }}>
              HAAS VF-2 // LIVE VIEW
            </div>
          </div>
        </div>

        {/* Right: HUD Stats Column */}
        <div style={{
          position: 'absolute',
          right: '48px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          alignItems: 'flex-end',
        }}>
          {HUD_STATS.map((stat, i) => (
            <div key={i} style={{
              textAlign: 'right' as const,
              paddingRight: '16px',
              borderRight: `2px solid`,
              borderImage: `linear-gradient(180deg, ${RED}, rgba(249,66,58,.2)) 1`,
            }}>
              <div style={{
                fontFamily: MONO,
                fontSize: '28px',
                fontWeight: 700,
                color: Z_BRIGHT,
                lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: MONO,
                fontSize: '8px',
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: Z_DIM,
                marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. DATA STRIP (LIGHT) ────────────────────── */}
      <DataStrip items={[
        { label: 'Spindle', value: '15,000 RPM' },
        { label: 'X-Travel', value: '30"' },
        { label: 'Table', value: '16"\u00D714"' },
        { label: 'Tools', value: '24+1' },
        { label: 'Axes', value: '5' },
      ]} />

      {/* ── 3. SPEC CARDS (LIGHT) ────────────────────── */}
      <LiteSection>
        <LiteEye label="Specifications" />
        <h2 style={{
          fontFamily: INTER,
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-1px',
          color: L_INK,
          margin: '0 0 48px',
        }}>
          Built to outperform.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}>
          {SPEC_CARDS.map((card, i) => {
            const isActive = activeCard === i
            return (
              <div
                key={i}
                onClick={() => setActiveCard(isActive ? null : i)}
                style={{
                  background: isActive ? L_CARD : L_SURFACE,
                  border: `1px solid ${L_BORDER}`,
                  padding: '28px 24px',
                  cursor: 'pointer',
                  borderTop: isActive ? `2px solid ${RED}` : `1px solid ${L_BORDER}`,
                  transition: 'all .25s ease',
                }}
              >
                <div style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '3px',
                  color: isActive ? CYAN : L_DIM,
                  marginBottom: '12px',
                  transition: 'color .25s ease',
                }}>
                  {card.sys}
                </div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  color: L_MID,
                  textTransform: 'uppercase' as const,
                  marginBottom: '8px',
                }}>
                  {card.label}
                </div>
                <div style={{
                  fontFamily: INTER,
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isActive ? RED : L_INK,
                  letterSpacing: '-0.5px',
                  transition: 'color .25s ease',
                }}>
                  {card.value}
                </div>
              </div>
            )
          })}
        </div>
      </LiteSection>

      {/* ── 4. IMAGE BREAK (DARK) ────────────────────── */}
      <section style={{
        position: 'relative',
        height: '36vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        <Image
          src={STRONG_IMAGES.machineFloor}
          alt="Manufacturing floor"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(.35)' }}
        />
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '48px',
        }}>
          <div style={{
            fontFamily: MONO,
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '3px',
            color: Z_DIM,
            marginBottom: '12px',
          }}>
            {'// Manufacturing at scale'}
          </div>
          <h2 style={{
            fontFamily: INTER,
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            lineHeight: 1,
            color: Z_BRIGHT,
            margin: 0,
          }}>
            <span style={{ color: RED }}>Performance.</span>
          </h2>
        </div>
      </section>

      {/* ── 5. FEATURE PANELS (LIGHT) ────────────────── */}
      <LiteSection>
        <LiteEye label="Capabilities" />
        <h2 style={{
          fontFamily: INTER,
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-1px',
          color: L_INK,
          margin: '0 0 48px',
        }}>
          The details that matter.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {FEATURE_PANELS.map((panel, i) => {
            const isHovered = hoveredFeature === i
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  background: isHovered ? L_CARD : L_SURFACE,
                  border: `1px solid ${L_BORDER}`,
                  borderBottom: isHovered ? `2px solid ${RED}` : `1px solid ${L_BORDER}`,
                  transition: 'all .3s ease',
                  overflow: 'hidden',
                }}
              >
                {/* Image area */}
                <div style={{
                  position: 'relative',
                  height: '120px',
                  overflow: 'hidden',
                }}>
                  <Image
                    src={panel.img}
                    alt={panel.title}
                    fill
                    style={{ objectFit: 'cover', filter: 'brightness(.85)' }}
                  />
                  {/* Ghost number */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '16px',
                    fontFamily: INTER,
                    fontSize: '56px',
                    fontWeight: 900,
                    color: 'rgba(0,0,0,.06)',
                    lineHeight: 1,
                  }}>
                    {panel.num}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '28px 24px' }}>
                  <div style={{
                    fontFamily: MONO,
                    fontSize: '32px',
                    fontWeight: 800,
                    color: RED,
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}>
                    {panel.stat}
                  </div>
                  <div style={{
                    fontFamily: MONO,
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '2px',
                    textTransform: 'uppercase' as const,
                    color: L_DIM,
                    marginBottom: '16px',
                  }}>
                    {panel.unit}
                  </div>
                  <div style={{
                    fontFamily: INTER,
                    fontSize: '16px',
                    fontWeight: 700,
                    color: L_INK,
                    marginBottom: '8px',
                  }}>
                    {panel.title}
                  </div>
                  <p style={{
                    fontFamily: INTER,
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: L_DIM,
                    margin: 0,
                  }}>
                    {panel.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </LiteSection>

      {/* ── 6. PERFORMANCE BARS (LIGHT) ──────────────── */}
      <LiteSection>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* Left copy */}
          <div>
            <LiteEye label="Performance" />
            <h2 style={{
              fontFamily: INTER,
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-1px',
              color: L_INK,
              margin: '0 0 16px',
            }}>
              Numbers that speak for themselves.
            </h2>
            <p style={{
              fontFamily: INTER,
              fontSize: '15px',
              lineHeight: 1.7,
              color: L_DIM,
              margin: '0 0 28px',
              maxWidth: '440px',
            }}>
              Every Haas machine is built in Oxnard, California, to deliver
              repeatable accuracy, rigorous uptime, and the lowest total cost of
              ownership in its class.
            </p>
            <button style={{
              background: 'transparent',
              color: L_INK,
              border: `1px solid ${L_BORDER}`,
              padding: '13px 28px',
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              cursor: 'pointer',
            }}>
              View Full Specs
            </button>
          </div>

          {/* Right bars */}
          <div>
            <BarFill label="X-Travel" value="762mm" percent={75} />
            <BarFill label="Y-Travel" value="406mm" percent={50} />
            <BarFill label="Spindle Speed" value="15K RPM" percent={85} />
            <BarFill label="Tool Capacity" value="24+1" percent={60} />
            <BarFill label="Table Load" value="1361kg" percent={70} />
          </div>
        </div>
      </LiteSection>

      {/* ── 7. GLASS QUOTE (LIGHT GLASS) ─────────────── */}
      <section style={{
        position: 'relative',
        height: '44vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image
          src={STRONG_IMAGES.spindleClose}
          alt="Spindle close-up"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(.35)' }}
        />
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '700px',
          padding: '48px 56px',
          background: 'rgba(255,255,255,.85)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          border: `1px solid ${L_BORDER}`,
          textAlign: 'center' as const,
        }}>
          <p style={{
            fontFamily: INTER,
            fontSize: '18px',
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: L_INK,
            margin: '0 0 20px',
          }}>
            &ldquo;The VF-2 has been our workhorse for fifteen years. Nothing else comes close
            in value per spindle hour.&rdquo;
          </p>
          <span style={{
            fontFamily: MONO,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: GOLD,
          }}>
            &mdash; Mike Torres, Shop Foreman
          </span>
        </div>
      </section>

      {/* ── 8. COMPARE (LIGHT) ───────────────────────── */}
      <LiteSection>
        <LiteEye label="Compare" />
        <h2 style={{
          fontFamily: INTER,
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-1px',
          color: L_INK,
          margin: '0 0 48px',
        }}>
          Find your machine.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {COMPARE_MACHINES.map((m, i) => {
            const isFeatured = m.featured
            return (
              <div
                key={i}
                style={{
                  background: L_SURFACE,
                  border: `1px solid ${L_BORDER}`,
                  borderTop: isFeatured ? `2px solid ${RED}` : `1px solid ${L_BORDER}`,
                  padding: '0',
                  transition: 'all .25s ease',
                }}
              >
                {/* Image placeholder */}
                <div style={{
                  position: 'relative',
                  height: '100px',
                  background: L_CARD,
                  overflow: 'hidden',
                }}>
                  <Image
                    src={STRONG_IMAGES.machineVMC}
                    alt={m.model}
                    fill
                    style={{ objectFit: 'cover', filter: 'brightness(.85)' }}
                  />
                </div>

                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontFamily: INTER,
                    fontSize: '22px',
                    fontWeight: 800,
                    color: L_INK,
                    margin: '0 0 20px',
                    letterSpacing: '-0.5px',
                  }}>
                    {m.model}
                  </h3>

                  {[
                    { label: 'Travel', value: m.travel },
                    { label: 'Spindle', value: m.spindle },
                    { label: 'Tools', value: m.tools },
                    { label: 'Table', value: m.table },
                  ].map((row, ri) => (
                    <div key={ri} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: `1px solid ${L_BORDER}`,
                    }}>
                      <span style={{
                        fontFamily: MONO,
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '1px',
                        color: L_DIM,
                        textTransform: 'uppercase' as const,
                      }}>
                        {row.label}
                      </span>
                      <span style={{
                        fontFamily: MONO,
                        fontSize: '11px',
                        fontWeight: 700,
                        color: L_INK,
                      }}>
                        {row.value}
                      </span>
                    </div>
                  ))}

                  <button style={{
                    width: '100%',
                    marginTop: '20px',
                    background: isFeatured ? RED : 'transparent',
                    color: isFeatured ? '#fff' : L_INK,
                    border: isFeatured ? 'none' : `1px solid ${L_BORDER}`,
                    padding: '12px 0',
                    fontFamily: MONO,
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase' as const,
                    cursor: 'pointer',
                  }}>
                    {isFeatured ? 'Get a Quote' : 'Learn More'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </LiteSection>

      {/* ── 9. SERVICE CARDS (LIGHT) ─────────────────── */}
      <LiteSection>
        <LiteEye label="Support" />
        <h2 style={{
          fontFamily: INTER,
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-1px',
          color: L_INK,
          margin: '0 0 48px',
        }}>
          We don&apos;t just sell machines.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {SERVICE_CARDS.map((card, i) => (
            <div key={i} style={{
              background: L_SURFACE,
              border: `1px solid ${L_BORDER}`,
              overflow: 'hidden',
            }}>
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
              <div style={{ padding: '28px 24px' }}>
                <h3 style={{
                  fontFamily: INTER,
                  fontSize: '18px',
                  fontWeight: 700,
                  color: L_INK,
                  margin: '0 0 10px',
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontFamily: INTER,
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: L_DIM,
                  margin: 0,
                }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LiteSection>

      {/* ── 10. GALLERY (LIGHT) ──────────────────────── */}
      <LiteSection>
        <LiteEye label="Gallery" />
        <h2 style={{
          fontFamily: INTER,
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-1px',
          color: L_INK,
          margin: '0 0 48px',
        }}>
          See it in action.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: '210px 210px',
          gap: '8px',
        }}>
          {GALLERY_ITEMS.map((item, i) => {
            const isHov = hoveredGallery === i
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredGallery(i)}
                onMouseLeave={() => setHoveredGallery(null)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  gridRow: i === 0 ? '1 / 3' : undefined,
                  borderRadius: '2px',
                }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  style={{
                    objectFit: 'cover',
                    filter: isHov ? 'brightness(.8)' : 'brightness(.9)',
                    transform: isHov ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all .4s ease',
                  }}
                />
                {/* Hover label */}
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  fontFamily: MONO,
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase' as const,
                  color: '#fff',
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'all .3s ease',
                  zIndex: 2,
                  textShadow: '0 1px 4px rgba(0,0,0,.5)',
                }}>
                  {item.label}
                </div>
              </div>
            )
          })}
        </div>
      </LiteSection>

      {/* ── 11. FINAL CTA (DARK) ─────────────────────── */}
      <FinalCTA
        tag="// Your Next Machine"
        headline="Think bigger. Cut faster."
        accentWord="Cut faster."
        description="Get a personalized quote from our applications engineering team. We'll match you with the right Haas machine for your parts, your materials, and your production goals."
      />
    </div>
  )
}
