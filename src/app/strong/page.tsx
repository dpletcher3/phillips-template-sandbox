'use client'

import StrongNav from '@/components/strong/StrongNav'

const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'
const INTER = 'var(--font-inter, Inter), sans-serif'
const RED = '#F9423A'
const CYAN = '#00D4FF'
const Z_BG = '#09090B'
const Z_SURFACE = '#111113'
const Z_CARD = '#18181B'
const Z_BORDER = 'rgba(255,255,255,0.07)'
const Z_DIM = 'rgba(255,255,255,0.45)'
const Z_MID = 'rgba(255,255,255,0.70)'
const Z_BRIGHT = 'rgba(255,255,255,0.95)'

const TEMPLATES = [
  { name: 'Brand',        href: '/strong/brand/haas',                   desc: 'Full dark · HUD hero · spec cards · gallery',             type: 'doc' },
  { name: 'Solution',     href: '/strong/solution/5-axis-machining',    desc: 'Full dark · industry grid · OPTO section',                type: 'doc' },
  { name: 'Product Line', href: '/strong/product-line',                 desc: 'Full dark · 4-panel tabs · model cards · travel bars',    type: 'doc' },
  { name: 'Case Study',   href: '/strong/case-study/navair-frc-east',  desc: 'Dark hero · light timeline body',                         type: 'doc' },
  { name: 'Post',         href: '/strong/post/metal-am-naval',         desc: 'Dark hero · light editorial · flip cards',                type: 'doc' },
  { name: 'Guide',        href: '/strong/guide/what-is-a-vmc',         desc: 'Dark hero · light TOC + body',                            type: 'doc' },
  { name: 'Catalog',      href: '/strong/catalog',                     desc: 'Full dark · 12 course cards · filter tabs',               type: 'doc' },
  { name: 'Course',       href: '/strong/course/advanced-lathe-service',desc: 'Dark hero · light module grid',                           type: 'doc' },
  { name: 'Class Event',  href: '/strong/class-event',                 desc: 'Dark header · light schedule calendar',                   type: 'doc' },
  { name: 'Team Member',  href: '/strong/team-member/alan-phillips',   desc: 'Dark panel · light bio',                                  type: 'doc' },
  { name: 'Location',     href: '/strong/location/charlotte-nc',       desc: 'Dark split hero · light services',                        type: 'doc' },
  { name: 'Persona',      href: '/strong/persona/manufacturer',        desc: 'Dark left split · light filter tabs',                     type: 'singleton' },
]

export default function StrongIndex() {
  return (
    <div style={{ minHeight: '100vh', background: Z_BG, color: Z_BRIGHT }}>
      <StrongNav />

      {/* Header */}
      <div style={{ padding: '64px 48px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: RED }} />
            <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase' as const, color: RED }}>
              Strong Template System
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

          <p style={{ fontFamily: MONO, fontSize: '12px', color: Z_DIM, letterSpacing: '1px', margin: '0 0 48px' }}>
            12 page types · Full-dark HUD design system · JetBrains Mono + Inter
          </p>
        </div>
      </div>

      {/* Template Grid */}
      <div style={{ padding: '0 48px 80px' }}>
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
                background: Z_SURFACE,
                border: `1px solid ${Z_BORDER}`,
                borderTop: `2px solid ${RED}`,
                padding: '24px',
                textDecoration: 'none',
                color: Z_BRIGHT,
                minHeight: '170px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = CYAN
                e.currentTarget.style.background = Z_CARD
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = RED
                e.currentTarget.style.background = Z_SURFACE
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: MONO, fontSize: '9px', fontWeight: 500, color: Z_DIM, letterSpacing: '1px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: MONO, fontSize: '8px', fontWeight: 700, letterSpacing: '2px',
                    textTransform: 'uppercase' as const,
                    color: t.type === 'singleton' ? CYAN : Z_DIM,
                  }}>
                    {t.type}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: INTER,
                  fontSize: '20px',
                  fontWeight: 800,
                  margin: '0 0 8px',
                  color: Z_BRIGHT,
                }}>
                  {t.name}
                </h2>

                <p style={{ fontFamily: MONO, fontSize: '11px', color: Z_MID, lineHeight: 1.5, margin: 0 }}>
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

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${Z_BORDER}`,
        padding: '32px 48px',
        textAlign: 'center' as const,
      }}>
        <a href="/" style={{
          fontFamily: MONO, fontSize: '10px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase' as const,
          color: Z_DIM, textDecoration: 'none',
        }}>
          ← Back to Sandbox Index
        </a>
      </div>
    </div>
  )
}
