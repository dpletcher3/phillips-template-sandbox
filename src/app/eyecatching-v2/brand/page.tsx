'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { EC_IMAGES } from '@/lib/eyecatching-images'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const products = [
  {
    series: 'VF SERIES',
    category: 'Vertical Mills',
    models: 'VF-1 through VF-14',
    desc: 'The job shop standard',
    image: EC_IMAGES.machineVMC,
  },
  {
    series: 'UMC SERIES',
    category: '5-Axis Universal',
    models: 'UMC-500 through UMC-1500SS',
    desc: 'Full simultaneous 5-axis',
    image: EC_IMAGES.machine5axis,
  },
  {
    series: 'ST SERIES',
    category: 'CNC Turning',
    models: 'ST-10 through ST-55',
    desc: 'Production turning',
    image: EC_IMAGES.machineTurning,
  },
  {
    series: 'EC SERIES',
    category: 'Horizontal',
    models: 'EC-400 through EC-1600',
    desc: 'Pallet-ready HMC',
    image: EC_IMAGES.machineFloor,
  },
]

const specs = [
  { label: '\u00b10.003mm Positioning Accuracy', pct: 97 },
  { label: '18,000 RPM Max Spindle', pct: 82 },
  { label: 'Up to 120 Tool Capacity', pct: 74 },
  { label: '3,000 kg Max Table Load', pct: 68 },
  { label: '60 m/min Rapid Traverse', pct: 78 },
]

const tabs = [
  { id: 'specs', label: 'Specifications' },
  { id: 'about', label: 'About Hermle' },
  { id: 'cases', label: 'Case Studies' },
] as const

const caseStudies = [
  {
    tag: 'NAVAIR',
    title: '40% Cycle Time Reduction',
    desc: '5-axis consolidation cut production cycles nearly in half.',
  },
  {
    tag: 'Medical Implant',
    title: 'Precision to \u00b10.002mm',
    desc: 'Custom titanium implants with surface finishes exceeding requirements.',
  },
  {
    tag: 'Die & Mould',
    title: '50% Lead Time Reduction',
    desc: 'Complex mould cavities machined in a single setup.',
  },
]

