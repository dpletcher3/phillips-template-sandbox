import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { locationQuery, allLocationSlugsQuery } from '@/lib/queries'
import IndiaLocationClient, { type SanityLocation } from '@/components/templates-india/location/IndiaLocationClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allLocationSlugsQuery).catch(() => [])
  return slugs.filter(s => s.slug).map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const loc = await client.fetch<SanityLocation | null>(locationQuery, { slug: params.slug }).catch(() => null)
  return {
    title: `${loc?.name || 'Location'} | Phillips Template Sandbox`,
    description: `Phillips Corporation ${loc?.region || ''} office — ${loc?.address?.split('\n')[0] || ''}`.trim(),
  }
}

export default async function IndiaLocationPage({ params }: { params: { slug: string } }) {
  const location = await client.fetch<SanityLocation | null>(locationQuery, { slug: params.slug }).catch(() => null)
  if (!location) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Location not found</h1>
        <p>No Sanity location document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaLocationClient location={location} />
}
