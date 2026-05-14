import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import IndiaClassEventClient, { type SanityClassEvent } from '@/components/templates-india/class-event/IndiaClassEventClient'

export const revalidate = 30

// classEvent has no slug field today — `[slug]` is the document _id.
// Inline GROQ: queries.ts has no single-doc classEvent query (only the
// classCalendar list), so we project here rather than touching queries.ts.
// TBD-verify: promote to a named query in queries.ts during a follow-up.
const CLASS_EVENT_BY_ID = `*[_type == "classEvent" && _id == $id][0]{
  _id, location, startDate, endDate, seats, registrationUrl, isFederal,
  course->{title, slug, track, description}
}`
const ALL_CLASS_EVENT_IDS = `*[_type == "classEvent"]{ "id": _id }`

export async function generateStaticParams() {
  const ids = await client.fetch<Array<{ id: string }>>(ALL_CLASS_EVENT_IDS).catch(() => [])
  return ids.filter(x => x.id).map(x => ({ slug: x.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const evt = await client.fetch<SanityClassEvent | null>(CLASS_EVENT_BY_ID, { id: params.slug }).catch(() => null)
  const title = evt?.course?.title ?? 'Training Class'
  return {
    title: `${title} | Phillips Template Sandbox`,
    description: `Phillips Corporation training class — ${evt?.location ?? ''} ${evt?.startDate ?? ''}`.trim(),
  }
}

export default async function IndiaClassEventPage({ params }: { params: { slug: string } }) {
  const classEvent = await client.fetch<SanityClassEvent | null>(CLASS_EVENT_BY_ID, { id: params.slug }).catch(() => null)
  if (!classEvent) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Class event not found</h1>
        <p>No Sanity classEvent document matched id <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaClassEventClient classEvent={classEvent} />
}
