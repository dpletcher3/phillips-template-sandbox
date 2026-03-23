'use client'

import { useState, useEffect, useRef } from 'react'
import { PostData } from './types'

const RED = '#F9423A'
const SERIF = "'Georgia', 'Times New Roman', serif"

export default function PostPageClient({ data }: { data: PostData }) {
  const tocRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(data.sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    data.sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [data.sections])

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      {/* ---- HEADER ---- */}
      <header style={{ padding: '88px 56px 40px', maxWidth: 820 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {data.categories.map(c => (
            <span key={c} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: RED }}>{c}</span>
          ))}
        </div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 42, lineHeight: 1.25, margin: '0 0 24px' }}>
          {data.title.replace(data.titleAccent, '').trim()}{' '}
          <em style={{ color: RED, fontStyle: 'italic' }}>{data.titleAccent}</em>{' '}
          {data.title.split(data.titleAccent)[1]?.trim() ?? ''}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 16, borderTop: '1px solid #eee' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f0f0f0' }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{data.author}</div>
            <div style={{ fontSize: 10, color: '#999' }}>{data.authorTitle}</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 11, color: '#999' }}>{data.date} · {data.readTime}</div>
        </div>
      </header>

      {/* ---- HERO IMAGE ---- */}
      <div style={{ height: 420, background: '#f5f5f0', margin: '0 56px', borderRadius: 4 }} />

      {/* ---- 2-COL BODY ---- */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 56, padding: '56px 56px 80px', maxWidth: 1100 }}>
        <article>
          {data.sections.map((s, i) => (
            <div key={s.id} id={s.id} style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, margin: '0 0 16px', color: '#1a1a1a' }}>{s.heading}</h2>
              {s.body.split('\n\n').map((p, pi) => (
                <p key={pi} style={{ fontSize: 14, lineHeight: 1.9, color: '#555', margin: '0 0 16px' }}>
                  {i === 0 && pi === 0 ? (
                    <>
                      <span style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 700, float: 'left', lineHeight: 0.85, marginRight: 8, marginTop: 4, color: RED }}>{p[0]}</span>
                      {p.slice(1)}
                    </>
                  ) : p}
                </p>
              ))}
              {i === 1 && (
                <blockquote style={{ borderLeft: `3px solid ${RED}`, margin: '32px 0', padding: '0 24px' }}>
                  <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: '#1a1a1a', margin: 0 }}>{data.pullQuote}</p>
                </blockquote>
              )}
            </div>
          ))}
        </article>

        <div ref={tocRef} style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>Contents</div>
          {data.sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                display: 'block',
                padding: '8px 0 8px 16px',
                fontSize: 12,
                fontWeight: activeSection === s.id ? 600 : 400,
                color: activeSection === s.id ? RED : '#999',
                borderLeft: activeSection === s.id ? `2px solid ${RED}` : '2px solid transparent',
                textDecoration: 'none',
                transition: 'color .2s, border-color .2s',
              }}
            >
              {s.heading}
            </a>
          ))}
        </div>
      </section>

      {/* ---- RELATED POSTS ---- */}
      <section style={{ background: '#f9f7f3', padding: '56px 56px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 32, height: 2, background: RED }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: '#999' }}>Related Articles</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
          {data.relatedPosts.map(rp => (
            <a
              key={rp.title}
              href={rp.slug ? `/post/${rp.slug}` : '#'}
              style={{ display: 'block', background: '#fff', borderRadius: 6, overflow: 'hidden', textDecoration: 'none', color: '#1a1a1a', transition: 'box-shadow .2s', border: '1px solid #eee' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.08)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ height: 4, background: 'transparent', transition: 'background .2s' }} />
              <div style={{ padding: '24px 24px 28px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: RED, marginBottom: 10 }}>{rp.category}</div>
                <h4 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 17, lineHeight: 1.4, margin: '0 0 12px' }}>{rp.title}</h4>
                <div style={{ fontSize: 11, color: '#999' }}>{rp.date}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
