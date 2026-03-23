/*
  ================================================================
  CASE STUDY TEMPLATE — Connect to Sanity
  ================================================================
  Sanity schema: caseStudy (sanity/schemas/documents/caseStudy.ts)

  Section → Field mapping:
  - Masthead      → caseStudy.title, caseStudy.customer, publishedAt
  - Kicker bar    → caseStudy.industry, caseStudy.isFederal
  - Main content  → caseStudy.summary, caseStudy.body (blockContent)
  - Results panel → caseStudy.results[] { label, value }
  - Pull quote    → extracted from body or custom field
  - Related brands→ caseStudy.relatedBrands[]
  ================================================================
*/

'use client'

const RED = '#F9423A'
const CREAM = '#f9f7f3'
const SERIF = "'Georgia', 'Times New Roman', serif"

const MOCK = {
  title: 'NAVAIR Fleet Readiness Center Cuts Cycle Time 40% with 5-Axis Pallet Automation',
  subtitle: 'Fleet Readiness Center East',
  date: 'November 2024',
  industry: 'Federal / DoD',
  tags: ['Aerospace', 'Federal', '5-Axis', 'Automation'],
  customer: 'NAVAIR Fleet Readiness Center East',
  byline: 'Phillips Federal Division',
  lede: 'A Naval Air Systems Command depot-level maintenance facility needed to modernize its aging machining capability for F/A-18 structural components. Phillips Federal Division specified, delivered, and commissioned a Hermle C 42 U with HS flex pallet automation — achieving 40% cycle time reduction while meeting ITAR and cybersecurity requirements.',
  bodyLeft: 'The Fleet Readiness Center East (FRC East) in Cherry Point, North Carolina, is responsible for depot-level maintenance and repair of F/A-18 Hornet and Super Hornet structural airframe components. Existing 3-axis VMC cells required multiple setups per part, creating bottlenecks that directly impacted aircraft availability rates.\n\nPhillips Federal Division conducted a full process audit, identifying 14 part families that could benefit from 5-axis consolidation. The team specified a Hermle C 42 U with integrated HS flex heavy pallet automation — a configuration that reduces setup changes by 85% and enables unattended second-shift production.',
  bodyRight: 'The Hermle mineral-cast bed provides the thermal stability required for titanium and Inconel structural components, maintaining ±0.003mm positioning accuracy across 16-hour production runs. The HS flex system accommodates 6 pallets with automatic tool and workpiece management.\n\nPhillips applications engineers developed custom fixturing and CAM programs for all 14 part families, validated through test cuts at the Phillips Technology Center before deployment. On-site commissioning included operator training, preventive maintenance protocols, and integration with the facility\'s existing DNC network.',
  results: [
    { value: '40%', label: 'Cycle Time Reduction' },
    { value: '85%', label: 'Fewer Setups' },
    { value: '98.7%', label: 'Spindle Utilization' },
    { value: '14', label: 'Part Families Consolidated' },
  ],
  sidebarTitle: 'Equipment Deployed',
  sidebarItems: ['Hermle C 42 U', 'HS flex heavy (6 pallets)', 'Heidenhain TNC 640', 'Blum TC76 probe system', 'Custom titanium fixturing'],
  pullQuote: '"The Phillips team didn\'t just sell us a machine — they re-engineered our entire production workflow. We went from 6 setups per part to one."',
  pullAuthor: '— Production Lead, FRC East',
}

export default function CaseStudyTemplate() {
  return (
    <main style={{ background: CREAM, minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      {/* ---- MASTHEAD ---- */}
      <header style={{ padding: '80px 56px 32px', borderBottom: '2px solid #1a1a1a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'baseline', gap: 32, marginBottom: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#999' }}>{MOCK.subtitle}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: 'italic', fontSize: 28, textAlign: 'center', margin: 0, color: '#1a1a1a' }}>Phillips Results</h1>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#999', textAlign: 'right' }}>{MOCK.date}</div>
        </div>
      </header>

      {/* ---- RED KICKER BAR ---- */}
      <div style={{ background: RED, padding: '12px 56px', display: 'flex', gap: 16, alignItems: 'center' }}>
        {MOCK.tags.map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.85)' }}>{t}</span>
        ))}
      </div>

      {/* ---- MAIN 2-COL ---- */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, padding: '48px 56px 64px' }}>
        {/* Left: article */}
        <div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 36, lineHeight: 1.3, margin: '0 0 20px', color: '#1a1a1a' }}>{MOCK.title}</h2>
          <div style={{ height: 2, background: '#1a1a1a', margin: '0 0 16px', width: 80 }} />
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 28 }}>By {MOCK.byline} · {MOCK.industry}</div>

          {/* Lede */}
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#444', margin: '0 0 32px', fontWeight: 500 }}>{MOCK.lede}</p>

          {/* 2-col body */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {MOCK.bodyLeft.split('\n\n').map((p, i) => (
              <p key={`l${i}`} style={{ fontSize: 13, lineHeight: 1.85, color: '#666', margin: 0, gridColumn: '1' }}>{p}</p>
            ))}
            {MOCK.bodyRight.split('\n\n').map((p, i) => (
              <p key={`r${i}`} style={{ fontSize: 13, lineHeight: 1.85, color: '#666', margin: 0, gridColumn: '2' }}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right: results + sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Results panel */}
          <div style={{ background: '#1a1a1a', borderRadius: 6, padding: '32px 28px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: RED, marginBottom: 24 }}>Key Results</div>
            {MOCK.results.map((r, i) => (
              <div key={r.label} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,.06)' : 'none', padding: '16px 0' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#fff', lineHeight: 1 }}>{r.value}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginTop: 4 }}>{r.label}</div>
              </div>
            ))}
          </div>

          {/* Sidebar box */}
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 6, padding: '28px 24px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>{MOCK.sidebarTitle}</div>
            {MOCK.sidebarItems.map(item => (
              <div key={item} style={{ fontSize: 13, color: '#444', padding: '8px 0', borderBottom: '1px solid #f0ede8' }}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PULL QUOTE ---- */}
      <section style={{ background: RED, padding: '56px 56px', textAlign: 'center' }}>
        <blockquote style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, lineHeight: 1.6, color: '#fff', maxWidth: 700, margin: '0 auto 12px', fontWeight: 400 }}>{MOCK.pullQuote}</blockquote>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.6)' }}>{MOCK.pullAuthor}</div>
      </section>
    </main>
  )
}
