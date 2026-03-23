'use client'

import { useState } from 'react'
import { CourseData } from '@/components/templates/course/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'
import Image from 'next/image'
import { IMAGES } from '@/lib/appealing-images'

interface Props {
  data: CourseData
}

export default function AppealingCourseClient({ data }: Props) {
  const [selectedModules, setSelectedModules] = useState<Set<number>>(
    () => new Set(data.modules.slice(0, 3).map((_, i) => i))
  )

  const toggleModule = (index: number) => {
    setSelectedModules(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const titleWords = data.title.split(' ')
  const lastTwo = titleWords.slice(-2).join(' ')
  const firstPart = titleWords.slice(0, -2).join(' ')

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* ── Maroon Topbar ── */}
      <div style={{
        background: '#3F0017',
        padding: '10px 48px',
      }}>
        <div style={{
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>
          <a href="/appealing" style={{ color: '#fff', textDecoration: 'none', opacity: 0.7 }}>Sandbox</a>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>/</span>
          <a href="/appealing" style={{ color: '#fff', textDecoration: 'none', opacity: 0.7 }}>Training</a>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>/</span>
          <span style={{ color: '#fff' }}>Course</span>
        </div>
      </div>

      {/* ── Dark Gradient Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
        padding: '48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '48px',
          alignItems: 'start',
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          {/* Left column */}
          <div>
            <span style={{
              display: 'inline-block',
              background: '#F9423A',
              color: '#fff',
              fontFamily: '"Barlow Condensed", sans-serif',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '2px',
              marginBottom: '16px',
            }}>
              {data.track}
            </span>

            <h1 style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 44px)',
              color: '#fff',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              margin: '0 0 8px 0',
            }}>
              {firstPart}{' '}
              <em style={{ color: '#F9423A', fontStyle: 'italic' }}>{lastTwo}</em>
            </h1>

            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#647883',
              marginBottom: '4px',
            }}>
              {data.level}
            </div>

            <p style={{
              color: 'rgba(255,255,255,.5)',
              fontSize: '14px',
              lineHeight: 1.6,
              margin: '16px 0',
              maxWidth: '500px',
            }}>
              {data.description}
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
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
                Enroll Now
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
                View Dates
              </button>
            </div>
          </div>

          {/* Right column — Image panel + Dark glass info card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '2px' }}>
              <Image src={IMAGES.training} alt="Training environment" fill style={{ objectFit: 'cover' }} priority />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.25)' }} />
            </div>
            <div style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.1)',
              borderTop: '4px solid #F9423A',
              padding: '28px',
            }}>
              {[
                { label: 'Duration', value: data.duration },
                { label: 'Schedule', value: data.schedule },
                { label: 'Price', value: data.price },
                { label: 'Location', value: data.location },
                { label: 'Machines', value: data.machines.join(', ') },
              ].map((row, i, arr) => (
                <div key={row.label} style={{
                  padding: '12px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none',
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.4)',
                    marginBottom: '4px',
                  }}>
                    {row.label}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#fff',
                  }}>
                    {row.value}
                  </div>
                </div>
              ))}

              <button style={{
                marginTop: '20px',
                width: '100%',
                padding: '12px',
                background: '#F9423A',
                color: '#fff',
                border: 'none',
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                animation: 'pulse 2.5s infinite',
              }}>
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Module Selection ── */}
      <section style={{
        background: '#F2F4F6',
        padding: '64px 48px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 800,
            fontSize: '22px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '0 0 32px 0',
            color: '#000',
          }}>
            Select Your Modules
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {data.modules.map((mod, i) => {
              const isSelected = selectedModules.has(i)
              return (
                <div
                  key={i}
                  onClick={() => toggleModule(i)}
                  style={{
                    background: '#fff',
                    border: isSelected ? '2px solid #F9423A' : '1px solid #D7DFE3',
                    padding: '20px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      color: '#F9423A',
                      fontSize: '14px',
                      fontWeight: 700,
                    }}>
                      &#10003;
                    </div>
                  )}

                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#F9423A',
                    color: '#fff',
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {mod.number}
                  </div>

                  <div style={{
                    fontFamily: '"Barlow Condensed", sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    marginTop: '12px',
                    color: '#000',
                  }}>
                    {mod.title}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: '#647883',
                    lineHeight: 1.5,
                    marginTop: '8px',
                  }}>
                    {mod.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Enroll CTA ── */}
      <div style={{
        padding: '0 48px 64px 48px',
        background: '#F2F4F6',
        textAlign: 'center',
      }}>
        <button style={{
          display: 'block',
          margin: '0 auto',
          padding: '14px 40px',
          background: '#F9423A',
          color: '#fff',
          border: 'none',
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          animation: 'pulse 2.5s infinite',
        }}>
          Enroll in Selected Modules
        </button>
      </div>

      {/* ── Prerequisites ── */}
      {data.prerequisites && data.prerequisites.length > 0 && (
        <section style={{
          padding: '48px',
          background: '#fff',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h3 style={{
              fontFamily: '"Barlow Condensed", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#647883',
              margin: '0 0 20px 0',
            }}>
              Prerequisites
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {data.prerequisites.map((prereq, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  color: '#333',
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#F9423A',
                    flexShrink: 0,
                  }} />
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}
