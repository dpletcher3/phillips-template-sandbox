'use client'

import { useState } from 'react'

const EC_TEMPLATES = [
  { name: 'Brand',          href: '/ec/brand/haas',                        desc: 'Brand detail page — hero, tagline, product lines, CTA',      theme: 'Dark Immersive' },
  { name: 'Solution',       href: '/ec/solution/5-axis-machining',         desc: 'Solution overview — offering category, related brands',       theme: 'White Industrial' },
  { name: 'Product Lines',  href: '/ec/product-lines',                     desc: 'Product line specs grid — series, models, key specs',         theme: 'Dark Editorial' },
  { name: 'Case Study',     href: '/ec/case-study/navair-cycle-time',      desc: 'Customer success story — results metrics, body, brands',      theme: 'Editorial Paper' },
  { name: 'Blog Post',      href: '/ec/post/metal-am-naval',               desc: 'Blog / news article — author, date, categories, body',       theme: 'White Editorial' },
  { name: 'Guide',          href: '/ec/guide/what-is-a-vmc',               desc: 'Educational guide — topic, intro, rich body content',         theme: 'Dark Technical' },
  { name: 'Webinar',        href: '/ec/webinar/metal-am-defense',          desc: 'Webinar page — upcoming / on-demand, registration link',     theme: 'Event Poster' },
  { name: 'Course',         href: '/ec/course/5-axis-programming',         desc: 'Training course — track, audience, duration, brands',         theme: 'Light Clean' },
  { name: 'Class Calendar', href: '/ec/class-calendar',                    desc: 'Scheduled class events — dates, seats, registration',         theme: 'Dark Board' },
  { name: 'Team Member',    href: '/ec/team-member/alan-phillips',         desc: 'Staff / leadership profile — photo, bio, LinkedIn',           theme: 'Magazine Profile' },
  { name: 'Location',       href: '/ec/location/charlotte-nc',             desc: 'Office / facility page — region, address, services',          theme: 'Red Cinematic' },
]

const APPEALING_TEMPLATES = [
  { name: 'Brand',          href: '/appealing/brand/haas',                    desc: 'Brand detail page — hero, tagline, product lines, CTA',      theme: 'Viewer + Cards' },
  { name: 'Solution',       href: '/appealing/solution/5-axis-machining',     desc: 'Solution overview — offering category, related brands',       theme: 'Spec + Bars' },
  { name: 'Product Lines',  href: '/appealing/product-lines',                 desc: 'Product line specs grid — series, models, key specs',         theme: 'Compare' },
  { name: 'Case Study',     href: '/appealing/case-study/navair-cycle-time',  desc: 'Customer success story — results metrics, body, brands',      theme: 'Timeline' },
  { name: 'Blog Post',      href: '/appealing/post/metal-am-naval',           desc: 'Blog / news article — author, date, categories, body',       theme: 'Flip-Cards' },
  { name: 'Guide',          href: '/appealing/guide/what-is-a-vmc',           desc: 'Educational guide — topic, intro, rich body content',         theme: 'Progress' },
  { name: 'Webinar',        href: '/appealing/webinar/metal-am-defense',      desc: 'Webinar page — upcoming / on-demand, registration link',     theme: 'Countdown' },
  { name: 'Course',         href: '/appealing/course/5-axis-programming',     desc: 'Training course — track, audience, duration, brands',         theme: 'Module-Sel' },
  { name: 'Class Calendar', href: '/appealing/class-calendar',                desc: 'Scheduled class events — dates, seats, registration',         theme: 'Pulsing' },
  { name: 'Team Member',    href: '/appealing/team-member/alan-phillips',     desc: 'Staff / leadership profile — photo, bio, LinkedIn',           theme: 'Gradient' },
  { name: 'Location',       href: '/appealing/location/charlotte-nc',         desc: 'Office / facility page — region, address, services',          theme: 'Img-Reveal' },
]

