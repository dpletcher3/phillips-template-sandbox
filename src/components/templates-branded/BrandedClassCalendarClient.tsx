import {
  BrandedPageShell,
  Btn,
  CONTAINER,
  FONT_DISPLAY,
  META_LABEL,
  NoContentYet,
} from './_shared/branded-helpers';
import BrandedSection from '@/components/branded/BrandedSection';
import Eyebrow from '@/components/branded/Eyebrow';

export interface SanityClassEvent {
  _id?: string;
  course?: { title?: string; slug?: { current?: string }; track?: string };
  location?: string;
  startDate?: string;
  endDate?: string;
  seats?: number;
  registrationUrl?: string;
  isFederal?: boolean;
}

interface Props {
  events: SanityClassEvent[] | null;
}

export default function BrandedClassCalendarClient({ events }: Props) {
  if (!events || events.length === 0) {
    return (
      <BrandedPageShell>
        <Hero count={0} />
        <NoContentYet type="Class Events" heading="No upcoming classes scheduled" />
      </BrandedPageShell>
    );
  }
  // Track filter: derive set + always include 'all'.
  const tracks = ['all', ...Array.from(new Set(events.map((e) => e.course?.track).filter(Boolean) as string[]))];
  return (
    <BrandedPageShell>
      <Hero count={events.length} />
      <FilterBar tracks={tracks} />
      <EventList events={events} />
      <DetailModalPlaceholder />
    </BrandedPageShell>
  );
}

function Hero({ count }: { count: number }) {
  return (
    <section style={{ background: 'var(--branded-gray-50)', padding: '80px 0 64px' }}>
      <div style={CONTAINER}>
        <Eyebrow>Phillips Education</Eyebrow>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1, letterSpacing: '-1.6px', color: 'var(--branded-black)', margin: '0 0 16px' }}>
          Class Calendar
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--branded-gray-700)', lineHeight: 1.65, maxWidth: '720px' }}>
          {count > 0
            ? `${count} upcoming ${count === 1 ? 'class' : 'classes'} across CNC, additive, software, and automation.`
            : 'No upcoming classes are scheduled at the moment.'}
        </p>
      </div>
    </section>
  );
}

function FilterBar({ tracks }: { tracks: string[] }) {
  // TODO(schema-extension): when interactivity is needed, wrap in a client
  // component to filter the event list in place. For now, links are
  // presentational anchors.
  return (
    <section style={{ borderBottom: '1px solid var(--branded-gray-200)', background: 'var(--branded-white)', position: 'sticky', top: '136px', zIndex: 20 }}>
      <div style={{ ...CONTAINER, display: 'flex', gap: '24px', alignItems: 'center', padding: '16px 32px', overflowX: 'auto' }}>
        <span style={{ ...META_LABEL, fontSize: '11px', flexShrink: 0 }}>Filter</span>
        {tracks.map((track, i) => (
          <a
            key={track}
            href="#"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: i === 0 ? 700 : 500,
              fontSize: '13px',
              color: i === 0 ? 'var(--branded-black)' : 'var(--branded-gray-600)',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: i === 0 ? '2px solid var(--branded-red)' : '2px solid transparent',
              whiteSpace: 'nowrap',
              textTransform: 'capitalize',
            }}
          >
            {track === 'all' ? 'All Tracks' : track}
          </a>
        ))}
      </div>
    </section>
  );
}

function EventList({ events }: { events: SanityClassEvent[] }) {
  return (
    <BrandedSection>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map((event) => (
          <EventRow key={event._id ?? `${event.course?.slug?.current}-${event.startDate}`} event={event} />
        ))}
      </div>
    </BrandedSection>
  );
}

function EventRow({ event }: { event: SanityClassEvent }) {
  const dates = formatDateRange(event.startDate, event.endDate);
  const seatsLow = typeof event.seats === 'number' && event.seats <= 3;
  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr auto auto',
        gap: '24px',
        alignItems: 'center',
        padding: '24px 28px',
        background: 'var(--branded-white)',
        border: '1px solid var(--branded-gray-200)',
        borderLeft: event.isFederal ? '3px solid var(--branded-maroon)' : '3px solid var(--branded-red)',
        borderRadius: 'var(--branded-r-md)',
        boxShadow: 'var(--branded-shadow-sm)',
      }}
    >
      <div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: '20px', color: 'var(--branded-red)', letterSpacing: '-0.5px', lineHeight: 1 }}>
          {dates || 'TBD'}
        </div>
        {event.course?.track && <div style={{ ...META_LABEL, fontSize: '10px', marginTop: '6px' }}>{event.course.track}</div>}
      </div>
      <div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '16px', color: 'var(--branded-black)', margin: '0 0 4px', lineHeight: 1.4 }}>
          {event.course?.title ?? 'Untitled Course'}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: 'var(--branded-gray-600)' }}>
          {event.location && <span>📍 {event.location}</span>}
          {event.isFederal && (
            <span style={{ ...META_LABEL, color: 'var(--branded-maroon)' }}>Federal</span>
          )}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        {typeof event.seats === 'number' ? (
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '15px', color: seatsLow ? 'var(--branded-red)' : 'var(--branded-black)' }}>
              {event.seats} {event.seats === 1 ? 'seat' : 'seats'}
            </div>
            {seatsLow && <div style={{ fontSize: '11px', color: 'var(--branded-red)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Filling fast</div>}
          </div>
        ) : null}
      </div>
      <div>
        {event.registrationUrl ? (
          <Btn href={event.registrationUrl} withArrow={false}>Register</Btn>
        ) : (
          <Btn href={event.course?.slug?.current ? `/branded/course/${event.course.slug.current}` : '#'} variant="ghost" withArrow={false}>Details</Btn>
        )}
      </div>
    </article>
  );
}

function DetailModalPlaceholder() {
  // TODO(schema-extension): per-event detail view (modal or dedicated route)
  // — wiring left for a follow-up. The Course detail page already exists at
  // `/branded/course/[slug]`.
  return null;
}

function formatDateRange(start?: string, end?: string): string {
  if (!start) return '';
  try {
    const s = new Date(start);
    const month = s.toLocaleDateString('en-US', { month: 'short' });
    const sDay = s.getDate();
    if (!end) return `${month} ${sDay}`;
    const e = new Date(end);
    if (s.getMonth() === e.getMonth()) return `${month} ${sDay}–${e.getDate()}`;
    const eMonth = e.toLocaleDateString('en-US', { month: 'short' });
    return `${month} ${sDay} – ${eMonth} ${e.getDate()}`;
  } catch {
    return start;
  }
}
