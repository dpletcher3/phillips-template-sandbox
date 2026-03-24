'use client'

import { useState } from 'react'
import Image from 'next/image'
import StrongNav from '@/components/strong/StrongNav'
import DarkEye from '@/components/strong/DarkEye'
import BarFill from '@/components/strong/BarFill'
import FinalCTA from '@/components/strong/FinalCTA'
import PulseRing from '@/components/strong/PulseRing'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ─── Design Tokens ─── */
const RED   = '#F9423A'
const CYAN  = '#00D4FF'
const GOLD  = '#F68B33'

const Z_BG      = '#09090B'
const Z_SURFACE  = '#111113'
const Z_BORDER   = 'rgba(255,255,255,0.07)'
const Z_DIM      = 'rgba(255,255,255,0.45)'
const Z_MID      = 'rgba(255,255,255,0.70)'
const Z_BRIGHT   = 'rgba(255,255,255,0.95)'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ─── Panel Types ─── */
type PanelKey = 'mill' | '5ax' | 'turn' | 'horiz'

/* ─── Tab Data ─── */
const TABS: { key: PanelKey; label: string }[] = [
  { key: 'mill',  label: 'Vertical Mills' },
  { key: '5ax',   label: '5-Axis' },
  { key: 'turn',  label: 'Turning' },
  { key: 'horiz', label: 'Horizontal' },
]

/* ─── Card Interface ─── */
interface ModelCard {
  model: string
  badge?: string
  category: string
  description: string
  spec: string
  featured?: boolean
}

