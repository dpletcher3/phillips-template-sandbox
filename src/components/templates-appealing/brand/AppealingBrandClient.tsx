'use client'

import { useState, useCallback } from 'react'
import { BrandData } from '@/components/templates/brand/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'

interface Props {
  brand: BrandData
}

export default function AppealingBrandClient({ brand }: Props) {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [startRotation, setStartRotation] = useState(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setStartRotation(rotation)
  }, [rotation])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const delta = e.clientX - dragStartX
    setRotation(startRotation + delta)
  }, [isDragging, dragStartX, startRotation])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const displayDegrees = Math.round(((rotation % 360) + 360) % 360)

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
        padding: '60px 48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '48px',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          {/* Left column */}
          <div>
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
              {brand.categories[0] || 'CNC Machining'}
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
              {brand.name}
            </h1>

            <p style={{
              color: '#647883',
              fontSize: '16px',
              lineHeight: 1.6,
              margin: '0 0 32px 0',
              maxWidth: '520px',
            }}>
              {brand.tagline}
            </p>

            {/* Quick stats row */}
            <div style={{ display: 'flex', gap: '40px', marginBottom: '36px' }}>
              {brand.heroStats.map((stat, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '32px',
                    fontWeight: 800,
                    color: '#F9423A',
                    lineHeight: 1.1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#647883',
                    marginTop: '4px',
                  }}>
                    {stat.label}
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
                Request a Quote
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
                Explore Machines
              </button>
            </div>
          </div>

          {/* Right column — floating circle */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,.15)',
                animation: isDragging ? 'none' : 'float 4s ease-in-out infinite',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                transform: `rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
              }}
            >
              <span style={{ fontSize: '48px' }}>&#9881;</span>
              <span style={{
                fontSize: '10px',
                color: '#647883',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '8px',
              }}>
                Drag to Rotate
              </span>
              <span style={{
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: '20px',
                fontWeight: 800,
                color: '#F9423A',
                marginTop: '4px',
              }}>
                {displayDegrees}&deg;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Built for Performance ── */}
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
            Built for Performance
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}>
            {brand.productLines.slice(0, 8).map((pl, i) => {
              const isActive = activeCard === i
              return (
                <div
                  key={i}
                  onClick={() => setActiveCard(isActive ? null : i)}
                  style={{
                    background: isActive ? '#000' : '#F2F4F6',
                    padding: '24px',
                    cursor: 'pointer',
                    borderLeft: !isActive ? 'none' : 'none',
                    transition: 'all 0.3s ease',
                    ...((!isActive) ? { borderLeft: '3px solid transparent' } : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderLeft = '3px solid #F9423A'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderLeft = '3px solid transparent'
                    }
                  }}
                >
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: isActive ? '#647883' : '#647883',
                    marginBottom: '8px',
                  }}>
                    {pl.seriesLabel}
                  </div>
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: isActive ? '#fff' : '#000',
                    marginBottom: '8px',
                  }}>
                    {pl.name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: isActive ? 'rgba(255,255,255,.6)' : '#647883',
                    lineHeight: 1.5,
                    marginBottom: '12px',
                  }}>
                    {pl.description}
                  </div>
                  {pl.xTravel && (
                    <div style={{ fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: isActive ? '#647883' : '#647883' }}>Travel: </span>
                      <span style={{ color: isActive ? '#F9423A' : '#000', fontWeight: 700 }}>{pl.xTravel}</span>
                    </div>
                  )}
                  {pl.spindleSpeed && (
                    <div style={{ fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: isActive ? '#647883' : '#647883' }}>Spindle: </span>
                      <span style={{ color: isActive ? '#F9423A' : '#000', fontWeight: 700 }}>{pl.spindleSpeed}</span>
                    </div>
                  )}
                  {pl.axes && (
                    <div style={{ fontSize: '11px' }}>
                      <span style={{ color: isActive ? '#647883' : '#647883' }}>Axes: </span>
                      <span style={{ color: isActive ? '#F9423A' : '#000', fontWeight: 700 }}>{pl.axes}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Find Your Fit ── */}
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
            Find Your Fit
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {brand.productLines.slice(0, 3).map((pl, i) => {
              const isCenter = i === 1
              return (
                <div key={i} style={{
                  background: isCenter ? '#000' : '#fff',
                  border: isCenter ? 'none' : '1px solid #D7DFE3',
                  borderTop: isCenter ? '4px solid #F9423A' : '1px solid #D7DFE3',
                  padding: '36px 28px',
                  position: 'relative',
                }}>
                  {isCenter && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(246,139,51,.15)',
                      color: '#F68B33',
                      fontFamily: '"Barlow Condensed", sans-serif',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '10px',
                    }}>
                      Popular
                    </div>
                  )}

                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#647883',
                    marginBottom: '8px',
                  }}>
                    {pl.seriesLabel}
                  </div>

                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '24px',
                    fontWeight: 800,
                    color: isCenter ? '#fff' : '#000',
                    marginBottom: '12px',
                  }}>
                    {pl.name}
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: isCenter ? 'rgba(255,255,255,.6)' : '#647883',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}>
                    {pl.description}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pl.xTravel && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: '#647883' }}>Travel</span>
                        <span style={{ color: isCenter ? '#F9423A' : '#000', fontWeight: 700 }}>{pl.xTravel}</span>
                      </div>
                    )}
                    {pl.spindleSpeed && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: '#647883' }}>Spindle</span>
                        <span style={{ color: isCenter ? '#F9423A' : '#000', fontWeight: 700 }}>{pl.spindleSpeed}</span>
                      </div>
                    )}
                    {pl.axes && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: '#647883' }}>Axes</span>
                        <span style={{ color: isCenter ? '#F9423A' : '#000', fontWeight: 700 }}>{pl.axes}</span>
                      </div>
                    )}
                    {pl.bestFor && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: '#647883' }}>Best For</span>
                        <span style={{ color: isCenter ? '#F9423A' : '#000', fontWeight: 700 }}>{pl.bestFor}</span>
                      </div>
                    )}
                  </div>

                  <button style={{
                    marginTop: '24px',
                    width: '100%',
                    padding: '12px',
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    background: isCenter ? '#F9423A' : 'transparent',
                    color: isCenter ? '#fff' : '#000',
                    border: isCenter ? 'none' : '1px solid #D7DFE3',
                  }}>
                    Learn More
                  </button>
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
            Ready to Elevate Your{' '}
            <em style={{ color: '#F9423A', fontStyle: 'italic' }}>Production</em>?
          </h2>
          <p style={{
            color: '#647883',
            fontSize: '15px',
            lineHeight: 1.7,
            margin: '0 0 32px 0',
          }}>
            Talk to our applications engineers about the right {brand.name} solution for your shop.
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
              Get a Quote
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
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
