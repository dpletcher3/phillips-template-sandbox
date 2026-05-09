import Image from 'next/image';
import { urlFor } from '../../../sanity/lib/image';

import TemplateBadge from '@/components/TemplateBadge';
import BrandedNav from '@/components/nav/BrandedNav';
import BrandedFooter from '@/components/branded/BrandedFooter';
import BrandStripe from '@/components/branded/BrandStripe';
import Eyebrow from '@/components/branded/Eyebrow';
import PhillipsLockup from '@/components/branded/PhillipsLockup';
import PhotoStrip from '@/components/branded/PhotoStrip';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';
import RedBlockFrame from '@/components/branded/RedBlockFrame';

import type {
  BrandedSolutionData,
  CtaRef,
  ImageRef,
  PartnerLogoVariant,
  RichBlock,
  RichText,
} from './branded-solution-data';

/**
 * BrandedSolutionClient — single flexible renderer for the Branded
 * Solution template. Drives both `/branded/solution/phillips-opto` and
 * `/branded/solution/phillips-robotics` (and any future Solution doc)
 * by conditionally rendering each section based on the matching key on
 * `BrandedSolutionData`.
 *
 * The route's `transformSolution()` overlays the existing Sanity
 * `solution` doc on top of a slug-specific fallback (see
 * branded-solution-data.ts → OPTO_FALLBACK / ROBOTICS_FALLBACK), so
 * editors can already control hero image, name, description, and SEO
 * even though most rich sections still come from the fallback.
 *
 * Every fallback-driven site is marked with `// TODO(schema-extension)`
 * so the next person knows what to add to the schema first.
 */

interface Props {
  data: BrandedSolutionData;
}

export default function BrandedSolutionClient({ data }: Props) {
  return (
    <>
      <SolutionStyles />
      <TemplateBadge label="BRANDED" color="#F68B33" />
      <BrandedNav
        showSubnav={!!data.subnavItems?.length}
        subnavItems={data.subnavItems ?? []}
      />

      <Hero hero={data.hero} />

      {data.bodyLeadIn && <BodyLeadIn data={data.bodyLeadIn} />}
      {data.applicationSupport && <ApplicationSupport data={data.applicationSupport} />}
      {data.haasExperts && <HaasExperts data={data.haasExperts} />}
      {data.successStories && <SuccessStories data={data.successStories} />}
      {data.powerfulSolutions && <PowerfulSolutions data={data.powerfulSolutions} />}
      {data.automation && <Automation data={data.automation} />}
      {data.phillipsAdditive && <PhillipsAdditive data={data.phillipsAdditive} />}
      {data.training && <Training data={data.training} />}
      {data.fastrack && <Fastrack data={data.fastrack} />}
      {data.testimonials && <Testimonials data={data.testimonials} />}
      {data.optoEngineers && <OptoEngineers data={data.optoEngineers} />}
      {data.team && <Team data={data.team} />}
      {data.phillipsEducation && <PhillipsEducation data={data.phillipsEducation} />}

      <Community data={data.community} />
      <BrandStripe />
      <BrandedFooter />
    </>
  );
}

/* ============================================================
   STYLE ISLAND — pseudo-classes / pseudo-elements that can't
   be expressed inline. Scoped via class names (`branded-sol-*`).
   ============================================================ */

function SolutionStyles() {
  return (
    <style>{`
      /* All sub-nav targets account for the 84px header + 52px sub-nav. */
      .branded-sol-anchor { scroll-margin-top: 136px; }

      /* Accordion (Application Support) */
      .branded-sol-acc summary {
        list-style: none;
        cursor: pointer;
        padding: 18px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        font-family: var(--font-montserrat), system-ui, sans-serif;
        font-weight: 700;
        font-size: 14px;
        color: var(--branded-black);
        transition: color 0.18s ease;
      }
      .branded-sol-acc summary:hover { color: var(--branded-red); }
      .branded-sol-acc summary::-webkit-details-marker { display: none; }
      .branded-sol-acc summary::after {
        content: "+";
        font-family: var(--font-barlow-condensed), "Barlow Condensed", sans-serif;
        font-style: italic;
        font-weight: 700;
        font-size: 24px;
        color: var(--branded-red);
        line-height: 1;
        flex-shrink: 0;
        transition: transform 0.2s ease;
      }
      .branded-sol-acc details[open] summary::after { content: "−"; }
      .branded-sol-acc details { border-bottom: 1px solid var(--branded-gray-200); }
      .branded-sol-acc { border-top: 1px solid var(--branded-gray-200); }

      /* Team avatars: grayscale → color on hover */
      .branded-sol-team-photo img {
        filter: grayscale(1) contrast(1.05);
        transition: filter 0.3s ease;
      }
      .branded-sol-team-member:hover .branded-sol-team-photo img {
        filter: grayscale(0) contrast(1);
      }

      /* Partner card hover (Powerful Solutions) */
      .branded-sol-partner {
        transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
      }
      .branded-sol-partner:hover {
        border-color: var(--branded-red);
        box-shadow: 0 6px 20px -8px rgba(249, 66, 58, 0.25);
        transform: translateY(-2px);
      }

      /* "Next Up" arrow circle hover */
      .branded-sol-next-arrow {
        transition: background 0.18s ease, color 0.18s ease;
      }
      .branded-sol-next-arrow:hover {
        background: var(--branded-red);
        color: var(--branded-white);
      }
    `}</style>
  );
}

