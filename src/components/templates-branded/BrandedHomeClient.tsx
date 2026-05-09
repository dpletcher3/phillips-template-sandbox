import Image from 'next/image';
import { urlFor } from '../../../sanity/lib/image';

import TemplateBadge from '@/components/TemplateBadge';
import BrandedNav from '@/components/nav/BrandedNav';
import BrandedFooter from '@/components/branded/BrandedFooter';
import BrandStripe from '@/components/branded/BrandStripe';
import Eyebrow from '@/components/branded/Eyebrow';
import PhillipsLockup from '@/components/branded/PhillipsLockup';
import PhotoStrip from '@/components/branded/PhotoStrip';
import SkewedBars from '@/components/branded/SkewedBars';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';

import type { BrandedHomeData, ImageRef, RichText, RichBlock } from './branded-home-data';

/**
 * BrandedHomeClient — renders the Branded home page (`/branded`).
 *
 * Mirrors `design-references/branded/phillips-home.html` 1:1, top to
 * bottom. Section order is fixed and matches the reference. Each section
 * is implemented as an internal subcomponent so the top-level composition
 * stays scannable.
 *
 * The hero image is a full-bleed band that sits BELOW the sticky header
 * but ABOVE the hero-text section — text is never overlaid on the image.
 *
 * The component is server-renderable (no hooks); only `BrandedNav` is
 * marked `"use client"`. Server components can render client components
 * inline, so the page-level boundary stays small.
 */

interface Props {
  data: BrandedHomeData;
}

export default function BrandedHomeClient({ data }: Props) {
  return (
    <>
      <TemplateBadge label="BRANDED" color="#F68B33" />
      <BrandedNav />
      <HeroImageBand image={data.hero.image} />
      <HeroText hero={data.hero} />
      <Inspired data={data.inspired} />
      <Hybrid data={data.hybrid} />
      <Operationalize data={data.op} />
      <Haas data={data.haas} />
      <Innovative data={data.innov} />
      <LocalGlobal data={data.lg} />
      <Impact data={data.impact} />
      <Machinist data={data.machinist} />
      <WorkTogether data={data.wt} />
      <Community data={data.community} />
      <BrandStripe />
      <BrandedFooter />
    </>
  );
}

/* ============================================================
   SHARED HELPERS
   ============================================================ */

const CONTAINER: React.CSSProperties = {
  width: '100%',
  maxWidth: '1240px',
  margin: '0 auto',
  padding: '0 32px',
};

const FONT_DISPLAY = 'var(--font-montserrat), system-ui, sans-serif';
const FONT_ACCENT = 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif';

/** Standard section heading — Montserrat 700, tight letter-spacing. */
const SECTION_HEADING: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  fontWeight: 700,
  fontSize: 'clamp(30px, 3.4vw, 42px)',
  lineHeight: 1.15,
  letterSpacing: '-0.6px',
  color: 'var(--branded-black)',
};

/** Inspired-section term style — red Barlow Condensed italic uppercase. */
const TERM_BOLD: React.CSSProperties = {
  color: 'var(--branded-red)',
  fontFamily: FONT_ACCENT,
  fontStyle: 'italic',
  fontWeight: 700,
  fontSize: '15px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  marginRight: '6px',
};

/** Standard inline bold — solid black. */
const STD_BOLD: React.CSSProperties = {
  color: 'var(--branded-black)',
  fontWeight: 700,
};

/** Resolve an ImageRef to a URL string (for CSS background-image use). */
function imageUrl(ref: ImageRef | undefined, width: number, height?: number): string {
  if (!ref) return '';
  if (ref.sanity) {
    const builder = urlFor(ref.sanity).auto('format').width(width);
    return (height ? builder.height(height).fit('crop') : builder).url();
  }
  return ref.src ?? '';
}

/**
 * Render a {@link RichText} value as paragraphs. Strings split on `\n\n`
 * and use `**…**` for inline bold; portable-text arrays walk children
 * with their `marks`. The `boldStyle` prop styles bold runs (use
 * {@link TERM_BOLD} for the Inspired section's red-italic terms,
 * {@link STD_BOLD} elsewhere).
 */