const aboutTiles = [
  { value: '1938', label: 'Founded' },
  { value: '1,200+', label: 'Employees' },
  { value: '50+', label: 'Countries' },
  { value: '100%', label: 'In-House Mfg' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BrandPage() {
  const [activeTab, setActiveTab] = useState<string>('specs')
  const [barWidths, setBarWidths] = useState<number[]>(specs.map(() => 0))

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarWidths(specs.map((s) => s.pct))
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ color: '#fff' }}>
      {/* ============================================================ */}
      {/*  SECTION 1 — Stage hero                                      */}
      {/* ============================================================ */}
      <section
        style={{
          height: '70vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#000',
        }}
      >
        {/* Left cell */}
        <div
          style={{
            background: '#000',
            padding: '36px 44px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(80px,13vw,160px)',
              textTransform: 'uppercase',
              lineHeight: 0.85,
              color: '#fff',
              margin: 0,
            }}
          >
            HERMLE
          </h1>

          <div
            style={{
              width: 40,
              height: 2,
              background: '#F9423A',
              margin: '16px 0 10px',
            }}
          />

          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              color: 'rgba(255,255,255,.4)',
            }}
          >
            5-Axis Precision Machining Centers
          </span>

          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,.4)',
              lineHeight: 1.75,
              maxWidth: 360,
              margin: '16px 0 24px',
            }}
          >
            Since 1938, Hermle has defined the global standard for 5-axis
            precision machining, delivering unmatched accuracy and surface
            quality for the most demanding applications in aerospace, medical,
            and defense.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              style={{
                background: '#fff',
                color: '#000',
                border: 'none',
                padding: '12px 28px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Explore Machines
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,.25)',
                padding: '12px 28px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Request Quote
            </button>
          </div>

          {/* Stat strip */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,.07)',
              paddingTop: 20,
              marginTop: 28,
              display: 'flex',
              gap: 36,
            }}
          >
            {[
              { value: '\u00b10.003mm', label: 'Positioning' },
              { value: '18K', label: 'RPM Max' },
              { value: '100%', label: 'In-House' },
            ].map((s) => (
              <div key={s.label}>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 22,
                    color: '#fff',
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'rgba(255,255,255,.3)',
                    display: 'block',
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right cell */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src={EC_IMAGES.machine5axis}
            alt="Hermle 5-axis machining center"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(.6)' }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background:
                'linear-gradient(to right, #000 0%, transparent 40%)',
              zIndex: 1,
            }}
          />

          {/* Category pills */}
          <div
            style={{
              position: 'absolute',
              top: 36,
              right: 28,
              zIndex: 2,
              display: 'flex',
              gap: 8,
            }}
          >
            {['5-Axis', 'Aerospace', 'Medical', 'Defense'].map((pill) => (
              <span
                key={pill}
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  background: 'rgba(0,0,0,.6)',
                  border: '1px solid rgba(255,255,255,.12)',
                  color: 'rgba(255,255,255,.6)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: 2,
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — Product scroll                                   */}
      {/* ============================================================ */}
      <section style={{ background: '#0a0a0a', padding: '36px 0 36px 44px' }}>
        <p
          style={{
            fontSize: 8,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'rgba(255,255,255,.3)',
            marginBottom: 16,
            paddingRight: 44,
          }}
        >
          Product Lines &mdash; drag to explore
        </p>

        <div
          style={{
            display: 'flex',
            gap: 14,
            overflowX: 'auto',
            paddingRight: 44,
            cursor: 'grab',
          }}
        >
          {products.map((p) => (
            <div
              key={p.series}
              style={{
                minWidth: 240,
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 6,
                overflow: 'hidden',
                transition: 'all .4s',
              }}
            >
              {/* Card image */}
              <div
                style={{
                  height: 130,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={p.image}
                  alt={p.series}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(.5)' }}
                />
                {/* Red accent bar */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background:
                      'linear-gradient(90deg, #F9423A, transparent)',
                  }}
                />
              </div>

              {/* Card body */}
              <div style={{ padding: 16 }}>
                <span
                  style={{
                    fontSize: 8,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#F68B33',
                    marginBottom: 4,
                    display: 'block',
                  }}
                >
                  {p.category}
                </span>
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 18,
                    textTransform: 'uppercase',
                    color: '#fff',
                    margin: '0 0 4px',
                  }}
                >
                  {p.series}
                </h3>
                <p
                  style={{
                    fontSize: 9,
                    color: 'rgba(255,255,255,.22)',
                    marginBottom: 8,
                  }}
                >
                  {p.models}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,.3)',
                    lineHeight: 1.5,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 — Tab bar + tab content                            */}
      {/* ============================================================ */}

      {/* Tab bar */}
      <div
        style={{
          background: '#0a0a0a',
          borderBottom: '1px solid rgba(255,255,255,.08)',
          padding: '0 44px',
          display: 'flex',
          gap: 0,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '16px 28px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color:
                activeTab === t.id ? '#fff' : 'rgba(255,255,255,.3)',
              borderBottom:
                activeTab === t.id
                  ? '2px solid #F9423A'
                  : '2px solid transparent',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ---- Specifications tab ---- */}
      {activeTab === 'specs' && (
        <div
          style={{
            background: '#0a0a0a',
            padding: '36px 44px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 44,
          }}
        >
          {/* Left — spec bars */}
          <div>
            {specs.map((s, i) => (
              <div key={s.label} style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,.5)',
                    marginBottom: 8,
                    display: 'block',
                  }}
                >
                  {s.label}
                </span>
                <div
                  style={{
                    height: 2,
                    background: 'rgba(255,255,255,.07)',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background:
                        'linear-gradient(90deg, #F9423A, #F68B33)',
                      borderRadius: 1,
                      transition: 'width 1.4s ease',
                      width: `${barWidths[i]}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right — context */}
          <div>
            <span
              style={{
                fontSize: 8,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,.3)',
                marginBottom: 12,
                display: 'block',
              }}
            >
              Why These Numbers Matter
            </span>
            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,.4)',
                lineHeight: 1.8,
              }}
            >
              Hermle machining centers are engineered from the ground up for
              thermally stable, vibration-free cutting at the tightest
              tolerances. The mineral-cast bed absorbs vibration ten times
              better than cast iron, the gantry design ensures symmetric force
              distribution, and every spindle is balanced to sub-micron
              precision. These specifications translate directly into superior
              surface finishes, longer tool life, and the ability to hold
              tolerances that other machines simply cannot achieve over
              sustained production runs.
            </p>
            <button
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,.15)',
                color: '#fff',
                padding: '12px 24px',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginTop: 20,
              }}
            >
              Download Full Specs &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ---- About Hermle tab ---- */}
      {activeTab === 'about' && (
        <div
          style={{
            background: '#0a0a0a',
            padding: '36px 44px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 44,
          }}
        >
          {/* Left */}
          <div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#F68B33',
                marginBottom: 12,
                display: 'block',
              }}
            >
              Founded 1938 &middot; Gosheim, Germany
            </span>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 32,
                textTransform: 'uppercase',
                color: '#fff',
                lineHeight: 0.95,
                marginBottom: 16,
              }}
            >
              The Gold Standard in 5-Axis Machining
            </h2>
            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,.4)',
                lineHeight: 1.8,
              }}
            >
              For over eight decades, Hermle has remained a family-owned
              company focused exclusively on high-precision 5-axis machining
              centers. Every machine is designed and manufactured entirely
              in-house at their Gosheim campus in Germany&rsquo;s Swabian Alps,
              where over 1,200 employees uphold an uncompromising commitment to
              quality. From the mineral-cast machine bed to the final spindle
              calibration, Hermle controls every step of the process, ensuring
              the kind of consistency and reliability that has made them the
              first choice for aerospace, medical, and precision mould
              manufacturers worldwide.
            </p>
            <button
              style={{
                background: '#fff',
                color: '#000',
                border: 'none',
                padding: '12px 28px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginTop: 20,
              }}
            >
              Visit Hermle
            </button>
          </div>

          {/* Right — 2x2 tiles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            {aboutTiles.map((t) => (
              <div
                key={t.label}
                style={{
                  background: 'rgba(255,255,255,.04)',
                  padding: 20,
                  borderTop: '2px solid #F9423A',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 28,
                    color: '#fff',
                    display: 'block',
                  }}
                >
                  {t.value}
                </span>
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'rgba(255,255,255,.3)',
                    marginTop: 4,
                    display: 'block',
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---- Case Studies tab ---- */}
      {activeTab === 'cases' && (
        <div style={{ background: '#0a0a0a', padding: '36px 44px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}
          >
            {caseStudies.map((c) => (
              <div
                key={c.tag}
                style={{
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid rgba(255,255,255,.06)',
                  borderRadius: 6,
                  padding: 24,
                }}
              >
                <span
                  style={{
                    fontSize: 8,
                    color: '#F9423A',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {c.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 18,
                    color: '#fff',
                    margin: '8px 0',
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,.35)',
                    lineHeight: 1.6,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
