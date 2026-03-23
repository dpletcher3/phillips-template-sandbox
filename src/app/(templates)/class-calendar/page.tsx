import { client } from '../../../../sanity/lib/client'
import { classCalendarQuery } from '@/lib/queries'
import { CLASS_CALENDAR_MOCK } from '@/components/templates/class-calendar/mockData'
import ClassCalendarPageClient from '@/components/templates/class-calendar/ClassCalendarPageClient'

interface SanityClassEvent {
  _id: string
  course?: { title?: string; slug?: { current?: string }; track?: string }
  location?: string
  startDate?: string
  endDate?: string
  seats?: number
  registrationUrl?: string
  isFederal?: boolean
}

function formatDateRange(start?: string, end?: string): string {
  if (!start) return ''
  try {
    const s = new Date(start)
    const month = s.toLocaleDateString('en-US', { month: 'short' })
    const sDay = s.getDate()
    if (!end) return `${month} ${sDay}`
    const e = new Date(end)
    return `${month} ${sDay}–${e.getDate()}`
  } catch {
    return start
  }
}

function transformClassCalendar(events: SanityClassEvent[] | null) {
  if (!events?.length) return CLASS_CALENDAR_MOCK

  const tracks = new Set<string>(['all'])
  const mapped = events.map(evt => {
    const track = evt.course?.track ?? 'CNC'
    tracks.add(track)
    return {
      dates: formatDateRange(evt.startDate, evt.endDate),
      course: evt.course?.title ?? '',
      track,
      location: evt.location ?? '',
      seats: evt.seats ?? 0,
      isFederal: evt.isFederal ?? false,
      registrationUrl: evt.registrationUrl,
    }
  })

  return {
    title: 'Class Calendar',
    subtitle: 'Upcoming Schedule',
    tracks: Array.from(tracks),
    events: mapped,
  }
}

export default async function ClassCalendarPage() {
  const events = await client.fetch<SanityClassEvent[] | null>(classCalendarQuery).catch(() => null)
  const data = transformClassCalendar(events)
  return <ClassCalendarPageClient data={data} />
}