const SIMPLE_TEMPLATES = [
  { name: 'Brand',          href: '/simple/brand/haas',                    desc: 'Brand detail page — hero, tagline, product lines, CTA',      theme: 'Product Detail' },
  { name: 'Solution',       href: '/simple/solution/5-axis-machining',     desc: 'Solution overview — offering category, related brands',       theme: 'Side Nav' },
  { name: 'Product Lines',  href: '/simple/product-lines',                 desc: 'Product line specs grid — series, models, key specs',         theme: 'Editorial Scroll' },
  { name: 'Case Study',     href: '/simple/case-study/navair-cycle-time',  desc: 'Customer success story — results metrics, body, brands',      theme: 'Story-Led' },
  { name: 'Blog Post',      href: '/simple/post/metal-am-naval',           desc: 'Blog / news article — author, date, categories, body',       theme: 'Magazine' },
  { name: 'Guide',          href: '/simple/guide/what-is-a-vmc',           desc: 'Educational guide — topic, intro, rich body content',         theme: 'Reference Doc' },
  { name: 'Webinar',        href: '/simple/webinar/metal-am-defense',      desc: 'Webinar page — upcoming / on-demand, registration link',     theme: 'Event Reg' },
  { name: 'Course',         href: '/simple/course/5-axis-programming',     desc: 'Training course — track, audience, duration, brands',         theme: 'Catalog' },
  { name: 'Class Calendar', href: '/simple/class-calendar',                desc: 'Scheduled class events — dates, seats, registration',         theme: 'Schedule Table' },
  { name: 'Team Member',    href: '/simple/team-member/alan-phillips',     desc: 'Staff / leadership profile — photo, bio, LinkedIn',           theme: 'Profile' },
  { name: 'Location',       href: '/simple/location/charlotte-nc',         desc: 'Office / facility page — region, address, services',          theme: 'Regional' },
]

const STRONG_TEMPLATES = [
  { name: 'Brand',          href: '/strong/brand/haas',                     desc: 'Full dark · HUD hero · spec cards · gallery',               theme: 'HUD Dark' },
  { name: 'Solution',       href: '/strong/solution/5-axis-machining',      desc: 'Full dark · industry grid · OPTO section',                  theme: 'Industry Grid' },
  { name: 'Product Line',   href: '/strong/product-line',                   desc: 'Full dark · 4-panel tabs · model cards · travel bars',      theme: 'Tabbed Panels' },
  { name: 'Case Study',     href: '/strong/case-study/navair-frc-east',    desc: 'Dark hero · light timeline body',                            theme: 'Timeline' },
  { name: 'Blog Post',      href: '/strong/post/metal-am-naval',           desc: 'Dark hero · light editorial · flip cards',                   theme: 'Drop-Cap' },
  { name: 'Guide',          href: '/strong/guide/what-is-a-vmc',           desc: 'Dark hero · light TOC + body',                               theme: 'TOC Sidebar' },
  { name: 'Catalog',        href: '/strong/catalog',                        desc: 'Full dark · 12 course cards · filter tabs',                  theme: 'Card Grid' },
  { name: 'Course',         href: '/strong/course/advanced-lathe-service',  desc: 'Dark hero · light module grid',                              theme: 'Module Select' },
  { name: 'Class Event',    href: '/strong/class-event',                    desc: 'Dark header · light schedule calendar',                      theme: 'Calendar Table' },
  { name: 'Team Member',    href: '/strong/team-member/alan-phillips',      desc: 'Dark panel · light bio',                                     theme: 'Portrait Split' },
  { name: 'Location',       href: '/strong/location/charlotte-nc',          desc: 'Dark split hero · light services',                           theme: 'Split Hero' },
  { name: 'Persona',        href: '/strong/persona/manufacturer',           desc: 'Dark left split · light filter tabs',                        theme: 'Filter Tabs' },
]

const RED = '#F9423A'
const MAROON = '#3F0017'
const STRONG_BG = '#09090B'

const TAB_CONFIG = {
  ec:        { label: 'EYE CATCHING', underline: RED,       badge: RED,       themeColor: RED,                    hoverBorder: 'rgba(249,66,58,.35)' },
  appealing: { label: 'APPEALING',    underline: MAROON,    badge: MAROON,    themeColor: MAROON,                 hoverBorder: 'rgba(63,0,23,.5)' },
  simple:    { label: 'SIMPLE',       underline: '#fff',    badge: '#000',    themeColor: 'rgba(255,255,255,.5)', hoverBorder: 'rgba(255,255,255,.2)' },
  strong:    { label: 'STRONG',       underline: STRONG_BG, badge: STRONG_BG, themeColor: '#00D4FF',              hoverBorder: 'rgba(0,212,255,.3)' },
} as const

