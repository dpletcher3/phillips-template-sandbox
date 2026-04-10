'use client'

import { useState } from 'react'
import Image from 'next/image'
import StrongLiteNav from '@/components/strong-lite/StrongLiteNav'
import FinalCTA from '@/components/strong-lite/FinalCTA'

/* ── Design Tokens ─────────────────────────────────── */
const RED       = '#F9423A'

const Z_BG      = '#09090B'
const Z_DIM     = 'rgba(255,255,255,0.45)'
const Z_MID     = 'rgba(255,255,255,0.70)'

const L_BG      = '#FFFFFF'
const L_BORDER  = 'rgba(13,13,14,0.08)'
const L_INK     = '#0D0D0E'
const L_MID     = 'rgba(13,13,14,0.65)'
const L_DIM     = 'rgba(13,13,14,0.45)'

const MONO  = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'

/* ── Persona Image Map ─────────────────────────────── */
const PERSONA_BG: Record<string, string> = {
  manufacturer: '/images/persona/haas-cnc-mill-cutting-action.jpg',
  federal:      '/images/persona/phillips-umc1000-laser-additive-closeup.jpg',
  educator:     '/images/persona/phillips-training-education-banner.jpg',
}

/* ── Solution Card Images ─────────────────────────── */
const SOLUTION_IMAGES: Record<string, string> = {
  '// CNC':  '/images/persona/haas-umc750-5axis-mill.png',
  '// AM':   '/images/persona/haas-umc1000ss-phillips-additive-hybrid.png',
  '// Auto': '/images/persona/haas-vf4ss-fanuc-robot-automation.png',
  '// Svc':  '/images/persona/haas-cnc-lathe-turning-center.png',
}

/* ── Tab Types ─────────────────────────────────────── */
type Pane = 'overview' | 'solutions' | 'brands' | 'federal'

const TABS: { key: Pane; label: string }[] = [
  { key: 'overview',  label: 'Overview' },
  { key: 'solutions', label: 'Solutions' },
  { key: 'brands',    label: 'Brands' },
  { key: 'federal',   label: 'Federal' },
]

/* ── Solution Grid Data ────────────────────────────── */
const SOLUTION_CARDS = [
  { prefix: '// CNC',  title: '5-Axis Centers' },
  { prefix: '// AM',   title: 'Metal AM' },
  { prefix: '// Auto', title: 'Automated Cells' },
  { prefix: '// Svc',  title: 'Solution Design' },
]

