/*
  ================================================================
  POST TEMPLATE — Connect to Sanity
  ================================================================
  Sanity schema: post (sanity/schemas/documents/post.ts)

  Section → Field mapping:
  - Header         → post.title, post.categories, post.publishedAt, post.author
  - Hero image     → post.mainImage
  - Body           → post.body (blockContent)
  - Sidebar TOC    → generated from body headings
  - Related posts  → GROQ query filtered by categories
  ================================================================
*/

'use client'

import { useState, useEffect, useRef } from 'react'

const RED = '#F9423A'
const SERIF = "'Georgia', 'Times New Roman', serif"

const MOCK = {
  title: 'Why 5-Axis Machining Is No Longer Optional for Competitive Shops',
  titleAccent: 'No Longer Optional',
  categories: ['CNC Technology', '5-Axis', 'Manufacturing Strategy'],
  date: 'March 12, 2025',
  author: 'Dan Pletcher',
  authorTitle: 'VP, Phillips Corporation',
  readTime: '8 min read',
  sections: [
    { id: 'intro', heading: 'The Shift Is Happening', body: 'Ten years ago, 5-axis machining was the domain of aerospace primes and high-end mold shops. The machines were expensive, the programming was complex, and most job shops couldn\'t justify the investment. That era is over.\n\nToday, 5-axis machining centers from Hermle, Mazak, and Haas are more accessible, more reliable, and more productive than ever. And the shops that aren\'t adopting them are losing quotes to shops that are.' },
    { id: 'economics', heading: 'The Economics Have Changed', body: 'The price gap between 3-axis and 5-axis has narrowed dramatically. A Haas UMC-750 delivers true simultaneous 5-axis capability at a price point that would have been unthinkable a decade ago. And when you factor in setup reduction — going from 6 operations to 1 — the ROI math becomes compelling.\n\nPhillips customers routinely see 40–60% cycle time reductions within the first 6 months of 5-axis adoption. That\'s not marketing — that\'s measured production data from shops in our territory.' },
    { id: 'complexity', heading: 'Part Complexity Is Increasing', body: 'Your customers are designing more complex parts. Organic surfaces, undercuts, thin walls, compound angles — these features are standard in aerospace, medical, and even consumer products. A 3-axis machine with a rotary table can approximate 5-axis capability, but it can\'t match the surface finish, accuracy, or cycle time of true simultaneous 5-axis.\n\nThe shops winning work today are the ones that can say "yes" to complex geometry without hesitating.' },
    { id: 'action', heading: 'How to Get Started', body: 'You don\'t need to replace your entire floor. Start with one machine, one application, and one champion operator. Phillips applications engineers will help you identify the right first project — typically a part with multiple setups that can be consolidated into one.\n\nWe\'ll program it, prove it with a test cut at our Technology Center, and train your team. Most shops are running production parts within 30 days of installation.' },
  ],
  pullQuote: '"The shops winning work today are the ones that can say yes to complex geometry without hesitating."',
  relatedPosts: [
    { title: 'Hermle C 32 U: The Machine That Changed Precision Manufacturing', category: '5-Axis', date: 'Feb 2025' },
    { title: 'Setup Reduction Strategies for High-Mix Job Shops', category: 'Productivity', date: 'Jan 2025' },
    { title: 'Choosing Your First 5-Axis Machine: A Buyer\'s Guide', category: 'Buying Guide', date: 'Dec 2024' },
  ],
}

export default function PostTemplate() {
  const tocRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(MOCK.sections[0].id)

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
    MOCK.sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      {/* ---- HEADER ---- */}
      <header style={{ padding: '88px 56px 40px', maxWidth: 820 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {MOCK.categories.map(c => (
            <span key={c} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: RED }}>{c}</span>
          ))}
        </div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 42, lineHeight: 1.25, margin: '0 0 24px' }}>
          Why 5-Axis Machining Is{' '}
          <em style={{ color: RED, fontStyle: 'italic' }}>{MOCK.titleAccent}</em>{' '}
          for Competitive Shops
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 16, borderTop: '1px solid #eee' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f0f0f0' }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>{MOCK.author}</div>
            <div style={{ fontSize: 10, color: '#999' }}>{MOCK.authorTitle}</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 11, color: '#999' }}>{MOCK.date} · {MOCK.readTime}</div>
        </div>
      </header>

      {/* ---- HERO IMAGE ---- */}
      <div style={{ height: 420, background: '#f5f5f0', margin: '0 56px', borderRadius: 4 }} />

      {/* ---- 2-COL BODY ---- */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 56, padding: '56px 56px 80px', maxWidth: 1100 }}>
        {/* Prose */}
        <article>
          {MOCK.sections.map((s, i) => (
            <div key={s.id} id={s.id} style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, margin: '0 0 16px', color: '#1a1a1a' }}>{s.heading}</h2>
              {s.body.split('\n\n').map((p, pi) => (
                <p key={pi} style={{ fontSize: 14, lineHeight: 1.9, color: '#555', margin: '0 0 16px', ...(i === 0 && pi === 0 ? { ['--drop' as string]: '1' } : {}) }}>
                  {i === 0 && pi === 0 ? (
                    <>
                      <span style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 700, float: 'left', lineHeight: 0.85, marginRight: 8, marginTop: 4, color: RED }}>{p[0]}</span>
                      {p.slice(1)}
                    </>
                  ) : p}
                </p>
              ))}
              {/* Pull quote after second section */}
              {i === 1 && (
                <blockquote style={{ borderLeft: `3px solid ${RED}`, margin: '32px 0', padding: '0 24px' }}>
                  <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: '#1a1a1a', margin: 0 }}>{MOCK.pullQuote}</p>
                </blockquote>
              )}
            </div>
          ))}
        </article>

        {/* Sticky TOC sidebar */}
        <div ref={tocRef} style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>Contents</div>
          {MOCK.sections.map(s => (
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
          {MOCK.relatedPosts.map(rp => (
            <a
              key={rp.title}
              href="#"
              style={{ display: 'block', background: '#fff', borderRadius: 6, overflow: 'hidden', textDecoration: 'none', color: '#1a1a1a', transition: 'box-shadow .2s', border: '1px solid #eee' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.08)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ height: 4, background: 'transparent', transition: 'background .2s' }} onMouseEnter={e => { e.currentTarget.style.background = RED }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }} />
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
