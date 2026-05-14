import {
  IndiaContentHero,
  IndiaCtaButton,
  IndiaRepeatableLeadForm,
  IndiaH2,
} from '@/components/india'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'

// ClassEvent is the scheduled instance of a Course. Its schema lacks
// `name` and `description` fields (preview shows course.title); we
// derive a display title from the dereferenced course and surface
// instructors via TBD-verify fallback since the schema has no instructors
// field today. See docs/india-cleanup-queue.md §1.
export interface SanityClassEvent {
  _id?: string
  course?: { title?: string; slug?: { current?: string }; track?: string; description?: string }
  location?: string
  startDate?: string
  endDate?: string
  seats?: number
  registrationUrl?: string
  isFederal?: boolean
  heroImage?: unknown // not in schema; fallback used
  description?: string // not in schema; fallback derives from course
  instructors?: Array<{ name?: string; title?: string; initials?: string }> // not in schema today
  intent?: string
}

// TBD-verify: instructors hardcoded fallback. ClassEvent schema has no
// `instructors` field today; cleanup-queue §1 entry.
const INSTRUCTORS_FALLBACK = [
  { initials: 'JM', name: 'J. McAllister', title: 'Lead Applications Engineer' },
  { initials: 'TR', name: 'T. Reyes',      title: 'Senior Trainer' },
] as const

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='28' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function IndiaClassEventClient({ classEvent }: { classEvent: SanityClassEvent }) {
  const intent = readIntent(classEvent)
  const displayTitle = classEvent.course?.title ?? 'Training class'
  const heroBg = sanityImageUrl(classEvent.heroImage) ?? placeholderTileUrl(displayTitle, '#3F0017')

  const dateDisplay = formatDate(classEvent.startDate)
  const subtitle = (classEvent.description ?? classEvent.course?.description)?.split('\n')[0]?.slice(0, 240)

  const metadata = [
    dateDisplay         ? { label: 'Date',     value: dateDisplay } : null,
    classEvent.location ? { label: 'Location', value: classEvent.location } : null,
    classEvent.seats != null
      ? { label: 'Seats available', value: String(classEvent.seats) }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  const instructors = classEvent.instructors && classEvent.instructors.length > 0
    ? classEvent.instructors
    : INSTRUCTORS_FALLBACK

  // Seats progress bar — assume capacity 20 if not present
  const capacity = 20
  const seatsRemaining = classEvent.seats ?? 0
  const fillRatio = capacity > 0 ? Math.max(0, Math.min(1, seatsRemaining / capacity)) : 0

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      <IndiaContentHero
        eyebrow="TRAINING CLASS"
        title={displayTitle}
        subtitle={subtitle}
        backgroundImage={{ src: heroBg, alt: displayTitle }}
        metadata={metadata}
      />

      {/* Seats remaining — full-width strip */}
      <section style={{ background: PHILLIPS_COLORS.black, color: '#fff', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ ...F_DISPLAY, fontSize: 36, color: PHILLIPS_COLORS.red, marginBottom: 12 }}>
            {seatsRemaining} {seatsRemaining === 1 ? 'seat' : 'seats'} remaining
          </div>
          <div
            style={{
              width: '100%',
              maxWidth: 480,
              margin: '0 auto',
              height: 6,
              background: 'rgba(255,255,255,0.15)',
              position: 'relative',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${fillRatio * 100}%`,
                background: PHILLIPS_COLORS.red,
              }}
            />
          </div>
        </div>
      </section>

      {/* Instructor cards */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <IndiaH2>Instructors</IndiaH2>
          <div
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(instructors.length, 3)}, 1fr)`,
              gap: 24,
            }}
          >
            {instructors.slice(0, 3).map((s, i) => (
              <div
                key={i}
                style={{
                  background: PHILLIPS_COLORS.black,
                  color: '#fff',
                  padding: 28,
                  borderTop: `4px solid ${PHILLIPS_COLORS.red}`,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: '50%',
                    background: PHILLIPS_COLORS.maroon,
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...F_DISPLAY,
                    fontSize: 28,
                  }}
                >
                  {s.initials ?? s.name?.charAt(0) ?? '?'}
                </div>
                <div style={{ ...F_DISPLAY, fontSize: 16, marginBottom: 6 }}>{s.name ?? ''}</div>
                {s.title && (
                  <div style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 1.5, color: 'rgba(255,255,255,0.75)' }}>
                    {s.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description body */}
      {(classEvent.description ?? classEvent.course?.description) && (
        <section style={{ background: '#F2F4F6', padding: '64px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 15,
                lineHeight: 1.85,
                color: PHILLIPS_COLORS.grey,
                margin: 0,
              }}
            >
              {classEvent.description ?? classEvent.course?.description}
            </p>
          </div>
        </section>
      )}

      {/* Registration CTA */}
      {classEvent.registrationUrl && (
        <section style={{ background: '#fff', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <IndiaH2>Reserve your seat</IndiaH2>
            <p
              style={{
                marginTop: 24,
                marginBottom: 32,
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 15,
                lineHeight: 1.7,
                color: PHILLIPS_COLORS.grey,
              }}
            >
              Class fills on a first-come basis. Federal customers should mention their contract vehicle in the notes field after registration.
            </p>
            <IndiaCtaButton variant="hero" size="lg" href={classEvent.registrationUrl}>
              Register Now
            </IndiaCtaButton>
          </div>
        </section>
      )}

      {/* Intent-gated bottom form (conversion only) */}
      {intent === 'conversion' && (
        <div style={{ background: '#F2F4F6' }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
    </main>
  )
}
