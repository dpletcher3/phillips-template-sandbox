import Link from 'next/link'

const RED = '#F9423A'
const GOLD = '#F68B33'

const pages = [
  { name: 'Brand', href: '/eyecatching-v2/brand', desc: 'Full dark · stage hero · product scroll · tabs', theme: 'Stage Hero' },
  { name: 'Solution', href: '/eyecatching-v2/solution', desc: 'Light bg · giant number · brand matrix · spec bars', theme: 'White Industrial' },
  { name: 'Product Line', href: '/eyecatching-v2/product-line', desc: 'Full dark · comparison table · series sections', theme: 'Dark Compare' },
  { name: 'Case Study', href: '/eyecatching-v2/case-study', desc: 'Newspaper masthead · red kicker · editorial layout', theme: 'Newspaper' },
  { name: 'Blog Post', href: '/eyecatching-v2/post', desc: 'DM Serif Display · cinematic image · drop cap', theme: 'Drop-Cap Serif' },
  { name: 'Guide', href: '/eyecatching-v2/guide', desc: 'Dark technical · red topbar · TOC sidebar · callout', theme: 'Dark Technical' },
  { name: 'Webinar', href: '/eyecatching-v2/webinar', desc: 'Deep space · pulsing rings · registration card', theme: 'Deep Space' },
  { name: 'Course', href: '/eyecatching-v2/course', desc: 'Light bg · maroon topbar · module rows · info card', theme: 'Module Select' },
  { name: 'Class Calendar', href: '/eyecatching-v2/class-calendar', desc: 'Full dark · filter pills · schedule rows · federal', theme: 'Dark Schedule' },
  { name: 'Team Member', href: '/eyecatching-v2/team-member', desc: 'Maroon/portrait split hero · fact sidebar', theme: 'Portrait Split' },
  { name: 'Location', href: '/eyecatching-v2/location', desc: 'Red/image split hero · marquee strip · service grid', theme: 'Red Cinematic' },
  { name: 'Persona', href: '/eyecatching-v2/persona', desc: 'Overlay split · filter tabs · stat grid · brand strip', theme: 'Filter Tabs' },
]

export default function EyeCatchingV2Index() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      <header style={{ padding: '48px 60px 0' }}>
        <Link href="/" style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' as const, textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
          ← Back to Sandbox
        </Link>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '52px', fontWeight: 900, textTransform: 'uppercase' as const, letterSpacing: '3px', margin: 0, lineHeight: 1.05 }}>
          <span style={{ color: RED }}>EyeCatching</span>
          <span style={{ color: 'rgba(255,255,255,.2)', margin: '0 14px' }}>/</span>
          <span>V2</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '14px', fontWeight: 400, margin: '10px 0 0', letterSpacing: '1px' }}>
          Immersive · DM Serif Display · Image-forward — Static pages with Unsplash images
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const, padding: '5px 12px', borderRadius: '3px', background: RED, color: '#fff', fontFamily: '"Barlow Condensed", sans-serif' }}>
            Static
          </span>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const, padding: '5px 12px', borderRadius: '3px', background: GOLD, color: '#fff', fontFamily: '"Barlow Condensed", sans-serif' }}>
            No Sanity
          </span>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const, padding: '5px 12px', borderRadius: '3px', background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,.25)', fontFamily: '"Barlow Condensed", sans-serif' }}>
            Unsplash Images
          </span>
        </div>
      </header>

      <section style={{ padding: '40px 60px 48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {pages.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.06)',
              borderRadius: '8px', padding: '28px 28px 24px', textDecoration: 'none', color: '#fff',
              minHeight: '200px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '26px', fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '1px', margin: 0 }}>
                  {p.name}
                </h2>
                <span style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase' as const, padding: '3px 8px', borderRadius: '2px', background: RED, color: '#fff', fontFamily: '"Barlow Condensed", sans-serif', lineHeight: 1, whiteSpace: 'nowrap' as const }}>
                  EC V2
                </span>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: RED, display: 'inline-block', marginBottom: '12px' }}>
                {p.theme}
              </span>
              <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '12.5px', lineHeight: '1.7', margin: 0 }}>
                {p.desc}
              </p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: RED }}>
                View Template →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
