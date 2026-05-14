import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { webinarQuery, allWebinarSlugsQuery } from '@/lib/queries'
import IndiaWebinarClient, { type SanityWebinar } from '@/components/templates-india/webinar/IndiaWebinarClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allWebinarSlugsQuery).catch(() => [])
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const webinar = await client.fetch<SanityWebinar | null>(webinarQuery, { slug: params.slug }).catch(() => null)
  return {
    title: webinar?.title ? `${webinar.title} | Phillips Template Sandbox` : 'Webinar | Phillips Template Sandbox',
    description: webinar?.description?.slice(0, 160) || 'Phillips Corporation webinar (india family)',
  }
}

export default async function IndiaWebinarPage({ params }: { params: { slug: string } }) {
  const webinar = await client.fetch<SanityWebinar | null>(webinarQuery, { slug: params.slug }).catch(() => null)
  if (!webinar) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Webinar not found</h1>
        <p>No Sanity webinar document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaWebinarClient webinar={webinar} />
}
