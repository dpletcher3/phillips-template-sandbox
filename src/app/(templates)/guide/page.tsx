/*
  ================================================================
  GUIDE TEMPLATE — Connect to Sanity
  ================================================================
  Sanity schema: guide (sanity/schemas/documents/guide.ts)

  Section → Field mapping:
  - Breadcrumb  → guide.topic
  - Hero        → guide.title, guide.intro
  - Body        → guide.body (blockContent) parsed into sections
  - TOC         → generated from body headings
  ================================================================
*/

'use client'

import { useState, useEffect } from 'react'

const RED = '#F9423A'
const BG = '#0d0d0d'

const MOCK = {
  topic: 'CNC Technology',
  docId: 'PG-2025-003',
  title: 'The Complete Guide to 5-Axis CNC Machining',
  metadata: [
    { label: 'Updated', value: 'March 2025' },
    { label: 'Read Time', value: '22 min' },
    { label: 'Level', value: 'Intermediate' },
  ],
  sections: [
    {
      id: 'what-is-5-axis',
      heading: 'What Is 5-Axis Machining?',
      body: '5-axis machining refers to a CNC machine that moves a cutting tool or workpiece along five different axes simultaneously. The three standard linear axes (X, Y, Z) are augmented by two rotary axes (typically A and B, or B and C), allowing the tool to approach the workpiece from virtually any direction.\n\nThis capability eliminates the need for multiple setups, enables complex geometry in a single operation, and dramatically improves surface finish on contoured surfaces.',
      callout: null,
    },
    {
      id: 'types',
      heading: 'Types of 5-Axis Machines',
      body: 'There are three primary 5-axis machine configurations, each optimized for different applications and part sizes:',
      callout: {
        type: 'info' as const,
        title: 'Configuration Comparison',
        items: [
          'Trunnion (table/table): Workpiece tilts and rotates. Best for smaller parts. Example: Hermle C 32 U, Haas UMC-750.',
          'Swivel Head (head/table): Spindle tilts, table rotates. Ideal for large, heavy parts. Example: DMG MORI DMU 80.',
          'Gantry (head/head): Both rotary axes in the head. For very large aerospace and energy parts. Example: Zimmermann FZ33.',
        ],
      },
    },
    {
      id: 'specs',
      heading: 'Key Specifications to Evaluate',
      body: 'When evaluating a 5-axis machine, these are the specifications that matter most for production accuracy and throughput:',
      callout: null,
      specTable: [
        { spec: 'Positioning Accuracy', typical: '±0.005 mm', premium: '±0.002 mm', why: 'Determines part tolerance capability' },
        { spec: 'Repeatability', typical: '±0.003 mm', premium: '±0.001 mm', why: 'Consistency across production runs' },
        { spec: 'Spindle Speed', typical: '12,000 RPM', premium: '42,000 RPM', why: 'Surface finish and material range' },
        { spec: 'Rapid Traverse', typical: '36 m/min', premium: '60 m/min', why: 'Non-cutting time reduction' },
        { spec: 'Table Load', typical: '500 kg', premium: '2,000 kg', why: 'Maximum workpiece weight' },
      ],
    },
    {
      id: 'when-to-upgrade',
      heading: 'When to Move to 5-Axis',
      body: 'The transition from 3-axis to 5-axis is warranted when any of these conditions are present: you\'re running more than 3 setups per part, you\'re losing quotes due to geometric complexity, your surface finish requirements exceed what indexing can deliver, or your competition has already made the move.\n\nPhillips applications engineers can evaluate your current part mix and identify the ROI case for 5-axis adoption. We typically find that shops break even within 8–14 months on their first 5-axis machine.',
      callout: null,
    },
  ],
}

export default function GuideTemplate() {
  const [activeSection, setActiveSection] = useState(MOCK.sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    MOCK.sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <main style={{ background: BG, minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Red topbar breadcrumb */}
      <div style={{ background: RED, padding: '10px 56px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <a href="/" style={{ color: 'rgba(255,255,255,.7)', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none' }}>Sandbox</a>
        <span style={{ color: 'rgba(255,255,255,.4)' }}>/</span>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{MOCK.topic}</span>
      </div>

      {/* ---- HERO ---- */}
      <section style={{ padding: '64px 56px 48px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: 16 }}>{MOCK.docId}</div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 5vw, 64px)', textTransform: 'uppercase', lineHeight: 1, letterSpacing: 1, margin: '0 0 24px' }}>{MOCK.title}</h1>
        <div style={{ display: 'flex', gap: 32 }}>
          {MOCK.metadata.map(m => (
            <div key={m.label}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginRight: 8 }}>{m.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>{m.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- 2-COL LAYOUT: TOC + BODY ---- */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, padding: '48px 56px 96px' }}>
        {/* Sticky TOC */}
        <nav style={{ position: 'sticky', top: 48, alignSelf: 'start' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginBottom: 16 }}>Contents</div>
          {MOCK.sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                display: 'block',
                padding: '8px 0 8px 14px',
                fontSize: 11,
                fontWeight: activeSection === s.id ? 600 : 400,
                color: activeSection === s.id ? RED : 'rgba(255,255,255,.3)',
                borderLeft: activeSection === s.id ? `2px solid ${RED}` : '2px solid transparent',
                textDecoration: 'none',
                transition: 'color .2s',
              }}
            >
              {s.heading}
            </a>
          ))}
        </nav>

        {/* Body */}
        <article style={{ maxWidth: 720 }}>
          {MOCK.sections.map(s => (
            <section key={s.id} id={s.id} style={{ marginBottom: 56 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px' }}>{s.heading}</h2>
              {s.body.split('\n\n').map((p, i) => (
                <p key={i} style={{ fontSize: 13, lineHeight: 1.9, color: 'rgba(255,255,255,.45)', margin: '0 0 14px' }}>{p}</p>
              ))}

              {/* Callout box */}
              {s.callout && (
                <div style={{ background: 'rgba(249,66,58,.06)', border: `1px solid rgba(249,66,58,.15)`, borderRadius: 6, padding: '24px 28px', marginTop: 20 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: RED, marginBottom: 14 }}>{s.callout.title}</div>
                  {s.callout.items.map((item, i) => (
                    <div key={i} style={{ fontSize: 12, lineHeight: 1.75, color: 'rgba(255,255,255,.5)', padding: '8px 0', borderBottom: i < s.callout!.items.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>{item}</div>
                  ))}
                </div>
              )}

              {/* Spec table */}
              {'specTable' in s && s.specTable && (
                <div style={{ marginTop: 20, border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, overflow: 'hidden' }}>
                  {/* Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', background: 'rgba(255,255,255,.03)', padding: '12px 20px' }}>
                    {['Specification', 'Typical', 'Premium', 'Why It Matters'].map(h => (
                      <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>{h}</div>
                    ))}
                  </div>
                  {s.specTable.map((row) => (
                    <div key={row.spec} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,.04)' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>{row.spec}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)' }}>{row.typical}</div>
                      <div style={{ fontSize: 12, color: RED, fontWeight: 600 }}>{row.premium}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)' }}>{row.why}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}