/* ============================================================
   SHARED HELPERS (rich text, button, image url, etc.)
   ============================================================ */

const CONTAINER: React.CSSProperties = {
  width: '100%',
  maxWidth: '1240px',
  margin: '0 auto',
  padding: '0 32px',
};

const FONT_DISPLAY = 'var(--font-montserrat), system-ui, sans-serif';
const FONT_ACCENT = 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif';

const SECTION_HEADING: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  fontWeight: 700,
  fontSize: 'clamp(30px, 3.4vw, 42px)',
  lineHeight: 1.15,
  letterSpacing: '-0.6px',
  color: 'var(--branded-black)',
};

const STD_BOLD: React.CSSProperties = {
  color: 'var(--branded-black)',
  fontWeight: 700,
};

function imageUrl(ref: ImageRef | undefined, width: number, height?: number): string {
  if (!ref) return '';
  if (ref.sanity) {
    const builder = urlFor(ref.sanity).auto('format').width(width);
    return (height ? builder.height(height).fit('crop') : builder).url();
  }
  return ref.src ?? '';
}

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

function renderInline(text: string, boldStyle: React.CSSProperties): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/);
    if (m) return <span key={i} style={boldStyle}>{m[1]}</span>;
    return part ? <span key={i}>{part}</span> : null;
  });
}

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
  const variantStyle: React.CSSProperties =
    variant === 'primary'
      ? { background: 'var(--branded-red)', color: 'var(--branded-white)', boxShadow: 'var(--branded-shadow-red)' }
      : variant === 'ghost'
      ? { background: 'transparent', color: 'var(--branded-red)', borderColor: 'var(--branded-red)' }
      : { background: 'var(--branded-white)', color: 'var(--branded-red)', boxShadow: 'var(--branded-shadow-md)' };
  return (
    <a href={href} style={{ ...base, ...variantStyle, ...style }}>
      {children}
      {withArrow && <span aria-hidden="true">→</span>}
    </a>
  );
}

/* ============================================================
   HERO — two visual variants
   ============================================================ */

function Hero({ hero }: { hero: BrandedSolutionData['hero'] }) {
  const url = imageUrl(hero.image, 1600, 900);
  const overlay =
    hero.variant === 'opto-mark'
      ? 'linear-gradient(95deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.40) 40%, rgba(0,0,0,0.10) 75%, rgba(0,0,0,0.0) 100%)'
      : 'linear-gradient(95deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 35%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0.0) 85%)';

  return (
    <section
      style={{
        width: '100%',
        aspectRatio: '16 / 6.4',
        minHeight: '480px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        aria-hidden="true"
        role="img"
        aria-label={hero.image.alt}
        style={{
          position: 'absolute',
          inset: 0,
          background: `${overlay}, url("${url}") center/cover no-repeat`,
        }}
      />
      <div style={{ ...CONTAINER, position: 'relative', zIndex: 2, color: 'var(--branded-white)' }}>
        {hero.variant === 'opto-mark' ? <OptoHeroLockup hero={hero} /> : <StackedHeroContent hero={hero} />}
      </div>
      {hero.showCarouselDots && <HeroCarouselDots />}
    </section>
  );
}

function OptoHeroLockup({ hero }: { hero: BrandedSolutionData['hero'] }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '32px' }}>
        <OptoMark size={76} />
        <span
          style={{
            fontFamily: FONT_ACCENT,
            fontStyle: 'italic',
            fontWeight: 800,
            lineHeight: 1,
            textTransform: 'uppercase',
            color: 'var(--branded-white)',
          }}
        >
          <span style={{ fontSize: '32px', display: 'block', letterSpacing: '2px' }}>{hero.lockupWord}</span>
          {hero.lockupSubtitle && (
            <span style={{ fontSize: '14px', display: 'block', letterSpacing: '4px', marginTop: '5px', opacity: 0.85 }}>
              {hero.lockupSubtitle}
            </span>
          )}
        </span>
      </div>
      <h1 style={heroHeadline()}>
        {hero.headlineLines.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </h1>
    </>
  );
}