function renderRichText(rt: RichText | undefined, boldStyle: React.CSSProperties = STD_BOLD): React.ReactNode {
  if (!rt) return null;
  if (typeof rt === 'string') {
    return rt
      .split(/\n\n+/)
      .filter((p) => p.trim().length > 0)
      .map((para, i) => <p key={i}>{renderInline(para, boldStyle)}</p>);
  }
  return rt
    .filter((b): b is RichBlock => b?._type === 'block')
    .map((block, bi) => {
      const children = (block.children ?? []).map((span, si) => {
        if (span._type !== 'span') return null;
        const text = span.text ?? '';
        const marks = span.marks ?? [];
        const style: React.CSSProperties = {};
        if (marks.includes('strong')) Object.assign(style, boldStyle);
        if (marks.includes('em')) style.fontStyle = 'italic';
        return Object.keys(style).length > 0 ? (
          <span key={si} style={style}>{text}</span>
        ) : (
          <span key={si}>{text}</span>
        );
      });
      return <p key={bi}>{children}</p>;
    });
}

/** Inline renderer for plain-string paragraphs. Splits on `**…**`. */
function renderInline(text: string, boldStyle: React.CSSProperties): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/);
    if (m) return <span key={i} style={boldStyle}>{m[1]}</span>;
    return part ? <span key={i}>{part}</span> : null;
  });
}

/* ============================================================
   BUTTON
   ============================================================ */

interface BtnProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'light';
  withArrow?: boolean;
  style?: React.CSSProperties;
}

function Btn({ href, children, variant = 'primary', withArrow = true, style }: BtnProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '1.6px',
    padding: '14px 26px',
    borderRadius: 'var(--branded-r-sm)',
    border: '1.5px solid transparent',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'background 0.18s ease, color 0.18s ease, transform 0.12s ease',
  };

  let variantStyle: React.CSSProperties;
  if (variant === 'primary') {
    variantStyle = {
      background: 'var(--branded-red)',
      color: 'var(--branded-white)',
      boxShadow: 'var(--branded-shadow-red)',
    };
  } else if (variant === 'ghost') {
    variantStyle = {
      background: 'transparent',
      color: 'var(--branded-red)',
      borderColor: 'var(--branded-red)',
    };
  } else {
    variantStyle = {
      background: 'var(--branded-white)',
      color: 'var(--branded-red)',
      boxShadow: 'var(--branded-shadow-md)',
    };
  }

  return (
    <a href={href} style={{ ...base, ...variantStyle, ...style }}>
      {children}
      {withArrow && <span aria-hidden="true">→</span>}
    </a>
  );
}

/* ============================================================
   1. HERO IMAGE BAND (below header, no overlay text)
   ============================================================ */

function HeroImageBand({ image }: { image: ImageRef }) {
  const url = imageUrl(image, 1600, 900);
  return (
    <div
      role="img"
      aria-label={image.alt}
      style={{
        width: '100%',
        aspectRatio: '16 / 5.4',
        minHeight: '320px',
        background: `linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%), url("${url}") center/cover no-repeat`,
      }}
    />
  );
}

/* ============================================================
   2. HERO TEXT (separate section beneath the image)
   ============================================================ */

