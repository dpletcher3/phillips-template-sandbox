'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IMAGES } from '@/lib/appealing-images'
import { PersonaData } from '@/components/templates/persona/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'

interface Props {
  persona: PersonaData
}

type TabKey = 'overview' | 'solutions' | 'brands' | 'federal'

export default function AppealingPersonaClient({ persona }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'solutions', label: 'Solutions' },
    { key: 'brands', label: 'Brands' },
    { key: 'federal', label: 'Federal' },
  ]

  const personaImage = persona.persona === 'federal' ? IMAGES.defense
    : persona.persona === 'educator' ? IMAGES.metalAM
    : IMAGES.machineShop

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* ── Split layout ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '42% 58%',
        minHeight: '600px',
      }}>
        {/* Left — dark gradient panel */}
        <div style={{
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
          padding: '60px 48px',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Image src={personaImage} alt="" fill style={{ objectFit: 'cover', opacity: 0.15 }} />
          {/* Radial glow */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(249,66,58,.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          <span style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,.4)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            display: 'block',
            position: 'relative',
            zIndex: 1,
          }}>
            For {persona.persona}
          </span>

          <h1 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 4vw, 56px)',
            color: '#fff',
            lineHeight: 1.05,
            margin: '0 0 16px 0',
            position: 'relative',
            zIndex: 1,
          }}>
            Your{' '}
            <em style={{ color: '#F9423A', fontStyle: 'italic' }}>
              {persona.headlineAccent}
            </em>
          </h1>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,.5)',
            margin: '16px 0 28px',
            maxWidth: '400px',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 1,
          }}>
            {persona.description}
          </p>

          <div style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
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
              {persona.ctaLabel}
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
              Explore
            </button>
          </div>
        </div>

        {/* Right — tabbed content panel */}
        <div style={{ padding: 0 }}>
          {/* Tab bar */}
          <div style={{
            background: '#F2F4F6',
            display: 'flex',
          }}>
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '14px 24px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.key ? '3px solid #F9423A' : '3px solid transparent',
                  color: activeTab === tab.key ? '#000' : '#647883',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div style={{ padding: '36px 48px' }}>
            {activeTab === 'overview' && (
              <div>
                {/* Stats row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '32px',
                }}>
                  {persona.tabs.stats.map((stat, i) => (
                    <div key={i} style={{
                      background: '#F2F4F6',
                      padding: '20px',
                      textAlign: 'center',
                      borderBottom: '3px solid transparent',
                      transition: 'border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderBottom = '3px solid #F9423A'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderBottom = '3px solid transparent'
                    }}
                    >
                      <div style={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        fontWeight: 800,
                        fontSize: '28px',
                        color: '#F9423A',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#647883',
                        marginTop: '4px',
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Solution grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}>
                  {persona.tabs.solutions.slice(0, 4).map((sol, i) => (
                    <div key={i} style={{
                      border: '1px solid #D7DFE3',
                      padding: '20px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'
                      ;(e.currentTarget as HTMLElement).style.borderBottom = '3px solid #F9423A'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                      ;(e.currentTarget as HTMLElement).style.borderBottom = '1px solid #D7DFE3'
                    }}
                    >
                      <div style={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        fontWeight: 700,
                        fontSize: '15px',
                        color: '#000',
                        marginBottom: '6px',
                      }}>
                        {sol.label}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#647883',
                        lineHeight: 1.5,
                      }}>
                        {sol.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'solutions' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}>
                {persona.tabs.solutions.map((sol, i) => (
                  <div key={i} style={{
                    border: '1px solid #D7DFE3',
                    padding: '20px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'
                    ;(e.currentTarget as HTMLElement).style.borderBottom = '3px solid #F9423A'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLElement).style.borderBottom = '1px solid #D7DFE3'
                  }}
                  >
                    <div style={{
                      fontFamily: '"Barlow Condensed", sans-serif',
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#000',
                      marginBottom: '6px',
                    }}>
                      {sol.label}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#647883',
                      lineHeight: 1.5,
                    }}>
                      {sol.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'brands' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}>
                {persona.tabs.brands.map((brand, i) => (
                  <div key={i} style={{
                    border: '1px solid #D7DFE3',
                    padding: '20px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'
                    ;(e.currentTarget as HTMLElement).style.borderBottom = '3px solid #F9423A'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    ;(e.currentTarget as HTMLElement).style.borderBottom = '1px solid #D7DFE3'
                  }}
                  >
                    <div style={{
                      fontFamily: '"Barlow Condensed", sans-serif',
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#000',
                      marginBottom: '6px',
                    }}>
                      {brand.label}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#647883',
                      lineHeight: 1.5,
                    }}>
                      {brand.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'federal' && (
              <div>
                <h3 style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 800,
                  fontSize: '22px',
                  color: '#000',
                  margin: '0 0 12px 0',
                }}>
                  Federal &amp; Defense Programs
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#647883',
                  lineHeight: 1.7,
                  margin: '0 0 24px 0',
                }}>
                  Phillips supports federal buyers with ITAR-compliant procurement, GSA Schedule contracts, and dedicated service for military manufacturing facilities.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}>
                  {persona.tabs.federal.map((item, i) => (
                    <div key={i} style={{
                      border: '1px solid #D7DFE3',
                      padding: '20px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'
                      ;(e.currentTarget as HTMLElement).style.borderBottom = '3px solid #F9423A'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                      ;(e.currentTarget as HTMLElement).style.borderBottom = '1px solid #D7DFE3'
                    }}
                    >
                      <div style={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        fontWeight: 700,
                        fontSize: '15px',
                        color: '#000',
                        marginBottom: '6px',
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#647883',
                        lineHeight: 1.5,
                      }}>
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