function StackedHeroContent({ hero }: { hero: BrandedSolutionData['hero'] }) {
  return (
    <div style={{ maxWidth: '600px' }}>
      {hero.eyebrow && (
        <Eyebrow color="var(--branded-white)">
          {hero.eyebrow}
        </Eyebrow>
      )}
      <h1 style={heroHeadline()}>
        {hero.headlineLines.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </h1>
      {hero.subText && (
        <p
          style={{
            color: 'rgba(255,255,255,0.94)',
            fontSize: '16px',
            lineHeight: 1.55,
            margin: '22px 0 32px',
            maxWidth: '440px',
            fontWeight: 500,
          }}
        >
          {hero.subText}
        </p>
      )}
      {hero.primaryCta && <Btn href={hero.primaryCta.href}>{hero.primaryCta.label}</Btn>}
    </div>
  );
}

function heroHeadline(): React.CSSProperties {
  return {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: 'clamp(44px, 6vw, 84px)',
    lineHeight: 0.96,
    letterSpacing: '-1.8px',
    color: 'var(--branded-white)',
    margin: 0,
  };
}

/** Pure-CSS opto target mark — concentric: red disc → open white arc → white center dot. */
function OptoMark({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'var(--branded-red)',
        flexShrink: 0,
        boxShadow: '0 8px 22px -6px rgba(249, 66, 58, 0.55)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '12px',
          borderRadius: '50%',
          border: '4px solid var(--branded-white)',
          borderTopColor: 'transparent',
          transform: 'rotate(-45deg)',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: 'var(--branded-white)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </span>
  );
}

function HeroCarouselDots() {
  // Decorative — the actual carousel is out of scope; matches the
  // visual cue from `phillips-robotics.html`.
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '28px',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '6px',
        zIndex: 3,
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: '40px',
            height: '3px',
            background: i === 1 ? 'var(--branded-red)' : 'rgba(255,255,255,0.32)',
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   BODY LEAD-IN  (Amplify Your Efficiency / Manufacturing Innovation)
   ============================================================ */

function BodyLeadIn({ data }: { data: NonNullable<BrandedSolutionData['bodyLeadIn']> }) {
  if (data.variant === 'red-block-frame') {
    return (
      <BrandedSection>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 0.8fr) 1.4fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {data.portrait && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RedBlockFrame
                src={imageUrl(data.portrait, 720, 900)}
                alt={data.portrait.alt}
              />
            </div>
          )}
          <div>
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            <h2 style={{ ...SECTION_HEADING, marginBottom: '22px' }}>{data.heading}</h2>
            <div
              style={{
                color: 'var(--branded-gray-600)',
                fontSize: '15px',
                lineHeight: 1.75,
                maxWidth: '620px',
              }}
            >
              {renderRichText(data.body)}
            </div>
          </div>
        </div>
      </BrandedSection>
    );
  }
  // card-only variant — robotics' Manufacturing Innovation.
  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'stretch' }}>
        <BrandedCard accent="topLeft" padding="56px">
          <h2 style={{ ...SECTION_HEADING, marginTop: '28px', marginBottom: '22px' }}>{data.heading}</h2>
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75 }}>
            {renderRichText(data.body)}
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
          {data.portrait && imageUrl(data.portrait, 1000, 800) && (
            <Image
              src={imageUrl(data.portrait, 1000, 800)}
              alt={data.portrait.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1000px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </BrandedSection>
  );
}

/* ============================================================
   APPLICATION SUPPORT (opto only)
   ============================================================ */

function ApplicationSupport({ data }: { data: NonNullable<BrandedSolutionData['applicationSupport']> }) {
  // TODO(schema-extension): add `applicationSupport` field to solution schema
  //   so editors can author the heading/intro/accordion items + photo.
  return (
    <section id={data.id} className="branded-sol-anchor">
      <BrandedSection variant="soft">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'stretch' }}>
          <BrandedCard accent="topLeft" padding="56px">
            <h2 style={{ ...SECTION_HEADING, marginTop: '28px', marginBottom: '18px' }}>{data.heading}</h2>
            <p style={{ fontSize: '15px', color: 'var(--branded-gray-600)', lineHeight: 1.75, marginBottom: '28px' }}>
              {data.intro}
            </p>
            <div className="branded-sol-acc" style={{ marginBottom: '28px' }}>
              {data.accordion.map((item, i) => (
                <details key={i} {...(item.defaultOpen ? { open: true } : {})}>
                  <summary>{item.summary}</summary>
                  <div
                    style={{
                      padding: '0 0 20px',
                      fontSize: '14px',
                      color: 'var(--branded-gray-600)',
                      lineHeight: 1.75,
                    }}
                  >
                    {item.body}
                  </div>
                </details>
              ))}
            </div>
            {data.cta && (
              <div style={{ alignSelf: 'flex-start' }}>
                <Btn href={data.cta.href}>{data.cta.label}</Btn>
              </div>
            )}
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
            {imageUrl(data.photo, 1100, 900) && (
              <Image
                src={imageUrl(data.photo, 1100, 900)}
                alt={data.photo.alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1000px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </BrandedSection>
    </section>
  );
}

/* ============================================================
   HAAS EXPERTS (robotics only)
   ============================================================ */

function HaasExperts({ data }: { data: NonNullable<BrandedSolutionData['haasExperts']> }) {
  // TODO(schema-extension): add `haasExperts` field to solution schema
  //   (eyebrow + heading + body + image + showHaasLogos + cta).
  return (
    <BrandedSection variant="soft">
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>
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
            <Image
              src={imageUrl(data.image, 1100, 900)}
              alt={data.image.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1000px) 100vw, 50vw"
            />
          )}
        </div>
        <div>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 style={{ ...SECTION_HEADING, marginBottom: '20px' }}>{data.heading}</h2>
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75, marginBottom: '28px', maxWidth: '440px' }}>
            {renderRichText(data.body)}
          </div>
          {data.showHaasLogos && <HaasLogos />}
          {data.cta && (
            <div>
              <Btn href={data.cta.href}>{data.cta.label}</Btn>
            </div>
          )}
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
        marginBottom: '28px',
        boxShadow: 'var(--branded-shadow-sm)',
      }}
    >
      <span style={{ fontFamily: FONT_ACCENT, fontStyle: 'italic', fontWeight: 900, fontSize: '30px', color: 'var(--branded-red)', letterSpacing: '1px', lineHeight: 1, paddingRight: '18px', borderRight: '1px solid var(--branded-gray-200)' }}>
        HAAS
      </span>
      <span style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', lineHeight: 1, gap: '3px' }}>
        <span style={{ fontFamily: FONT_ACCENT, fontStyle: 'italic', fontWeight: 900, fontSize: '17px', color: 'var(--branded-red)' }}>Haas</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '13px', color: 'var(--branded-black)', letterSpacing: '0.5px' }}>F1 Team</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: '8px', color: 'var(--branded-gray-500)', letterSpacing: '1.5px' }}>OFFICIAL MACHINE TOOL</span>
      </span>
    </div>
  );
}

