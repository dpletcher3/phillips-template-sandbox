import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { postQuery, allPostSlugsQuery } from '@/lib/queries'
import { POST_MOCK } from '@/components/templates/post/mockData'
import PostPageClient from '@/components/templates/post/PostPageClient'

interface SanityPost {
  title?: string
  slug?: { current?: string }
  publishedAt?: string
  categories?: string[]
  mainImage?: unknown
  excerpt?: string
  body?: unknown
  author?: { name?: string; title?: string; photo?: unknown }
  readTime?: string
  heroImageCaption?: string
  pullQuote?: string
  tableOfContents?: string[]
  relatedPosts?: Array<{
    title?: string
    slug?: { current?: string }
    categories?: string[]
    publishedAt?: string
  }>
  seo?: { metaTitle?: string; metaDescription?: string }
}

function blockContentToSections(body: unknown): Array<{ id: string; heading: string; body: string }> {
  if (!Array.isArray(body)) return []
  const sections: Array<{ id: string; heading: string; body: string }> = []
  let current: { id: string; heading: string; paragraphs: string[] } | null = null

  for (const block of body) {
    if (block._type === 'block' && block.style === 'h2') {
      if (current) sections.push({ id: current.id, heading: current.heading, body: current.paragraphs.join('\n\n') })
      const text = Array.isArray(block.children) ? block.children.map((c: Record<string, unknown>) => c.text ?? '').join('') : ''
      current = { id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), heading: text, paragraphs: [] }
    } else if (block._type === 'block' && current) {
      const text = Array.isArray(block.children) ? block.children.map((c: Record<string, unknown>) => c.text ?? '').join('') : ''
      if (text) current.paragraphs.push(text)
    }
  }
  if (current) sections.push({ id: current.id, heading: current.heading, body: current.paragraphs.join('\n\n') })
  return sections
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return iso }
}

function transformPost(sanity: SanityPost | null) {
  if (!sanity?.title) return POST_MOCK

  const sections = blockContentToSections(sanity.body)
  const titleAccent = sanity.title.split(' ').slice(-3).join(' ')

  return {
    ...POST_MOCK,
    title: sanity.title,
    titleAccent,
    categories: sanity.categories?.length ? sanity.categories : POST_MOCK.categories,
    date: formatDate(sanity.publishedAt) || POST_MOCK.date,
    author: sanity.author?.name ?? POST_MOCK.author,
    authorTitle: sanity.author?.title ?? POST_MOCK.authorTitle,
    readTime: sanity.readTime ?? POST_MOCK.readTime,
    sections: sections.length ? sections : POST_MOCK.sections,
    pullQuote: sanity.pullQuote ?? POST_MOCK.pullQuote,
    relatedPosts: sanity.relatedPosts?.length
      ? sanity.relatedPosts.map(rp => ({
          title: rp.title ?? '',
          category: rp.categories?.[0] ?? '',
          date: formatDate(rp.publishedAt),
          slug: rp.slug?.current,
        }))
      : POST_MOCK.relatedPosts,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allPostSlugsQuery).catch(() => [])
  const params = (slugs ?? []).filter(s => s.slug).map(s => ({ slug: s.slug }))
  if (!params.find(p => p.slug === '5-axis-no-longer-optional')) {
    params.push({ slug: '5-axis-no-longer-optional' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await client.fetch<SanityPost | null>(postQuery, { slug: params.slug }).catch(() => null)
  return {
    title: post?.seo?.metaTitle || `${post?.title || 'Post'} | Phillips Template Sandbox`,
    description: post?.seo?.metaDescription || post?.excerpt || 'Phillips Corporation blog post',
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch<SanityPost | null>(postQuery, { slug: params.slug }).catch(() => null)
  const data = transformPost(sanity)
  return <PostPageClient data={data} />
}
