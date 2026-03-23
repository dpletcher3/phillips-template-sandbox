'use client'

import Image from 'next/image'
import { CaseStudyData } from '@/components/templates/case-study/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'
import { IMAGES } from '@/lib/appealing-images'

const RED = '#F9423A'
const GOLD = '#F68B33'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function AppealingCaseStudyClient({ data }: { data: CaseStudyData }) {
  const timelineItems = [
    { label: 'Challenge', title: 'The Problem', body: data.lede || data.bodyLeft.split('\n\n')[0] || '' },
    { label: 'Solution', title: 'Our Approach', body: data.bodyRight.split('\n\n')[0] || '' },
    {
      label: 'Result',
      title: 'The Outcome',
      body: data.bodyRight.split('\n\n').slice(1).join(' ') || data.bodyLeft.split('\n\n').slice(1).join(' ') || '',
      quote: data.pullQuote,
      quoteAuthor: data.pullAuthor,
    },
  ]

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`@keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }`}</style>
      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* Dark gradient hero */}
      <section style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 50%, #3F0017 100%)',
        color: '#fff',
        padding: '60px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Image src={IMAGES.machineShop} alt="" fill style={{ objectFit: 'cover', opacity: 0.2 }} priority />
        <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }}>
          {/* Left column */}
          <div>
            <div style={{ marginBottom: 20 }}>
              {data.tags.map(t => (
                <span key={t} style={{
                  display: 'inline-block',
                  background: GOLD,
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  marginRight: 8,
                  marginBottom: 6,
                }}>{t}</span>
              ))}
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(36px, 4vw, 56px)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              lineHeight: 1.05,
              margin: '0 0 12px',
              color: '#fff',
            }}>{data.title}</h1>
            <p style={{ fontSize: 13, color: GREY, margin: '0 0 28px' }}>{data.byline}</p>

            {/* Quick stats row */}
            <div style={{ display: 'flex', gap: 32 }}>
              {data.results.slice(0, 3).map((r, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: RED,
                    lineHeight: 1.1,
                  }}>{r.value}</div>
                  <div style={{ fontSize: 10, color: GREY, textTransform: 'uppercase', letterSpacing: '1px', marginTop: 4 }}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: stacked cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Challenge card */}
            <div style={{ background: '#111', padding: 28, flex: 1 }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: GOLD,
                marginBottom: 10,
              }}>CHALLENGE</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: '#fff',
                marginBottom: 8,
              }}>The Problem</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.6 }}>
                {data.lede || data.bodyLeft.split('\n\n')[0] || ''}
              </div>
            </div>

            {/* Solution card */}
            <div style={{ background: RED, padding: 28, flex: 1 }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: GOLD,
                marginBottom: 10,
              }}>SOLUTION</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: '#fff',
                marginBottom: 8,
              }}>Our Approach</div>
              <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.6 }}>
                {data.bodyRight.split('\n\n')[0] || ''}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* White body */}
      <section style={{ padding: '64px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48 }}>
          {/* Left: Timeline */}
          <div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 24,
              textTransform: 'uppercase',
              letterSpacing: 1,
              margin: '0 0 32px',
            }}>Challenge. Solution. Result.</h2>

            <div style={{ position: 'relative', paddingLeft: 32 }}>
              {/* Connecting line */}
              <div style={{
                position: 'absolute',
                left: 5,
                top: 6,
                bottom: 6,
                width: 2,
                background: BORDER,
              }} />

              {timelineItems.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i < timelineItems.length - 1 ? 40 : 0 }}>
                  {/* Red dot */}
                  <div style={{
                    position: 'absolute',
                    left: -32,
                    top: 2,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: RED,
                    zIndex: 1,
                  }} />
                  <div style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: GOLD,
                    marginBottom: 6,
                  }}>{item.label}</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: 8,
                  }}>{item.title}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: GREY, margin: 0 }}>{item.body}</p>

                  {/* Pull quote on third item */}
                  {item.quote && (
                    <blockquote style={{
                      borderLeft: `3px solid ${RED}`,
                      background: LIGHT,
                      padding: 20,
                      margin: '20px 0 0',
                      fontStyle: 'italic',
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: '#333',
                    }}>
                      &ldquo;{item.quote}&rdquo;
                      {item.quoteAuthor && (
                        <footer style={{ marginTop: 8, fontSize: 12, fontStyle: 'normal', color: GREY }}>
                          — {item.quoteAuthor}
                        </footer>
                      )}
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <aside>
            {/* Solutions Used */}
            <div style={{ background: LIGHT, padding: 24, marginBottom: 16 }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: GREY,
                marginBottom: 12,
              }}>Solutions Used</div>
              {data.sidebarItems.map(item => (
                <div key={item} style={{
                  fontSize: 13,
                  padding: '6px 0',
                  color: '#444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <span style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: RED,
                    flexShrink: 0,
                  }} />
                  {item}
                </div>
              ))}
            </div>

            {/* Results at a Glance */}
            <div style={{ background: '#000', color: '#fff', padding: 24 }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: GREY,
                marginBottom: 16,
              }}>Results at a Glance</div>
              {data.results.map((r, i) => (
                <div key={i} style={{
                  padding: '12px 0',
                  borderBottom: i < data.results.length - 1 ? '1px solid rgba(255,255,255,.1)' : 'none',
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: 24,
                    color: GOLD,
                    lineHeight: 1.1,
                  }}>{r.value}</div>
                  <div style={{ fontSize: 11, color: '#fff', marginTop: 4, opacity: 0.7 }}>{r.label}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* CTA footer */}
      <section style={{ background: '#fff', padding: '48px', textAlign: 'center' }}>
        <div style={{
          width: 40,
          height: 3,
          background: RED,
          margin: '0 auto 24px',
        }} />
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 32,
          textTransform: 'uppercase',
          margin: '0 0 12px',
        }}>
          Transform Your <em style={{ color: RED, fontStyle: 'normal' }}>Operations</em>
        </h2>
        <p style={{ fontSize: 14, color: GREY, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>
          See how Phillips Corporation can help you achieve similar results with our proven solutions and expert support.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button style={{
            background: RED,
            color: '#fff',
            border: 'none',
            padding: '14px 36px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            animation: 'pulse 2.5s infinite',
          }}>Get Started</button>
          <button style={{
            background: 'transparent',
            color: '#1a1a1a',
            border: `2px solid ${BORDER}`,
            padding: '14px 36px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}>Learn More</button>
        </div>
      </section>
    </main>
  )
}