/* ============================================================
   SUCCESS STORIES (opto only)
   ============================================================ */

function SuccessStories({ data }: { data: NonNullable<BrandedSolutionData['successStories']> }) {
  // TODO(schema-extension): add `successStories` field — featured story + nextUp.
  return (
    <BrandedSection>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 style={SECTION_HEADING}>{data.heading}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '40px', alignItems: 'stretch' }}>
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--branded-white)',
            border: '1px solid var(--branded-gray-200)',
            borderRadius: 'var(--branded-r-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--branded-shadow-md)',
          }}
        >
          <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--branded-gray-100)' }}>
            {imageUrl(data.featured.image, 1400, 800) && (
              <Image src={imageUrl(data.featured.image, 1400, 800)} alt={data.featured.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 66vw" />
            )}
          </div>
          <div style={{ padding: '32px 36px 36px' }}>
            <span
              style={{
                fontFamily: FONT_ACCENT,
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '12px',
                color: 'var(--branded-red)',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: '8px',
                display: 'inline-block',
              }}
            >
              {data.featured.meta}
            </span>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '22px', marginBottom: '10px', color: 'var(--branded-black)', lineHeight: 1.3 }}>
              {data.featured.title}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--branded-gray-600)', lineHeight: 1.65 }}>
              {data.featured.description}
            </p>
          </div>
        </article>

        {data.nextUp && (
          <BrandedCard accent="leftBorder" padding="36px">
            <span
              style={{
                fontFamily: FONT_ACCENT,
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '2.5px',
                color: 'var(--branded-red)',
                textTransform: 'uppercase',
                marginBottom: '16px',
                display: 'block',
              }}
            >
              {data.nextUp.label}
            </span>
            <a
              href={data.nextUp.href}
              style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: 1.4,
                color: 'var(--branded-black)',
                marginBottom: '22px',
                textDecoration: 'none',
              }}
            >
              {data.nextUp.title}
            </a>
            <span
              className="branded-sol-next-arrow"
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: '40px',
                height: '40px',
                border: '2px solid var(--branded-red)',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--branded-red)',
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </BrandedCard>
        )}
      </div>
    </BrandedSection>
  );
}

/* ============================================================
   POWERFUL SOLUTIONS (robotics only) — partner grid + portrait
   ============================================================ */

