import type { PortableTextBlock } from '@portabletext/types'
import {
  IndiaHeroWithForm,
  IndiaPhotoGrid,
  IndiaGlasseyTabs,
  IndiaLogoCarousel,
  IndiaDarkCategoryCard,
  IndiaRepeatableLeadForm,
  indiaPortableTextComponents,
  type PhotoTab,
} from '@/components/india'
import PortableText from '@/components/PortableText'
import { PHILLIPS_COLORS } from '@/lib/constants'
import IndiaFAQ from '../_shared/IndiaFAQ'
import { sanityImageUrl, SAMPLE_LEAD_FORM, readIntent } from '../_shared/helpers'
import TemplateBadge from '@/components/TemplateBadge'

// Loose typing — receives the personaPage singleton document. The
// existing personaPageQuery in queries.ts does not project intent.
export interface SanityPersonaPage {
  persona?: string
  headline?: string
  heroImage?: unknown
  description?: string
  forLabel?: string
  featuredSolutions?: Array<{
    name?: string
    slug?: { current?: string }
    offering?: string
    shortDesc?: string
  }>
  featuredBrands?: Array<{
    name?: string
    slug?: { current?: string }
    tagline?: string
    category?: string[]
  }>
  filterTabs?: Array<{
    id?: string
    label?: string
    solutions?: Array<{ name?: string; slug?: { current?: string } }>
    brands?: Array<{ name?: string; slug?: { current?: string } }>
  }>
  intent?: string
}

function placeholderTileUrl(label: string, color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='${color}'/><text x='300' y='320' text-anchor='middle' font-family='sans-serif' font-size='36' font-weight='700' fill='#fff'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function machineCardUrl(label: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#1a1a1a'/><rect x='80' y='80' width='240' height='160' fill='#333' stroke='#647883' stroke-width='2'/><text x='200' y='170' text-anchor='middle' font-family='sans-serif' font-size='18' font-weight='700' fill='#8a8a8a'>${label.toUpperCase()}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function logoSvg(name: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 40'><text x='80' y='28' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='18' fill='#1a1a1a'>${name}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// Synthetic Portable Text block for rendering a plain-text description
// through the shared renderer. personaPage.description is `type: 'text'`
// in the schema (plain string), not blockContent — TBD-verify whether to
// upgrade the schema field to blockContent in a follow-up session.
function descriptionAsBlocks(text: string): PortableTextBlock[] {
  return text
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((para, i) => ({
      _type: 'block',
      _key: `desc-${i}`,
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: `desc-${i}-s`, text: para, marks: [] }],
    }))
}

// TBD-verify: the GlasseyTabs body source. personaPage schema does not
// currently include a photoTabSet field (added in 5a as a shared object
// type, but not yet referenced from personaPage). Hardcoded sample below;
// follow-up schema session should add `applicationsTabs: photoTabSet` to
// personaPage and pull from it.
const SAMPLE_APPLICATIONS_TABS: PhotoTab[] = [
  {
    image: placeholderTileUrl('CNC MILLING', '#3F0017'),
    label: 'CNC Milling',
    body: [
      {
        _type: 'block',
        _key: 'cm1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'cm1s', text: 'High-precision subtractive machining for orthopedic implants, surgical instruments, and diagnostic equipment housings.', marks: [] }],
      },
    ],
    ctaUrl: '#',
  },
  {
    image: placeholderTileUrl('CNC TURNING', '#1b1e34'),
    label: 'CNC Turning',
    body: [
      {
        _type: 'block',
        _key: 'ct1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ct1s', text: 'Cylindrical components — implant pins, shafts, bushings — at production volume.', marks: [] }],
      },
    ],
  },
  {
    image: placeholderTileUrl('ADDITIVE', '#0a5f54'),
    label: 'Additive Manufacturing',
    body: [
      {
        _type: 'block',
        _key: 'am1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'am1s', text: 'Metal AM enables porous-lattice implants and patient-specific geometries impossible with subtractive methods.', marks: [] }],
      },
    ],
  },
  {
    image: placeholderTileUrl('METAL FORMING', '#647883'),
    label: 'Metal Forming',
    body: [
      {
        _type: 'block',
        _key: 'mf1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'mf1s', text: 'Sheet-metal forming for instrument trays, cases, and enclosures.', marks: [] }],
      },
    ],
  },
]

// TBD-verify: logo carousel source. personaPage schema has no
// trustedClients / customerLogos field. Hardcoded fallback.
const SAMPLE_TRUST_LOGOS = [
  { src: logoSvg('Boston Sci'), alt: 'Boston Scientific' },
  { src: logoSvg('Medtronic'), alt: 'Medtronic' },
  { src: logoSvg('Stryker'), alt: 'Stryker' },
  { src: logoSvg('Zimmer'), alt: 'Zimmer Biomet' },
  { src: logoSvg('3M Health'), alt: '3M Health Care' },
  { src: logoSvg('Smith+N'), alt: 'Smith+Nephew' },
]

