'use client'

import { LocationData } from '@/components/templates/location/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'
import SimpleBreadcrumb from '@/components/SimpleBreadcrumb'

const RED = '#F9423A'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimpleLocationClient({ data }: { data: LocationData }) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />
      <SimpleBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/' }, { label: data.fullName }]} />

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '50vh' }}>
        <div style={{ background: RED, padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#fff' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 16 }}>{data.region} Region</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 72, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: -1, margin: '0 0 8px' }}>{data.city}</h1>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300, fontSize: 36, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,.6)', marginBottom: 32 }}>{data.state}</div>

          <div style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 8, whiteSpace: 'pre-line' }}>{data.address}</div>
          <div style={{ fontSize: 13, marginBottom: 24 }}>{data.phone}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {data.hours.map(h => (
              <div key={h.label}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>{h.label}</div>
                <div style={{ fontSize: 13 }}>{h.value}</div>
              </div>
            ))}
          </div>

          <button style={{ background: '#fff', color: RED, border: 'none', padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', width: 'fit-content' }}>Get Directions</button>
        </div>
        <div style={{ background: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '80%', height: '80%', background: '#e0e0e0', borderRadius: 4 }} />
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '56px 48px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 32px' }}>Our <span style={{ color: RED }}>Services</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {data.services.map(s => (
            <div key={s.number} style={{ border: `1px solid ${BORDER}`, borderRadius: 4, padding: '28px 24px', cursor: 'pointer', transition: 'border-color .15s, box-shadow .15s' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: RED, marginBottom: 12 }}>{s.number}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{s.name}</div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: GREY, margin: 0 }}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#000', padding: '56px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: '#F68B33', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>Visit Us Today</div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 36, textTransform: 'uppercase', color: '#fff', margin: '0 0 24px' }}>Schedule a Tour of Our Facility</h2>
        <button style={{ background: RED, color: '#fff', border: 'none', padding: '14px 36px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>Contact Us</button>
      </section>
    </main>
  )
}
