import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { guideQuery, allGuideSlugsQuery } from '@/lib/queries'

export const revalidate = 30
import { GUIDE_MOCK } from '@/components/templates/guide/mockData'
import GuidePageClient from '@/components/templates/guide/GuidePageClient'

interface SanityGuide {
  title?: string
  slug?: { current?: string }
  topic?: string
  heroImage?: unknown
  intro?: string
  body?: unknown
  docNumber?: string
  readTime?: string
  level?: string
  tableOfContents?: Array<{ sectionNumber?: string; title?: string; subsections?: string[] }>
  callouts?: Array<{ label?: string; body?: string }>
  seo?: { metaTitle?: string; metaDescription?: string }
}

function blockContentToSections(body: unknown, callouts?: Array<{ label?: string; body?: string }>) {
  if (!Array.isArray(body)) return []
  const sections: Array<{ id: string; heading: string; body: string; callout: { type: 'info'; title: string; items: string[] } | null; specTable?: Array<{ spec: string; typical: string; premium: string; why: string }> }> = []
  let current: { id: string; heading: string; paragraphs: string[] } | null = null

  for (const block of body) {
    if (block._type === 'block' && block.style === 'h2') {
      if (current) sections.push({ id: current.id, heading: current.heading, body: current.paragraphs.join('\n\n'), callout: null })
      const text = Array.isArray(block.children) ? block.children.map((c: Record<string, unknown>) => c.text ?? '').join('') : ''
      current = { id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), heading: text, paragraphs: [] }
    } else if (block._type === 'block' && current) {
      const text = Array.isArray(block.children) ? block.children.map((c: Record<string, unknown>) => c.text ?? '').join('') : ''
      if (text) current.paragraphs.push(text)
    }
  }
  if (current) sections.push({ id: current.id, heading: current.heading, body: current.paragraphs.join('\n\n'), callout: null })

  // Match callouts to sections by index
  if (callouts?.length) {
    callouts.forEach((co, i) => {
      if (sections[i] && co.label && co.body) {
        sections[i].callout = { type: 'info', title: co.label, items: co.body.split('\n').filter(Boolean) }
      }
    })
  }

  return sections
}

function transformGuide(sanity: SanityGuide | null) {
  if (!sanity?.title) return GUIDE_MOCK

  const sections = blockContentToSections(sanity.body, sanity.callouts ?? undefined)

  return {
    ...GUIDE_MOCK,
    topic: sanity.topic ?? GUIDE_MOCK.topic,
    docId: sanity.docNumber ?? GUIDE_MOCK.docId,
    title: sanity.title,
    metadata: [
      { label: 'Updated', value: 'March 2025' },
      { label: 'Read Time', value: sanity.readTime ?? GUIDE_MOCK.metadata[1].value },
      { label: 'Level', value: sanity.level ?? GUIDE_MOCK.metadata[2].value },
    ],
    sections: sections.length ? sections : GUIDE_MOCK.sections,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allGuideSlugsQuery).catch(() => [])
  const params = (slugs ?? []).filter(s => s.slug).map(s => ({ slug: s.slug }))
  if (!params.find(p => p.slug === '5-axis-cnc-machining')) {
    params.push({ slug: '5-axis-cnc-machining' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = await client.fetch<SanityGuide | null>(guideQuery, { slug: params.slug }).catch(() => null)
  return {
    title: guide?.seo?.metaTitle || `${guide?.title || 'Guide'} | Phillips Template Sandbox`,
    description: guide?.seo?.metaDescription || guide?.intro || 'Phillips Corporation guide',
  }
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch<SanityGuide | null>(guideQuery, { slug: params.slug }).catch(() => null)
  const data = transformGuide(sanity)
  return <GuidePageClient data={data} />
}
