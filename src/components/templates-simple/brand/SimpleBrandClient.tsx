'use client'

import { BrandData } from '@/components/templates/brand/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'
import SimpleBreadcrumb from '@/components/SimpleBreadcrumb'

const RED = '#F9423A'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimpleBrandClient({ brand }: { brand: BrandData }) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />
      <SimpleBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Brands', href: '/' }, { label: brand.name }]} />

      {/* Hero: two-column */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, padding: '48px 48px 56px', alignItems: 'start' }}>
        {/* Left: image area */}
        <div>
          <div style={{ background: LIGHT, borderRadius: 4, height: 380, marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ flex: 1, height: 80, background: LIGHT, borderRadius: 4, border: i === 1 ? `2px solid ${RED}` : `1px solid ${BORDER}` }} />
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div>
          <div style={{ display: 'inline-flex', gap: 6, marginBottom: 12 }}>
            {brand.categories.map(c => (
              <span key={c} style={{ background: `${RED}12`, color: RED, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2 }}>{c}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 48, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px', lineHeight: 1 }}>{brand.name}</h1>
          <p style={{ color: GREY, fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 20px' }}>{brand.tagline}</p>
          <div style={{ width: 40, height: 3, background: RED, marginBottom: 20 }} />
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#333', margin: '0 0 28px', maxWidth: 480 }}>{brand.description}</p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <button style={{ background: RED, color: '#fff', border: 'none', padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>Request a Quote</button>
            <button style={{ background: 'transparent', color: '#1a1a1a', border: `1px solid ${BORDER}`, padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>Download Brochure</button>
          </div>

          {/* Key specs grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: BORDER }}>
            {brand.heroStats.map(s => (
              <div key={s.label} style={{ background: '#fff', padding: '16px 20px' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: '#000' }}>{s.value}</div>
                <div style={{ fontSize: 10, color: GREY, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs section */}
      <section style={{ background: LIGHT, padding: '56px 48px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 32px' }}>
          Full <span style={{ color: RED }}>Specifications</span>
        </h2>
        {brand.productLines.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Series', 'Models', 'X Travel', 'Spindle', 'Table Load', 'Best For'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY, borderBottom: `2px solid ${BORDER}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brand.productLines.map((pl, i) => (
                <tr key={pl.name} style={{ background: i % 2 === 0 ? '#fff' : LIGHT }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 13 }}>{pl.name}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#444' }}>{pl.models}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#444' }}>{pl.xTravel ?? '—'}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#444' }}>{pl.spindleSpeed ?? '—'}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#444' }}>{pl.tableLoad ?? '—'}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#444' }}>{pl.bestFor ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* About */}
      <section style={{ padding: '56px 48px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>About <span style={{ color: RED }}>{brand.name}</span></h2>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#444', maxWidth: 680, margin: '0 0 32px' }}>{brand.about.description}</p>
        <div style={{ display: 'flex', gap: 32 }}>
          {brand.about.stats.map(s => (
            <div key={s.label} style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 16 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: GREY, letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#000', padding: '56px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: '#F68B33', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>Ready to Get Started?</div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 36, textTransform: 'uppercase', color: '#fff', margin: '0 0 24px' }}>Talk to a {brand.name} Expert</h2>
        <button style={{ background: RED, color: '#fff', border: 'none', padding: '14px 36px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>Contact Us</button>
      </section>
    </main>
  )
}