function PowerfulSolutions({ data }: { data: NonNullable<BrandedSolutionData['powerfulSolutions']> }) {
  // TODO(schema-extension): add `powerfulSolutions` field — eyebrow,
  //   heading, partners[] (with logo selector), and portrait image.
  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '64px', alignItems: 'center' }}>
        <div>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 style={{ ...SECTION_HEADING, marginBottom: '36px', maxWidth: '520px' }}>{data.heading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {data.partners.map((p) => (
              <div
                key={p.name}
                className="branded-sol-partner"
                style={{
                  background: 'var(--branded-white)',
                  border: '1px solid var(--branded-gray-200)',
                  borderRadius: 'var(--branded-r-md)',
                  height: '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                }}
                aria-label={p.name}
              >
                <PartnerLogo variant={p.logoVariant} />
              </div>
            ))}
          </div>
        </div>
        {data.portrait && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <RedBlockFrame src={imageUrl(data.portrait, 720, 900)} alt={data.portrait.alt} />
          </div>
        )}
      </div>
    </BrandedSection>
  );
}

/** Inline-SVG selector for the 6 partner logos in `phillips-robotics.html`. */
function PartnerLogo({ variant }: { variant: PartnerLogoVariant }) {
  if (variant === 'haas-f1') {
    return (
      <svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
        <text x="20" y="38" fontFamily="Arial Black" fontSize="22" fill="var(--branded-red)" fontWeight={900}>HAAS</text>
        <line x1="76" y1="14" x2="76" y2="46" stroke="var(--branded-gray-200)" strokeWidth={1} />
        <text x="84" y="26" fontFamily="Montserrat" fontStyle="italic" fontSize="13" fill="var(--branded-red)" fontWeight={800}>Haas</text>
        <text x="84" y="38" fontFamily="Montserrat" fontSize="9" fill="var(--branded-black)" fontWeight={700}>F1 Team</text>
        <text x="84" y="48" fontFamily="Montserrat" fontSize="5.5" fill="var(--branded-gray-500)" fontWeight={600} letterSpacing="1.2">OFFICIAL MACHINE TOOL</text>
      </svg>
    );
  }
  if (variant === 'fanuc') {
    return (
      <svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
        <text x="70" y="42" fontFamily="Arial Black" fontSize="28" fill="var(--branded-red)" textAnchor="middle" fontWeight={900} letterSpacing="0.5">FANUC</text>
      </svg>
    );
  }
  if (variant === 'phillips-additive-hybrid') {
    return (
      <svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
        <g transform="translate(8,12) skewX(-22)">
          <rect x="0"  y="0" width="4" height="20" fill="var(--branded-red)" />
          <rect x="6"  y="0" width="4" height="20" fill="var(--branded-red)" />
          <rect x="12" y="0" width="4" height="20" fill="var(--branded-red)" />
        </g>
        <text x="32" y="28" fontFamily="Barlow Condensed, sans-serif" fontStyle="italic" fontSize="20" fill="var(--branded-black)" fontWeight={900}>Phillips</text>
        <text x="86" y="20" fontSize="6" fontWeight={700} fill="var(--branded-black)" fontFamily="Montserrat, sans-serif">®</text>
        <text x="32" y="42" fontFamily="Barlow Condensed, sans-serif" fontStyle="italic" fontSize="11" fill="var(--branded-red)" fontWeight={800} letterSpacing="0.5">ADDITIVE HYBRID</text>
        <text x="32" y="52" fontFamily="Montserrat, sans-serif" fontStyle="italic" fontSize="6" fill="var(--branded-gray-500)" fontWeight={700} letterSpacing="1.2">POWERED BY HAAS</text>
      </svg>
    );
  }
  if (variant === 'markforged') {
    return (
      <svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
        <g transform="translate(14,17)">
          <polygon points="14,0 24,6 24,18 14,24 4,18 4,6" fill="none" stroke="var(--branded-gray-700)" strokeWidth={2} />
          <path d="M9 18 L9 8 L14 13 L19 8 L19 18" stroke="var(--branded-gray-700)" strokeWidth={2} fill="none" strokeLinejoin="round" />
        </g>
        <text x="50" y="38" fontFamily="Montserrat, sans-serif" fontSize="16" fill="var(--branded-gray-700)" fontWeight={700}>Markforged</text>
      </svg>
    );
  }
  if (variant === 'eos') {
    // Pixel-block EOS rendering matching the reference style.
    return (
      <svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
        <text x="70" y="40" fontFamily="Arial Black" fontSize="28" fill="var(--branded-gold)" textAnchor="middle" fontWeight={900} letterSpacing="2">EOS</text>
      </svg>
    );
  }
  // absolute-machine-tools
  return (
    <svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
      <g transform="translate(10,16) skewX(-12)">
        <rect x="0" y="0" width="4" height="22" fill="var(--branded-red)" />
        <rect x="6" y="0" width="4" height="22" fill="var(--branded-gray-700)" />
      </g>
      <text x="28" y="30" fontFamily="Barlow Condensed, sans-serif" fontStyle="italic" fontSize="13" fill="var(--branded-gray-700)" fontWeight={900}>ABSOLUTE</text>
      <text x="28" y="44" fontFamily="Barlow Condensed, sans-serif" fontStyle="italic" fontSize="11" fill="var(--branded-red)" fontWeight={900}>MACHINE TOOLS</text>
    </svg>
  );
}

