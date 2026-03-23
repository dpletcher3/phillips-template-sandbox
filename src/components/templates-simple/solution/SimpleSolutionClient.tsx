'use client'

import { SolutionData } from '@/components/templates/solution/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'
import SimpleBreadcrumb from '@/components/SimpleBreadcrumb'

const RED = '#F9423A'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimpleSolutionClient({ sol }: { sol: SolutionData }) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />
      <SimpleBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/' }, { label: sol.name }]} />

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 100px)' }}>
        {/* Sidebar nav */}
        <aside style={{ borderRight: `1px solid ${BORDER}`, padding: '32px 0' }}>
          <div style={{ padding: '0 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREY }}>Solutions</div>
          </div>
          {['5-Axis Machining', 'Vertical Milling', 'Turning Centers', 'Automation', 'Additive Manufacturing'].map((item, i) => (
            <div key={item} style={{
              padding: '10px 24px',
              fontSize: 13,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? RED : '#444',
              borderLeft: i === 0 ? `3px solid ${RED}` : '3px solid transparent',
              cursor: 'pointer',
            }}>{item}</div>
          ))}
        </aside>

        {/* Main content */}
        <div style={{ padding: '40px 48px' }}>
          <div style={{ display: 'inline-flex', gap: 6, marginBottom: 12 }}>
            {sol.typePills.map(p => (
              <span key={p} style={{ background: `${RED}12`, color: RED, fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2 }}>{p}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 44, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px', lineHeight: 1 }}>{sol.name}</h1>
          <div style={{ width: 40, height: 3, background: RED, marginBottom: 20 }} />
          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 4, padding: '20px 24px', marginBottom: 32, maxWidth: 640 }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#333', margin: 0 }}>{sol.description}</p>
          </div>

          {/* Hero image */}
          <div style={{ position: 'relative', background: LIGHT, height: 280, borderRadius: 4, marginBottom: 32 }}>
            <span style={{ position: 'absolute', bottom: 16, left: 16, background: RED, color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '5px 12px' }}>{sol.offering}</span>
          </div>

          {/* Spec strip */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(sol.specNumbers.length, 4)}, 1fr)`, gap: 1, background: BORDER, marginBottom: 40 }}>
            {sol.specNumbers.slice(0, 4).map(s => (
              <div key={s.label} style={{ background: '#fff', padding: '20px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: RED }}>{s.value}</div>
                <div style={{ fontSize: 10, color: GREY, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Related brands */}
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 20px' }}>Featured <span style={{ color: RED }}>Brands</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
            {sol.relatedBrands.map(b => (
              <div key={b.name} style={{ border: `1px solid ${BORDER}`, borderRadius: 4, padding: '24px 20px', cursor: 'pointer', transition: 'background .15s' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', marginBottom: 6 }}>{b.name}</div>
                <p style={{ fontSize: 12, color: GREY, lineHeight: 1.6, margin: 0 }}>{b.description}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: RED, color: '#fff', border: 'none', padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>{sol.ctaPrimaryLabel}</button>
            <button style={{ background: 'transparent', color: '#1a1a1a', border: `1px solid ${BORDER}`, padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>{sol.ctaSecondaryLabel}</button>
          </div>
        </div>
      </div>
    </main>
  )
}
