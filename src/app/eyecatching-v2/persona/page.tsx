'use client'

import Image from 'next/image'
import { useState } from 'react'
import { EC_IMAGES } from '@/lib/eyecatching-images'

export default function PersonaPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs: { key: string; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'solutions', label: 'Solutions' },
    { key: 'brands', label: 'Brands' },
    { key: 'federal', label: 'Federal' },
  ]

  const stats = [
    { value: '50+', label: 'Brands' },
    { value: '30+', label: 'Years' },
    { value: '200+', label: 'Engineers' },
  ]

  const solutions = [
    { prefix: '//CNC', name: '5-Axis Machining', desc: 'Full-service 5-axis solutions' },
    { prefix: '//AM', name: 'Metal AM', desc: 'Additive manufacturing systems' },
    { prefix: '//AUTO', name: 'Automated Cells', desc: 'Robotic loading & pallet systems' },
    { prefix: '//SVC', name: 'Solution Design', desc: 'Application engineering & support' },
  ]

  const brands = ['Haas', 'Hermle', 'EOS', 'FANUC']

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 28,
    textTransform: 'uppercase',
    color: '#000',
    marginBottom: 12,
  }

  const bodyStyle: React.CSSProperties = {
    fontSize: 13,
    color: '#555',
    lineHeight: 1.8,
  }

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#f4f4f0', color: '#333', minHeight: '100vh' }}>

      {/* SECTION 1 — Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '45% 55%', minHeight: '60vh' }}>

        {/* Left cell */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Image layer */}
          <Image
            src={EC_IMAGES.machineFloor}
            alt="Manufacturing floor"
            fill={true}
            style={{ objectFit: 'cover', filter: 'brightness(.22)' }}
          />
          {/* Color overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(63,0,23,.9), rgba(0,0,0,.7))', zIndex: 1 }} />
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, padding: '52px 44px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.3)', marginBottom: 12 }}>
              Built For You
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(44px,6vw,70px)', textTransform: 'uppercase', lineHeight: .88, color: '#fff', margin: '0 0 16px' }}>
              YOU&apos;RE A<br />
              <span style={{ color: '#F9423A' }}>MANUFACTURER.</span>
            </h1>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, maxWidth: 360, marginBottom: 24 }}>
              Phillips Corporation delivers complete manufacturing solutions — from machine tools and automation to training and ongoing support — tailored for manufacturers like you.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 22px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 3 }}>
                Explore Solutions
              </button>
              <button style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,.25)', padding: '10px 22px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 3 }}>
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Right cell */}
        <div style={{ background: '#fff', display: 'flex', flexDirection: 'column' }}>
          {/* Filter bar */}
          <div style={{ background: '#f8f8f4', borderBottom: '1px solid #e5e5e0', padding: '0 36px', display: 'flex' }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '14px 20px',
                  fontSize: 11,
                  fontWeight: activeTab === tab.key ? 700 : 500,
                  color: activeTab === tab.key ? '#F9423A' : '#999',
                  borderBottom: activeTab === tab.key ? '2px solid #F9423A' : '2px solid transparent',
                  fontFamily: "'Montserrat', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div style={{ flex: 1, padding: '28px 36px' }}>

            {/* Overview tab */}
            {activeTab === 'overview' && (
              <>
                {/* 3-stat grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#000', marginBottom: 20 }}>
                  {stats.map((stat) => (
                    <div key={stat.label} style={{ background: '#f8f8f4', padding: 20, textAlign: 'center' as const }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#F9423A' }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#999', marginTop: 4 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2×2 solution grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#000', marginBottom: 20 }}>
                  {solutions.map((sol) => (
                    <div key={sol.prefix} style={{ background: '#fff', padding: 20, cursor: 'pointer', transition: 'all .3s' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: '#999', letterSpacing: '1px', marginBottom: 4 }}>
                        {sol.prefix}
                      </div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, textTransform: 'uppercase', color: '#000', marginBottom: 4 }}>
                        {sol.name}
                      </div>
                      <div style={{ fontSize: 10, color: '#888', lineHeight: 1.5 }}>
                        {sol.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4-column brand strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#000' }}>
                  {brands.map((brand) => (
                    <div key={brand} style={{ background: '#f8f8f4', padding: '14px 16px', textAlign: 'center' as const, cursor: 'pointer', transition: 'all .3s' }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, textTransform: 'uppercase', color: '#000', letterSpacing: '1px' }}>
                        {brand}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Solutions tab */}
            {activeTab === 'solutions' && (
              <>
                <h2 style={headingStyle}>Manufacturing Solutions</h2>
                <p style={bodyStyle}>
                  From CNC machining centers and turning centers to additive manufacturing and automated production cells, Phillips provides end-to-end manufacturing solutions. Our application engineers work directly with your team to optimize processes, reduce cycle times, and improve part quality.
                </p>
              </>
            )}

            {/* Brands tab */}
            {activeTab === 'brands' && (
              <>
                <h2 style={headingStyle}>Partner Brands</h2>
                <p style={bodyStyle}>
                  Phillips represents over 50 of the world&apos;s leading machine tool and manufacturing technology brands. Our partnerships with Haas, Hermle, GF Machining Solutions, EOS, FANUC, and dozens more give you access to the best technology for every application.
                </p>
              </>
            )}

            {/* Federal tab */}
            {activeTab === 'federal' && (
              <>
                <h2 style={headingStyle}>Federal Programs</h2>
                <p style={bodyStyle}>
                  Phillips Corporation maintains active contracts and partnerships with major federal facilities including the Center of Excellence for Advanced Manufacturing (COE-AMX), Norfolk Naval Shipyard (NNSY), and GSA Schedule contracts. Our federal team provides specialized support for defense manufacturing requirements, security clearance coordination, and compliance documentation.
                </p>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
