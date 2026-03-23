'use client'

import { useState, useEffect } from 'react'
import { GuideData } from '@/components/templates/guide/types'
import TemplateBadge from '@/components/TemplateBadge'

interface ProgressBar {
  label: string
  target: number
}

const PERFORMANCE_BARS: ProgressBar[] = [
  { label: 'Spindle Speed Capacity', target: 92 },
  { label: 'Axis Travel Range', target: 78 },
  { label: 'Thermal Stability', target: 85 },
]

export default function AppealingGuideClient({ data }: { data: GuideData }) {
  const [activeSection, setActiveSection] = useState<string>(data.sections[0]?.id ?? '')
  const [animatedWidths, setAnimatedWidths] = useState<number[]>(PERFORMANCE_BARS.map(() => 0))

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidths(PERFORMANCE_BARS.map(b => b.target))
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const splitTitle = (title: string) => {
    const words = title.split(' ')
    if (words.length <= 2) return { main: '', highlight: title }
    const highlight = words.slice(-2).join(' ')
    const main = words.slice(0, -2).join(' ')
    return { main, highlight }
  }

  const { main: titleMain, highlight: titleHighlight } = splitTitle(data.title)

  return (
    <div style={{ fontFamily: '"Inter", system-ui, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,66,58,.4); }
          50% { box-shadow: 0 0 0 12px rgba(249,66,58,0); }
        }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />

      {/* Red topbar breadcrumb */}
      <div style={{
        width: '100%',
        background: '#F9423A',
        padding: '10px 48px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          fontSize: '9px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#fff',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Sandbox</a>
          <span>/</span>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Resources</a>
          <span>/</span>
          <span style={{ opacity: 0.8 }}>Guide</span>
        </div>
      </div>

      {/* Dark gradient hero */}
      <div style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 50%, #3F0017 100%)',
        padding: '48px',
      }}>
        {/* Doc number */}
        <div style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#fff',
          marginBottom: '16px',
        }}>
          Document <span style={{ color: '#F9423A' }}>{data.docId}</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(36px, 4vw, 52px)',
          color: '#fff',
          lineHeight: 1.1,
          margin: '0 0 28px 0',
        }}>
          {titleMain}{' '}
          <em style={{ color: '#F9423A', fontStyle: 'normal' }}>{titleHighlight}</em>
        </h1>

        {/* Metadata chips */}
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {data.metadata.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#fff',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.5)' }}>{m.label}</span>
              <span style={{ fontSize: '10px', color: '#fff' }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2-col body */}
      <div style={{
        padding: '48px',
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: '48px',
      }}>
        {/* Left: Sticky TOC */}
        <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
          <div style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '3px',
            color: '#647883',
            marginBottom: '20px',
          }}>
            CONTENTS
          </div>
          {data.sections.map((section, i) => {
            const isActive = activeSection === section.id
            return (
              <div
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  padding: '8px 12px',
                  borderLeft: isActive ? '2px solid #F9423A' : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  fontSize: '11px',
                  color: '#F9423A',
                  marginBottom: '2px',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: isActive ? '#F9423A' : '#333',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'color 0.2s',
                }}>
                  {section.heading}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Content sections */}
        <div>
          {data.sections.map((section, i) => (
            <div key={section.id} style={{ marginBottom: '48px' }}>
              {/* Section label */}
              <div style={{
                color: '#F9423A',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '8px',
              }}>
                Section {String(i + 1).padStart(2, '0')}
              </div>

              {/* Section title */}
              <h2
                id={section.id}
                style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 800,
                  fontSize: '24px',
                  color: '#111',
                  margin: '0 0 16px 0',
                }}
              >
                {section.heading}
              </h2>

              {/* Body text */}
              <div style={{
                fontSize: '14px',
                lineHeight: 1.8,
                color: '#444',
                marginBottom: '24px',
              }}>
                {section.body.split('\n\n').map((p, pi) => (
                  <p key={pi} style={{ margin: '0 0 12px 0' }}>{p}</p>
                ))}
              </div>

              {/* Callout */}
              {section.callout && (
                <div style={{
                  background: '#F2F4F6',
                  borderLeft: '3px solid #F9423A',
                  padding: '20px',
                  marginBottom: '24px',
                }}>
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#111',
                    marginBottom: '10px',
                  }}>
                    {section.callout.title}
                  </div>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '18px',
                    fontSize: '13px',
                    lineHeight: 1.7,
                    color: '#444',
                  }}>
                    {section.callout.items.map((item, ci) => (
                      <li key={ci}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Performance Ranges after every other section (odd index = every 2nd) */}
              {i % 2 === 1 && (
                <div style={{
                  background: '#F2F4F6',
                  padding: '24px',
                  marginBottom: '24px',
                }}>
                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#111',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>
                    Performance Ranges
                  </div>
                  {PERFORMANCE_BARS.map((bar, bi) => (
                    <div key={bi} style={{ marginBottom: bi < PERFORMANCE_BARS.length - 1 ? '14px' : 0 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                        fontSize: '12px',
                        color: '#333',
                      }}>
                        <span>{bar.label}</span>
                        <span style={{ fontWeight: 600 }}>{animatedWidths[bi]}%</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: '#647883',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${animatedWidths[bi]}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #F9423A, #F68B33)',
                          borderRadius: '3px',
                          transition: 'width 1.2s ease-out',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
