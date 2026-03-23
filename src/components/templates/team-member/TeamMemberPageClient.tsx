'use client'

import { TeamMemberData } from './types'
import TemplateBadge from '@/components/TemplateBadge'

const RED = '#F9423A'
const MAROON = '#3F0017'
const SERIF = "'Georgia', 'Times New Roman', serif"

export default function TeamMemberPageClient({ data }: { data: TeamMemberData }) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge />
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh' }}>
        <div style={{ position: 'relative', background: MAROON, padding: '80px 48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, border: '1px solid rgba(255,255,255,.05)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, border: '1px solid rgba(255,255,255,.04)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 20 }}>{data.issueLabel}</div>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1.1, color: '#fff', margin: '0 0 16px' }}>{data.name}</h1>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 20 }}>{data.title}</div>
            {data.isLeadership && (
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 14px', border: '1px solid rgba(255,255,255,.15)', borderRadius: 2, color: 'rgba(255,255,255,.5)' }}>Leadership Team</span>
            )}
          </div>
        </div>
        <div style={{ background: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '60%', height: '70%', background: '#eae8e3', borderRadius: 4, minHeight: 300 }} />
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, padding: '56px 56px 80px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 32, height: 2, background: RED }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: '#999' }}>Biography</span>
          </div>
          {data.bio.map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.9, color: '#555', margin: '0 0 20px' }}>{p}</p>
          ))}
          <a href={data.linkedinUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: RED, textDecoration: 'none', marginTop: 8 }}>
            LinkedIn Profile →
          </a>
        </div>

        <div style={{ alignSelf: 'start' }}>
          <div style={{ background: '#f9f7f3', borderRadius: 8, padding: '28px 24px' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: '#1a1a1a', marginBottom: 20 }}>Quick Facts</div>
            {data.facts.map((f, i) => (
              <div key={f.label} style={{ padding: '14px 0', borderTop: i > 0 ? '1px solid #e8e6e1' : 'none' }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 13, color: '#444' }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
