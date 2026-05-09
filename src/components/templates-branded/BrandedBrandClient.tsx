import {
  BrandedImage,
  BrandedPageShell,
  Btn,
  CONTAINER,
  FONT_ACCENT,
  FONT_DISPLAY,
  META_LABEL,
  NoContentYet,
  SECTION_HEADING,
  imageAlt,
  imageUrl,
  renderRichText,
  toPlainText,
} from './_shared/branded-helpers';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';
import Eyebrow from '@/components/branded/Eyebrow';

export interface SanityBrand {
  name?: string;
  tagline?: string;
  description?: unknown;
  category?: string[];
  heroImage?: unknown;
  logo?: unknown;
  productLines?: Array<{
    name?: string;
    seriesLabel?: string;
    description?: string;
    image?: unknown;
    xTravel?: string;
    spindleSpeed?: string;
    tableLoad?: string;
    axes?: string;
    bestFor?: string;
    brochureUrl?: string;
  }>;
  relatedCaseStudies?: Array<{
    title?: string;
    slug?: { current?: string };
    customer?: string;
    industry?: string;
  }>;
  stats?: Array<{ value?: string; label?: string }>;
  aboutTitle?: string;
  aboutBody?: string;
  caseStudiesIntro?: string;
}

interface Props {
  data: SanityBrand | null;
  slug: string;
}

export default function BrandedBrandClient({ data, slug }: Props) {
  if (!data?.name) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Brand" slug={slug} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero brand={data} />
      <Inspired brand={data} />
      {data.productLines && data.productLines.length > 0 && <ProductLineList lines={data.productLines} brand={data.name} />}
      {data.stats && data.stats.length > 0 && <StatsBars stats={data.stats} />}
      {data.relatedCaseStudies && data.relatedCaseStudies.length > 0 && (
        <CaseStudies cases={data.relatedCaseStudies} intro={data.caseStudiesIntro} />
      )}
    </BrandedPageShell>
  );
}

function Hero({ brand }: { brand: SanityBrand }) {
  const url = imageUrl(brand.heroImage, 1600, 900, 'https://images.unsplash.com/photo-1717386255773-a456c611dc4e?w=1600&h=900&fit=crop&auto=format&q=80');
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 6.4',
        minHeight: '480px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(95deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.40) 40%, rgba(0,0,0,0.10) 75%, rgba(0,0,0,0) 100%), url("${url}") center/cover no-repeat`,
        }}
      />
      <div style={{ ...CONTAINER, position: 'relative', zIndex: 2, color: 'var(--branded-white)', maxWidth: '900px' }}>
        <Eyebrow color="var(--branded-white)">{brand.category?.[0] ?? 'Brand'}</Eyebrow>
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 'clamp(48px, 6.4vw, 84px)',
            lineHeight: 0.96,
            letterSpacing: '-2px',
            color: 'var(--branded-white)',
            margin: '0 0 16px',
          }}
        >
          {brand.name}
        </h1>
        {brand.tagline && (
          <p style={{ fontSize: '18px', lineHeight: 1.55, color: 'rgba(255,255,255,0.94)', maxWidth: '640px', fontWeight: 500 }}>
            {brand.tagline}
          </p>
        )}
        {brand.category && brand.category.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
            {brand.category.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: FONT_ACCENT,
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '8px 14px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '4px',
                  color: 'var(--branded-white)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Inspired({ brand }: { brand: SanityBrand }) {
  const heading = brand.aboutTitle ?? 'Inspired By Your Ingenuity';
  const body = brand.aboutBody ?? toPlainText(brand.description) ?? `Phillips partners with ${brand.name} to deliver legendary value through innovative thinking and unparalleled expertise.`;
  return (
    <BrandedSection variant="soft" tight>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'stretch' }}>
        <BrandedCard accent="topLeft" padding="56px">
          <h2 style={{ ...SECTION_HEADING, marginTop: '28px', marginBottom: '22px' }}>{heading}</h2>
          <div style={{ color: 'var(--branded-gray-600)', fontSize: '15px', lineHeight: 1.75 }}>
            {renderRichText(body)}
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
          <BrandedImage image={brand.heroImage} alt={imageAlt(brand.heroImage, brand.name ?? 'Brand')} width={1000} height={800} fill sizes="(max-width: 1000px) 100vw, 50vw" />
        </div>
      </div>
    </BrandedSection>
  );
}