function HeroText({ hero }: { hero: BrandedHomeData['hero'] }) {
  return (
    <section style={{ background: 'var(--branded-white)', padding: '80px 0 96px' }}>
      <div style={{ ...CONTAINER, display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '980px' }}>
        {hero.showProgressBars && <SkewedBars />}
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 'clamp(48px, 6.4vw, 84px)',
            lineHeight: 0.98,
            letterSpacing: '-2px',
            color: 'var(--branded-red)',
            margin: 0,
          }}
        >
          {hero.headline}
        </h1>
        <div
          style={{
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'var(--branded-gray-700)',
            maxWidth: '880px',
            marginTop: '12px',
          }}
        >
          {renderRichText(hero.body, STD_BOLD)}
        </div>
        {hero.cta && (
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--branded-gray-700)', marginTop: '4px' }}>
            {hero.cta}
          </p>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   3. INSPIRED BY YOUR INGENUITY (soft section, 2-col card+photo)
   ============================================================ */

function Inspired({ data }: { data: BrandedHomeData['inspired'] }) {
  return (
    <BrandedSection variant="soft" tight>
      <div style={inspiredGrid}>
        <BrandedCard accent="topLeft" padding="56px">
          <h2 style={{ ...SECTION_HEADING, marginTop: '28px', marginBottom: '22px' }}>{data.heading}</h2>
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75 }}>
            {renderRichText(data.body, TERM_BOLD)}
          </div>
        </BrandedCard>
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--branded-r-lg)',
            overflow: 'hidden',
            aspectRatio: '5 / 4',
            background: 'var(--branded-gray-100)',
          }}
        >
          {imageUrl(data.image, 1000, 800) && (
            <Image src={imageUrl(data.image, 1000, 800)} alt={data.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 50vw" />
          )}
        </div>
      </div>
    </BrandedSection>
  );
}

const inspiredGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px',
  alignItems: 'stretch',
};

/* ============================================================
   4. ADDITIVE HYBRID (tinted gradient section)
   ============================================================ */

function Hybrid({ data }: { data: BrandedHomeData['hybrid'] }) {
  return (
    <BrandedSection variant="tinted">
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '56px', alignItems: 'center' }}>
        <div>
          <div style={{ marginBottom: '28px' }}>
            <PhillipsLockup height={38} />
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '8px' }}>
              <span style={hybridWord('var(--branded-black)')}>{data.heading.split(' ')[0]}</span>
              <span style={{ ...hybridWord('var(--branded-red)'), marginLeft: '10px' }}>
                {data.heading.split(' ').slice(1).join(' ')}
              </span>
            </div>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 600,
                fontStyle: 'italic',
                fontSize: '11px',
                letterSpacing: '3px',
                color: 'var(--branded-gray-500)',
                marginTop: '8px',
                textTransform: 'uppercase',
              }}
            >
              {data.subheading}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {data.partnerPills.map((pill) => (
              <span
                key={pill}
                style={{
                  background: 'var(--branded-white)',
                  border: '1px solid var(--branded-gray-200)',
                  borderRadius: 'var(--branded-r-sm)',
                  padding: '10px 18px',
                  fontFamily: FONT_ACCENT,
                  fontStyle: 'italic',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '1.5px',
                  color: 'var(--branded-gray-500)',
                  boxShadow: 'var(--branded-shadow-sm)',
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75, marginBottom: '28px', maxWidth: '460px' }}>
            {renderRichText(data.body, STD_BOLD)}
          </div>

          <Btn href={data.cta.href}>{data.cta.label}</Btn>
        </div>

        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--branded-r-lg)',
            overflow: 'hidden',
            aspectRatio: '5 / 4',
            boxShadow: 'var(--branded-shadow-lg)',
            background: 'var(--branded-gray-100)',
          }}
        >
          {imageUrl(data.image, 1100, 900) && (
            <Image src={imageUrl(data.image, 1100, 900)} alt={data.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 50vw" />
          )}
        </div>
      </div>
    </BrandedSection>
  );
}

const hybridWord = (color: string): React.CSSProperties => ({
  fontFamily: FONT_ACCENT,
  fontStyle: 'italic',
  fontWeight: 800,
  fontSize: '32px',
  color,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  lineHeight: 1,
});

/* ============================================================
   5. OPERATIONALIZE (3-col: 2 image tiles + content)
   ============================================================ */

