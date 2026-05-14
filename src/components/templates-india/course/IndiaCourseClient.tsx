import {
  IndiaContentHero,
  IndiaLogoCarousel,
  IndiaTickCheckList,
  IndiaRepeatableLeadForm,
  IndiaH2,
} from '@/components/india'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'

export interface SanityCourse {
  title?: string
  track?: string
  audience?: string
  duration?: string
  description?: string
  relatedBrands?: Array<{ name?: string; slug?: { current?: string }; logo?: unknown }>
  trackLabel?: string
  levelLabel?: string
  modules?: Array<{ number?: number; name?: string; duration?: string }>
  prerequisites?: string[]
  machineLabel?: string
  heroImage?: unknown // not in schema, fallback used
  intent?: string
}

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='30' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function IndiaCourseClient({ course }: { course: SanityCourse }) {
  const intent = readIntent(course)
  const heroBg = sanityImageUrl(course.heroImage) ?? placeholderTileUrl(course.track ?? course.title ?? 'COURSE', '#0a5f54')

  const trackDisplay = course.trackLabel ?? course.track ?? 'COURSE'
  const eyebrow = `COURSE — ${trackDisplay.toUpperCase()}`
  const subtitle = course.description?.split('\n')[0]?.slice(0, 240)

  const metadata = [
    course.duration     ? { label: 'Duration', value: course.duration } : null,
    course.audience     ? { label: 'Audience', value: course.audience } : null,
    course.machineLabel ? { label: 'Machine',  value: course.machineLabel } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  const modules = (course.modules ?? []).filter(m => m?.name)
  const prerequisites = (course.prerequisites ?? []).filter(Boolean)
  const logos = (course.relatedBrands ?? []).map(b => ({
    src: sanityImageUrl(b.logo) ?? placeholderTileUrl(b.name ?? 'BRAND', '#1b1e34'),
    alt: b.name ?? 'Related brand',
  }))

  const registerForm = { ...SAMPLE_LEAD_FORM, title: 'Register for this course' }

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      <IndiaContentHero
        eyebrow={eyebrow}
        title={course.title ?? 'Course'}
        subtitle={subtitle}
        backgroundImage={{ src: heroBg, alt: course.title ?? '' }}
        metadata={metadata}
      />

      {/* Modules — numbered list with dark left rail */}
      {modules.length > 0 && (
        <section style={{ background: '#F2F4F6', padding: '80px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <IndiaH2 align="left">Course modules</IndiaH2>
            <ol style={{ listStyle: 'none', padding: 0, margin: '32px 0 0' }}>
              {modules.map((m, i) => (
                <li
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto',
                    gap: 20,
                    padding: '16px 0',
                    borderLeft: `3px solid ${PHILLIPS_COLORS.black}`,
                    paddingLeft: 20,
                    marginBottom: 8,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: PHILLIPS_COLORS.black,
                      color: '#fff',
                      border: `2px solid ${PHILLIPS_COLORS.red}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...F_DISPLAY,
                      fontSize: 14,
                    }}
                  >
                    {m.number ?? i + 1}
                  </div>
                  <div style={{ ...F_DISPLAY, fontSize: 16, color: PHILLIPS_COLORS.black }}>
                    {m.name}
                  </div>
                  {m.duration && (
                    <div style={{ ...F_LIGHT, fontSize: 11, letterSpacing: 1.5, color: PHILLIPS_COLORS.grey }}>
                      {m.duration}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Prerequisites */}
      {prerequisites.length > 0 && (
        <section style={{ background: '#fff', padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <IndiaH2 align="left">Prerequisites</IndiaH2>
            <div style={{ marginTop: 24 }}>
              <IndiaTickCheckList items={prerequisites} />
            </div>
          </div>
        </section>
      )}

      {/* Related brands */}
      {logos.length > 0 && (
        <IndiaLogoCarousel logos={logos} title="Course platforms" />
      )}

      {/* Intent-gated mid-page form */}
      {(intent === 'consideration' || intent === 'conversion') && (
        <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="mid-page" variant="inline" />
      )}

      {/* Registration form — always renders */}
      <div style={{ background: '#F2F4F6' }}>
        <IndiaRepeatableLeadForm form={registerForm} placement="page-bottom" variant="card" />
      </div>
    </main>
  )
}
