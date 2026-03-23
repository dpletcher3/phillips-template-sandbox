'use client'

import { useState, useEffect } from 'react'
import { PostData } from '@/components/templates/post/types'
import TemplateBadge from '@/components/TemplateBadge'
import SimpleNav from '@/components/nav/SimpleNav'

const RED = '#F9423A'
const GREY = '#647883'
const LIGHT = '#F2F4F6'
const BORDER = '#D7DFE3'

export default function SimplePostClient({ data }: { data: PostData }) {
  const [activeSection, setActiveSection] = useState(data.sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { for (const e of entries) if (e.isIntersecting) setActiveSection(e.target.id) },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    data.sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [data.sections])

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <TemplateBadge label="SIMPLE" color="#000" />
      <SimpleNav />

      {/* Header */}
      <header style={{ maxWidth: 780, margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{ borderTop: '2px solid #000', paddingTop: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            {data.categories.map(c => (
              <span key={c} style={{ fontSize: 11, fontWeight: 600, color: RED, textDecoration: 'underline', textUnderlineOffset: 3, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{c}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 44, textTransform: 'uppercase', lineHeight: 1.05, margin: '0 0 20px' }}>
            {data.title.replace(data.titleAccent, '').trim()} <em style={{ color: RED, fontStyle: 'normal' }}>{data.titleAccent}</em>
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: LIGHT, border: `1px solid ${BORDER}` }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{data.author}</div>
            <div style={{ fontSize: 11, color: GREY }}>{data.date} · {data.readTime}</div>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div style={{ maxWidth: 780, margin: '0 auto 32px', padding: '0 24px' }}>
        <div style={{ background: LIGHT, height: 300, borderRadius: 4 }} />
      </div>

      {/* Body + TOC */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 64px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: 48 }}>
        <article>
          {data.sections.map((s, si) => (
            <section key={s.id} id={s.id} style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px' }}>{s.heading}</h2>
              {s.body.split('\n\n').map((p, pi) => (
                <p key={pi} style={{
                  fontSize: 14, lineHeight: 1.85, color: '#444', margin: '0 0 16px',
                  ...(si === 0 && pi === 0 ? { ['--drop' as string]: 'true' } : {}),
                }}>
                  {si === 0 && pi === 0 ? (
                    <><span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 48, fontWeight: 800, color: RED, float: 'left', lineHeight: 0.8, marginRight: 8, marginTop: 4 }}>{p[0]}</span>{p.slice(1)}</>
                  ) : p}
                </p>
              ))}
            </section>
          ))}

          {data.pullQuote && (
            <blockquote style={{ borderLeft: `3px solid ${RED}`, background: LIGHT, padding: '20px 24px', margin: '0 0 40px', fontSize: 15, fontStyle: 'italic', lineHeight: 1.7, color: '#333' }}>
              &ldquo;{data.pullQuote}&rdquo;
            </blockquote>
          )}
        </article>

        {/* Sticky TOC */}
        <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GREY, marginBottom: 16 }}>Contents</div>
          {data.sections.map(s => (
            <a key={s.id} href={`#${s.id}`} style={{
              display: 'block', padding: '8px 12px', fontSize: 12, textDecoration: 'none',
              color: activeSection === s.id ? RED : '#444',
              borderLeft: activeSection === s.id ? `2px solid ${RED}` : '2px solid transparent',
              fontWeight: activeSection === s.id ? 600 : 400,
            }}>{s.heading}</a>
          ))}
        </aside>
      </div>

      {/* Related */}
      <section style={{ background: LIGHT, padding: '56px 48px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 24px' }}>Related <span style={{ color: RED }}>Articles</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {data.relatedPosts.map(rp => (
            <div key={rp.title} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 4, padding: '24px 20px', cursor: 'pointer' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: RED, marginBottom: 8 }}>{rp.category}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', marginBottom: 6 }}>{rp.title}</div>
              <div style={{ fontSize: 11, color: GREY }}>{rp.date}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