/* ── Page Component ────────────────────────────────── */
export default function PersonaLitePage() {
  const [activePane, setActivePane] = useState<Pane>('overview')

  /* Slug-based BG — default to manufacturer */
  const bgImage = PERSONA_BG['manufacturer'] ?? '/images/persona/haas-cnc-mill-cutting-action.jpg'

  return (
    <div style={{ background: L_BG, minHeight: '100vh' }}>
      {/* ═══ 1. NAV ═══ */}
      <StrongLiteNav />

      {/* ═══ 2. FULL-HEIGHT SPLIT ═══ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '42% 58%',
        minHeight: 'calc(100vh - 58px)',
      }}>
        {/* ─── LEFT PANEL (stays dark) ─── */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: Z_BG,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '48px 40px',
        }}>
          {/* Background image */}
          <Image
            src={bgImage}
            alt=""
            fill
            style={{ objectFit: 'cover', opacity: 0.14 }}
          />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #09090B 0%, rgba(9,9,11,.8) 55%, rgba(63,0,23,.85) 100%)',
            zIndex: 1,
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              fontFamily: MONO,
              fontSize: '9px',
              color: Z_DIM,
              letterSpacing: '2px',
              marginBottom: '16px',
            }}>
              {'// Built For You'}
            </div>

            <h1 style={{
              fontFamily: INTER,
              fontWeight: 900,
              fontSize: '54px',
              lineHeight: 1.05,
              letterSpacing: '-1px',
              color: 'rgba(255,255,255,0.95)',
              margin: '0 0 20px',
            }}>
              You&apos;re a<br />
              <span style={{
                color: RED,
                textTransform: 'uppercase' as const,
              }}>
                Manufacturer.
              </span>
            </h1>

            <p style={{
              fontFamily: INTER,
              fontSize: '14px',
              lineHeight: 1.7,
              color: Z_MID,
              maxWidth: '320px',
              margin: '0 0 28px',
            }}>
              We understand your challenges. From high-mix job shops to dedicated production
              cells, Phillips has the machines, training, and support you need.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                background: RED,
                color: '#fff',
                border: 'none',
                padding: '10px 22px',
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}>
                Browse Solutions
              </button>
              <button style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(255,255,255,.3)',
                padding: '10px 22px',
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
              }}>
                View Brands
              </button>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL (light) ─── */}
        <div style={{
          background: L_BG,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: `1px solid ${L_BORDER}`,
        }}>
          {/* Tab Bar — light sticky */}
          <div style={{
            position: 'sticky',
            top: 58,
            zIndex: 10,
            background: 'rgba(255,255,255,.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${L_BORDER}`,
            padding: '0 26px',
            display: 'flex',
            flexDirection: 'row',
            gap: '0',
          }}>
            {TABS.map((tab) => {
              const isActive = activePane === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActivePane(tab.key)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `2px solid ${isActive ? RED : 'transparent'}`,
                    padding: '14px 18px',
                    fontFamily: MONO,
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 600,
                    letterSpacing: '1px',
                    color: isActive ? RED : L_DIM,
                    cursor: 'pointer',
                    textTransform: 'uppercase' as const,
                    transition: 'all .2s ease',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div style={{
            flex: 1,
            padding: '22px 26px',
            overflowY: 'auto' as const,
          }}>
            {/* ── OVERVIEW ── */}
            {activePane === 'overview' && (
              <div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  color: L_DIM,
                  letterSpacing: '2px',
                  marginBottom: '20px',
                }}>
                  {'// At a Glance'}
                </div>

                {/* 3-stat grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '28px',
                }}>
                  {[
                    { value: '50+', label: 'Brands' },
                    { value: '30+', label: 'Years' },
                    { value: '200+', label: 'Engineers' },
                  ].map((stat) => (
                    <div key={stat.label} style={{
                      textAlign: 'center' as const,
                      padding: '16px 0',
                      border: `1px solid ${L_BORDER}`,
                      background: L_BG,
                    }}>
                      <div style={{
                        fontFamily: INTER,
                        fontSize: '24px',
                        fontWeight: 700,
                        color: RED,
                        lineHeight: 1,
                        marginBottom: '4px',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontFamily: MONO,
                        fontSize: '10px',
                        color: L_DIM,
                        letterSpacing: '1px',
                        textTransform: 'uppercase' as const,
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2x2 solution grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}>
                  {SOLUTION_CARDS.map((card) => (
                    <div key={card.prefix} style={{
                      position: 'relative',
                      height: '180px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}>
                      <Image
                        src={SOLUTION_IMAGES[card.prefix]}
                        alt={card.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,.75) 100%)',
                      }} />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '16px',
                        zIndex: 1,
                      }}>
                        <div style={{
                          fontFamily: MONO,
                          fontSize: '10px',
                          color: 'rgba(255,255,255,.6)',
                          letterSpacing: '1px',
                          marginBottom: '4px',
                        }}>
                          {card.prefix}
                        </div>
                        <div style={{
                          fontFamily: INTER,
                          fontSize: '15px',
                          fontWeight: 700,
                          color: '#fff',
                        }}>
                          {card.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SOLUTIONS ── */}
            {activePane === 'solutions' && (
              <div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  color: L_DIM,
                  letterSpacing: '2px',
                  marginBottom: '16px',
                }}>
                  {'// Solutions for Manufacturers'}
                </div>

                <h2 style={{
                  fontFamily: INTER,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: L_INK,
                  margin: '0 0 16px',
                }}>
                  Solutions for Manufacturers
                </h2>

                <p style={{
                  fontFamily: INTER,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: L_MID,
                  margin: 0,
                }}>
                  Phillips delivers end-to-end manufacturing solutions designed for high-mix,
                  low-volume job shops and dedicated production environments alike. Our applications
                  engineering team works directly with your team to evaluate your parts, materials,
                  and production goals, then recommends the optimal combination of CNC machining
                  centers, turning centers, automation systems, and additive manufacturing
                  platforms. From initial consultation through installation, training, and ongoing
                  support, we are your single-source manufacturing technology partner.
                </p>
              </div>
            )}

            {/* ── BRANDS ── */}
            {activePane === 'brands' && (
              <div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  color: L_DIM,
                  letterSpacing: '2px',
                  marginBottom: '16px',
                }}>
                  {'// Top Brands'}
                </div>

                <h2 style={{
                  fontFamily: INTER,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: L_INK,
                  margin: '0 0 16px',
                }}>
                  Top Brands
                </h2>

                <p style={{
                  fontFamily: INTER,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: L_MID,
                  margin: 0,
                }}>
                  Phillips represents over 50 of the world&apos;s leading machine tool and
                  manufacturing technology brands. Our portfolio includes Haas Automation for
                  vertical and horizontal machining centers, Hermle for high-precision 5-axis
                  machining, DMG MORI for advanced turning and milling, EOS and SLM Solutions
                  for metal additive manufacturing, FANUC for robotics and automation, and dozens
                  more. Each brand is backed by Phillips&apos; local applications engineering,
                  service, and training infrastructure across the Mid-Atlantic region.
                </p>
              </div>
            )}

            {/* ── FEDERAL ── */}
            {activePane === 'federal' && (
              <div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  color: L_DIM,
                  letterSpacing: '2px',
                  marginBottom: '16px',
                }}>
                  {'// Federal & Defense'}
                </div>

                <h2 style={{
                  fontFamily: INTER,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: L_INK,
                  margin: '0 0 16px',
                }}>
                  Federal &amp; Defense
                </h2>

                <p style={{
                  fontFamily: INTER,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: L_MID,
                  margin: '0 0 20px',
                }}>
                  Phillips maintains dedicated federal programs supporting the U.S. Department of
                  Defense, Navy, and Air Force manufacturing depots. Our team holds active security
                  clearances and deep domain expertise in depot-level maintenance and repair
                  operations.
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                  {[
                    {
                      tag: 'COE-AMX',
                      desc: 'Center of Excellence for Advanced Manufacturing &mdash; Phillips partners with NAVAIR to deliver advanced 5-axis machining and additive manufacturing capabilities to fleet readiness centers nationwide.',
                    },
                    {
                      tag: 'NNSY',
                      desc: 'Norfolk Naval Shipyard &mdash; Supporting submarine and carrier maintenance with precision machining solutions, custom fixturing, and operator training programs.',
                    },
                    {
                      tag: 'GSA',
                      desc: 'GSA Schedule Contract holder &mdash; Streamlined procurement for federal agencies acquiring CNC machine tools, additive manufacturing systems, and associated services.',
                    },
                  ].map((item) => (
                    <div key={item.tag} style={{
                      border: `1px solid ${L_BORDER}`,
                      padding: '16px',
                      background: L_BG,
                    }}>
                      <div style={{
                        fontFamily: MONO,
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        color: RED,
                        marginBottom: '8px',
                      }}>
                        {item.tag}
                      </div>
                      <p
                        style={{
                          fontFamily: INTER,
                          fontSize: '13px',
                          lineHeight: 1.6,
                          color: L_MID,
                          margin: 0,
                        }}
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══ 3. FINAL CTA (stays dark) ═══ */}
      <FinalCTA
        tag="// Built For You"
        headline="Let us solve your manufacturing challenges."
        accentWord="manufacturing challenges."
        description="Phillips has the machines, training, and support to keep your shop running at peak performance. Talk to our team today."
      />
    </div>
  )
}
