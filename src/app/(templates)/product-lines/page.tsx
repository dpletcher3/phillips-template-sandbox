/*
  ================================================================
  PRODUCT LINES TEMPLATE — Connect to Sanity
  ================================================================
  Sanity schema: brand → productLines[] (sanity/schemas/objects/productLine.ts)

  Section → Field mapping:
  - Intro           → brand.name, custom intro text
  - Comparison table→ productLine.name, .xTravel, .spindleSpeed, .tableLoad, .bestFor
  - Series sections → productLine.name, .seriesLabel, .models, .description, .image
  - CTA bar         → static / configurable

  To connect: fetch brand.productLines[] via GROQ, pass as props.
  ================================================================
*/

'use client'

const RED = '#F9423A'
const GOLD = '#F68B33'

const SERIES = [
  {
    name: 'VF Series',
    tagline: 'The workhorse of American manufacturing',
    description: 'The Haas VF Series is the most popular CNC vertical machining center in the world. Built in Oxnard, California, every VF machine delivers reliable cutting performance, simple operation, and the lowest cost of ownership in the industry. From first-operation job shops to high-volume production floors, the VF is where it starts.',
    models: [
      { name: 'VF-1', travel: '508 × 406 × 508 mm', spindle: '8,100 RPM' },
      { name: 'VF-2', travel: '762 × 406 × 508 mm', spindle: '8,100 RPM' },
      { name: 'VF-3', travel: '1016 × 508 × 635 mm', spindle: '8,100 RPM' },
      { name: 'VF-4', travel: '1270 × 508 × 635 mm', spindle: '8,100 RPM' },
      { name: 'VF-5', travel: '1270 × 660 × 635 mm', spindle: '8,100 RPM' },
    ],
    type: 'Vertical Mill',
    xTravel: '508–1270 mm',
    spindleSpeed: '8,100 RPM',
    tableLoad: '1,588 kg',
    bestFor: 'General purpose milling',
  },
  {
    name: 'ST Series',
    tagline: 'Turning, redefined for production',
    description: 'The Haas ST Series turning centers combine heavy-duty construction with high-performance turning capability. A45° bed casting, A2-6 spindle nose, and full C-axis option make the ST line ideal for production turning, second-operation work, and complex contour machining.',
    models: [
      { name: 'ST-10', travel: '406 × 356 mm', spindle: '6,000 RPM' },
      { name: 'ST-20', travel: '533 × 406 mm', spindle: '4,000 RPM' },
      { name: 'ST-30', travel: '660 × 584 mm', spindle: '3,400 RPM' },
      { name: 'ST-35', travel: '660 × 660 mm', spindle: '2,400 RPM' },
    ],
    type: 'Turning Center',
    xTravel: '406–660 mm',
    spindleSpeed: '6,000 RPM',
    tableLoad: '454 kg',
    bestFor: 'Production turning',
  },
  {
    name: 'UMC Series',
    tagline: 'Five-axis. Haas value.',
    description: 'The Haas UMC Series brings true 5-axis simultaneous machining to shops that never thought they could afford it. A built-in trunnion table with ±120° of tilt delivers full 3+2 and simultaneous 5-axis capability — with the same Haas simplicity, reliability, and support.',
    models: [
      { name: 'UMC-500',  travel: '508 × 406 × 394 mm', spindle: '8,100 RPM' },
      { name: 'UMC-750',  travel: '762 × 508 × 508 mm', spindle: '8,100 RPM' },
      { name: 'UMC-1000', travel: '1016 × 635 × 635 mm', spindle: '8,100 RPM' },
    ],
    keySpecs: [
      { value: '±120°', label: 'Tilt Range' },
      { value: '5',     label: 'Simultaneous Axes' },
      { value: '40+1',  label: 'Tool Capacity' },
    ],
    type: '5-Axis Mill',
    xTravel: '508–1016 mm',
    spindleSpeed: '8,100 RPM',
    tableLoad: '408 kg',
    bestFor: '5-axis complex parts',
  },
]