function Operationalize({ data }: { data: BrandedHomeData['op'] }) {
  const redUrl = imageUrl(data.tileImages[0], 900, 900);
  const blueUrl = imageUrl(data.tileImages[1], 900, 900);

  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.4fr', gap: '28px', alignItems: 'stretch' }}>
        <OpTile
          ariaLabel={data.tileImages[0].alt}
          background={`linear-gradient(135deg, var(--branded-overlay-red-1), var(--branded-overlay-red-2)), url("${redUrl}") center/cover no-repeat`}
        />
        <OpTile
          ariaLabel={data.tileImages[1].alt}
          background={`linear-gradient(135deg, var(--branded-overlay-blue-1), var(--branded-overlay-blue-2)), url("${blueUrl}") center/cover no-repeat`}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '8px' }}>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2
            style={{
              fontFamily: FONT_ACCENT,
              fontStyle: 'italic',
              fontWeight: 800,
              fontSize: 'clamp(40px, 5.2vw, 60px)',
              lineHeight: 0.95,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--branded-black)',
              margin: 0,
            }}
          >
            {data.heading}
            <span
              style={{
                display: 'block',
                fontFamily: FONT_DISPLAY,
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--branded-red)',
                letterSpacing: '3.5px',
                marginTop: '12px',
                textTransform: 'uppercase',
              }}
            >
              {data.subheading}
            </span>
          </h2>
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75, marginTop: '24px' }}>
            {renderRichText(data.body, STD_BOLD)}
          </div>
          <div style={{ marginTop: '8px' }}>
            <Btn href={data.cta.href}>{data.cta.label}</Btn>
          </div>
        </div>
      </div>
    </BrandedSection>
  );
}

function OpTile({ ariaLabel, background }: { ariaLabel: string; background: string }) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{
        position: 'relative',
        aspectRatio: '1',
        borderRadius: 'var(--branded-r-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--branded-shadow-lg)',
        background,
      }}
    >
      {/* Skewed white-stripe overlay (matches `.op-tile::after` from the reference) */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '36%',
          height: '130%',
          background:
            'repeating-linear-gradient(to right, rgba(255,255,255,0.16) 0 6px, transparent 6px 14px)',
          transform: 'skewX(-20deg)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

/* ============================================================
   6. HAAS (soft section, 2-col image+content)
   ============================================================ */

function Haas({ data }: { data: BrandedHomeData['haas'] }) {
  return (
    <BrandedSection variant="soft">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px', alignItems: 'center' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--branded-r-lg)',
            overflow: 'hidden',
            aspectRatio: '4 / 5',
            boxShadow: 'var(--branded-shadow-lg)',
            background: 'var(--branded-gray-100)',
          }}
        >
          {imageUrl(data.image, 900, 1100) && (
            <Image src={imageUrl(data.image, 900, 1100)} alt={data.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 40vw" />
          )}
        </div>
        <div>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 style={{ ...SECTION_HEADING, marginBottom: '22px' }}>{data.heading}</h2>
          <HaasLogos />
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75, maxWidth: '540px' }}>
            {renderRichText(data.body, STD_BOLD)}
          </div>
        </div>
      </div>
    </BrandedSection>
  );
}

function HaasLogos() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--branded-white)',
        border: '1px solid var(--branded-gray-200)',
        borderRadius: 'var(--branded-r-md)',
        padding: '14px 22px',
        margin: '8px 0 22px',
        boxShadow: 'var(--branded-shadow-sm)',
      }}
    >
      <span
        style={{
          fontFamily: FONT_ACCENT,
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: '30px',
          color: 'var(--branded-red)',
          letterSpacing: '1px',
          lineHeight: 1,
          paddingRight: '18px',
          borderRight: '1px solid var(--branded-gray-200)',
        }}
      >
        HAAS
      </span>
      <span style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', lineHeight: 1, gap: '3px' }}>
        <span style={{ fontFamily: FONT_ACCENT, fontStyle: 'italic', fontWeight: 900, fontSize: '17px', color: 'var(--branded-red)' }}>
          Haas
        </span>
        <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '13px', color: 'var(--branded-black)', letterSpacing: '0.5px' }}>
          F1 Team
        </span>
        <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: '8px', color: 'var(--branded-gray-500)', letterSpacing: '1.5px' }}>
          OFFICIAL MACHINE TOOL
        </span>
      </span>
    </div>
  );
}

/* ============================================================
   7. INNOVATIVE SOLUTIONS (dark section, 4-card grid)
   ============================================================ */

