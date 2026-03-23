'use client'

import { useState } from 'react'
import { CourseData } from '@/components/templates/course/types'
import TemplateBadge from '@/components/TemplateBadge'

const RED = '#F9423A'
const MAROON = '#3F0017'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimpleCourseClient({ data }: { data: CourseData }) {
  const [activeModule, setActiveModule] = useState(0)

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />

      {/* Maroon topbar breadcrumb */}
      <div style={{ background: MAROON, padding: '10px 48px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <a href="/" style={{ color: 'rgba(255,255,255,.7)', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none' }}>Sandbox</a>
        <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
        <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Training</span>
        <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Course</span>
      </div>

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, padding: '48px 48px 56px', alignItems: 'start' }}>
        <div>
          <span style={{ background: `${RED}12`, color: RED, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2, display: 'inline-block', marginBottom: 16 }}>{data.track}</span>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 40, textTransform: 'uppercase', lineHeight: 1.05, margin: '0 0 12px' }}>
            {data.title.split(' ').slice(0, -2).join(' ')} <em style={{ color: RED, fontStyle: 'normal' }}>{data.title.split(' ').slice(-2).join(' ')}</em>
          </h1>
          <div style={{ fontSize: 12, color: GREY, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>{data.level}</div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#444', margin: '0 0 28px', maxWidth: 540 }}>{data.description}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: RED, color: '#fff', border: 'none', padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>Enroll Now</button>
            <button style={{ background: 'transparent', color: '#1a1a1a', border: `1px solid ${BORDER}`, padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>View Dates</button>
          </div>
        </div>

        {/* Info card */}
        <div style={{ background: LIGHT, borderTop: `4px solid ${RED}`, padding: '28px 24px' }}>
          {[
            { label: 'Duration', value: data.duration },
            { label: 'Schedule', value: data.schedule },
            { label: 'Price', value: data.price },
            { label: 'Location', value: data.location },
            { label: 'Machines', value: data.machines.join(', ') },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontSize: 12, color: GREY, fontWeight: 600 }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{row.value}</span>
            </div>
          ))}
          <button style={{ width: '100%', background: RED, color: '#fff', border: 'none', padding: '12px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', marginTop: 20 }}>Enroll Now</button>
        </div>
      </section>

      {/* Modules + Prerequisites */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, padding: '0 48px 64px', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 20px' }}>Course <span style={{ color: RED }}>Modules</span></h2>
          {data.modules.map((m, i) => (
            <div
              key={m.number}
              onClick={() => setActiveModule(i)}
              style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', alignItems: 'flex-start' }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: activeModule === i ? RED : LIGHT,
                color: activeModule === i ? '#fff' : GREY,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14,
              }}>{m.number}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{m.title}</div>
                {activeModule === i && <div style={{ fontSize: 13, color: GREY, lineHeight: 1.6 }}>{m.description}</div>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: LIGHT, padding: '24px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREY, marginBottom: 16 }}>Prerequisites</div>
          {data.prerequisites.map(p => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: RED, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#444' }}>{p}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
