'use client'

const templates = [
  { name: 'Brand',          href: '/brand/hermle',                   desc: 'Brand detail page — hero, tagline, product lines, CTA',           badge: 'Dark',  color: '#F9423A' },
  { name: 'Solution',       href: '/solution/5-axis-machining-centers', desc: 'Solution overview — offering category, related brands',            badge: 'Dark',  color: '#F9423A' },
  { name: 'Product Lines',  href: '/product-lines/haas',                     desc: 'Product line specs grid — series, models, key specs',              badge: 'White', color: '#00AEEF' },
  { name: 'Case Study',     href: '/case-study/navair-frc-east',             desc: 'Customer success story — results metrics, body, brands',           badge: 'Paper', color: '#F68B33' },
  { name: 'Post',           href: '/post/5-axis-no-longer-optional',         desc: 'Blog / news article — author, date, categories, body',            badge: 'Paper', color: '#F68B33' },
  { name: 'Guide',          href: '/guide/5-axis-cnc-machining',             desc: 'Educational guide — topic, intro, rich body content',              badge: 'Paper', color: '#F68B33' },
  { name: 'Webinar',        href: '/webinar/5-axis-automation-lights-out',   desc: 'Webinar page — upcoming / on-demand, registration link',           badge: 'Dark',  color: '#F9423A' },
  { name: 'Course',         href: '/course/5-axis-programming-setup',        desc: 'Training course — track, audience, duration, brands',              badge: 'White', color: '#00AEEF' },
  { name: 'Class Calendar', href: '/class-calendar',                         desc: 'Scheduled class events — dates, seats, registration',              badge: 'White', color: '#00AEEF' },
  { name: 'Team Member',    href: '/team-member/dan-pletcher',               desc: 'Staff / leadership profile — photo, bio, LinkedIn',                badge: 'Dark',  color: '#F9423A' },
  { name: 'Location',       href: '/location/hanover-md',                    desc: 'Office / facility page — region, address, services',               badge: 'White', color: '#00AEEF' },
  { name: 'Persona',        href: '/persona/manufacturer',           desc: '"I\'m a…" landing page — persona-driven solutions & brands',       badge: 'Dark',  color: '#F9423A' },
]

export default function SandboxIndex() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Header */}
      <header style={{ padding: '60px 60px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
            <span style={{ color: '#F9423A' }}>Phillips</span>
            <span style={{ color: 'rgba(255,255,255,.25)', margin: '0 12px' }}>/</span>
            <span>Template Sandbox</span>
          </h1>
        </div>
        <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '14px', fontWeight: 400, margin: '4px 0 0', letterSpacing: '1px' }}>
          Next.js 14 + Sanity CMS — Design system reference
        </p>
        <div style={{ height: '1px', background: 'rgba(255,255,255,.08)', margin: '40px 0 0' }} />
      </header>

      {/* Template Grid */}
      <section style={{ padding: '40px 60px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {templates.map((t) => (
          <a
            key={t.href}
            href={t.href}
            style={{
              display: 'block',
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: '8px',
              padding: '32px',
              textDecoration: 'none',
              color: '#fff',
              transition: 'border-color .2s, background .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249,66,58,.3)'
              e.currentTarget.style.background = 'rgba(255,255,255,.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)'
              e.currentTarget.style.background = 'rgba(255,255,255,.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                {t.name}
              </h2>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '4px',
                background: t.color + '18',
                color: t.color,
              }}>
                {t.badge}
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              {t.desc}
            </p>
          </a>
        ))}
      </section>

      {/* Studio Link */}
      <footer style={{ padding: '0 60px 60px' }}>
        <div style={{ height: '1px', background: 'rgba(255,255,255,.08)', marginBottom: '32px' }} />
        <a
          href="/studio"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#F9423A',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Open Sanity Studio →
        </a>
      </footer>
    </main>
  )
}