function Innovative({ data }: { data: BrandedHomeData['innov'] }) {
  return (
    <BrandedSection variant="dark">
      <div style={{ marginBottom: '56px', maxWidth: '720px' }}>
        <Eyebrow>What We Do</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, color: 'var(--branded-white)' }}>{data.heading}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
        {data.cards.map((card) => (
          <div
            key={card.iconKey}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 'var(--branded-r-lg)',
              padding: '36px 28px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '84px', height: '84px', marginBottom: '22px' }}>
              <InnovIcon kind={card.iconKey} />
            </div>
            <h3
              style={{
                fontFamily: FONT_ACCENT,
                fontStyle: 'italic',
                fontWeight: 800,
                fontSize: '17px',
                color: 'var(--branded-red)',
                letterSpacing: '2px',
                marginBottom: '14px',
                textTransform: 'uppercase',
              }}
            >
              {card.title}
            </h3>
            <p style={{ fontSize: '13px', color: '#C2C8CF', marginBottom: '26px', lineHeight: 1.7, flexGrow: 1 }}>
              {card.body}
            </p>
            <Btn href={card.cta.href}>{card.cta.label}</Btn>
          </div>
        ))}
      </div>
    </BrandedSection>
  );
}

/** Inline SVG icons matching `.innov-icon` rules in the reference HTML. */
function InnovIcon({ kind }: { kind: 'machining' | 'additive' | 'optimization' | 'workforce' }) {
  const stroke = 'var(--branded-red)';
  const common = { fill: 'none', stroke, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'machining') {
    return (
      <svg viewBox="0 0 100 100" {...common}>
        <rect x="14" y="20" width="72" height="58" rx="2" />
        <line x1="22" y1="30" x2="78" y2="30" />
        <rect x="44" y="30" width="12" height="18" />
        <line x1="50" y1="48" x2="50" y2="58" />
        <line x1="46" y1="58" x2="54" y2="58" />
        <rect x="34" y="62" width="32" height="6" />
        <line x1="22" y1="78" x2="22" y2="86" />
        <line x1="78" y1="78" x2="78" y2="86" />
        <circle cx="76" cy="40" r="2.5" />
        <circle cx="76" cy="48" r="2.5" />
      </svg>
    );
  }
  if (kind === 'additive') {
    return (
      <svg viewBox="0 0 100 100" {...common}>
        <rect x="16" y="14" width="68" height="74" rx="2" />
        <line x1="22" y1="24" x2="78" y2="24" />
        <line x1="22" y1="38" x2="78" y2="38" />
        <rect x="42" y="32" width="16" height="10" />
        <line x1="50" y1="42" x2="50" y2="50" />
        <path d="M36 72 L36 64 L42 64 L42 58 L48 58 L48 50 L52 50 L52 58 L58 58 L58 64 L64 64 L64 72 Z" />
        <line x1="28" y1="74" x2="72" y2="74" />
        <line x1="32" y1="74" x2="32" y2="80" />
        <line x1="68" y1="74" x2="68" y2="80" />
      </svg>
    );
  }
  if (kind === 'optimization') {
    return (
      <svg viewBox="0 0 100 100" {...common}>
        <path d="M18 82 L18 22" />
        <path d="M18 82 L84 82" />
        <rect x="26" y="64" width="9" height="18" />
        <rect x="40" y="54" width="9" height="28" />
        <rect x="54" y="42" width="9" height="40" />
        <path d="M28 56 L46 42 L60 30 L74 22" />
        <path d="M68 22 L74 22 L74 28" />
        <circle cx="80" cy="36" r="6" />
      </svg>
    );
  }
  // workforce
  return (
    <svg viewBox="0 0 100 100" {...common}>
      <path d="M30 36 Q30 24 42 24 L58 24 Q70 24 70 36" />
      <line x1="28" y1="36" x2="72" y2="36" />
      <line x1="50" y1="24" x2="50" y2="32" />
      <circle cx="50" cy="46" r="8" />
      <path d="M30 80 Q30 60 50 60 Q70 60 70 80" />
      <circle cx="78" cy="62" r="6" />
      <line x1="78" y1="52" x2="78" y2="56" />
      <line x1="78" y1="68" x2="78" y2="72" />
      <circle cx="22" cy="62" r="6" />
      <line x1="22" y1="52" x2="22" y2="56" />
      <line x1="22" y1="68" x2="22" y2="72" />
    </svg>
  );
}

