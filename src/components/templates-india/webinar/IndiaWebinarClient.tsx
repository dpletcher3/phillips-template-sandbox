import {
  IndiaContentHero,
  IndiaLogoCarousel,
  IndiaRepeatableLeadForm,
  IndiaCtaButton,
  IndiaH2,
} from '@/components/india'
import { sanityImageUrl, SAMPLE_LEAD_FORM } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'

export interface SanityWebinar {
  title?: string
  scheduledAt?: string
  status?: string // 'upcoming' | 'on-demand' | 'live' (live not in enum but tolerated)
  registrationUrl?: string
  recordingUrl?: string
  description?: string
  relatedBrands?: Array<{ name?: string; slug?: { current?: string }; logo?: unknown }>
  statusLabel?: string
  speakers?: Array<{ initials?: string; name?: string; role?: string }>
  agenda?: Array<{ time?: string; item?: string }>
  formTitle?: string
  heroImage?: unknown // not in schema but tolerated
  intent?: string
}

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='30' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function IndiaWebinarClient({ webinar }: { webinar: SanityWebinar }) {
  const status = (webinar.status ?? '').toLowerCase()
  const statusDisplay = webinar.statusLabel ?? (status ? status.toUpperCase() : 'UPCOMING')
  const heroBg = sanityImageUrl(webinar.heroImage) ?? placeholderTileUrl(webinar.title ?? 'WEBINAR', '#3F0017')
  const formTitle = webinar.formTitle ?? 'Register for this webinar'

  const metadata = [
    formatDate(webinar.scheduledAt) ? { label: 'Date', value: formatDate(webinar.scheduledAt) as string } : null,
    { label: 'Status', value: statusDisplay },
  ].filter(Boolean) as Array<{ label: string; value: string }>

  // First paragraph of description as subtitle
  const subtitle = webinar.description?.split('\n')[0]?.slice(0, 240)

  const speakers = webinar.speakers ?? []
  const agenda = webinar.agenda ?? []

  const logos = (webinar.relatedBrands ?? []).map(b => ({
    src: sanityImageUrl(b.logo) ?? placeholderTileUrl(b.name ?? 'BRAND', '#1b1e34'),
    alt: b.name ?? 'Related brand',
  }))

  const registerForm = { ...SAMPLE_LEAD_FORM, title: formTitle }

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      <IndiaContentHero
        eyebrow={`WEBINAR — ${statusDisplay}`}
        title={webinar.title ?? 'Webinar'}
        subtitle={subtitle}
        backgroundImage={{ src: heroBg, alt: webinar.title ?? '' }}
        metadata={metadata}
      />

      {/* Status-conditional CTA */}
      <section style={{ background: '#fff', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {status === 'live' && webinar.registrationUrl && (
            <>
              <style>{`
                @keyframes india-pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
              `}</style>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: PHILLIPS_COLORS.red,
                    animation: 'india-pulse 1.4s infinite',
                  }}
                />
                <span style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 2, color: PHILLIPS_COLORS.red }}>LIVE NOW</span>
              </div>
              <div>
                <IndiaCtaButton variant="hero" size="lg" href={webinar.registrationUrl}>
                  Join Now
                </IndiaCtaButton>
              </div>
            </>
          )}
          {status !== 'live' && status !== 'on-demand' && webinar.registrationUrl && (
            <IndiaCtaButton variant="hero" size="lg" href={webinar.registrationUrl}>
              Register Now
            </IndiaCtaButton>
          )}
          {status === 'on-demand' && webinar.recordingUrl && (
            <IndiaCtaButton variant="body" size="lg" href={webinar.recordingUrl}>
              Watch Recording
            </IndiaCtaButton>
          )}
        </div>
      </section>

      {/* Agenda — timeline list with red vertical connector */}
      {agenda.length > 0 && (
        <section style={{ background: '#F2F4F6', padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <IndiaH2>Agenda</IndiaH2>
            <div style={{ marginTop: 40, position: 'relative' }}>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 8,
                  bottom: 8,
                  left: 110,
                  width: 2,
                  background: PHILLIPS_COLORS.red,
                }}
              />
              {agenda.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '110px 1fr',
                    gap: 24,
                    padding: '14px 0',
                    alignItems: 'baseline',
                  }}
                >
                  <div
                    style={{
                      ...F_DISPLAY,
                      fontSize: 13,
                      letterSpacing: 1,
                      color: PHILLIPS_COLORS.red,
                      textAlign: 'right',
                      paddingRight: 8,
                    }}
                  >
                    {a.time ?? ''}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-barlow-condensed), sans-serif',
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: PHILLIPS_COLORS.black,
                      paddingLeft: 20,
                    }}
                  >
                    {a.item ?? ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Speakers — 3-up dark-card grid; people pattern (not forced into DarkCategoryCard) */}
      {speakers.length > 0 && (
        <section style={{ background: '#fff', padding: '80px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <IndiaH2>Speakers</IndiaH2>
            <div
              style={{
                marginTop: 40,
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(speakers.length, 3)}, 1fr)`,
                gap: 24,
              }}
            >
              {speakers.slice(0, 3).map((s, i) => (
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
                  {s.role && (
                    <div style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 1.5, color: 'rgba(255,255,255,0.75)' }}>
                      {s.role}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related brands */}
      {logos.length > 0 && (
        <IndiaLogoCarousel logos={logos} title="Featured brands" />
      )}

      {/* Registration form — always renders */}
      <div style={{ background: '#F2F4F6' }}>
        <IndiaRepeatableLeadForm form={registerForm} placement="page-bottom" variant="card" />
      </div>
    </main>
  )
}
