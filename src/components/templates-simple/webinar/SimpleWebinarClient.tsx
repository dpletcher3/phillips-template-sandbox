'use client'

import { WebinarData } from '@/components/templates/webinar/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'
import SimpleBreadcrumb from '@/components/SimpleBreadcrumb'

const RED = '#F9423A'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'
const MAROON = '#3F0017'

export default function SimpleWebinarClient({ data }: { data: WebinarData }) {
  const isUpcoming = data.status === 'upcoming'

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />
      <SimpleBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Webinars', href: '/' }, { label: data.title }]} />

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, padding: '48px 48px 56px', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: LIGHT, padding: '6px 14px', borderRadius: 4, marginBottom: 20 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: isUpcoming ? '#22c55e' : '#3b82f6' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: isUpcoming ? '#16a34a' : '#2563eb' }}>
              {isUpcoming ? 'Upcoming' : 'On Demand'}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 40, textTransform: 'uppercase', lineHeight: 1.05, margin: '0 0 20px' }}>
            {data.title.split(' ').slice(0, -2).join(' ')} <em style={{ color: RED, fontStyle: 'normal' }}>{data.title.split(' ').slice(-2).join(' ')}</em>
          </h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 36 }}>{data.date.split(' ')[1]?.replace(',', '')}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{data.date}</div>
              <div style={{ fontSize: 12, color: GREY }}>{data.time} · {data.duration}</div>
            </div>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#444', maxWidth: 520 }}>{data.description}</p>
        </div>

        {/* Registration card */}
        <div style={{ background: LIGHT, borderTop: `4px solid ${RED}`, padding: '28px 24px' }}>
          <div style={{ background: `${RED}12`, color: RED, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '6px 12px', display: 'inline-block', marginBottom: 16 }}>{data.date}</div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, textTransform: 'uppercase', marginBottom: 20 }}>{data.formTitle}</div>
          {['Full Name', 'Email Address', 'Company'].map(f => (
            <div key={f} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: GREY, marginBottom: 4 }}>{f}</div>
              <div style={{ background: '#fff', border: `1px solid ${BORDER}`, padding: '10px 14px', fontSize: 13, color: '#999' }}>{f}</div>
            </div>
          ))}
          <button style={{ width: '100%', background: RED, color: '#fff', border: 'none', padding: '12px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', marginTop: 8 }}>Register Now</button>
        </div>
      </section>

      {/* Speakers */}
      <section style={{ background: LIGHT, padding: '56px 48px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 24px' }}>Meet the <span style={{ color: RED }}>Speakers</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {data.speakers.map(sp => (
            <div key={sp.name} style={{ background: '#fff', border: `1px solid ${BORDER}`, padding: '28px 24px', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: MAROON, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18 }}>
                {sp.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{sp.name}</div>
              <div style={{ fontSize: 12, color: GREY }}>{sp.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Agenda */}
      <section style={{ padding: '56px 48px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 24px' }}>Agenda</h2>
        {data.agenda.map((a, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', borderBottom: `1px solid ${BORDER}`, padding: '14px 0' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: RED }}>{a.time}</span>
            <span style={{ fontSize: 14, color: '#444' }}>{a.item}</span>
          </div>
        ))}
      </section>
    </main>
  )
}
