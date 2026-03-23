'use client'

import { useState } from 'react'
import { CourseData } from './types'

const RED = '#F9423A'
const MAROON = '#3F0017'
const BG = '#f8f8f5'

export default function CoursePageClient({ data }: { data: CourseData }) {
  const [activeModule, setActiveModule] = useState(0)

  return (
    <main style={{ background: BG, minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ background: MAROON, padding: '10px 56px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <a href="/" style={{ color: 'rgba(255,255,255,.7)', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none' }}>Sandbox</a>
        <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
        <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Training</span>
        <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{data.track}</span>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, padding: '48px 56px 56px' }}>
        <div>
          <span style={{ display: 'inline-block', padding: '5px 14px', background: RED, color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', borderRadius: 2, marginBottom: 16 }}>{data.track} Track</span>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 5vw, 56px)', textTransform: 'uppercase', lineHeight: 1, letterSpacing: 1, margin: '0 0 12px', color: '#1a1a1a' }}>{data.title}</h1>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#666', margin: '0 0 8px' }}>{data.subtitle}</p>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: 1, textTransform: 'uppercase' }}>{data.level}</span>
            <span style={{ color: '#ddd' }}>·</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: 1, textTransform: 'uppercase' }}>{data.duration}</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.85, color: '#777', maxWidth: 520, margin: '0 0 28px' }}>{data.description}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#" style={{ padding: '13px 28px', background: RED, color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}>Enroll Now</a>
            <a href="#" style={{ padding: '13px 28px', background: 'transparent', color: '#1a1a1a', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #ddd', borderRadius: 2 }}>Download Syllabus</a>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 8, padding: '28px 24px', alignSelf: 'start', position: 'sticky', top: 24 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: RED, marginBottom: 4 }}>{data.price}</div>
          <div style={{ fontSize: 10, color: '#999', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>per student</div>
          {[
            { label: 'Duration', value: data.duration },
            { label: 'Schedule', value: data.schedule },
            { label: 'Location', value: data.location },
          ].map(r => (
            <div key={r.label} style={{ padding: '12px 0', borderTop: '1px solid #f0ede8' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 13, color: '#444' }}>{r.value}</div>
            </div>
          ))}
          <div style={{ padding: '12px 0', borderTop: '1px solid #f0ede8' }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>Machines</div>
            {data.machines.map(m => (
              <div key={m} style={{ fontSize: 12, color: '#444', padding: '4px 0' }}>• {m}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, padding: '0 56px 80px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 32, height: 2, background: RED }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: '#999' }}>Course Modules</span>
          </div>
          {data.modules.map((m, i) => (
            <div key={m.number} onClick={() => setActiveModule(i)} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid #e8e6e1', cursor: 'pointer', transition: 'background .15s' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: activeModule === i ? RED : '#fff', border: activeModule === i ? 'none' : '2px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: activeModule === i ? '#fff' : '#999', flexShrink: 0, transition: 'background .2s, color .2s, border .2s' }}>
                {m.number}
              </div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', letterSpacing: 1, color: activeModule === i ? RED : '#1a1a1a', transition: 'color .2s', marginBottom: 4 }}>{m.title}</div>
                <div style={{ fontSize: 12, lineHeight: 1.7, color: '#999', maxHeight: activeModule === i ? 100 : 0, overflow: 'hidden', transition: 'max-height .3s ease' }}>{m.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ alignSelf: 'start' }}>
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: 8, padding: '28px 24px' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: '#1a1a1a', marginBottom: 16 }}>Prerequisites</div>
            {data.prerequisites.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', borderTop: i > 0 ? '1px solid #f0ede8' : 'none' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: RED, marginTop: 6, flexShrink: 0 }} />
                <div style={{ fontSize: 12, lineHeight: 1.6, color: '#666' }}>{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
