'use client'

import Image from 'next/image'
import StrongLiteNav from '@/components/strong-lite/StrongLiteNav'
import LiteSection from '@/components/strong-lite/LiteSection'
import LiteEye from '@/components/strong-lite/LiteEye'
import DataStrip from '@/components/strong-lite/DataStrip'
import BarFill from '@/components/strong-lite/BarFill'
import FinalCTA from '@/components/strong-lite/FinalCTA'
import PulseRing from '@/components/strong-lite/PulseRing'
import { STRONG_IMAGES } from '@/lib/strong-images'

/* ── Design Tokens ──────────────────────────────────── */
const RED    = '#F9423A'
const CYAN   = '#00D4FF'
const GOLD   = '#F68B33'

const Z_BG      = '#09090B'
const Z_DIM     = 'rgba(255,255,255,0.45)'
const Z_MID     = 'rgba(255,255,255,0.70)'
const Z_BRIGHT  = 'rgba(255,255,255,0.95)'

const L_WHITE   = '#FFFFFF'
const L_CARD    = '#F7F8FA'
const L_BORDER  = 'rgba(13,13,14,0.08)'
const L_DIM     = 'rgba(13,13,14,0.45)'
const L_MID     = 'rgba(13,13,14,0.65)'
const L_INK     = '#0D0D0E'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── Mock Data ──────────────────────────────────────── */
const APPLICATION_ITEMS = [
  { label: 'Application', value: 'Aerospace \u00B7 Titanium structural' },
  { label: 'Materials',   value: 'CoCr / Ti-6Al-4V / Inconel' },
  { label: 'Compliance',  value: 'ISO 13485 ready' },
  { label: 'Accuracy',    value: '\u00B10.005mm positioning' },
]

const DATA_STRIP_ITEMS = [
  { label: 'Axes',     value: '5 Simultaneous' },
  { label: 'Accuracy', value: '\u00B10.005mm' },
  { label: 'Table',    value: '\u00D8500mm' },
  { label: 'Spindle',  value: '15,000 RPM' },
  { label: 'Brands',   value: 'Haas / Hermle / GF' },
]

const CAPABILITY_BARS = [
  { label: 'Entry VMC',            value: '30%',  percent: 30 },
  { label: 'Mid-Range VMC',        value: '55%',  percent: 55 },
  { label: 'High-Performance',     value: '75%',  percent: 75 },
  { label: '5-Axis Universal',     value: '90%',  percent: 90, highlight: true },
  { label: 'Additive Manufacturing', value: '45%', percent: 45 },
]

const INDUSTRIES = [
  { num: '01', name: 'Aerospace',   img: STRONG_IMAGES.cncClose,      accent: CYAN, desc: 'Structural titanium airframe components with full traceability and AS9100 process control.' },
  { num: '02', name: 'Medical',     img: STRONG_IMAGES.medical,       accent: RED,  desc: 'Implant-grade CoCr and titanium devices machined to ISO 13485 validated processes.' },
  { num: '03', name: 'Defense',     img: STRONG_IMAGES.defense,       accent: GOLD, desc: 'ITAR-compliant machining centers for mission-critical defense hardware programs.' },
  { num: '04', name: 'Automotive',  img: STRONG_IMAGES.machineVMC,    accent: RED,  desc: 'High-volume die-cast and forged component finishing with sub-10\u00B5m repeatability.' },
  { num: '05', name: 'Die & Mould', img: STRONG_IMAGES.machine5axis,  accent: CYAN, desc: 'Complex freeform surfaces in hardened tool steel with mirror-finish capability.' },
  { num: '06', name: 'Job Shop',    img: STRONG_IMAGES.machineFloor,  accent: GOLD, desc: 'Versatile 5-axis platforms that switch between jobs in under 15 minutes.' },
]

const SERVICES = [
  { title: 'Process Design',        desc: 'End-to-end manufacturing process architecture from blank to finished part.' },
  { title: 'Toolpath Optimization',  desc: 'CAM strategy refinement for cycle-time reduction and surface finish targets.' },
  { title: 'Fixture Engineering',    desc: 'Custom workholding design for complex geometry and multi-operation setups.' },
  { title: 'Runoff Testing',         desc: 'Pre-delivery validation at our tech center with your materials and tolerances.' },
  { title: 'Training Programs',      desc: 'Operator and programmer certification on your specific machine platform.' },
  { title: 'Ongoing Support',        desc: 'Dedicated applications engineers available for continuous process improvement.' },
]

