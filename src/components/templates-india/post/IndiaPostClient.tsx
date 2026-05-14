import { PortableTextBlock } from '@portabletext/types'
import {
  IndiaContentHero,
  IndiaSectionBreak,
  IndiaPhotoGrid,
  IndiaRepeatableLeadForm,
} from '@/components/india'
import { indiaPortableTextComponents } from '@/components/india/portableText'
import PortableText from '@/components/PortableText'
import SanityImage from '@/components/SanityImage'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'

export interface SanityPost {
  title?: string
  publishedAt?: string
  categories?: string[]
  mainImage?: unknown
  excerpt?: string
  body?: PortableTextBlock[]
  author?: { name?: string; title?: string; photo?: unknown }
  readTime?: string
  pullQuote?: string
  tableOfContents?: string[]
  relatedPosts?: Array<{ title?: string; slug?: { current?: string }; categories?: string[]; publishedAt?: string }>
  intent?: string
}

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='30' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function IndiaPostClient({ post }: { post: SanityPost }) {
  const intent = readIntent(post)
  const heroBg = sanityImageUrl(post.mainImage) ?? placeholderTileUrl(post.title ?? 'POST', '#1b1e34')
  const eyebrow = post.categories?.[0] ?? 'BLOG POST'

  const metadata = [
    formatDate(post.publishedAt) ? { label: 'Published', value: formatDate(post.publishedAt) as string } : null,
    post.author?.name ? { label: 'Author', value: post.author.name } : null,
    post.readTime ? { label: 'Read time', value: post.readTime } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  // TBD-verify: related posts hardcoded fallback in cleanup-queue §3.
  const relatedTiles = (post.relatedPosts ?? []).slice(0, 3).map(p => ({
    image: placeholderTileUrl(p.title ?? 'POST', '#3F0017'),
    alt: p.title ?? 'Related post',
    caption: p.title ?? 'Related post',
    href: p.slug?.current ? `/india/post/${p.slug.current}` : undefined,
  }))
  const tiles = relatedTiles.length > 0 ? relatedTiles : [
    { image: placeholderTileUrl('Smart Factory', '#0a5f54'), alt: 'Smart Factory', caption: 'Smart Factory' },
    { image: placeholderTileUrl('5-axis Setup', '#3F0017'),   alt: '5-axis Setup',   caption: '5-axis Setup' },
    { image: placeholderTileUrl('CMM Tips',     '#1b1e34'),   alt: 'CMM Tips',       caption: 'CMM Tips' },
  ]

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      <IndiaContentHero
        eyebrow={eyebrow.toUpperCase()}
        title={post.title ?? 'Post'}
        subtitle={post.excerpt}
        backgroundImage={{ src: heroBg, alt: post.title ?? '' }}
        metadata={metadata}
      />

      {/* 2-column layout below hero */}
      <style>{`
        .india-post-grid {
          display: grid;
          grid-template-columns: minmax(0, 7fr) minmax(0, 3fr);
          gap: 56px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px;
        }
        .india-post-toc-desktop { display: block; }
        .india-post-toc-mobile  { display: none; }
        @media (max-width: 900px) {
          .india-post-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 20px;
          }
          .india-post-toc-desktop { display: none; }
          .india-post-toc-mobile  { display: block; }
        }
      `}</style>

      <div className="india-post-grid">
        {/* Left/main column */}
        <article style={{ minWidth: 0 }}>
          {/* TOC — static (non-sticky), desktop only */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <>
              <div
                className="india-post-toc-desktop"
                style={{
                  borderLeft: `3px solid ${PHILLIPS_COLORS.red}`,
                  paddingLeft: 16,
                  marginBottom: 40,
                }}
              >
                <div style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 2, color: PHILLIPS_COLORS.grey, marginBottom: 12 }}>
                  IN THIS POST
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {post.tableOfContents.map((t, i) => (
                    <li key={i} style={{ ...F_DISPLAY, fontSize: 14, lineHeight: 1.6, color: PHILLIPS_COLORS.black }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <details
                className="india-post-toc-mobile"
                style={{
                  borderLeft: `3px solid ${PHILLIPS_COLORS.red}`,
                  paddingLeft: 16,
                  marginBottom: 32,
                }}
              >
                <summary
                  style={{
                    listStyle: 'none',
                    cursor: 'pointer',
                    ...F_DISPLAY,
                    fontSize: 14,
                    letterSpacing: 1,
                    color: PHILLIPS_COLORS.black,
                  }}
                >
                  In this post
                </summary>
                <ul style={{ listStyle: 'none', padding: '12px 0 0', margin: 0 }}>
                  {post.tableOfContents.map((t, i) => (
                    <li key={i} style={{ ...F_DISPLAY, fontSize: 14, lineHeight: 1.6, color: PHILLIPS_COLORS.black }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </details>
            </>
          )}

          {/* Body */}
          {post.body ? (
            <PortableText value={post.body} components={indiaPortableTextComponents} />
          ) : (
            post.excerpt && (
              <p style={{ fontFamily: 'var(--font-barlow-condensed), sans-serif', fontSize: 14, lineHeight: 1.85, color: PHILLIPS_COLORS.grey }}>
                {post.excerpt}
              </p>
            )
          )}
        </article>

        {/* Right/side column */}
        <aside style={{ minWidth: 0 }}>
          {/* Author card */}
          {post.author?.name && (
            <div
              style={{
                background: '#F2F4F6',
                padding: 20,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              {post.author.photo ? (
                <SanityImage
                  image={post.author.photo}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: PHILLIPS_COLORS.maroon,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...F_DISPLAY,
                    fontSize: 20,
                  }}
                >
                  {post.author.name.charAt(0)}
                </div>
              )}
              <div>
                <div style={{ ...F_DISPLAY, fontSize: 14, color: PHILLIPS_COLORS.black }}>
                  {post.author.name}
                </div>
                {post.author.title && (
                  <div style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 1, color: PHILLIPS_COLORS.grey }}>
                    {post.author.title}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pull quote */}
          {post.pullQuote && (
            <blockquote
              style={{
                borderLeft: `3px solid ${PHILLIPS_COLORS.red}`,
                paddingLeft: 16,
                margin: '0 0 24px',
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontStyle: 'italic',
                fontSize: 16,
                lineHeight: 1.5,
                color: PHILLIPS_COLORS.black,
              }}
            >
              &ldquo;{post.pullQuote}&rdquo;
            </blockquote>
          )}

          {/* Related posts — small stack, 2-3 entries */}
          <div style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 2, color: PHILLIPS_COLORS.grey, marginBottom: 12 }}>
            RELATED POSTS
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tiles.slice(0, 3).map((t, i) => (
              <li
                key={i}
                style={{
                  ...F_DISPLAY,
                  fontSize: 13,
                  lineHeight: 1.4,
                  color: PHILLIPS_COLORS.black,
                  padding: '10px 0',
                  borderBottom: `1px solid ${PHILLIPS_COLORS.light}`,
                }}
              >
                {t.caption}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Section break + 3-up grid */}
      <IndiaSectionBreak headline="More from Phillips" />
      <div style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <IndiaPhotoGrid tiles={tiles} layout="3-up" />
        </div>
      </div>

      {/* Intent-gated bottom form (conversion only) */}
      {intent === 'conversion' && (
        <div style={{ background: '#F2F4F6' }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
    </main>
  )
}
