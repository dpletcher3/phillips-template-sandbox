'use client'

import { useState } from 'react'
import { ProductLinesData } from '@/components/templates/product-lines/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'
import Image from 'next/image'
import { IMAGES } from '@/lib/appealing-images'

const RED = '#F9423A'
const MAROON = '#3F0017'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

interface Props {
  data: ProductLinesData
}

export default function AppealingProductLinesClient({ data }: Props) {
  const [activeLine, setActiveLine] = useState(0)

  const active = data.series[activeLine]

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <TemplateBadge label="APPEALING" color={MAROON} />
      <AppealingNav />

      {/* ── Hero with Product Line Selector ── */}
      <section style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Image src={IMAGES.machineShop} alt="" fill style={{ objectFit: 'cover', opacity: 0.15 }} priority />
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 4vw, 56px)',
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            margin: '0 0 8px 0',
          }}>
            {data.brandName}
          </h1>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,.5)',
            margin: '0 0 32px 0',
          }}>
            Explore the complete product line
          </p>

          {/* Product line selector pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {data.series.map((line, i) => (
              <button
                key={line.name}
                onClick={() => setActiveLine(i)}
                style={{
                  padding: '8px 20px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: '"Barlow Condensed", sans-serif',
                  border: activeLine === i ? 'none' : '1px solid rgba(255,255,255,.2)',
                  background: activeLine === i ? RED : 'transparent',
                  color: '#fff',
                  borderRadius: '0',
                  transition: 'all 0.2s ease',
                }}
              >
                {line.name}
              </button>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ── Active Product Line Details ── */}
      {active && (
        <section style={{ padding: '64px 48px', background: '#fff' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 800,
              fontSize: '28px',
              textTransform: 'uppercase',
              margin: '0 0 4px 0',
              color: '#000',
            }}>
              {active.name}
            </h2>

            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: GREY,
              marginBottom: '8px',
            }}>
              {active.type} {active.type ? '/' : ''} {active.name} Series
            </div>

            <p style={{
              fontSize: '14px',
              color: GREY,
              fontStyle: 'italic',
              margin: '0 0 24px 0',
            }}>
              {active.tagline}
            </p>

            {/* 2-column grid: specs + image */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              marginBottom: '48px',
            }}>
              {/* Left: Key specs grid */}
              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}>
                  {/* Always show standard specs */}
                  {active.xTravel && (
                    <div style={{ background: LIGHT, padding: '16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY, marginBottom: '4px' }}>
                        X Travel
                      </div>
                      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '20px', color: RED }}>
                        {active.xTravel}
                      </div>
                    </div>
                  )}
                  {active.spindleSpeed && (
                    <div style={{ background: LIGHT, padding: '16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY, marginBottom: '4px' }}>
                        Spindle Speed
                      </div>
                      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '20px', color: RED }}>
                        {active.spindleSpeed}
                      </div>
                    </div>
                  )}
                  {active.tableLoad && (
                    <div style={{ background: LIGHT, padding: '16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY, marginBottom: '4px' }}>
                        Table Load
                      </div>
                      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '20px', color: RED }}>
                        {active.tableLoad}
                      </div>
                    </div>
                  )}
                  {active.bestFor && (
                    <div style={{ background: LIGHT, padding: '16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY, marginBottom: '4px' }}>
                        Best For
                      </div>
                      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '20px', color: RED }}>
                        {active.bestFor}
                      </div>
                    </div>
                  )}
                  {/* Additional keySpecs if present */}
                  {active.keySpecs?.map(ks => (
                    <div key={ks.label} style={{ background: LIGHT, padding: '16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: GREY, marginBottom: '4px' }}>
                        {ks.label}
                      </div>
                      <div style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, fontSize: '20px', color: RED }}>
                        {ks.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Image placeholder */}
              <div style={{
                background: LIGHT,
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '13px', color: GREY, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {active.name} Image
                </span>
              </div>
            </div>

            {/* Model details table */}
            {active.models && active.models.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#000' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontFamily: '"Barlow Condensed", sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff' }}>Model</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontFamily: '"Barlow Condensed", sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff' }}>Travel</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontFamily: '"Barlow Condensed", sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff' }}>Spindle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.models.map((m, i) => (
                      <tr key={m.name} style={{ background: i % 2 === 0 ? '#fff' : LIGHT }}>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 700, color: '#000' }}>{m.name}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: GREY }}>{m.travel}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', color: GREY }}>{m.spindle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Compare Models ── */}
      <section style={{ padding: '64px 48px', background: LIGHT }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: '28px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '0 0 40px 0',
            color: '#000',
          }}>
            Compare Models
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${data.series.length}, 1fr)`,
            gap: '20px',
          }}>
            {data.series.map((line, i) => {
              const isActive = i === activeLine
              return (
                <div
                  key={line.name}
                  onClick={() => setActiveLine(i)}
                  style={{
                    background: '#fff',
                    borderTop: isActive ? `4px solid ${RED}` : '4px solid transparent',
                    padding: '28px 24px',
                    cursor: 'pointer',
                    border: isActive ? 'none' : `1px solid ${BORDER}`,
                    borderTopWidth: isActive ? '4px' : '1px',
                    borderTopStyle: 'solid',
                    borderTopColor: isActive ? RED : BORDER,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: GREY,
                    marginBottom: '8px',
                  }}>
                    {line.type}
                  </div>

                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#000',
                    marginBottom: '12px',
                  }}>
                    {line.name}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: GREY,
                    lineHeight: 1.5,
                    marginBottom: '16px',
                  }}>
                    {line.tagline}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {line.xTravel && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: GREY }}>Travel</span>
                        <span style={{ color: RED, fontWeight: 700 }}>{line.xTravel}</span>
                      </div>
                    )}
                    {line.spindleSpeed && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: GREY }}>Spindle</span>
                        <span style={{ color: RED, fontWeight: 700 }}>{line.spindleSpeed}</span>
                      </div>
                    )}
                    {line.tableLoad && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: GREY }}>Table Load</span>
                        <span style={{ color: RED, fontWeight: 700 }}>{line.tableLoad}</span>
                      </div>
                    )}
                  </div>

                  <div style={{
                    marginTop: '16px',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: isActive ? RED : GREY,
                    fontFamily: '"Barlow Condensed", sans-serif',
                  }}>
                    {line.models.length} Model{line.models.length !== 1 ? 's' : ''} Available
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section style={{ padding: '80px 48px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{
            width: '40px',
            height: '3px',
            background: RED,
            margin: '0 auto 28px auto',
          }} />
          <h2 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: '36px',
            lineHeight: 1.15,
            margin: '0 0 16px 0',
            color: '#000',
          }}>
            Request Specifications
          </h2>
          <p style={{
            color: GREY,
            fontSize: '15px',
            lineHeight: 1.7,
            margin: '0 0 32px 0',
          }}>
            Get detailed specifications, pricing, and configuration options for the {data.brandName} product line.
          </p>
          <button style={{
            background: RED,
            color: '#fff',
            border: 'none',
            padding: '16px 40px',
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            animation: 'pulse 2.5s infinite',
          }}>
            Request Specifications
          </button>
        </div>
      </section>
    </div>
  )
}