/* ============================================================
   AUTOMATION (opto only) — tinted inner card
   ============================================================ */

function Automation({ data }: { data: NonNullable<BrandedSolutionData['automation']> }) {
  // TODO(schema-extension): add `automation` field — eyebrow, heading,
  //   body, items[], cta, image. Reuses tinted overlay from BrandedSection.
  return (
    <section id={data.id} className="branded-sol-anchor" style={{ padding: '112px 0' }}>
      <div style={CONTAINER}>
        <div
          style={{
            background: 'linear-gradient(135deg, #ECF1F4 0%, #D9E3EB 100%)',
            borderRadius: 'var(--branded-r-xl)',
            padding: '56px',
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '48px',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--branded-shadow-md)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(60deg, rgba(255,255,255,0.18) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.18) 75%)',
              backgroundSize: '32px 56px',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: 'var(--branded-r-lg)',
              overflow: 'hidden',
              aspectRatio: '16 / 11',
              boxShadow: 'var(--branded-shadow-lg)',
              background: 'var(--branded-gray-200)',
            }}
          >
            {imageUrl(data.image, 1200, 900) && (
              <Image
                src={imageUrl(data.image, 1200, 900)}
                alt={data.image.alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1000px) 100vw, 50vw"
              />
            )}
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 style={{ ...SECTION_HEADING, marginBottom: '18px' }}>{data.heading}</h2>
            <div style={{ fontSize: '14px', color: 'var(--branded-gray-600)', lineHeight: 1.75, marginBottom: '24px', maxWidth: '480px' }}>
              {renderRichText(data.body)}
            </div>
            {data.items.map((item, i) => (
              <div
                key={i}
                style={{ marginBottom: '18px', fontSize: '14px', lineHeight: 1.7, color: 'var(--branded-gray-600)', maxWidth: '480px' }}
              >
                <strong style={{ display: 'block', fontWeight: 700, color: 'var(--branded-black)', marginBottom: '4px', fontSize: '14px' }}>
                  {item.title}
                </strong>
                {item.body}
              </div>
            ))}
            {data.cta && (
              <div style={{ marginTop: '18px' }}>
                <Btn href={data.cta.href}>{data.cta.label}</Btn>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PHILLIPS ADDITIVE (robotics only) — tinted display-heading
   ============================================================ */

function PhillipsAdditive({ data }: { data: NonNullable<BrandedSolutionData['phillipsAdditive']> }) {
  // TODO(schema-extension): add `phillipsAdditive` cross-promo field.
  return (
    <BrandedSection variant="tinted">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '56px', alignItems: 'center' }}>
        <div>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: 'clamp(34px, 4vw, 48px)',
              lineHeight: 1.05,
              letterSpacing: '-0.8px',
              color: 'var(--branded-black)',
              marginBottom: '24px',
            }}
          >
            {data.headingLines.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
              </span>
            ))}
          </h2>
          <div
            style={{
              color: 'var(--branded-gray-700)',
              fontSize: '15px',
              lineHeight: 1.75,
              marginBottom: '32px',
              maxWidth: '460px',
            }}
          >
            {renderRichText(data.body)}
          </div>
          {data.cta && <Btn href={data.cta.href}>{data.cta.label}</Btn>}
        </div>
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--branded-r-lg)',
            overflow: 'hidden',
            aspectRatio: '16 / 11',
            boxShadow: 'var(--branded-shadow-lg)',
            background: 'var(--branded-gray-100)',
          }}
        >
          {imageUrl(data.image, 1200, 800) && (
            <Image src={imageUrl(data.image, 1200, 800)} alt={data.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 50vw" />
          )}
        </div>
      </div>
    </BrandedSection>
  );
}

/* ============================================================
   TRAINING (opto only)
   ============================================================ */

