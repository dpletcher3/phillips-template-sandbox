import { IndiaH2, IndiaTickCheckList, IndiaCtaButton } from '@/components/india'
import SanityImage from '@/components/SanityImage'
import { sanityImageUrl } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'

export interface SanityTeamMember {
  name?: string
  title?: string
  photo?: unknown
  bio?: string
  isLeadership?: boolean
  linkedinUrl?: string
  issueLabel?: string
  facts?: Array<{ label?: string; value?: string }>
  // Not in schema today — surfaced via TBD-verify; cleanup-queue §1 entry.
  expertise?: string[]
  email?: string
  department?: string
  intent?: string
}

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='28' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// TBD-verify: expertise hardcoded fallback. teamMember schema has no
// `expertise` field today; cleanup-queue §1 entry.
const EXPERTISE_FALLBACK = [
  'CNC programming and post-processor work',
  'Workforce training and onboarding',
  '5-axis fixture design and probing strategy',
  'Federal contracting and ITAR compliance',
]

export default function IndiaTeamMemberClient({ teamMember }: { teamMember: SanityTeamMember }) {
  const photoUrl = sanityImageUrl(teamMember.photo) ?? placeholderTileUrl(teamMember.name ?? 'TEAM', '#3F0017')
  const bioParas = (teamMember.bio ?? '').split('\n\n').filter(Boolean)
  const expertise = teamMember.expertise && teamMember.expertise.length > 0
    ? teamMember.expertise
    : EXPERTISE_FALLBACK

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      {/* Profile hero — inline, not IndiaContentHero (people pages have a different rhythm) */}
      <style>{`
        .india-team-hero {
          display: grid;
          grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
          gap: 56px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .india-team-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 20px;
          }
        }
      `}</style>

      <section style={{ background: '#F2F4F6' }}>
        <div className="india-team-hero">
          <div style={{ position: 'relative' }}>
            {teamMember.photo ? (
              <SanityImage
                image={teamMember.photo}
                alt={teamMember.name ?? ''}
                width={480}
                height={520}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  border: `4px solid ${PHILLIPS_COLORS.red}`,
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoUrl}
                alt={teamMember.name ?? ''}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  border: `4px solid ${PHILLIPS_COLORS.red}`,
                }}
              />
            )}
          </div>
          <div>
            {teamMember.issueLabel && (
              <div
                style={{
                  ...F_LIGHT,
                  fontSize: 11,
                  letterSpacing: 2,
                  color: PHILLIPS_COLORS.red,
                  marginBottom: 16,
                }}
              >
                {teamMember.issueLabel}
              </div>
            )}
            <IndiaH2 align="left">{teamMember.name ?? 'Team member'}</IndiaH2>
            {teamMember.title && (
              <div style={{ ...F_DISPLAY, fontSize: 16, color: PHILLIPS_COLORS.maroon, marginTop: 12 }}>
                {teamMember.title}
              </div>
            )}
            {teamMember.department && (
              <div style={{ ...F_LIGHT, fontSize: 12, letterSpacing: 1.5, color: PHILLIPS_COLORS.grey, marginTop: 6 }}>
                {teamMember.department}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bio */}
      {bioParas.length > 0 && (
        <section style={{ background: '#fff', padding: '64px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {bioParas.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-barlow-condensed), sans-serif',
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: PHILLIPS_COLORS.grey,
                  margin: '0 0 16px',
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Expertise */}
      <section style={{ background: '#F2F4F6', padding: '64px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <IndiaH2 align="left">Expertise</IndiaH2>
          <div style={{ marginTop: 24 }}>
            <IndiaTickCheckList items={expertise} />
          </div>
        </div>
      </section>

      {/* Contact strip — small CTAs */}
      {(teamMember.linkedinUrl || teamMember.email) && (
        <section style={{ background: '#fff', padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {teamMember.linkedinUrl && (
              <IndiaCtaButton variant="body" size="sm" href={teamMember.linkedinUrl}>
                LinkedIn
              </IndiaCtaButton>
            )}
            {teamMember.email && (
              <IndiaCtaButton variant="body" size="sm" href={`mailto:${teamMember.email}`}>
                Email
              </IndiaCtaButton>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
