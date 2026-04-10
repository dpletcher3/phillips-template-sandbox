'use client'

import StrongLiteNav from '@/components/strong-lite/StrongLiteNav'

const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'
const RED = '#F9423A'
const CYAN = '#00D4FF'

const Z_BG = '#09090B'
const Z_DIM = 'rgba(255,255,255,0.45)'
const Z_BRIGHT = 'rgba(255,255,255,0.95)'

const L_BG      = '#FFFFFF'
const L_ALT     = '#F2F4F6'
const L_SURFACE = '#FFFFFF'
const L_CARD    = '#F7F8FA'
const L_BORDER  = 'rgba(13,13,14,0.08)'
const L_DIM     = 'rgba(13,13,14,0.45)'
const L_MID     = 'rgba(13,13,14,0.65)'
const L_INK     = '#0D0D0E'

const TEMPLATES = [
  { name: 'Brand',        href: '/strong-lite/brand/haas',                   desc: 'Dark hero · light body · spec cards · gallery',           type: 'doc' },
  { name: 'Solution',     href: '/strong-lite/solution/5-axis-machining',    desc: 'Dark hero · light industry grid · OPTO section',          type: 'doc' },
  { name: 'Product Line', href: '/strong-lite/product-line',                 desc: 'Dark hero · light tabs · model cards · travel bars',      type: 'doc' },
  { name: 'Case Study',   href: '/strong-lite/case-study/navair-frc-east',  desc: 'Dark hero · light timeline body',                         type: 'doc' },
  { name: 'Post',         href: '/strong-lite/post/metal-am-naval',         desc: 'Dark hero · light editorial · flip cards',                type: 'doc' },
  { name: 'Guide',        href: '/strong-lite/guide/what-is-a-vmc',         desc: 'Dark hero · light TOC + body',                            type: 'doc' },
  { name: 'Catalog',      href: '/strong-lite/catalog',                     desc: 'Dark hero · light course cards · filter tabs',             type: 'doc' },
  { name: 'Course',       href: '/strong-lite/course/advanced-lathe-service',desc: 'Dark hero · light module grid',                           type: 'doc' },
  { name: 'Class Event',  href: '/strong-lite/class-event',                 desc: 'Dark header · light schedule calendar',                   type: 'doc' },
  { name: 'Team Member',  href: '/strong-lite/team-member/alan-phillips',   desc: 'Dark panel · light bio',                                  type: 'doc' },
  { name: 'Location',     href: '/strong-lite/location/charlotte-nc',       desc: 'Dark split hero · light services',                        type: 'doc' },
  { name: 'Persona',      href: '/strong-lite/persona/manufacturer',        desc: 'Dark left split · light filter tabs',                     type: 'singleton' },
]

export default function StrongLiteIndex() {
  return (
    <div style={{ minHeight: '100vh', background: L_BG, color: L_INK }}>
      <StrongLiteNav />

      {/* ═══ DARK HERO HEADER (stays dark) ═══ */}
      <div style={{ background: Z_BG, padding: '64px 48px 56px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: RED }} />
            <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase' as const, color: RED }}>
              Strong-Lite Template System
            </span>
          </div>

          <h1 style={{
            fontFamily: INTER,
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 0.95,
            letterSpacing: '-2px',
            color: Z_BRIGHT,
            margin: '0 0 16px',
          }}>
            All Templates
          </h1>

          <p style={{ fontFamily: MONO, fontSize: '12px', color: Z_DIM, letterSpacing: '1px', margin: 0 }}>
            12 page types · Light-mode body with dark heroes · JetBrains Mono + Inter
          </p>
        </div>
      </div>

      {/* ═══ TEMPLATE GRID (light body) ═══ */}
      <div style={{ padding: '48px 48px 80px', background: L_ALT }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {TEMPLATES.map((t, i) => (
            <a
              key={t.name}
              href={t.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: L_SURFACE,
                border: `1px solid ${L_BORDER}`,
                borderTop: `2px solid ${RED}`,
                padding: '24px',
                textDecoration: 'none',
                color: L_INK,
                minHeight: '170px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = CYAN
                e.currentTarget.style.background = L_CARD
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = RED
                e.currentTarget.style.background = L_SURFACE
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: MONO, fontSize: '9px', fontWeight: 500, color: L_DIM, letterSpacing: '1px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: MONO, fontSize: '8px', fontWeight: 700, letterSpacing: '2px',
                    textTransform: 'uppercase' as const,
                    color: t.type === 'singleton' ? CYAN : L_DIM,
                  }}>
                    {t.type}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: INTER,
                  fontSize: '20px',
                  fontWeight: 800,
                  margin: '0 0 8px',
                  color: L_INK,
                }}>
                  {t.name}
                </h2>

                <p style={{ fontFamily: MONO, fontSize: '11px', color: L_MID, lineHeight: 1.5, margin: 0 }}>
                  {t.desc}
                </p>
              </div>

              <div style={{ marginTop: '16px' }}>
                <span style={{
                  fontFamily: MONO, fontSize: '9px', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase' as const, color: RED,
                }}>
                  View Template →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div style={{
        borderTop: `1px solid ${L_BORDER}`,
        padding: '32px 48px',
        textAlign: 'center' as const,
        background: L_BG,
      }}>
        <a href="/" style={{
          fontFamily: MONO, fontSize: '10px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase' as const,
          color: L_DIM, textDecoration: 'none',
        }}>
          ← Back to Sandbox Index
        </a>
      </div>
    </div>
  )
}