function ProductLineList({ lines, brand }: { lines: NonNullable<SanityBrand['productLines']>; brand: string }) {
  return (
    <BrandedSection>
      <div style={{ marginBottom: '40px' }}>
        <Eyebrow>Product Lines</Eyebrow>
        <h2 style={SECTION_HEADING}>{brand} Series</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
        {lines.map((line, i) => (
          <BrandedCard key={i} accent="topBorder" padding="32px">
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                borderRadius: 'var(--branded-r-md)',
                overflow: 'hidden',
                background: 'var(--branded-gray-100)',
                marginBottom: '20px',
              }}
            >
              <BrandedImage image={line.image} alt={line.name ?? 'Product line'} width={600} height={450} fill sizes="(max-width: 1000px) 100vw, 33vw" />
            </div>
            {line.seriesLabel && (
              <span style={{ ...META_LABEL, color: 'var(--branded-red)', display: 'block', marginBottom: '8px' }}>
                {line.seriesLabel}
              </span>
            )}
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: '0 0 10px' }}>
              {line.name}
            </h3>
            {line.description && (
              <p style={{ fontSize: '14px', color: 'var(--branded-gray-600)', lineHeight: 1.65, marginBottom: '16px' }}>
                {line.description}
              </p>
            )}
            <SpecRow line={line} />
            {line.brochureUrl && <Btn href={line.brochureUrl} variant="ghost">View Brochure</Btn>}
          </BrandedCard>
        ))}
      </div>
    </BrandedSection>
  );
}

function SpecRow({ line }: { line: NonNullable<SanityBrand['productLines']>[number] }) {
  const specs = [
    { label: 'X-Travel', value: line.xTravel },
    { label: 'Spindle', value: line.spindleSpeed },
    { label: 'Table', value: line.tableLoad },
    { label: 'Axes', value: line.axes },
  ].filter((s) => s.value);
  if (specs.length === 0) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${specs.length}, 1fr)`, gap: '12px', marginBottom: '20px', paddingTop: '12px', borderTop: '1px solid var(--branded-gray-200)' }}>
      {specs.map((s) => (
        <div key={s.label}>
          <div style={{ ...META_LABEL, fontSize: '10px', marginBottom: '4px' }}>{s.label}</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '13px', color: 'var(--branded-black)' }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function StatsBars({ stats }: { stats: NonNullable<SanityBrand['stats']> }) {
  return (
    <BrandedSection variant="soft">
      <div style={{ marginBottom: '40px' }}>
        <Eyebrow>By the Numbers</Eyebrow>
        <h2 style={SECTION_HEADING}>Phillips × Brand Impact</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '32px' }}>
        {stats.map((stat, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: 'clamp(40px, 5vw, 64px)',
                lineHeight: 1,
                color: 'var(--branded-red)',
                letterSpacing: '-1.5px',
                marginBottom: '8px',
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--branded-gray-600)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
              {stat.label}
            </div>
            {/* Visual progress bar accent */}
            <div style={{ height: '3px', background: 'var(--branded-gray-200)', borderRadius: '2px', marginTop: '12px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, width: '64%', background: 'var(--branded-red)' }} />
            </div>
          </div>
        ))}
      </div>
    </BrandedSection>
  );
}

function CaseStudies({ cases, intro }: { cases: NonNullable<SanityBrand['relatedCaseStudies']>; intro?: string }) {
  return (
    <BrandedSection>
      <div style={{ marginBottom: '40px' }}>
        <Eyebrow>Customer Stories</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, marginBottom: '12px' }}>Customers Choose Us</h2>
        {intro && <p style={{ color: 'var(--branded-gray-600)', maxWidth: '640px', fontSize: '15px', lineHeight: 1.7 }}>{intro}</p>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
        {cases.map((cs, i) => (
          <a
            key={i}
            href={cs.slug?.current ? `/branded/case-study/${cs.slug.current}` : '#'}
            style={{
              display: 'block',
              background: 'var(--branded-white)',
              border: '1px solid var(--branded-gray-200)',
              borderTop: '3px solid var(--branded-red)',
              borderRadius: 'var(--branded-r-lg)',
              padding: '32px',
              boxShadow: 'var(--branded-shadow-md)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span style={META_LABEL}>{cs.industry ?? 'Case Study'}</span>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: '12px 0 8px', lineHeight: 1.3 }}>
              {cs.title}
            </h3>
            {cs.customer && (
              <p style={{ fontSize: '13px', color: 'var(--branded-gray-600)', fontWeight: 600 }}>{cs.customer}</p>
            )}
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '11px', letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--branded-red)', marginTop: '20px', display: 'inline-block' }}>
              Read Story →
            </span>
          </a>
        ))}
      </div>
    </BrandedSection>
  );
}