export default function ProductLinesTemplate() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Back link */}
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      {/* ---- INTRO ---- */}
      <section style={{ padding: '96px 56px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: RED }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>Product Lines · Haas Automation</span>
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(56px, 8vw, 96px)', textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: -1, margin: '0 0 32px' }}>
          Machines Built to <span style={{ color: RED }}>Cut Metal</span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 800 }}>
          <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', margin: 0 }}>Every Haas machine is designed, built, and serviced in Oxnard, California. From the castings to the spindle assemblies, Haas controls the entire manufacturing process — delivering consistent quality and the industry&apos;s lowest cost of ownership.</p>
          <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', margin: 0 }}>Phillips Corporation is an authorized Haas Factory Outlet (HFO) serving the Northeast and Mid-Atlantic. We provide sales, applications engineering, service, and training for the complete Haas product line.</p>
        </div>
      </section>

      {/* ---- COMPARISON TABLE ---- */}
      <section style={{ padding: '0 56px 72px' }}>
        <div style={{ border: '1px solid rgba(255,255,255,.06)', borderRadius: 8, overflow: 'hidden' }}>
          {/* Photo row */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SERIES.length}, 1fr)`, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            {SERIES.map(s => (
              <div key={s.name} style={{ padding: 32, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ height: 120, background: 'rgba(255,255,255,.03)', borderRadius: 4, marginBottom: 16 }} />
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{s.name}</div>
                <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.15)', borderRadius: 2, padding: '8px 20px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#fff', cursor: 'pointer' }}>More Info</button>
              </div>
            ))}
          </div>
          {/* Spec rows */}
          {['type', 'xTravel', 'spindleSpeed', 'tableLoad', 'bestFor'].map((key, ri) => {
            const labels: Record<string, string> = { type: 'Machine Type', xTravel: 'X Travel', spindleSpeed: 'Spindle Speed', tableLoad: 'Table Load', bestFor: 'Best For' }
            return (
              <div key={key} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', borderBottom: ri < 4 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>
                <div style={{ padding: '14px 24px', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', borderRight: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center' }}>{labels[key]}</div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SERIES.length}, 1fr)` }}>
                  {SERIES.map(s => (
                    <div key={s.name} style={{ padding: '14px 24px', fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: 'rgba(255,255,255,.7)', borderRight: '1px solid rgba(255,255,255,.04)', textAlign: 'center' }}>
                      {(s as Record<string, unknown>)[key] as string}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ---- SERIES SECTIONS (alternating) ---- */}
      {SERIES.map((s, i) => {
        const isReversed = i % 2 === 1
        const hasKeySpecs = 'keySpecs' in s

        const textBlock = (
          <div style={{ padding: '64px 0' }} key={`text-${s.name}`}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Series {String(i + 1).padStart(2, '0')}</div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1, margin: '0 0 12px' }}>{s.name}</h2>
            <p style={{ fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,.5)', margin: '0 0 20px' }}>{s.tagline}</p>
            <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,.4)', margin: '0 0 28px', maxWidth: 440 }}>{s.description}</p>

            {hasKeySpecs && (
              <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                {(s as typeof SERIES[2]).keySpecs!.map(ks => (
                  <div key={ks.label} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, padding: '16px 20px', minWidth: 100 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, color: '#fff', lineHeight: 1, marginBottom: 4 }}>{ks.value}</div>
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>{ks.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Model list */}
            {s.models.map(m => (
              <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                <div>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: 1, marginRight: 16 }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,.3)' }}>{m.travel}</span>
                </div>
                <span style={{ color: RED, fontSize: 14 }}>→</span>
              </div>
            ))}
          </div>
        )

        const imageBlock = (
          <div key={`img-${s.name}`} style={{ background: 'rgba(255,255,255,.03)', borderRadius: 6, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '70%', height: '50%', background: 'rgba(255,255,255,.03)', borderRadius: 4, minHeight: 200 }} />
          </div>
        )

        return (
          <section key={s.name} style={{ padding: '0 56px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              {isReversed ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
            </div>
          </section>
        )
      })}

      {/* ---- BOTTOM CTA BAR ---- */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,.06)', marginTop: 48 }}>
        {[
          { label: 'Talk to an Engineer', desc: 'Get expert guidance on machine selection and configuration.' },
          { label: 'Download Spec Sheet', desc: 'Full specifications for every Haas model in one PDF.' },
          { label: 'See Case Studies', desc: 'Real results from real shops running Haas equipment.' },
        ].map((cta, i) => (
          <a
            key={cta.label}
            href="#"
            style={{ padding: '40px 36px', borderRight: i < 2 ? '1px solid rgba(255,255,255,.06)' : 'none', textDecoration: 'none', color: '#fff', transition: 'background .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,66,58,.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{cta.label}</div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,.35)', margin: '0 0 16px' }}>{cta.desc}</p>
            <span style={{ color: RED, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>Get Started →</span>
          </a>
        ))}
      </section>
    </main>
  )
}
