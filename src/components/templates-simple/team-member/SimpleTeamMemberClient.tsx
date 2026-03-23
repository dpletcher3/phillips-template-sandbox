'use client'

import { TeamMemberData } from '@/components/templates/team-member/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'
import SimpleBreadcrumb from '@/components/SimpleBreadcrumb'

const RED = '#F9423A'
const MAROON = '#3F0017'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimpleTeamMemberClient({ data }: { data: TeamMemberData }) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />
      <SimpleBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Team', href: '/' }, { label: data.name }]} />

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '50vh' }}>
        <div style={{ background: MAROON, padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 16 }}>{data.issueLabel}</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 48, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1, margin: '0 0 12px', color: '#fff' }}>{data.name}</h1>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginBottom: 8 }}>{data.title}</div>
          {data.isLeadership && (
            <span style={{ display: 'inline-block', background: `${RED}30`, color: RED, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2, width: 'fit-content' }}>Leadership</span>
          )}
        </div>
        <div style={{ background: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '60%', height: '70%', background: '#e0e0e0', borderRadius: 4 }} />
        </div>
      </section>

      {/* Bio + Facts */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, padding: '56px 48px', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 20px' }}>About <span style={{ color: RED }}>{data.name.split(' ')[0]}</span></h2>
          {data.bio.map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.85, color: '#444', margin: '0 0 16px' }}>{p}</p>
          ))}
        </div>

        <aside>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREY, marginBottom: 16 }}>Quick Facts</div>
          {data.facts.map((f, i) => (
            <div key={f.label} style={{ padding: '12px 0', borderLeft: `3px solid ${i === 0 ? RED : BORDER}`, paddingLeft: 16, marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY, marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{f.value}</div>
            </div>
          ))}
        </aside>
      </section>
    </main>
  )
}