export default function IndiaPersonaClient({ personaPage }: { personaPage: SanityPersonaPage }) {
  const intent = readIntent(personaPage)

  const heroBg =
    sanityImageUrl(personaPage.heroImage) ??
    placeholderTileUrl(personaPage.persona ?? 'PERSONA', '#3F0017')

  const eyebrow = personaPage.forLabel ?? (personaPage.persona ? `FOR ${personaPage.persona.toUpperCase()}` : undefined)

  // Industrial applications grid — sourced from filterTab labels if
  // present, else hardcoded fallback.
  // TBD-verify: filterTabs aren't really photo tiles; this is a best-fit
  // adapter. A future session could add a dedicated `applications` field
  // (array of { image, label, href }) to personaPage.
  const applicationTiles =
    personaPage.filterTabs && personaPage.filterTabs.length > 0
      ? personaPage.filterTabs.slice(0, 6).map((tab, i) => ({
          image: placeholderTileUrl(tab.label ?? `App ${i + 1}`, ['#0a5f54', '#3F0017', '#1b1e34', '#647883', '#F9423A', '#000'][i % 6]),
          alt: tab.label ?? '',
          caption: tab.label ?? '',
        }))
      : ['Aerospace', 'Defense', 'Energy', 'Automotive', 'Medical', 'Industrial'].map((label, i) => ({
          image: placeholderTileUrl(label, ['#0a5f54', '#3F0017', '#1b1e34', '#647883', '#F9423A', '#000'][i % 6]),
          alt: label,
          caption: label,
        }))

  // DarkCategoryCard grid sourced from featuredBrands (the closest
  // existing field). TBD-verify: a future schema session could add a
  // dedicated `featuredCaseStudies` field for persona pages.
  const featuredBrands = (personaPage.featuredBrands ?? []).slice(0, 6)
  const darkCards =
    featuredBrands.length > 0
      ? featuredBrands.map(b => ({
          title: b.name ?? '',
          description: b.tagline,
          href: b.slug?.current ? `/india/brand/${b.slug.current}` : undefined,
          image: machineCardUrl(b.name ?? ''),
        }))
      : [
          { title: 'Haas 5-Axis Machining', description: 'Mid-range trunnion mills', href: '#' },
          { title: 'Hurco 5-Axis Machining', description: 'Conversational programming', href: '#' },
          { title: 'Fives Liné Machining', description: 'Large-envelope production', href: '#' },
          { title: 'CNC Turning', description: 'Cylindrical precision work', href: '#' },
          { title: 'EDM Machines', description: 'Hardened-tool detail work', href: '#' },
          { title: 'Grinding Machines', description: 'Surface and ID/OD finishing', href: '#' },
        ].map(c => ({ ...c, image: machineCardUrl(c.title) }))

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <TemplateBadge label="INDIA" color="#F9423A" />

      {/* 1. Hero with form */}
      <IndiaHeroWithForm
        eyebrow={eyebrow}
        title={personaPage.headline ?? `For ${personaPage.persona ?? 'You'}`}
        backgroundImage={{ src: heroBg, alt: personaPage.headline ?? '' }}
        form={SAMPLE_LEAD_FORM}
      />

      {/* 2. Intro paragraph — rendered via shared PortableText with india
          components map. personaPage.description is `type: 'text'`
          (plain string), so we adapt it into Portable Text blocks. */}
      {personaPage.description && (
        <section style={{ background: '#fff', padding: '48px 48px 16px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <PortableText
              value={descriptionAsBlocks(personaPage.description)}
              components={indiaPortableTextComponents}
            />
          </div>
        </section>
      )}

      {/* 3. Applications photo grid */}
      <IndiaPhotoGrid tiles={applicationTiles} />

      {/* 4. GlasseyTabs — hardcoded sample applications tabs (TBD-verify:
          add photoTabSet field to personaPage in a follow-up schema session). */}
      <IndiaGlasseyTabs tabs={SAMPLE_APPLICATIONS_TABS} />

      {/* 5. Customer-logo trust-bar (TBD-verify: needs a customerLogos
          field on personaPage). */}
      <IndiaLogoCarousel
        title="Trusted by industry leaders"
        logos={SAMPLE_TRUST_LOGOS}
      />

      {/* 6. DarkCategoryCard grid sourced from featuredBrands */}
      <section style={{ background: '#fff', padding: '64px 48px' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {darkCards.map((card, i) => (
            <IndiaDarkCategoryCard
              key={`${card.title}-${i}`}
              image={card.image}
              title={card.title}
              description={card.description}
              href={card.href}
            />
          ))}
        </div>
      </section>

      {/* 7. ProTipsCallout — SKIPPED for personaPage in 5d.
          TBD-verify: personaPage schema does NOT include a callouts field
          (Brand and Solution do, per 5a). Adding callouts to personaPage
          is a candidate for a future schema session; until then this
          section is intentionally absent. */}

      {/* 8. FAQ */}
      <IndiaFAQ />

      {/* 9. Intent-gated forms (mid + bottom for 'conversion'; mid only
          for 'consideration') */}
      {(intent === 'consideration' || intent === 'conversion') && (
        <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="mid-page" variant="inline" />
      )}
      {intent === 'conversion' && (
        <div style={{ background: PHILLIPS_COLORS.bg }}>
          <IndiaRepeatableLeadForm form={SAMPLE_LEAD_FORM} placement="page-bottom" variant="card" />
        </div>
      )}
    </main>
  )
}
