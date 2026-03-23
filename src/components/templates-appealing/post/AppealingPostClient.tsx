'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PostData } from '@/components/templates/post/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'
import { IMAGES } from '@/lib/appealing-images'

const RED = '#F9423A'
const GOLD = '#F68B33'
const MAROON = '#3F0017'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

const CARD_ICONS = ['\u{1F4F0}', '\u{1F4CA}', '\u{1F527}']

export default function AppealingPostClient({ data }: { data: PostData }) {
  const [activeSection, setActiveSection] = useState(data.sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { for (const e of entries) if (e.isIntersecting) setActiveSection(e.target.id) },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    data.sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [data.sections])

  const authorInitials = data.author
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
        .flip-card { perspective: 1000px; cursor: pointer; }
        .flip-inner { transition: transform .5s; transform-style: preserve-3d; position: relative; width: 100%; height: 100%; }
        .flip-card:hover .flip-inner { transform: rotateY(180deg); }
        .flip-front, .flip-back { backface-visibility: hidden; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .flip-back { transform: rotateY(180deg); }
      `}</style>
      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* Dark gradient hero */}
      <header style={{
        background: 'linear-gradient(135deg, #000 0%, #1a1a1a 50%, #3F0017 100%)',
        color: '#fff',
        padding: '60px 48px',
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {/* Category pills */}
          <div style={{ marginBottom: 20 }}>
            {data.categories.map((c, i) => (
              <span key={c} style={{
                display: 'inline-block',
                background: i === 0 ? GOLD : GREY,
                color: '#fff',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '4px 10px',
                marginRight: 8,
                marginBottom: 6,
              }}>{c}</span>
            ))}
          </div>

          {/* Headline with red accent on last 3 words */}
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(36px, 4vw, 52px)',
            textTransform: 'uppercase',
            letterSpacing: 1,
            lineHeight: 1.05,
            margin: '0 0 20px',
            color: '#fff',
          }}>
            {(() => {
              const words = data.title.split(' ')
              const mainWords = words.slice(0, -3).join(' ')
              const accentWords = words.slice(-3).join(' ')
              return (
                <>
                  {mainWords}{' '}
                  <em style={{ color: RED, fontStyle: 'normal' }}>{accentWords}</em>
                </>
              )
            })()}
          </h1>

          {/* Author row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: MAROON,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
            }}>{authorInitials}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{data.author}</div>
              <div style={{ fontSize: 12, color: GREY }}>{data.date} · {data.readTime}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ position: 'relative', width: '100%', height: '280px' }}>
          <Image src={IMAGES.metalAM} alt={data.title} fill style={{ objectFit: 'cover' }} priority />
        </div>
      </div>

      {/* Body + TOC */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '48px 48px 64px',
        display: 'grid',
        gridTemplateColumns: '1fr 240px',
        gap: 48,
      }}>
        {/* Left: Article prose */}
        <article>
          {data.sections.map((s, si) => (
            <section key={s.id} id={s.id} style={{ marginBottom: 40 }}>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                textTransform: 'uppercase',
                letterSpacing: 1,
                margin: '0 0 16px',
              }}>{s.heading}</h3>
              {s.body.split('\n\n').map((p, pi) => (
                <p key={pi} style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: '#444',
                  margin: '0 0 16px',
                }}>
                  {si === 0 && pi === 0 ? (
                    <>
                      <span style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 52,
                        fontWeight: 800,
                        color: RED,
                        float: 'left',
                        lineHeight: 1,
                        marginRight: 8,
                        paddingTop: 4,
                      }}>{p[0]}</span>
                      {p.slice(1)}
                    </>
                  ) : p}
                </p>
              ))}

              {/* Pull quote after second section */}
              {si === 1 && data.pullQuote && (
                <blockquote style={{
                  borderLeft: `3px solid ${RED}`,
                  background: LIGHT,
                  padding: 24,
                  margin: '24px 0 0',
                  fontStyle: 'italic',
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: '#333',
                }}>
                  &ldquo;{data.pullQuote}&rdquo;
                  <footer style={{ marginTop: 8, fontSize: 12, fontStyle: 'normal', color: GREY }}>
                    — {data.author}
                  </footer>
                </blockquote>
              )}
            </section>
          ))}
        </article>

        {/* Right: Sticky TOC */}
        <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: GREY,
            marginBottom: 16,
          }}>Contents</div>
          {data.sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'block',
                padding: '8px 12px',
                fontSize: 12,
                textDecoration: 'none',
                color: activeSection === s.id ? RED : '#444',
                borderLeft: activeSection === s.id ? `2px solid ${RED}` : '2px solid transparent',
                fontWeight: activeSection === s.id ? 600 : 400,
              }}
            >{s.heading}</a>
          ))}
        </aside>
      </div>

      {/* Related flip cards */}
      <section style={{ background: LIGHT, padding: '64px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 24,
            textTransform: 'uppercase',
            letterSpacing: 1,
            margin: 0,
          }}>Related</h2>
          <span style={{ fontSize: 10, color: GREY, textTransform: 'uppercase', letterSpacing: '1px' }}>Hover to Preview</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {data.relatedPosts.map((rp, i) => (
            <div key={rp.title} className="flip-card" style={{ height: 160 }}>
              <div className="flip-inner">
                {/* Front */}
                <div className="flip-front" style={{
                  background: '#fff',
                  border: `1px solid ${BORDER}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  boxSizing: 'border-box',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{CARD_ICONS[i % CARD_ICONS.length]}</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}>{rp.title}</div>
                </div>
                {/* Back */}
                <div className="flip-back" style={{
                  background: RED,
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  boxSizing: 'border-box',
                }}>
                  <div style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                    opacity: 0.8,
                  }}>{rp.category}</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    textAlign: 'center',
                    lineHeight: 1.3,
                    marginBottom: 8,
                  }}>{rp.title}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{rp.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
