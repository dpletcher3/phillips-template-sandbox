import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { webinarQuery, allWebinarSlugsQuery } from '@/lib/queries'

export const revalidate = 30
import { WEBINAR_MOCK } from '@/components/templates/webinar/mockData'
import SimpleWebinarClient from '@/components/templates-simple/webinar/SimpleWebinarClient'

interface SanityWebinar {
  title?: string
  slug?: { current?: string }
  scheduledAt?: string
  status?: string
  registrationUrl?: string
  recordingUrl?: string
  description?: string
  relatedBrands?: Array<{ name?: string; slug?: { current?: string }; logo?: unknown }>
  statusLabel?: string
  speakers?: Array<{ initials?: string; name?: string; role?: string }>
  agenda?: Array<{ time?: string; item?: string }>
  formTitle?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return iso }
}

function formatTime(iso?: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
  } catch { return '' }
}

function transformWebinar(sanity: SanityWebinar | null) {
  if (!sanity?.title) return WEBINAR_MOCK

  return {
    ...WEBINAR_MOCK,
    status: (sanity.status === 'on-demand' ? 'on-demand' : 'upcoming') as 'upcoming' | 'on-demand',
    title: sanity.title,
    date: formatDate(sanity.scheduledAt) || WEBINAR_MOCK.date,
    time: formatTime(sanity.scheduledAt) || WEBINAR_MOCK.time,
    description: sanity.description ?? WEBINAR_MOCK.description,
    speakers: sanity.speakers?.length
      ? sanity.speakers.map(sp => ({
          name: sp.name ?? '',
          title: sp.role ?? '',
          bio: '',
        }))
      : WEBINAR_MOCK.speakers,
    agenda: sanity.agenda?.length
      ? sanity.agenda.map(a => ({ time: a.time ?? '', item: a.item ?? '' }))
      : WEBINAR_MOCK.agenda,
    formTitle: sanity.formTitle ?? WEBINAR_MOCK.formTitle,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allWebinarSlugsQuery).catch(() => [])
  const params = (slugs ?? []).filter(s => s.slug).map(s => ({ slug: s.slug }))
  if (!params.find(p => p.slug === '5-axis-automation-lights-out')) {
    params.push({ slug: '5-axis-automation-lights-out' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const webinar = await client.fetch<SanityWebinar | null>(webinarQuery, { slug: params.slug }).catch(() => null)
  return {
    title: webinar?.seo?.metaTitle || `${webinar?.title || 'Webinar'} | Phillips Template Sandbox`,
    description: webinar?.seo?.metaDescription || webinar?.description || 'Phillips Corporation webinar',
  }
}

export default async function WebinarPage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch<SanityWebinar | null>(webinarQuery, { slug: params.slug }).catch(() => null)
  const data = transformWebinar(sanity)
  return <SimpleWebinarClient data={data} />
}
