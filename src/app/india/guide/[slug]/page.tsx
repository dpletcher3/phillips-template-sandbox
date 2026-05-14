import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { guideQuery, allGuideSlugsQuery } from '@/lib/queries'
import IndiaGuideClient, { type SanityGuide } from '@/components/templates-india/guide/IndiaGuideClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allGuideSlugsQuery).catch(() => [])
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = await client.fetch<SanityGuide | null>(guideQuery, { slug: params.slug }).catch(() => null)
  return {
    title: guide?.title ? `${guide.title} | Phillips Template Sandbox` : 'Guide | Phillips Template Sandbox',
    description: guide?.intro?.slice(0, 160) || 'Phillips Corporation guide (india family)',
  }
}

export default async function IndiaGuidePage({ params }: { params: { slug: string } }) {
  const guide = await client.fetch<SanityGuide | null>(guideQuery, { slug: params.slug }).catch(() => null)
  if (!guide) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Guide not found</h1>
        <p>No Sanity guide document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaGuideClient guide={guide} />
}