/* ─── Panel Data ─── */
const PANELS: Record<PanelKey, {
  series: string
  title: string
  description: string
  rpmNote: string
  cards: ModelCard[]
  bars: { label: string; value: string; percent: number; highlight?: boolean }[]
}> = {
  mill: {
    series: 'VF Series',
    title: 'Vertical Machining Centers',
    description: 'The industry-standard VMC. From first-op to full production, the VF series delivers the rigidity, speed, and precision that shops depend on every day.',
    rpmNote: 'Up to 12,000 RPM inline direct-drive spindle',
    cards: [
      {
        model: 'VF-1',
        category: 'Compact VMC',
        description: 'Compact footprint, full capability. Ideal for job shops and first operations with a 20" x 16" x 20" work envelope.',
        spec: '508 x 406 x 508 mm  |  12,000 RPM  |  24+1 ATC',
      },
      {
        model: 'VF-2',
        badge: 'Most Popular',
        category: 'Mid-Range VMC',
        description: 'The best-selling CNC machine in the world. Versatile, capable, and built for everything from prototypes to production runs.',
        spec: '762 x 406 x 508 mm  |  12,000 RPM  |  24+1 ATC',
        featured: true,
      },
      {
        model: 'VF-4',
        category: 'Full-Size VMC',
        description: 'Extended X-axis travel for larger workpieces. Production-ready with high-torque spindle options and 50-taper capability.',
        spec: '1016 x 508 x 635 mm  |  12,000 RPM  |  24+1 ATC',
      },
      {
        model: 'VF-5',
        badge: 'Max Travel',
        category: 'Extended VMC',
        description: 'Maximum travels in the VF lineup. Built for large parts, aerospace panels, and high-volume production environments.',
        spec: '1270 x 660 x 635 mm  |  12,000 RPM  |  30+1 ATC',
      },
    ],
    bars: [
      { label: 'VF-1',  value: '508 mm',  percent: 40 },
      { label: 'VF-2',  value: '762 mm',  percent: 60, highlight: true },
      { label: 'VF-4',  value: '1016 mm', percent: 80 },
      { label: 'VF-5',  value: '1270 mm', percent: 100 },
    ],
  },
  '5ax': {
    series: 'UMC Series',
    title: '5-Axis Universal Machining Centers',
    description: 'True simultaneous 5-axis machining. Integrated trunnion tables, probing, and dynamic work offsets for complex contoured parts.',
    rpmNote: 'Up to 15,000 RPM inline direct-drive spindle',
    cards: [
      {
        model: 'UMC-500',
        category: 'Compact 5-Axis',
        description: 'Entry-level 5-axis with a small footprint. Perfect for medical, dental, and precision component work.',
        spec: '500 x 400 x 400 mm  |  15,000 RPM  |  40+1 ATC',
      },
      {
        model: 'UMC-750SS',
        badge: 'Best Seller',
        category: 'Super-Speed 5-Axis',
        description: 'Super-speed spindle with integrated dual-axis trunnion. The go-to machine for aerospace and complex mold work.',
        spec: '762 x 508 x 508 mm  |  15,000 RPM  |  40+1 ATC',
        featured: true,
      },
      {
        model: 'UMC-1500SS',
        badge: 'Max Capacity',
        category: 'Large 5-Axis',
        description: 'The largest UMC in the lineup. High-power spindle and massive work envelope for structural aerospace components.',
        spec: '1524 x 660 x 635 mm  |  12,000 RPM  |  40+1 ATC',
      },
    ],
    bars: [
      { label: 'UMC-500',    value: '500 mm',  percent: 45 },
      { label: 'UMC-750SS',  value: '762 mm',  percent: 70, highlight: true },
      { label: 'UMC-1500SS', value: '1524 mm', percent: 100 },
    ],
  },
  turn: {
    series: 'ST Series',
    title: 'CNC Turning Centers',
    description: 'High-performance CNC lathes with a compact footprint. Bar-fed or chucker configurations with live tooling and C-axis available.',
    rpmNote: 'Up to 4,000 RPM with A2-6 spindle nose',
    cards: [
      {
        model: 'ST-10',
        category: 'Compact Lathe',
        description: 'Small-footprint turning for precision parts. Ideal for bar-fed production and second-op work with a 6.5" chuck.',
        spec: '406 x 254 mm  |  6,000 RPM  |  12-station turret',
      },
      {
        model: 'ST-30',
        badge: 'Most Versatile',
        category: 'Mid-Range Lathe',
        description: 'The workhorse of the ST lineup. Big bore, live tooling, and C-axis capability for complete done-in-one turning.',
        spec: '660 x 381 mm  |  4,000 RPM  |  12-station turret',
        featured: true,
      },
    ],
    bars: [
      { label: 'ST-10', value: '406 mm', percent: 45 },
      { label: 'ST-30', value: '660 mm', percent: 75, highlight: true },
    ],
  },
  horiz: {
    series: 'EC Series',
    title: 'Horizontal Machining Centers',
    description: 'Pallet-changing HMCs for high-volume production. Dual-pallet standard, with tombstone fixturing for maximum spindle utilization.',
    rpmNote: 'Up to 15,000 RPM inline direct-drive spindle',
    cards: [
      {
        model: 'EC-400PP',
        category: 'Compact HMC',
        description: 'Production-proven dual-pallet horizontal with 400mm pallets. Ideal for high-volume, lights-out manufacturing.',
        spec: '560 x 508 x 510 mm  |  15,000 RPM  |  40+1 ATC',
      },
      {
        model: 'EC-1600',
        badge: 'Max Production',
        category: 'Large HMC',
        description: 'The flagship horizontal. Massive 630mm pallets, 6-pallet pool option, and the power to cut anything you throw at it.',
        spec: '1626 x 1270 x 1067 mm  |  10,000 RPM  |  40+1 ATC',
        featured: true,
      },
    ],
    bars: [
      { label: 'EC-400PP', value: '560 mm',  percent: 55 },
      { label: 'EC-1600',  value: '1626 mm', percent: 100, highlight: true },
    ],
  },
}

/* ─── Haas Standard Stats ─── */
const HAAS_STATS = [
  { value: '1988', label: 'Founded' },
  { value: '#1',   label: 'In North America' },
  { value: '200+', label: 'Models' },
  { value: 'USA',  label: 'Built & Supported' },
]

