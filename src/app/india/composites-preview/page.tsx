import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/types'
import {
  IndiaHeroWithForm,
  IndiaPortfolioRow,
  IndiaProTipsCallout,
  IndiaGlasseyTabs,
  IndiaDarkCategoryCard,
  IndiaRepeatableLeadForm,
  IndiaSectionBreak,
  IndiaPhotoGrid,
  type LeadForm,
  type PhotoTab,
  type Callout,
} from '@/components/india'

export const metadata: Metadata = {
  title: 'India composites preview',
  robots: { index: false, follow: false },
}

// ─── Sample data helpers (inline SVG data URIs — preview is hermetic) ───

function box(label: string, bg: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><rect width='600' height='400' fill='${bg}'/><text x='300' y='215' text-anchor='middle' font-family='sans-serif' font-size='30' font-weight='700' fill='#fff'>${label}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function machine(label: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#1a1a1a'/><rect x='80' y='80' width='240' height='160' fill='#333' stroke='#647883' stroke-width='2'/><text x='200' y='170' text-anchor='middle' font-family='sans-serif' font-size='18' font-weight='700' fill='#8a8a8a'>${label}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// ─── Sample LeadForm shapes ───

const sampleLeadForm: LeadForm = {
  title: 'Get in touch',
  subtitle: 'Talk to a specialist about your manufacturing challenge.',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'company', type: 'text', required: false },
    { name: 'phone', type: 'tel', required: false },
  ],
  submitLabel: 'Send',
  destinationId: 'sample-dest-india-preview',
  regionScope: 'in',
}

const inlineFormConfig: LeadForm = {
  title: 'Quick contact',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'tel', required: false },
  ],
  submitLabel: 'Request a quote',
  destinationId: 'sample-dest-india-preview-inline',
  regionScope: 'in',
}

// ─── Sample Portable Text bodies ───

function block(text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
  }
}
function bullet(text: string): PortableTextBlock {
  return { ...block(text), listItem: 'bullet', level: 1 } as PortableTextBlock
}

const sampleProtipsBody: PortableTextBlock[] = [
  block('A few essentials when selecting a 5-axis machine for your shop:'),
  bullet('Match the axis configuration to your dominant part geometry'),
  bullet('Plan rigid fixturing — every degree of freedom adds vibration risk'),
  bullet('Budget for CAM and post-processor work alongside the hardware'),
  bullet('Train operators on simultaneous-vs-positional 5-axis distinctions'),
]

const sampleTabBody: PortableTextBlock[] = [
  block('CNC milling is the most common subtractive process for medical components — high precision, repeatable, and compatible with the broadest range of metals and polymers.'),
  bullet('Titanium implants and orthopedic hardware'),
  bullet('Surgical instrument bodies'),
  bullet('Diagnostic equipment housings'),
]

const sampleGlasseyTabs: PhotoTab[] = [
  {
    image: box('CNC MILLING', '#3F0017'),
    label: 'CNC Milling',
    body: sampleTabBody,
    ctaUrl: '#',
  },
  {
    image: box('CNC TURNING', '#1b1e34'),
    label: 'CNC Turning',
    body: [block('CNC turning excels at cylindrical components — implant pins, shafts, bushings.')],
  },
  {
    image: box('ADDITIVE', '#0a5f54'),
    label: 'Additive Manufacturing',
    body: [block('Metal AM enables porous-lattice implants and patient-specific geometries impossible with subtractive methods.')],
  },
  {
    image: box('METAL FORMING', '#647883'),
    label: 'Metal Forming',
    body: [block('Sheet-metal forming for instrument trays, cases, and enclosures.')],
  },
]

const sampleProtipsCallout: Callout = {
  type: 'protips',
  title: '5-Axis Machining Essentials',
  body: sampleProtipsBody,
}

const sampleWarningCallout: Callout = {
  type: 'warning',
  title: 'Tolerance stack-up matters',
  chipLabel: 'HEADS UP', // explicit override of the type→label mapping
  body: [
    block('When you chain 5+ operations across fixtures, tolerance compounds quickly. Plan datum strategy before cutting.'),
  ],
}