/* ── Page ───────────────────────────────────────────── */
export default function StrongLiteSolutionPage() {
  return (
    <div style={{ background: L_WHITE, color: L_INK, minHeight: '100vh' }}>

      {/* ── 1. NAV ──────────────────────────────────── */}
      <StrongLiteNav />

      {/* ── 2. HERO (stays DARK) ────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: Z_BG,
      }}>
        {/* BG image */}
        <Image
          src={STRONG_IMAGES.machine5axis}
          alt="5-Axis CNC Machine"
          fill
          priority
          style={{ objectFit: 'cover', opacity: 0.18 }}
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

        {/* Content grid */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          padding: '80px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* LEFT */}
          <div>
            {/* Category tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <PulseRing size={8} />
              <span style={{
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                color: GOLD,
              }}>
                {'// 5-Axis Solutions'}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              margin: '0 0 24px',
              color: Z_BRIGHT,
            }}>
              Precision<br />
              Multi-Axis<br />
              <span style={{ color: RED }}>Machining.</span>
            </h1>

            {/* Red rule */}
            <div style={{ width: '64px', height: '3px', background: RED, marginBottom: '20px' }} />

            {/* Subtitle */}
            <p style={{
              fontFamily: INTER,
              fontSize: '17px',
              fontWeight: 600,
              color: Z_MID,
              lineHeight: 1.5,
              margin: '0 0 12px',
              maxWidth: '520px',
            }}>
              Simultaneous 5-axis for aerospace, medical, and defense.
            </p>

            {/* Body */}
            <p style={{
              color: Z_DIM,
              fontSize: '14px',
              lineHeight: 1.7,
              margin: '0 0 32px',
              maxWidth: '480px',
            }}>
              Phillips delivers fully validated 5-axis machining solutions that combine
              best-in-class machine tools with applications engineering, custom tooling
              strategies, and ongoing process support. From first article to full production,
              we de-risk your most demanding programs.
            </p>

            {/* CTAs */}
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
                border: `1px solid rgba(255,255,255,0.25)`,
                padding: '14px 32px',
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}>
                View Machines
              </button>
            </div>
          </div>

          {/* RIGHT — Application callout items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {APPLICATION_ITEMS.map((item, i) => (
              <div key={i}>
                <div style={{ width: '28px', height: '2px', background: RED, marginBottom: '8px' }} />
                <div style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase' as const,
                  color: Z_DIM,
                  marginBottom: '4px',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: INTER,
                  fontSize: '14px',
                  fontWeight: 700,
                  color: Z_BRIGHT,
                  lineHeight: 1.5,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DATA STRIP ───────────────────────────── */}
      <DataStrip items={DATA_STRIP_ITEMS} />

      {/* ── 4. CAPABILITY BARS (LIGHT) ──────────────── */}
      <LiteSection>
        <LiteEye label="Capability Range" />
        <h2 style={{
          fontFamily: INTER,
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: L_INK,
          margin: '0 0 40px',
        }}>
          One platform. Every complexity.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Left — Bars */}
          <div>
            {CAPABILITY_BARS.map((bar) => (
              <BarFill
                key={bar.label}
                label={bar.label}
                value={bar.value}
                percent={bar.percent}
                highlight={bar.highlight}
              />
            ))}
          </div>

          {/* Right — Description */}
          <div>
            <p style={{
              color: L_MID,
              fontSize: '14px',
              lineHeight: 1.8,
              margin: '0 0 20px',
            }}>
              Our 5-axis solution portfolio spans the full complexity curve, from entry-level
              VMCs performing simple 3+2 positioning to full simultaneous 5-axis universal
              machining centers capable of sub-5&#181;m volumetric accuracy. Each tier is backed
              by Phillips applications engineering to ensure your process meets production
              targets from day one.
            </p>
            <p style={{
              color: L_MID,
              fontSize: '14px',
              lineHeight: 1.8,
              margin: 0,
            }}>
              Whether you are cutting titanium airframe components, machining cobalt-chrome
              implants, or finishing hardened die-steel cavities, we match the right platform
              to your application and validate it before it ships. Our OPTO methodology
              guarantees first-article success and sustained process capability.
            </p>
          </div>
        </div>
      </LiteSection>

      {/* ── 5. INDUSTRY GRID (LIGHT ALT) ────────────── */}
      <LiteSection alt>
        <LiteEye label="Industries We Serve" />
        <h2 style={{
          fontFamily: INTER,
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          color: L_INK,
          margin: '0 0 40px',
        }}>
          Built for the industries that<br />
          demand the most.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.num}
              style={{
                position: 'relative',
                overflow: 'hidden',
                minHeight: '180px',
                borderRadius: '4px',
                borderTop: `2px solid ${ind.accent}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px',
              }}
            >
              {/* Card background image — brightness(.85) for light sections */}
              <Image
                src={ind.img}
                alt={ind.name}
                fill
                style={{
                  objectFit: 'cover',
                  filter: 'brightness(0.85)',
                }}
              />
              {/* Gradient overlay from bottom — light variant */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 20%, rgba(255,255,255,0.92) 100%)',
                zIndex: 1,
              }} />

              {/* Card content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  color: L_DIM,
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  {ind.num}
                </span>
                <h3 style={{
                  fontFamily: INTER,
                  fontWeight: 700,
                  fontSize: '16px',
                  color: L_INK,
                  margin: '0 0 6px',
                }}>
                  {ind.name}
                </h3>
                <p style={{
                  fontFamily: INTER,
                  fontSize: '12px',
                  color: L_MID,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {ind.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LiteSection>

      {/* ── 6. OPTO SECTION (LIGHT) ─────────────────── */}
      <LiteSection>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}>
          {/* LEFT — Glass quote panel (light card with border) */}
          <div style={{
            background: L_CARD,
            border: `1px solid ${L_BORDER}`,
            borderLeft: `3px solid ${RED}`,
            borderRadius: '4px',
            padding: '32px',
          }}>
            <p style={{
              fontFamily: INTER,
              fontSize: '16px',
              fontStyle: 'italic',
              color: L_MID,
              lineHeight: 1.7,
              margin: '0 0 20px',
            }}>
              &ldquo;True 5-axis capability is not about the machine alone. It is the
              intersection of toolpath strategy, workholding design, thermal management,
              and deep process knowledge. When those elements converge, you achieve
              tolerances and cycle times that redefine what is possible.&rdquo;
            </p>
            <span style={{
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: GOLD,
            }}>
              &mdash; Phillips Applications Engineering
            </span>
          </div>

          {/* RIGHT — OPTO content */}
          <div>
            <LiteEye label="OPTO" />
            <h2 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: 'clamp(24px, 3vw, 36px)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              color: L_INK,
              margin: '0 0 16px',
            }}>
              Optimized Process &amp;<br />
              Technology Operations
            </h2>
            <p style={{
              color: L_MID,
              fontSize: '14px',
              lineHeight: 1.7,
              margin: '0 0 20px',
            }}>
              OPTO is our proprietary methodology for de-risking capital equipment purchases.
              We validate your specific application on the target machine at our technology
              center before delivery, guaranteeing first-article success and measurable
              production KPIs from day one.
            </p>

            {/* Differentiator tag */}
            <div style={{
              display: 'inline-block',
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: RED,
              padding: '8px 16px',
              border: `1px solid ${RED}`,
              borderRadius: '2px',
              marginBottom: '28px',
            }}>
              Low Cost. Low Risk.
            </div>

            {/* Service items — 2x3 grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '28px',
            }}>
              {SERVICES.map((svc) => (
                <div
                  key={svc.title}
                  style={{
                    padding: '14px 16px',
                    borderLeft: `2px solid ${L_BORDER}`,
                    transition: 'border-color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = RED
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = L_BORDER
                  }}
                >
                  <h4 style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: '13px',
                    color: L_INK,
                    margin: '0 0 4px',
                  }}>
                    {svc.title}
                  </h4>
                  <p style={{
                    fontFamily: INTER,
                    fontSize: '12px',
                    color: L_DIM,
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button style={{
              background: RED,
              color: '#fff',
              border: 'none',
              padding: '13px 30px',
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase' as const,
              cursor: 'pointer',
            }}>
              Explore OPTO
            </button>
          </div>
        </div>
      </LiteSection>

      {/* ── 7. FINAL CTA (stays DARK) ───────────────── */}
      <FinalCTA
        tag="// Your Next Solution"
        headline="Think bigger. Cut smarter."
        accentWord="Cut smarter."
        description="Get matched with the right 5-axis solution for your application."
      />
    </div>
  )
}