function Training({ data }: { data: NonNullable<BrandedSolutionData['training']> }) {
  // TODO(schema-extension): add `training` field — heading, body, items[], cta, photo.
  return (
    <section id={data.id} className="branded-sol-anchor">
      <BrandedSection variant="soft">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '32px', alignItems: 'stretch' }}>
          <BrandedCard accent="topLeft" padding="56px">
            <h2 style={{ ...SECTION_HEADING, marginTop: '28px', marginBottom: '18px' }}>{data.heading}</h2>
            <div style={{ fontSize: '15px', color: 'var(--branded-gray-600)', lineHeight: 1.75, marginBottom: '28px' }}>
              {renderRichText(data.body)}
            </div>
            <div style={{ marginBottom: '28px' }}>
              {data.items.map((item, i) => (
                <div
                  key={i}
                  style={{ marginBottom: '18px', fontSize: '14px', lineHeight: 1.65, color: 'var(--branded-gray-600)' }}
                >
                  <strong style={{ display: 'block', fontWeight: 700, fontSize: '14px', color: 'var(--branded-black)', marginBottom: '3px' }}>
                    {item.title}
                  </strong>
                  {item.body}
                </div>
              ))}
            </div>
            {data.cta && <Btn href={data.cta.href}>{data.cta.label}</Btn>}
          </BrandedCard>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--branded-r-lg)',
              overflow: 'hidden',
              aspectRatio: '4 / 5',
              boxShadow: 'var(--branded-shadow-lg)',
              background: 'var(--branded-gray-100)',
              height: '100%',
            }}
          >
            {imageUrl(data.photo, 900, 1100) && (
              <Image src={imageUrl(data.photo, 900, 1100)} alt={data.photo.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 40vw" />
            )}
          </div>
        </div>
      </BrandedSection>
    </section>
  );
}

/* ============================================================
   FASTRACK (robotics only)
   ============================================================ */

function Fastrack({ data }: { data: NonNullable<BrandedSolutionData['fastrack']> }) {
  // TODO(schema-extension): add `fastrack` field for the Fastrack Robotics CTA section.
  return (
    <section id={data.id} className="branded-sol-anchor">
      <BrandedSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '56px', alignItems: 'center' }}>
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
            {imageUrl(data.image, 1200, 900) && (
              <Image src={imageUrl(data.image, 1200, 900)} alt={data.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 50vw" />
            )}
          </div>
          <div>
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 style={{ ...SECTION_HEADING, marginBottom: '22px' }}>{data.heading}</h2>
            <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75, marginBottom: '32px', maxWidth: '460px' }}>
              {renderRichText(data.body)}
            </div>
            {data.cta && <Btn href={data.cta.href}>{data.cta.label}</Btn>}
          </div>
        </div>
      </BrandedSection>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS (opto only) — dark section
   ============================================================ */

function Testimonials({ data }: { data: NonNullable<BrandedSolutionData['testimonials']> }) {
  // TODO(schema-extension): add `testimonials` field — eyebrow, heading,
  //   cards[] of { quote, person.name, person.title, moreLink }.
  return (
    <section id={data.id} className="branded-sol-anchor">
      <BrandedSection variant="dark">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 style={{ ...SECTION_HEADING, color: 'var(--branded-white)' }}>{data.heading}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {data.cards.map((card, i) => (
            <TestimonialCard key={i} card={card} />
          ))}
        </div>
      </BrandedSection>
    </section>
  );
}

function TestimonialCard({ card }: { card: NonNullable<BrandedSolutionData['testimonials']>['cards'][number] }) {
  return (
    <div
      style={{
        background: 'var(--branded-white)',
        color: 'var(--branded-black)',
        padding: '44px 32px 32px',
        borderRadius: 'var(--branded-r-lg)',
        position: 'relative',
        boxShadow: '0 12px 36px rgba(0,0,0,0.20)',
      }}
    >
      {/* Red drop tab (matches `.testimonial-card::before`) */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '28px',
          width: '36px',
          height: '38px',
          background: 'var(--branded-red)',
          borderRadius: '0 0 4px 4px',
        }}
      />
      {/* Georgia open-quote glyph (matches `.testimonial-card::after`) */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-2px',
          left: '32px',
          fontFamily: 'Georgia, serif',
          fontSize: '46px',
          color: 'var(--branded-white)',
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        “
      </span>
      <p style={{ fontSize: '15px', lineHeight: 1.7, marginBottom: '24px', color: 'var(--branded-black)', fontWeight: 600 }}>
        {card.quote}
      </p>
      <p style={{ fontSize: '13px', color: 'var(--branded-gray-500)', lineHeight: 1.5 }}>
        <strong style={{ display: 'block', fontWeight: 700, color: 'var(--branded-black)', marginBottom: '2px', fontSize: '14px' }}>
          {card.person.name}
        </strong>
        {card.person.title}
      </p>
      {card.moreLink && (
        <a
          href={card.moreLink.href}
          style={{
            marginTop: '14px',
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--branded-red)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
          }}
        >
          {card.moreLink.label} <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  );
}

/* ============================================================
   TEAM (opto only)
   ============================================================ */

function Team({ data }: { data: NonNullable<BrandedSolutionData['team']> }) {
  // TODO(schema-extension): add `team` field — could reference `teamMember`
  //   docs OR be inline with name/role/photo.
  return (
    <section id={data.id} className="branded-sol-anchor">
      <BrandedSection>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '56px' }}>
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 style={SECTION_HEADING}>{data.heading}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '32px' }}>
            {data.members.map((m) => (
              <div key={m.name} className="branded-sol-team-member" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className="branded-sol-team-photo"
                  style={{
                    width: '152px',
                    height: '152px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '18px',
                    border: '1px solid var(--branded-gray-200)',
                    background: 'var(--branded-gray-100)',
                    boxShadow: 'var(--branded-shadow-md)',
                    position: 'relative',
                  }}
                >
                  {imageUrl(m.photo, 400, 400) && (
                    <Image src={imageUrl(m.photo, 400, 400)} alt={m.photo.alt} fill style={{ objectFit: 'cover' }} sizes="152px" />
                  )}
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '15px', color: 'var(--branded-black)', marginBottom: '4px' }}>
                  {m.name}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--branded-gray-500)' }}>{m.role}</div>
              </div>
            ))}
          </div>
          <div aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', gap: '7px', margin: '32px 0 40px' }}>
            {[true, false, false].map((active, i) => (
              <span
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: active ? 'var(--branded-red)' : 'var(--branded-gray-200)',
                }}
              />
            ))}
          </div>
          {data.contactCta && (
            <div id="contact" className="branded-sol-anchor">
              <Btn href={data.contactCta.href}>{data.contactCta.label}</Btn>
            </div>
          )}
        </div>
      </BrandedSection>
    </section>
  );
}