// ─── Page styles ───

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-barlow-condensed), sans-serif',
  fontSize: 11,
  fontWeight: 700,
  fontStyle: 'italic',
  textTransform: 'uppercase',
  letterSpacing: 2,
  color: '#647883',
  margin: '64px 48px 16px',
}

export default function IndiaCompositesPreviewPage() {
  return (
    <main
      style={{
        background: '#fff',
        minHeight: '100vh',
        color: '#1a1a1a',
        fontFamily: 'var(--font-barlow-condensed), sans-serif',
      }}
    >
      <header
        style={{
          padding: '48px 48px 24px',
          borderBottom: '1px solid #D7DFE3',
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontWeight: 700,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            fontSize: 32,
            letterSpacing: 1,
            margin: 0,
          }}
        >
          India family — composites preview{' '}
          <span style={{ color: '#647883', fontWeight: 400, fontSize: 18 }}>(session 5c)</span>
        </h1>
        <p
          style={{
            marginTop: 12,
            color: '#647883',
            fontSize: 13,
            fontStyle: 'normal',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Developer verification page. Not part of production navigation. <code>noindex,nofollow</code>.
        </p>
      </header>

      {/* ===== IndiaHeroWithForm ===== */}
      <h2 style={sectionLabelStyle}>§5.1 — IndiaHeroWithForm</h2>
      <IndiaHeroWithForm
        eyebrow="PHILLIPS"
        title="Advanced metal forming solutions"
        subtitle="Precision, power, performance — built for the demands of modern manufacturing."
        backgroundImage={{ src: box('HERO BACKGROUND', '#3F0017'), alt: 'Hero background' }}
        primaryCta={{ label: 'About metal forming', href: '#' }}
        form={sampleLeadForm}
      />

      {/* ===== IndiaPortfolioRow ===== */}
      <h2 style={sectionLabelStyle}>§5.2 — IndiaPortfolioRow ×3 (alternating sides)</h2>
      <IndiaPortfolioRow
        index={0}
        image={box('HAAS VF-3', '#0a5f54')}
        brandLabel="HAAS Automation"
        title="VF-Series 5-Axis Vertical Mills"
        body="The HAAS VF-Series brings 5-axis capability to mid-range shops at an accessible price point. Trunnion-style table with rigid construction for production-volume work."
        subActions={[
          { label: 'View brochure', href: '#' },
          { label: 'Spec sheet', href: '#' },
        ]}
        primaryCta={{ label: 'Explore HAAS', href: '#' }}
      />
      <IndiaPortfolioRow
        index={1}
        image={box('APEC SK-500', '#1b1e34')}
        brandLabel="APEC"
        title="SK-Series Bridge Mill Centers"
        body="APEC's bridge-mill platform for large-envelope parts — aerospace structures, mold bases, energy-sector components."
        primaryCta={{ label: 'Explore APEC', href: '#' }}
      />
      <IndiaPortfolioRow
        index={2}
        image={box('HERMLE C42U', '#3F0017')}
        brandLabel="HERMLE"
        title="C-Series 5-Axis Machining Centers"
        body="German-engineered 5-axis machining for the tightest tolerances. Swivel-head architecture, dynamic positioning under load, the gold standard for prototype-to-production work."
        subActions={[{ label: 'Compare models', href: '#' }]}
        primaryCta={{ label: 'Explore HERMLE', href: '#' }}
      />

      {/* ===== IndiaProTipsCallout ===== */}
      <h2 style={sectionLabelStyle}>§5.4 — IndiaProTipsCallout (type=&apos;protips&apos; default + chipLabel override)</h2>
      <div style={{ padding: '0 48px', maxWidth: 1240, margin: '0 auto' }}>
        <IndiaProTipsCallout callout={sampleProtipsCallout} />
        <IndiaProTipsCallout callout={sampleWarningCallout} />
      </div>

      {/* ===== IndiaGlasseyTabs ===== */}
      <h2 style={sectionLabelStyle}>§5.5 — IndiaGlasseyTabs (4 tabs)</h2>
      <IndiaGlasseyTabs tabs={sampleGlasseyTabs} />

      {/* ===== IndiaDarkCategoryCard grid ===== */}
      <h2 style={sectionLabelStyle}>§5.9 — IndiaDarkCategoryCard grid (md size)</h2>
      <div
        style={{
          padding: '24px 48px 64px',
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        {[
          { title: 'Haas 5-Axis Machining', description: 'Mid-range trunnion mills' },
          { title: 'Hurco 5-Axis Machining', description: 'Conversational programming' },
          { title: 'Fives Liné Machining', description: 'Large-envelope production' },
          { title: 'CNC Turning', description: 'Cylindrical precision work' },
          { title: 'EDM Machines', description: 'Hardened-tool detail work' },
          { title: 'Grinding Machines', description: 'Surface and ID/OD finishing' },
        ].map(card => (
          <IndiaDarkCategoryCard
            key={card.title}
            image={machine(card.title)}
            title={card.title}
            description={card.description}
            href="#"
          />
        ))}
      </div>

      {/* ===== IndiaRepeatableLeadForm — both variants ===== */}
      <h2 style={sectionLabelStyle}>§5.10 — IndiaRepeatableLeadForm (inline variant, mid-page placement)</h2>
      <IndiaRepeatableLeadForm form={inlineFormConfig} placement="mid-page" variant="inline" />

      <h2 style={sectionLabelStyle}>§5.10 — IndiaRepeatableLeadForm (card variant, page-bottom placement)</h2>
      <div style={{ padding: '0 48px', maxWidth: 600, margin: '0 auto 64px' }}>
        <IndiaRepeatableLeadForm form={sampleLeadForm} placement="page-bottom" variant="card" />
      </div>

      {/* ===== Assembled mini-page ===== */}
      <h2 style={sectionLabelStyle}>Assembled mini-page (closest preview to a real india page until 5d)</h2>
      <div style={{ borderTop: '1px solid #D7DFE3', marginTop: 8 }}>
        <IndiaHeroWithForm
          eyebrow="MINI-PAGE EXAMPLE"
          title="Phillips fiber laser cutting"
          subtitle="Precision, versatility, and a whole new world of easy multi-machine production."
          backgroundImage={{ src: box('LASER SPARKS', '#1b1e34'), alt: '' }}
          primaryCta={{ label: 'Learn more', href: '#' }}
          form={sampleLeadForm}
        />
        <IndiaSectionBreak
          headline="Transform your manufacturing process"
          tagline="Let us know your challenges and find the solution together."
        />
        <IndiaPortfolioRow
          index={0}
          image={box('PLC SERIES', '#000')}
          brandLabel="PLC Series"
          title="High-precision parts at production speed"
          body="Cuts through 25mm steel with ease. Maintenance-free fiber laser source. 24/7 production-ready uptime. Compatible with existing fixturing."
          primaryCta={{ label: 'Explore the PLC Series', href: '#' }}
        />
        <div style={{ padding: '0 48px', maxWidth: 1240, margin: '0 auto' }}>
          <IndiaProTipsCallout callout={sampleProtipsCallout} />
        </div>
        <IndiaPhotoGrid
          tiles={[
            { image: box('AEROSPACE', '#0a5f54'), alt: 'Aerospace', caption: 'Aerospace' },
            { image: box('DEFENSE', '#3F0017'), alt: 'Defense', caption: 'Defense' },
            { image: box('ENERGY', '#1b1e34'), alt: 'Energy', caption: 'Energy' },
            { image: box('AUTOMOTIVE', '#647883'), alt: 'Automotive', caption: 'Automotive' },
            { image: box('MEDICAL', '#F9423A'), alt: 'Medical', caption: 'Medical' },
            { image: box('INDUSTRIAL', '#000'), alt: 'Industrial', caption: 'Industrial' },
          ]}
        />
        <IndiaRepeatableLeadForm form={inlineFormConfig} placement="page-bottom" variant="inline" />
      </div>

      {/* ===== Footer ===== */}
      <footer
        style={{
          padding: '48px',
          maxWidth: 1400,
          margin: '0 auto',
          color: '#647883',
          fontSize: 12,
          fontStyle: 'normal',
          fontFamily: 'system-ui, sans-serif',
          borderTop: '1px solid #D7DFE3',
        }}
      >
        Composites preview only. Real india page-type templates ship from session 5d. See{' '}
        <code>docs/india-design-system.md</code>.
      </footer>
    </main>
  )
}
