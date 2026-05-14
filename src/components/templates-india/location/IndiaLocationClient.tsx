import {
  IndiaContentHero,
  IndiaH2,
  IndiaRepeatableLeadForm,
} from '@/components/india'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'

export interface SanityLocation {
  name?: string
  region?: string
  address?: string
  phone?: string
  photo?: unknown
  services?: Array<{ number?: string; name?: string; description?: string }>
  eyebrow?: string
  hours?: Array<{ days?: string; time?: string }>
  marqueeItems?: string[]
  directionsUrl?: string
  // Not in schema today
  heroImage?: unknown
  description?: string
  intent?: string
}

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='28' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function IndiaLocationClient({ location }: { location: SanityLocation }) {
  const intent = readIntent(location)
  const heroBg = sanityImageUrl(location.heroImage ?? location.photo) ?? placeholderTileUrl(location.name ?? 'LOCATION', '#0a5f54')

  // Parse city/state/country from address text and name
  const nameParts = (location.name ?? '').split(/[,–—-]/).map(s => s.trim())
  const city = nameParts[0] || ''
  const state = nameParts[1] || ''

  const metadata = [
    city          ? { label: 'City',    value: city } : null,
    state         ? { label: 'State',   value: state } : null,
    location.region ? { label: 'Region',  value: location.region } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  const subtitle = location.description?.split('\n')[0]?.slice(0, 240)
  const services = (location.services ?? []).filter(s => s?.name)
  const hours = location.hours ?? []

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      <IndiaContentHero
        eyebrow="LOCATION"
        title={location.name ?? 'Phillips location'}
        subtitle={subtitle}
        backgroundImage={{ src: heroBg, alt: location.name ?? '' }}
        metadata={metadata}
      />

      {/* Address + hours two-column */}
      <style>{`
        .india-location-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 24px;
        }
        @media (max-width: 900px) {
          .india-location-grid { grid-template-columns: 1fr; gap: 32px; padding: 48px 20px; }
        }
      `}</style>
      <section style={{ background: '#fff' }}>
        <div className="india-location-grid">
          <div>
            <IndiaH2 align="left">Visit Us</IndiaH2>
            <div style={{ marginTop: 24 }}>
              {location.address && (
                <p
                  style={{
                    fontFamily: 'var(--font-barlow-condensed), sans-serif',
                    fontSize: 14,
                    lineHeight: 1.85,
                    color: PHILLIPS_COLORS.grey,
                    margin: '0 0 14px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {location.address}
                </p>
              )}
              {location.phone && (
                <p
                  style={{
                    fontFamily: 'var(--font-barlow-condensed), sans-serif',
                    fontSize: 14,
                    color: PHILLIPS_COLORS.black,
                    margin: '0 0 16px',
                  }}
                >
                  {location.phone}
                </p>
              )}
              {location.directionsUrl && (
                <a
                  href={location.directionsUrl}
                  style={{
                    ...F_DISPLAY,
                    fontSize: 12,
                    letterSpacing: 2,
                    color: PHILLIPS_COLORS.red,
                    textDecoration: 'none',
                  }}
                >
                  ▸ Get Directions
                </a>
              )}
            </div>
          </div>
          <div>
            <IndiaH2 align="left">Hours</IndiaH2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0' }}>
              {hours.map((h, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: `1px solid ${PHILLIPS_COLORS.light}`,
                  }}
                >
                  <span style={{ ...F_DISPLAY, fontSize: 13, letterSpacing: 1, color: PHILLIPS_COLORS.black }}>
                    {h.days ?? ''}
                  </span>
                  <span style={{ ...F_LIGHT, fontSize: 13, letterSpacing: 1, color: PHILLIPS_COLORS.grey }}>
                    {h.time ?? ''}
                  </span>
                </li>
              ))}
              {hours.length === 0 && (
                <li
                  style={{
                    ...F_LIGHT,
                    fontSize: 13,
                    color: PHILLIPS_COLORS.grey,
                    padding: '10px 0',
                  }}
                >
                  Mon–Fri · 8:00 AM – 5:00 PM
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section style={{ background: '#F2F4F6', padding: '80px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <IndiaH2>Services at this location</IndiaH2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '40px 0 0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 20,
              }}
            >
              {services.map((s, i) => (
                <li
                  key={i}
                  style={{
                    background: '#fff',
                    borderTop: `3px solid ${PHILLIPS_COLORS.red}`,
                    padding: 20,
                  }}
                >
                  {s.number && (
                    <div style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 2, color: PHILLIPS_COLORS.grey }}>
                      {s.number}
                    </div>
                  )}
                  <div style={{ ...F_DISPLAY, fontSize: 16, color: PHILLIPS_COLORS.black, margin: '8px 0' }}>
                    {s.name}
                  </div>
                  {s.description && (
                    <p
                      style={{
                        fontFamily: 'var(--font-barlow-condensed), sans-serif',
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: PHILLIPS_COLORS.grey,
                        margin: 0,
                      }}
                    >
                      {s.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Map placeholder — TBD-verify cleanup-queue §4. Real Google Maps integration is out of scope this session. */}
      <section
        style={{
          background: PHILLIPS_COLORS.black,
          color: '#fff',
          minHeight: 280,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ ...F_DISPLAY, fontSize: 32, letterSpacing: 2, color: PHILLIPS_COLORS.red, marginBottom: 12 }}>
            MAP
          </div>
          {location.address && (
            <div
              style={{
                ...F_LIGHT,
                fontSize: 12,
                letterSpacing: 2,
                color: 'rgba(255,255,255,0.7)',
                whiteSpace: 'pre-line',
                maxWidth: 400,
                margin: '0 auto',
              }}
            >
              {location.address}
            </div>
          )}
        </div>
      </section>

      {/* Intent-gated bottom form (conversion only) */}
      {intent === 'conversion' && (
        <div style={{ background: '#F2F4F6' }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
    </main>
  )
}