/* ============================================================
   OPTO ENGINEERS cross-promo (robotics only) — soft section with mark
   ============================================================ */

function OptoEngineers({ data }: { data: NonNullable<BrandedSolutionData['optoEngineers']> }) {
  // TODO(schema-extension): add `optoEngineers` cross-promo field for robotics.
  return (
    <BrandedSection variant="soft">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '44px' }}>
        <OptoMark size={64} />
        <span
          style={{
            fontFamily: FONT_ACCENT,
            fontStyle: 'italic',
            fontWeight: 800,
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          <span style={{ fontSize: '28px', color: 'var(--branded-black)', display: 'block', letterSpacing: '1px' }}>OPTO</span>
          <span style={{ fontSize: '12px', color: 'var(--branded-gray-500)', display: 'block', letterSpacing: '4px', marginTop: '4px' }}>FOR HAAS</span>
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '56px', alignItems: 'center' }}>
        <div>
          <h2 style={{ ...SECTION_HEADING, marginBottom: '22px', maxWidth: '440px' }}>{data.heading}</h2>
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75, marginBottom: '32px', maxWidth: '460px' }}>
            {renderRichText(data.body)}
          </div>
          {data.cta && <Btn href={data.cta.href}>{data.cta.label}</Btn>}
        </div>
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--branded-r-lg)',
            overflow: 'hidden',
            aspectRatio: '5 / 3.6',
            boxShadow: 'var(--branded-shadow-lg)',
            background: 'var(--branded-gray-100)',
          }}
        >
          {imageUrl(data.image, 1100, 700) && (
            <Image src={imageUrl(data.image, 1100, 700)} alt={data.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 50vw" />
          )}
        </div>
      </div>
    </BrandedSection>
  );
}

/* ============================================================
   PHILLIPS EDUCATION cross-promo (robotics only)
   ============================================================ */

function PhillipsEducation({ data }: { data: NonNullable<BrandedSolutionData['phillipsEducation']> }) {
  // TODO(schema-extension): add `phillipsEducation` cross-promo field for robotics.
  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'stretch' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--branded-r-lg)',
            overflow: 'hidden',
            aspectRatio: '4 / 3',
            boxShadow: 'var(--branded-shadow-lg)',
            background: 'var(--branded-gray-100)',
            height: '100%',
          }}
        >
          {imageUrl(data.image, 1100, 900) && (
            <Image src={imageUrl(data.image, 1100, 900)} alt={data.image.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1000px) 100vw, 50vw" />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '26px' }}>
            <PhillipsLockup height={36} />
            <span
              style={{
                fontFamily: FONT_ACCENT,
                fontStyle: 'italic',
                fontWeight: 800,
                fontSize: '24px',
                color: 'var(--branded-red)',
                letterSpacing: '3px',
                lineHeight: 1,
              }}
            >
              EDUCATION
            </span>
          </div>
          <h2 style={{ ...SECTION_HEADING, marginBottom: '22px', maxWidth: '460px' }}>{data.heading}</h2>
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75, marginBottom: '32px', maxWidth: '480px' }}>
            {renderRichText(data.body)}
          </div>
          {data.cta && (
            <div>
              <Btn href={data.cta.href}>{data.cta.label}</Btn>
            </div>
          )}
        </div>
      </div>
    </BrandedSection>
  );
}

/* ============================================================
   COMMUNITY (always)
   ============================================================ */

function Community({ data }: { data: BrandedSolutionData['community'] }) {
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

// Provide CtaRef as a re-export so callers can derive from this client.
export type { Props as BrandedSolutionClientProps };
export type { CtaRef };