/* ============================================================
   8. LOCAL & GLOBAL (radial-dot map, 3-col regions, button row)
   ============================================================ */

function LocalGlobal({ data }: { data: BrandedHomeData['lg'] }) {
  return (
    <BrandedSection>
      <div style={{ marginBottom: '48px' }}>
        <Eyebrow>Worldwide Footprint</Eyebrow>
        <h2 style={SECTION_HEADING}>{data.heading}</h2>
      </div>
      <div style={{ position: 'relative' }}>
        <DotMap />
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {data.regions.map((region) => (
            <div key={region.regionName}>
              <RegionHeading>{region.regionName}</RegionHeading>
              {region.subLabels.map((sl, i) => (
                <div key={i}>
                  {sl.label && <RegionSubLabel>{sl.label}</RegionSubLabel>}
                  <ul style={{ listStyle: 'none', fontSize: '13px', lineHeight: 1.8, color: 'var(--branded-gray-600)', marginTop: sl.label ? 0 : '0' }}>
                    {sl.locations.map((loc) => (
                      <li key={loc}>{loc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', paddingTop: '8px' }}>
        {data.regionButtons.map((b) => (
          <Btn key={b.label} href={b.href} withArrow={false} style={{ minWidth: '160px' }}>
            {b.label}
          </Btn>
        ))}
      </div>
    </BrandedSection>
  );
}

function DotMap() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'radial-gradient(circle at center, var(--branded-gray-300) 1px, transparent 1.5px)',
        backgroundSize: '14px 14px',
        opacity: 0.32,
        pointerEvents: 'none',
        WebkitMaskImage:
          'radial-gradient(ellipse 75% 60% at 50% 50%, #000 30%, transparent 90%)',
        maskImage:
          'radial-gradient(ellipse 75% 60% at 50% 50%, #000 30%, transparent 90%)',
      }}
    />
  );
}

function RegionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: FONT_ACCENT,
        fontStyle: 'italic',
        fontWeight: 800,
        color: 'var(--branded-red)',
        fontSize: '15px',
        letterSpacing: '2.5px',
        marginBottom: '12px',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </h3>
  );
}

function RegionSubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: '11px',
        color: 'var(--branded-gray-500)',
        letterSpacing: '1.5px',
        margin: '16px 0 8px',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   9. IMPACT (soft section, 3 case-study cards)
   ============================================================ */

function Impact({ data }: { data: BrandedHomeData['impact'] }) {
  return (
    <BrandedSection variant="soft">
      <div style={{ marginBottom: '48px' }}>
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 style={SECTION_HEADING}>{data.heading}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
        {data.cards.map((card, i) => (
          <article
            key={i}
            style={{
              background: 'var(--branded-white)',
              borderRadius: 'var(--branded-r-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--branded-shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--branded-gray-200)',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16 / 10', background: 'var(--branded-gray-100)' }}>
              {imageUrl(card.heroImage, 900, 600) && (
                <Image src={imageUrl(card.heroImage, 900, 600)} alt={card.heroImage.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 33vw" />
              )}
            </div>
            <div
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '16px',
                borderTop: '3px solid var(--branded-red)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_ACCENT,
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: 'var(--branded-gray-500)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {card.meta}
              </span>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '18px', color: 'var(--branded-black)', lineHeight: 1.3 }}>
                {card.title}
              </h3>
              <Btn href={card.slug}>Read Story</Btn>
            </div>
          </article>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Btn href="#" variant="ghost" withArrow={false}>
          Show More
        </Btn>
      </div>
    </BrandedSection>
  );
}

/* ============================================================
   10. MACHINIST APP (custom red section with phones + QR)
   ============================================================ */

function Machinist({ data }: { data: BrandedHomeData['machinist'] }) {
  return (
    <section
      style={{
        background: 'var(--branded-red)',
        color: 'var(--branded-white)',
        padding: '112px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(-65deg, transparent 0 40px, rgba(255,255,255,0.04) 40px 42px)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ ...CONTAINER, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <Phones />
          <div style={{ paddingLeft: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '26px' }}>
              <MachinistMark />
              <div
                style={{
                  fontFamily: FONT_ACCENT,
                  fontStyle: 'italic',
                  fontWeight: 800,
                  fontSize: '24px',
                  lineHeight: 1.1,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--branded-white)',
                  whiteSpace: 'pre-line',
                }}
              >
                {data.heading}
              </div>
            </div>
            <div style={{ fontSize: '15px', lineHeight: 1.75, marginBottom: '18px', maxWidth: '480px', color: 'rgba(255,255,255,0.94)' }}>
              {renderRichText(data.body, STD_BOLD)}
            </div>
            <p style={{ fontWeight: 700, color: 'var(--branded-white)', fontSize: '15px', lineHeight: 1.75, marginBottom: '18px', maxWidth: '480px' }}>
              {data.highlight}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '12px' }}>
              <div
                aria-label="QR code to download"
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'var(--branded-white)',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              >
                {data.qrImage ? (
                  <Image src={imageUrl(data.qrImage, 200, 200)} alt={data.qrImage.alt} width={84} height={84} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <PlaceholderQR />
                )}
              </div>
              <span style={{ fontSize: '13px', lineHeight: 1.5, fontWeight: 600, color: 'var(--branded-white)' }}>
                Scan to download<br />on iOS &amp; Android
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Phones() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'flex-end' }}>
      <Phone label={'App\nscreen'} />
      <Phone label={'THE\nPHILLIPS\nMACHINIST'} center />
      <Phone label={'App\nscreen'} />
    </div>
  );
}

function Phone({ label, center }: { label: string; center?: boolean }) {
  return (
    <div
      style={{
        width: center ? '150px' : '130px',
        aspectRatio: '9 / 19',
        background: '#1a1a1a',
        borderRadius: '22px',
        border: '4px solid #2a2a2a',
        position: 'relative',
        boxShadow: '0 22px 40px rgba(0,0,0,0.32)',
        transform: center ? 'translateY(-16px)' : undefined,
        zIndex: center ? 2 : 1,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '42px',
          height: '5px',
          background: '#444',
          borderRadius: '3px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '16px 5px 5px',
          background: center ? 'var(--branded-red)' : 'linear-gradient(180deg, #f7f7f8 0%, #e8e8eb 100%)',
          borderRadius: '14px',
          overflow: 'hidden',
          color: center ? 'var(--branded-white)' : '#555',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontFamily: center ? FONT_ACCENT : 'inherit',
          fontStyle: center ? 'italic' : 'normal',
          fontWeight: center ? 800 : 400,
          fontSize: center ? '12px' : '8px',
          letterSpacing: center ? '1.5px' : '0',
          padding: center ? '24px' : '10px',
          lineHeight: center ? 1.3 : 1.5,
          whiteSpace: 'pre-line',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function MachinistMark() {
  return (
    <div
      style={{
        width: '76px',
        height: '76px',
        background: 'var(--branded-white)',
        borderRadius: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg" style={{ width: '56px', height: '42px' }}>
        <g transform="translate(0,4) skewX(-22)">
          <rect x="0"  y="0" width="6" height="40" fill="var(--branded-red)" />
          <rect x="9"  y="0" width="6" height="40" fill="var(--branded-red)" />
          <rect x="18" y="0" width="6" height="40" fill="var(--branded-red)" />
        </g>
        <text x="34" y="38" fontFamily={FONT_ACCENT} fontStyle="italic" fontWeight={900} fontSize={42} fill="var(--branded-black)">
          P
        </text>
      </svg>
    </div>
  );
}

/** Inline placeholder QR — used when no `qrImage` is supplied. */
function PlaceholderQR() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="80" height="80" fill="var(--branded-white)" />
      <g fill="var(--branded-black)">
        <rect x="6" y="6" width="18" height="18" />
        <rect x="56" y="6" width="18" height="18" />
        <rect x="6" y="56" width="18" height="18" />
      </g>
      <g fill="var(--branded-white)">
        <rect x="10" y="10" width="10" height="10" />
        <rect x="60" y="10" width="10" height="10" />
        <rect x="10" y="60" width="10" height="10" />
      </g>
      <g fill="var(--branded-black)">
        <rect x="13" y="13" width="4" height="4" />
        <rect x="63" y="13" width="4" height="4" />
        <rect x="13" y="63" width="4" height="4" />
        <rect x="30" y="8" width="4" height="4" />
        <rect x="38" y="8" width="4" height="4" />
        <rect x="30" y="20" width="4" height="4" />
        <rect x="42" y="22" width="4" height="4" />
        <rect x="30" y="30" width="4" height="4" />
        <rect x="44" y="30" width="4" height="4" />
        <rect x="60" y="32" width="4" height="4" />
        <rect x="14" y="38" width="4" height="4" />
        <rect x="36" y="44" width="4" height="4" />
        <rect x="52" y="44" width="4" height="4" />
        <rect x="68" y="46" width="4" height="4" />
        <rect x="42" y="50" width="4" height="4" />
        <rect x="58" y="60" width="4" height="4" />
        <rect x="32" y="64" width="4" height="4" />
        <rect x="44" y="68" width="4" height="4" />
      </g>
    </svg>
  );
}

/* ============================================================
   11. WORK TOGETHER (gray-50 card + image, default section)
   ============================================================ */

function WorkTogether({ data }: { data: BrandedHomeData['wt'] }) {
  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '32px', alignItems: 'stretch' }}>
        <BrandedCard
          accent="topBorder"
          background="var(--branded-gray-50)"
          padding="56px"
          className="wt-card"
        >
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 style={{ ...SECTION_HEADING, marginBottom: '20px' }}>{data.heading}</h2>
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75, marginBottom: '30px' }}>
            {renderRichText(data.body, STD_BOLD)}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {data.ctas.map((cta) => (
              <Btn key={cta.label} href={cta.href} variant={cta.variant} withArrow={false}>
                {cta.label}
              </Btn>
            ))}
          </div>
        </BrandedCard>
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--branded-r-lg)',
            overflow: 'hidden',
            aspectRatio: '4 / 3',
            boxShadow: 'var(--branded-shadow-lg)',
            background: 'var(--branded-gray-100)',
          }}
        >
          {imageUrl(data.image, 1100, 900) && (
            <Image src={imageUrl(data.image, 1100, 900)} alt={data.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 50vw" />
          )}
        </div>
      </div>
    </BrandedSection>
  );
}

/* ============================================================
   12. COMMUNITY (white tagline + 8-photo grayscale strip)
   ============================================================ */

function Community({ data }: { data: BrandedHomeData['community'] }) {
  const photoUrls = data.photos.map((p) => imageUrl(p, 400, 500));
  return (
    <section style={{ padding: '80px 0 0', textAlign: 'center', background: 'var(--branded-white)' }}>
      <div style={CONTAINER}>
        <h2
          style={{
            fontFamily: FONT_ACCENT,
            fontStyle: 'italic',
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: 'clamp(20px, 2.4vw, 28px)',
            letterSpacing: '1.5px',
            color: 'var(--branded-black)',
            maxWidth: '1100px',
            margin: '0 auto 56px',
            lineHeight: 1.3,
          }}
        >
          {data.tagline}
        </h2>
      </div>
      <PhotoStrip images={photoUrls} />
    </section>
  );
}

/* ============================================================
   Note: this client renders a static composition. Internal subcomponents
   inline their styles to avoid a new global stylesheet — the design
   system tokens (CSS variables on :root and Tailwind branded.* classes)
   are the single source of color/radius/shadow.
   ============================================================ */

export type { Props as BrandedHomeClientProps };
