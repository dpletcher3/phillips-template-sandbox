'use client'

import { useState, useEffect } from 'react'
import { SolutionData } from '@/components/templates/solution/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'
import Image from 'next/image'
import { IMAGES } from '@/lib/appealing-images'

interface Props {
  sol: SolutionData
}

export default function AppealingSolutionClient({ sol }: Props) {
  const [toggledSpecs, setToggledSpecs] = useState<Set<number>>(new Set())
  const [selectedBrands, setSelectedBrands] = useState<Set<number>>(new Set())
  const [barWidths, setBarWidths] = useState<number[]>(sol.specs.map(() => 0))

  useEffect(() => {
    sol.specs.forEach((_, i) => {
      setTimeout(() => {
        setBarWidths(prev => {
          const next = [...prev]
          next[i] = (sol.specs[i].value / sol.specs[i].max) * 100
          return next
        })
      }, 200 * i)
    })
  }, [sol.specs])

  const toggleSpec = (i: number) => {
    setToggledSpecs(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const toggleBrand = (i: number) => {
    setSelectedBrands(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
        padding: '60px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Image src={IMAGES.machineVMC} alt="" fill style={{ objectFit: 'cover', opacity: 0.15 }} priority />
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(246,139,51,.15)',
            color: '#F68B33',
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            padding: '6px 16px',
            borderRadius: '20px',
            marginBottom: '20px',
          }}>
            {sol.offering}
          </span>

          <h1 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(44px, 5vw, 72px)',
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            margin: '0 0 16px 0',
          }}>
            {sol.name}
          </h1>

          <p style={{
            color: '#647883',
            fontSize: '16px',
            lineHeight: 1.6,
            margin: '0 0 32px 0',
            maxWidth: '600px',
          }}>
            {sol.shortDesc}
          </p>

          {/* Spec numbers row */}
          <div style={{ display: 'flex', gap: '48px', marginBottom: '36px' }}>
            {sol.specNumbers.map((sn, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#F9423A',
                  lineHeight: 1.1,
                }}>
                  {sn.value}
                </div>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#647883',
                  marginTop: '4px',
                }}>
                  {sn.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{
              background: '#F9423A',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              animation: 'pulse 2.5s infinite',
            }}>
              {sol.ctaPrimaryLabel}
            </button>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,.3)',
              padding: '14px 32px',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}>
              {sol.ctaSecondaryLabel}
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* ── What Delivers ── */}
      <section style={{ padding: '64px 48px', background: '#fff' }}>
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
            What Delivers <span style={{ color: '#F9423A' }}>{sol.name}</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}>
            {sol.specs.slice(0, 4).map((spec, i) => {
              const isToggled = toggledSpecs.has(i)
              const pct = (spec.value / spec.max) * 100
              return (
                <div
                  key={i}
                  onClick={() => toggleSpec(i)}
                  style={{
                    background: isToggled ? '#000' : '#F2F4F6',
                    padding: '28px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#647883',
                    marginBottom: '8px',
                  }}>
                    {spec.label}
                  </div>
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '28px',
                    fontWeight: 800,
                    color: isToggled ? '#F9423A' : '#000',
                    marginBottom: '4px',
                  }}>
                    {spec.value.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#647883',
                    marginBottom: '16px',
                  }}>
                    {spec.unit}
                  </div>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: isToggled ? 'rgba(255,255,255,.1)' : '#D7DFE3',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #F9423A, #F68B33)',
                      borderRadius: '2px',
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Best in Class ── */}
      <section style={{ padding: '64px 48px', background: '#F2F4F6' }}>
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
            Best in Class
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {sol.relatedBrands.map((brand, i) => {
              const isSelected = selectedBrands.has(i)
              return (
                <div
                  key={i}
                  onClick={() => toggleBrand(i)}
                  style={{
                    background: '#fff',
                    border: isSelected ? '2px solid #F9423A' : '1px solid #D7DFE3',
                    padding: '32px 28px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                  }}
                >
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#F9423A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}>
                      &#10003;
                    </div>
                  )}

                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: isSelected ? '#F9423A' : '#000',
                    marginBottom: '12px',
                    transition: 'color 0.3s ease',
                  }}>
                    {brand.name}
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#647883',
                    lineHeight: 1.6,
                  }}>
                    {brand.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── The Numbers ── */}
      <section style={{ padding: '64px 48px', background: '#fff' }}>
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
            The Numbers
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'start',
          }}>
            {/* Left — animated progress bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {sol.specs.map((spec, i) => (
                <div key={i}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '8px',
                  }}>
                    <span style={{
                      fontFamily: '"Barlow Condensed", sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: '#647883',
                    }}>
                      {spec.label}
                    </span>
                    <span style={{
                      fontFamily: '"Barlow Condensed", sans-serif',
                      fontSize: '16px',
                      fontWeight: 800,
                      color: '#000',
                    }}>
                      {spec.value.toLocaleString()} {spec.unit}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: '#F2F4F6',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${barWidths[i]}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #F9423A, #F68B33)',
                      borderRadius: '3px',
                      transition: 'width 1.2s ease',
                    }} />
                  </div>
                  {spec.note && (
                    <div style={{
                      fontSize: '11px',
                      color: '#647883',
                      marginTop: '4px',
                    }}>
                      {spec.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right — description + CTA */}
            <div>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#647883',
                margin: '0 0 28px 0',
              }}>
                {sol.specsDescription}
              </p>
              <button style={{
                background: '#F9423A',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                animation: 'pulse 2.5s infinite',
              }}>
                {sol.ctaPrimaryLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section style={{ padding: '80px 48px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{
            width: '40px',
            height: '3px',
            background: '#F9423A',
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
            {sol.ctaHeading}{' '}
            <em style={{ color: '#F9423A', fontStyle: 'italic' }}>{sol.ctaAccent}</em>
          </h2>
          <p style={{
            color: '#647883',
            fontSize: '15px',
            lineHeight: 1.7,
            margin: '0 0 32px 0',
          }}>
            {sol.ctaDescription}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{
              background: '#F9423A',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              animation: 'pulse 2.5s infinite',
            }}>
              {sol.ctaPrimaryLabel}
            </button>
            <button style={{
              background: 'transparent',
              color: '#000',
              border: '1px solid #D7DFE3',
              padding: '14px 32px',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}>
              {sol.ctaSecondaryLabel}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
