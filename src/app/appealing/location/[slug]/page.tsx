import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { locationQuery, allLocationSlugsQuery } from '@/lib/queries'

export const revalidate = 30
import { LOCATION_MOCK } from '@/components/templates/location/mockData'
import AppealingLocationClient from '@/components/templates-appealing/location/AppealingLocationClient'

interface SanityLocation {
  name?: string
  slug?: { current?: string }
  region?: string
  address?: string
  phone?: string
  photo?: unknown
  services?: Array<{ number?: string; name?: string; description?: string }>
  eyebrow?: string
  hours?: Array<{ days?: string; time?: string }>
  marqueeItems?: string[]
  directionsUrl?: string
}

function transformLocation(sanity: SanityLocation | null) {
  if (!sanity?.name) return LOCATION_MOCK

  const nameParts = sanity.name.split(/[,–—-]/).map(s => s.trim())
  const city = nameParts[0] || LOCATION_MOCK.city
  const state = nameParts[1]?.replace(/\s+/g, '') || LOCATION_MOCK.state

  return {
    ...LOCATION_MOCK,
    region: sanity.region ?? LOCATION_MOCK.region,
    city,
    state,
    fullName: sanity.name,
    address: sanity.address ?? LOCATION_MOCK.address,
    phone: sanity.phone ?? LOCATION_MOCK.phone,
    hours: sanity.hours?.length
      ? sanity.hours.map(h => ({ label: h.days ?? '', value: h.time ?? '' }))
      : LOCATION_MOCK.hours,
    marqueeText: sanity.marqueeItems?.length
      ? sanity.marqueeItems.join('  ·  ') + '  ·  '
      : LOCATION_MOCK.marqueeText,
    services: sanity.services?.length
      ? sanity.services.map((s, i) => ({
          number: s.number ?? String(i + 1).padStart(2, '0'),
          name: s.name ?? '',
          description: s.description ?? '',
        }))
      : LOCATION_MOCK.services,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allLocationSlugsQuery).catch(() => [])
  const params = (slugs ?? []).filter(s => s.slug).map(s => ({ slug: s.slug }))
  if (!params.find(p => p.slug === 'hanover-md')) {
    params.push({ slug: 'hanover-md' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const loc = await client.fetch<SanityLocation | null>(locationQuery, { slug: params.slug }).catch(() => null)
  return {
    title: `${loc?.name || 'Location'} | Phillips Template Sandbox`,
    description: `Phillips Corporation ${loc?.region || ''} office — ${loc?.address?.split('\n')[0] || ''}`,
  }
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch<SanityLocation | null>(locationQuery, { slug: params.slug }).catch(() => null)
  const data = transformLocation(sanity)
  return <AppealingLocationClient data={data} />
}