type TabKey = keyof typeof TAB_CONFIG

const TEMPLATE_MAP: Record<TabKey, typeof EC_TEMPLATES> = {
  ec: EC_TEMPLATES,
  appealing: APPEALING_TEMPLATES,
  simple: SIMPLE_TEMPLATES,
  strong: STRONG_TEMPLATES,
}

export default function SandboxIndex() {
  const [activeTab, setActiveTab] = useState<TabKey>('ec')
  const templates = TEMPLATE_MAP[activeTab]
  const config = TAB_CONFIG[activeTab]

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Header ── */}
      <header style={{ padding: '48px 60px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '52px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', margin: 0, lineHeight: 1.05 }}>
            <span style={{ color: RED }}>Phillips</span>
            <span style={{ color: 'rgba(255,255,255,.2)', margin: '0 14px' }}>/</span>
            <span>Template Sandbox</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '14px', fontWeight: 400, margin: '10px 0 0', letterSpacing: '1px' }}>
            Next.js 14 + Sanity CMS — Design system reference
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <span style={{
              fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: '3px', background: RED, color: '#fff',
              fontFamily: '"Barlow Condensed", sans-serif',
            }}>
              EyeCatching
            </span>
            <span style={{
              fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: '3px', background: MAROON, color: '#fff',
              fontFamily: '"Barlow Condensed", sans-serif',
            }}>
              Appealing
            </span>
            <span style={{
              fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: '3px', background: '#000', color: '#fff',
              border: '1px solid rgba(255,255,255,.25)',
              fontFamily: '"Barlow Condensed", sans-serif',
            }}>
              Simple
            </span>
            <span style={{
              fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: '3px', background: STRONG_BG, color: '#00D4FF',
              border: '1px solid rgba(0,212,255,.3)',
              fontFamily: '"Barlow Condensed", sans-serif',
            }}>
              Strong
            </span>
          </div>
        </div>
        <a
          href="/studio"
          style={{
            color: 'rgba(255,255,255,.4)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none',
            padding: '8px 16px', border: '1px solid rgba(255,255,255,.1)', borderRadius: '4px',
            marginTop: '8px',
          }}
        >
          Studio →
        </a>
      </header>

      {/* ── Tab Bar ── */}
      <div style={{ padding: '40px 60px 0', display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        {(Object.keys(TAB_CONFIG) as TabKey[]).map(tab => {
          const isActive = activeTab === tab
          const tc = TAB_CONFIG[tab]
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 32px 16px', position: 'relative',
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px',
                fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase',
                color: isActive ? '#fff' : 'rgba(255,255,255,.3)',
                borderBottom: isActive ? `3px solid ${tc.underline}` : '3px solid transparent',
                marginBottom: '-1px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              {tc.label}
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px',
                padding: '2px 8px', borderRadius: '10px',
                background: isActive ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.05)',
                color: isActive ? 'rgba(255,255,255,.6)' : 'rgba(255,255,255,.2)',
              }}>
                {TEMPLATE_MAP[tab].length} templates
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Template Grid ── */}
      <section style={{ padding: '40px 60px 48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {templates.map((t, i) => (
          <a
            key={`${activeTab}-${i}`}
            href={t.href}
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              background: 'rgba(255,255,255,.025)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: '8px',
              padding: '28px 28px 24px',
              textDecoration: 'none', color: '#fff',
              transition: 'border-color .2s, background .2s',
              minHeight: '200px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = config.hoverBorder
              e.currentTarget.style.background = 'rgba(255,255,255,.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)'
              e.currentTarget.style.background = 'rgba(255,255,255,.025)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontSize: '26px',
                  fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', margin: 0,
                }}>
                  {t.name}
                </h2>
                <span style={{
                  fontSize: '8px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '3px 8px', borderRadius: '2px',
                  background: config.badge, color: '#fff',
                  fontFamily: '"Barlow Condensed", sans-serif', lineHeight: 1, whiteSpace: 'nowrap',
                }}>
                  {config.label}
                </span>
              </div>
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: config.themeColor,
                display: 'inline-block', marginBottom: '12px',
              }}>
                {t.theme}
              </span>
              <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '12.5px', lineHeight: '1.7', margin: 0 }}>
                {t.desc}
              </p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <span style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                color: config.themeColor,
              }}>
                View Template →
              </span>
            </div>
          </a>
        ))}
      </section>

      {/* ── Singletons & Shared ── */}
      <section style={{ padding: '0 60px 48px' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '32px' }}>
          <h3 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', fontWeight: 800,
            letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)',
            margin: '0 0 16px',
          }}>
            Singletons & Shared
          </h3>
          <div style={{
            background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.06)',
            borderRadius: '8px', padding: '24px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <h4 style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px',
                fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px',
              }}>
                Persona Page
              </h4>
              <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '12.5px', margin: 0 }}>
                &quot;I&apos;m a...&quot; landing page — persona-driven solutions & brands
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="/ec/persona/manufacturer" style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'none',
                padding: '8px 16px', borderRadius: '4px', background: RED,
              }}>
                EyeCatching →
              </a>
              <a href="/appealing/persona/manufacturer" style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'none',
                padding: '8px 16px', borderRadius: '4px', background: MAROON,
              }}>
                Appealing →
              </a>
              <a href="/simple/persona/manufacturer" style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#fff', textDecoration: 'none',
                padding: '8px 16px', borderRadius: '4px', background: '#000',
                border: '1px solid rgba(255,255,255,.25)',
              }}>
                Simple →
              </a>
              <a href="/strong/persona/manufacturer" style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#00D4FF', textDecoration: 'none',
                padding: '8px 16px', borderRadius: '4px', background: STRONG_BG,
                border: '1px solid rgba(0,212,255,.3)',
              }}>
                Strong →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Compare Section ── */}
      <section style={{ padding: '0 60px 48px' }}>
        <div style={{
          background: 'rgba(249,66,58,.06)', border: '1px solid rgba(249,66,58,.15)',
          borderRadius: '8px', padding: '28px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800,
              letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px',
            }}>
              Compare Side by Side
            </h3>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '12.5px', margin: 0, maxWidth: '640px' }}>
              Open <code style={{ color: RED, fontSize: '11px' }}>/ec/brand/haas</code>,{' '}
              <code style={{ color: '#c77', fontSize: '11px' }}>/appealing/brand/haas</code>,{' '}
              <code style={{ color: 'rgba(255,255,255,.6)', fontSize: '11px' }}>/simple/brand/haas</code>, and{' '}
              <code style={{ color: '#00D4FF', fontSize: '11px' }}>/strong/brand/haas</code> in
              separate tabs to compare the same Sanity content across all four design variants.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <a href="/ec/brand/haas" target="_blank" rel="noopener noreferrer" style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
              color: '#fff', textDecoration: 'none', padding: '10px 18px', borderRadius: '4px', background: RED,
            }}>
              EyeCatching
            </a>
            <a href="/appealing/brand/haas" target="_blank" rel="noopener noreferrer" style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
              color: '#fff', textDecoration: 'none', padding: '10px 18px', borderRadius: '4px', background: MAROON,
            }}>
              Appealing
            </a>
            <a href="/simple/brand/haas" target="_blank" rel="noopener noreferrer" style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
              color: '#fff', textDecoration: 'none', padding: '10px 18px', borderRadius: '4px',
              background: '#000', border: '1px solid rgba(255,255,255,.25)',
            }}>
              Simple
            </a>
            <a href="/strong/brand/haas" target="_blank" rel="noopener noreferrer" style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
              color: '#00D4FF', textDecoration: 'none', padding: '10px 18px', borderRadius: '4px',
              background: STRONG_BG, border: '1px solid rgba(0,212,255,.3)',
            }}>
              Strong
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '0 60px 60px' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a
            href="/studio"
            style={{
              color: RED, fontSize: '12px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
            }}
          >
            Edit content in Sanity Studio →
          </a>
          <p style={{ color: 'rgba(255,255,255,.25)', fontSize: '11px', margin: 0, textAlign: 'right', maxWidth: '420px' }}>
            All templates share the same Sanity dataset. Changes in Studio appear on EyeCatching, Appealing, Simple, and Strong simultaneously.
          </p>
        </div>
      </footer>
    </main>
  )
}