/* ═══════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function ProductLinePage() {
  const [activePanel, setActivePanel] = useState<PanelKey>('mill')
  const panel = PANELS[activePanel]

  return (
    <div style={{ background: Z_BG, color: Z_BRIGHT, minHeight: '100vh' }}>
      {/* ─── 1. NAV ─── */}
      <StrongNav />

      {/* ─── 2. BRAND HERO ─── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
        background: Z_BG,
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* BG image */}
        <Image
          src={STRONG_IMAGES.machineVMC}
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.14 }}
          priority
        />
        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #09090B 0%, transparent 25%, transparent 70%, #09090B 100%), linear-gradient(90deg, #09090B 0%, rgba(9,9,11,.4) 60%)',
        }} />

        {/* Content grid */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '80px 48px 64px',
          maxWidth: '1280px', margin: '0 auto', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '48px', alignItems: 'center',
        }}>
          {/* LEFT */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <PulseRing />
              <span style={{
                fontFamily: MONO, fontSize: '10px', fontWeight: 700,
                letterSpacing: '4px', textTransform: 'uppercase' as const,
                color: RED,
              }}>
                Authorized Haas Factory Outlet
              </span>
            </div>

            <h1 style={{
              fontFamily: INTER, fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 0.92, letterSpacing: '-2px',
              color: Z_BRIGHT, margin: '0 0 20px',
            }}>
              The Complete<br />
              Haas<br />
              <span style={{ color: RED }}>Lineup.</span>
            </h1>

            <div style={{ width: '32px', height: '2px', background: RED, marginBottom: '12px' }} />

            <p style={{
              fontFamily: MONO, fontSize: '11px', letterSpacing: '1px',
              color: Z_MID, margin: '0 0 16px',
            }}>
              200+ CNC models. One authorized source.
            </p>

            <p style={{
              color: Z_DIM, fontSize: '14px', lineHeight: 1.7,
              margin: '0 0 28px', maxWidth: '480px',
            }}>
              From compact VMCs to full-production 5-axis and horizontal machining centers,
              Phillips delivers the complete Haas lineup backed by factory-direct service,
              applications support, and the lowest cost of ownership in the industry.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: RED, color: '#fff', border: 'none',
                padding: '13px 30px', fontFamily: MONO,
                fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase' as const, cursor: 'pointer',
              }}>
                Request a Quote
              </button>
              <button style={{
                background: 'transparent', color: Z_BRIGHT,
                border: '1px solid rgba(255,255,255,.3)',
                padding: '13px 30px', fontFamily: MONO,
                fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase' as const, cursor: 'pointer',
              }}>
                Explore Models
              </button>
            </div>
          </div>

          {/* RIGHT — Product image frame */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              border: `1px solid ${Z_BORDER}`,
              background: 'rgba(17,17,19,.6)',
              padding: '4px',
              overflow: 'hidden',
            }}>
              {/* Corner accents */}
              {[
                { top: 0, left: 0 },
                { top: 0, right: 0 },
                { bottom: 0, left: 0 },
                { bottom: 0, right: 0 },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute', ...pos, width: '18px', height: '18px', zIndex: 2,
                  borderTop:    pos.top    === 0 ? `2px solid ${RED}` : 'none',
                  borderBottom: pos.bottom === 0 ? `2px solid ${RED}` : 'none',
                  borderLeft:   pos.left   === 0 ? `2px solid ${RED}` : 'none',
                  borderRight:  pos.right  === 0 ? `2px solid ${RED}` : 'none',
                } as React.CSSProperties} />
              ))}

              <Image
                src={STRONG_IMAGES.machine5axis}
                alt="Haas 5-axis CNC machine"
                width={580}
                height={420}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />

              {/* HUD label */}
              <div style={{
                position: 'absolute', bottom: '12px', left: '12px',
                background: 'rgba(9,9,11,.8)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                border: `1px solid ${Z_BORDER}`,
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: RED }} />
                <span style={{
                  fontFamily: MONO, fontSize: '9px', fontWeight: 700,
                  letterSpacing: '3px', textTransform: 'uppercase' as const,
                  color: Z_MID,
                }}>
                  UMC-750SS &mdash; 5-Axis Universal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS COLUMN (absolute right) */}
        <div style={{
          position: 'absolute', right: '48px', top: '50%',
          transform: 'translateY(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', gap: '40px',
          alignItems: 'flex-end',
        }}>
          {[
            { val: '200+', sub: 'Models' },
            { val: '20K+', sub: 'Installed' },
            { val: '#1',   sub: 'In N. America' },
          ].map(s => (
            <div key={s.sub} style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: MONO, fontWeight: 700,
                fontSize: 'clamp(28px, 3vw, 42px)',
                lineHeight: 1, color: Z_BRIGHT, letterSpacing: '-1px',
              }}>
                {s.val}
              </div>
              <div style={{
                fontFamily: MONO, fontSize: '9px', fontWeight: 500,
                letterSpacing: '2px', textTransform: 'uppercase' as const,
                color: Z_DIM, marginTop: '4px',
              }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. PRODUCT LINE FILTER TABS ─── */}
      <div style={{
        position: 'sticky', top: '58px', zIndex: 90,
        background: 'rgba(9,9,11,.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${Z_BORDER}`,
        display: 'flex', justifyContent: 'center', gap: '0',
      }}>
        {TABS.map(tab => {
          const isActive = activePanel === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActivePanel(tab.key)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? `2px solid ${RED}` : '2px solid transparent',
                color: isActive ? RED : Z_MID,
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                padding: '16px 32px',
                cursor: 'pointer',
                transition: 'color .2s, border-color .2s',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ─── 4. ACTIVE PANEL ─── */}

      {/* 4a — SERIES HEADER */}
      <section style={{ background: Z_BG, padding: '72px 48px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <DarkEye label={panel.series} />
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', gap: '48px', flexWrap: 'wrap',
          }}>
            <div style={{ flex: '1 1 60%' }}>
              <h2 style={{
                fontFamily: INTER, fontWeight: 900,
                fontSize: 'clamp(28px, 4vw, 44px)',
                lineHeight: 1.05, letterSpacing: '-1px',
                color: Z_BRIGHT, margin: '0 0 14px',
              }}>
                {panel.title}
              </h2>
              <p style={{
                color: Z_DIM, fontSize: '14px', lineHeight: 1.7,
                margin: 0, maxWidth: '560px',
              }}>
                {panel.description}
              </p>
            </div>
            <div style={{
              flex: '0 0 auto',
              background: Z_SURFACE,
              border: `1px solid ${Z_BORDER}`,
              padding: '14px 24px',
              alignSelf: 'flex-start',
            }}>
              <span style={{
                fontFamily: MONO, fontSize: '10px', fontWeight: 600,
                letterSpacing: '1px', color: CYAN,
              }}>
                {panel.rpmNote}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4b — MODEL CARDS */}
      <section style={{ background: Z_BG, padding: '48px 48px 0' }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: `repeat(${panel.cards.length <= 3 ? panel.cards.length : 4}, 1fr)`,
          gap: '16px',
        }}>
          {panel.cards.map(card => (
            <div key={card.model} style={{
              position: 'relative',
              overflow: 'hidden',
              background: Z_SURFACE,
              border: `1px solid ${Z_BORDER}`,
              borderTop: card.featured ? `2px solid ${RED}` : `1px solid ${Z_BORDER}`,
              borderBottom: card.featured ? `2px solid ${RED}` : `1px solid ${Z_BORDER}`,
              padding: '28px 24px',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
              {/* Badge chip */}
              {card.badge && (
                <span style={{
                  alignSelf: 'flex-start',
                  background: card.featured ? 'rgba(249,66,58,.12)' : 'rgba(255,255,255,.05)',
                  color: card.featured ? RED : Z_MID,
                  fontFamily: MONO, fontSize: '8px', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase' as const,
                  padding: '4px 10px',
                  border: `1px solid ${card.featured ? 'rgba(249,66,58,.25)' : Z_BORDER}`,
                }}>
                  {card.badge}
                </span>
              )}

              {/* Model number */}
              <div style={{
                fontFamily: MONO, fontWeight: 900,
                fontSize: 'clamp(26px, 3vw, 36px)',
                lineHeight: 1, letterSpacing: '-1px',
                color: Z_BRIGHT,
              }}>
                {card.model}
              </div>

              {/* Category label */}
              <div style={{
                fontFamily: MONO, fontSize: '9px', fontWeight: 700,
                letterSpacing: '3px', textTransform: 'uppercase' as const,
                color: GOLD,
              }}>
                {card.category}
              </div>

              {/* Description */}
              <p style={{
                fontFamily: INTER, fontSize: '12px',
                lineHeight: 1.6, color: Z_MID,
                margin: 0,
              }}>
                {card.description}
              </p>

              {/* Spec line */}
              <div style={{
                fontFamily: MONO, fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.5px', color: Z_DIM,
                borderTop: `1px solid ${Z_BORDER}`,
                paddingTop: '12px', marginTop: 'auto',
              }}>
                {card.spec}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4c — TRAVEL BARS */}
      <section style={{ background: Z_BG, padding: '64px 48px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <DarkEye label="Travel Comparison" />
          <div style={{ maxWidth: '640px' }}>
            {panel.bars.map(bar => (
              <BarFill
                key={bar.label}
                label={bar.label}
                value={bar.value}
                percent={bar.percent}
                highlight={bar.highlight}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4d — WHY HAAS BAND */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: Z_BG,
        padding: '80px 48px',
        marginTop: '64px',
      }}>
        {/* Faint bg image */}
        <Image
          src={STRONG_IMAGES.machineShop}
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.08 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(9,9,11,.85)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', textAlign: 'center' as const }}>
          <div style={{
            fontFamily: MONO, fontSize: '9px', fontWeight: 700,
            letterSpacing: '5px', textTransform: 'uppercase' as const,
            color: GOLD, marginBottom: '40px',
          }}>
            The Haas Standard
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
          }}>
            {HAAS_STATS.map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: MONO, fontWeight: 900,
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  lineHeight: 1, color: Z_BRIGHT,
                  letterSpacing: '-1px', marginBottom: '8px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: MONO, fontSize: '10px', fontWeight: 500,
                  letterSpacing: '2px', textTransform: 'uppercase' as const,
                  color: Z_DIM,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4e — TRANSITION HEADLINE */}
      <section style={{
        position: 'relative',
        background: Z_BG,
        padding: '100px 48px 40px',
        textAlign: 'center' as const,
        overflow: 'hidden',
      }}>
        {/* Radial gradient glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: `radial-gradient(circle, rgba(249,66,58,.08) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: INTER, fontWeight: 900,
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.05, letterSpacing: '-1px',
            color: Z_BRIGHT, margin: '0 0 16px',
          }}>
            Ready to find<br />
            <span style={{ color: RED }}>your machine?</span>
          </h2>

          <p style={{
            color: Z_DIM, fontSize: '14px', lineHeight: 1.7,
            margin: '0 auto 36px', maxWidth: '480px',
          }}>
            Our applications engineers will match you with the right Haas model for your
            parts, materials, and production goals.
          </p>
        </div>
      </section>

      {/* 4f — CTA BUTTONS */}
      <section style={{
        background: Z_BG,
        padding: '0 48px 100px',
        display: 'flex', justifyContent: 'center', gap: '12px',
      }}>
        <button style={{
          background: RED, color: '#fff', border: 'none',
          padding: '13px 30px', fontFamily: MONO,
          fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase' as const, cursor: 'pointer',
        }}>
          Request a Quote
        </button>
        <button style={{
          background: 'transparent', color: Z_BRIGHT,
          border: '1px solid rgba(255,255,255,.3)',
          padding: '13px 30px', fontFamily: MONO,
          fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase' as const, cursor: 'pointer',
        }}>
          Schedule a Demo
        </button>
        <button style={{
          background: 'transparent', color: Z_BRIGHT,
          border: '1px solid rgba(255,255,255,.3)',
          padding: '13px 30px', fontFamily: MONO,
          fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase' as const, cursor: 'pointer',
        }}>
          Contact Us
        </button>
      </section>

      {/* ─── 5. FINAL CTA ─── */}
      <FinalCTA
        tag="Phillips Corporation"
        headline="Let's build something powerful."
        accentWord="powerful."
        description="From your first CNC to a full production cell, Phillips is your Authorized Haas Factory Outlet for machines, service, and support."
        cta1="Request a Quote"
        cta2="Contact Us"
      />
    </div>
  )
}
