import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/types'
import PortableText from '@/components/PortableText'
import {
  IndiaH2,
  IndiaCtaButton,
  IndiaGlassCard,
  IndiaCaptionPill,
  IndiaSectionBreak,
  IndiaTickCheckList,
  IndiaLogoCarousel,
  IndiaPhotoGrid,
  indiaPortableTextComponents,
} from '@/components/india'

export const metadata: Metadata = {
  title: 'India primitives preview',
  robots: { index: false, follow: false },
}

// Inline SVG data URIs — keep the preview self-contained, no external assets.
function box(label: string, bg: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='400' height='400' fill='${bg}'/><text x='200' y='210' text-anchor='middle' font-family='sans-serif' font-size='28' fill='#fff'>${label}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function logo(name: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 40'><text x='80' y='28' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='18' fill='#1a1a1a'>${name}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-barlow-condensed), sans-serif',
  fontSize: 11,
  fontWeight: 700,
  fontStyle: 'italic',
  textTransform: 'uppercase',
  letterSpacing: 2,
  color: '#647883',
  margin: '48px 0 16px',
}

const subSectionLabelStyle: React.CSSProperties = {
  ...sectionLabelStyle,
  fontSize: 10,
  letterSpacing: 1.5,
  margin: '32px 0 12px',
  color: '#999',
}

const samplePortableText: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'b1',
    style: 'h2',
    children: [{ _type: 'span', _key: 's1', text: 'Portable Text sample H2', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block',
    _key: 'b2',
    style: 'h3',
    children: [{ _type: 'span', _key: 's2', text: 'Subsection H3', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block',
    _key: 'b3',
    style: 'normal',
    children: [
      { _type: 'span', _key: 's3a', text: 'A normal paragraph with a ', marks: [] },
      { _type: 'span', _key: 's3b', text: 'strong-em phrase', marks: ['strong', 'em'] },
      { _type: 'span', _key: 's3c', text: ' and an ', marks: [] },
      { _type: 'span', _key: 's3d', text: 'external link', marks: ['lnk1'] },
      { _type: 'span', _key: 's3e', text: ' rendering with the india components map.', marks: [] },
    ],
    markDefs: [{ _key: 'lnk1', _type: 'link', href: 'https://example.com' }],
  },
  {
    _type: 'block',
    _key: 'b4',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: 's4', text: 'First bullet with red tick', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block',
    _key: 'b5',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: 's5', text: 'Second bullet, same treatment', marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block',
    _key: 'b6',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: 's6', text: 'Third bullet to show list consistency', marks: [] }],
    markDefs: [],
  },
]

export default function IndiaPrimitivesPreviewPage() {
  return (
    <main
      style={{
        background: '#fff',
        minHeight: '100vh',
        color: '#1a1a1a',
        fontFamily: 'var(--font-barlow-condensed), sans-serif',
        padding: '48px',
        maxWidth: 1400,
        margin: '0 auto',
      }}
    >
      <header style={{ borderBottom: '1px solid #D7DFE3', paddingBottom: 24, marginBottom: 24 }}>
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
          India family — primitives preview <span style={{ color: '#647883', fontWeight: 400, fontSize: 18 }}>(session 5b)</span>
        </h1>
        <p style={{ marginTop: 12, color: '#647883', fontSize: 13, fontStyle: 'normal', fontFamily: 'system-ui, sans-serif' }}>
          Developer verification page. Not part of production navigation. <code>noindex,nofollow</code>.
        </p>
      </header>

      {/* ============================================================
          ATOMS
          ============================================================ */}
      <h2 style={sectionLabelStyle}>§6 — Atoms</h2>

      {/* IndiaH2 */}
      <h3 style={subSectionLabelStyle}>IndiaH2 — centered (default), left-aligned, as h3</h3>
      <div style={{ display: 'grid', gap: 40, marginBottom: 24 }}>
        <IndiaH2>Centered title with red tick</IndiaH2>
        <IndiaH2 align="left">Left-aligned: no tick</IndiaH2>
        <IndiaH2 as="h3">Semantically h3, visually h2</IndiaH2>
      </div>

      {/* IndiaCtaButton */}
      <h3 style={subSectionLabelStyle}>IndiaCtaButton — hero (orange) / body (red), three sizes</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
        <IndiaCtaButton variant="hero" size="sm">Hero sm</IndiaCtaButton>
        <IndiaCtaButton variant="hero" size="md">Hero md (default)</IndiaCtaButton>
        <IndiaCtaButton variant="hero" size="lg" href="#">Hero lg as link</IndiaCtaButton>
        <IndiaCtaButton variant="body" size="sm">Body sm</IndiaCtaButton>
        <IndiaCtaButton variant="body" size="md">Body md</IndiaCtaButton>
        <IndiaCtaButton variant="body" size="lg">Body lg</IndiaCtaButton>
      </div>

      {/* IndiaGlassCard */}
      <h3 style={subSectionLabelStyle}>IndiaGlassCard — light, medium, heavy intensity over a photographic background</h3>
      <div
        style={{
          position: 'relative',
          background: `url("${box('PHOTO', '#3F0017')}") center/cover`,
          padding: 48,
          marginBottom: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
      >
        <IndiaGlassCard intensity="light">
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Light intensity</div>
          <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700, fontStyle: 'italic', textTransform: 'uppercase' }}>
            Sample headline
          </div>
        </IndiaGlassCard>
        <IndiaGlassCard intensity="medium">
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Medium intensity</div>
          <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700, fontStyle: 'italic', textTransform: 'uppercase' }}>
            Sample headline
          </div>
        </IndiaGlassCard>
        <IndiaGlassCard intensity="heavy">
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>Heavy intensity (default)</div>
          <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700, fontStyle: 'italic', textTransform: 'uppercase' }}>
            Sample headline
          </div>
        </IndiaGlassCard>
      </div>

      {/* IndiaCaptionPill */}
      <h3 style={subSectionLabelStyle}>IndiaCaptionPill — three anchor positions over an image</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {(['bottom-left', 'bottom-center', 'top-left'] as const).map(pos => (
          <div
            key={pos}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              background: `url("${box('PILL', '#647883')}") center/cover`,
            }}
          >
            <IndiaCaptionPill position={pos}>{pos}</IndiaCaptionPill>
          </div>
        ))}
      </div>

      {/* ============================================================
          SIMPLE COMPONENTS
          ============================================================ */}
      <h2 style={sectionLabelStyle}>§5 — Simple components</h2>

      {/* IndiaSectionBreak */}
      <h3 style={subSectionLabelStyle}>IndiaSectionBreak — base (light), dark, with portrait inset</h3>
      <IndiaSectionBreak
        headline="Transform your manufacturing process"
        tagline="Let us know your challenges and find the solution together."
      />
      <IndiaSectionBreak
        headline="On a dark surface"
        tagline="Same austere typography, inverted contrast."
        surface="dark"
      />
      <IndiaSectionBreak
        headline="With portrait inset"
        tagline="Anchored left third on desktop; stacks above on mobile."
        portrait={{ src: box('PORTRAIT', '#000'), alt: 'Sample portrait' }}
      />

      {/* IndiaTickCheckList */}
      <h3 style={subSectionLabelStyle}>IndiaTickCheckList — default and inverted variants</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div style={{ padding: 24, background: '#F2F4F6' }}>
          <IndiaTickCheckList
            items={[
              'Cuts through 25mm steel with ease',
              'Maintenance-free fiber laser source',
              '24/7 production-ready uptime',
              'Compatible with existing fixturing',
            ]}
          />
        </div>
        <div style={{ padding: 24, background: '#000' }}>
          <IndiaTickCheckList
            variant="inverted"
            items={[
              'Inverted variant — light type on dark surface',
              'Same red-tick marker',
              'Used inside the hero glass card',
            ]}
          />
        </div>
      </div>

      {/* IndiaLogoCarousel */}
      <h3 style={subSectionLabelStyle}>IndiaLogoCarousel — autoScroll, hover to pause</h3>
      <IndiaLogoCarousel
        title="Trusted by manufacturers worldwide"
        logos={[
          { src: logo('HAAS'), alt: 'Haas' },
          { src: logo('APEC'), alt: 'APEC' },
          { src: logo('HERMLE'), alt: 'Hermle' },
          { src: logo('KITAMURA'), alt: 'Kitamura' },
          { src: logo('REICHENBACHER'), alt: 'Reichenbacher' },
          { src: logo('PHILLIPS'), alt: 'Phillips' },
        ]}
      />

      {/* IndiaPhotoGrid */}
      <h3 style={subSectionLabelStyle}>IndiaPhotoGrid — 6-up layout (default)</h3>
      <IndiaPhotoGrid
        tiles={[
          { image: box('AEROSPACE', '#0a5f54'), alt: 'Aerospace', caption: 'Aerospace' },
          { image: box('DEFENSE', '#3F0017'), alt: 'Defense', caption: 'Defense', href: '#' },
          { image: box('ENERGY', '#1b1e34'), alt: 'Energy', caption: 'Energy' },
          { image: box('AUTOMOTIVE', '#647883'), alt: 'Automotive', caption: 'Automotive' },
          { image: box('MEDICAL', '#F9423A'), alt: 'Medical', caption: 'Medical' },
          { image: box('INDUSTRIAL', '#000'), alt: 'Industrial', caption: 'Industrial' },
        ]}
      />

      <h3 style={subSectionLabelStyle}>IndiaPhotoGrid — 3-up layout</h3>
      <IndiaPhotoGrid
        layout="3-up"
        tiles={[
          { image: box('TILE 1', '#0a5f54'), alt: 'Tile 1', caption: '3-up tile A' },
          { image: box('TILE 2', '#3F0017'), alt: 'Tile 2', caption: '3-up tile B' },
          { image: box('TILE 3', '#647883'), alt: 'Tile 3', caption: '3-up tile C' },
        ]}
      />

      {/* ============================================================
          PORTABLE TEXT
          ============================================================ */}
      <h2 style={sectionLabelStyle}>§10 item 4 — Portable Text with india components map</h2>
      <div style={{ padding: 24, background: '#F2F4F6', maxWidth: 760 }}>
        <PortableText value={samplePortableText} components={indiaPortableTextComponents} />
      </div>

      {/* ============================================================
          FOOTER NOTE
          ============================================================ */}
      <footer
        style={{
          marginTop: 80,
          paddingTop: 24,
          borderTop: '1px solid #D7DFE3',
          color: '#647883',
          fontSize: 12,
          fontStyle: 'normal',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        This page is for development verification only. Real india family routes ship in session 5c+.
        See <code>docs/india-design-system.md</code>.
      </footer>
    </main>
  )
}
