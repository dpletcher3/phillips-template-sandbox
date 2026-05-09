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
} from './_shared/branded-helpers';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';
import Eyebrow from '@/components/branded/Eyebrow';
import PhillipsLockup from '@/components/branded/PhillipsLockup';

export interface SanityBrandProductLines {
  name?: string;
  slug?: { current?: string };
  tagline?: string;
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
    keySpecs?: Array<{ value?: string; label?: string }>;
  }>;
}

interface Props {
  data: SanityBrandProductLines | null;
  slug: string;
}

export default function BrandedProductLinesClient({ data, slug }: Props) {
  if (!data?.productLines?.length) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Product Lines" slug={slug} heading={data?.name ? `No product lines for ${data.name}` : 'No content yet.'} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero brandName={data.name ?? 'Phillips'} tagline={data.tagline} />
      <ProductGrid lines={data.productLines} />
      <SpecStrip lines={data.productLines} />
      <CTA brandName={data.name ?? 'Phillips'} />
    </BrandedPageShell>
  );
}

function Hero({ brandName, tagline }: { brandName: string; tagline?: string }) {
  return (
    <section style={{ background: 'var(--branded-gray-50)', padding: '80px 0 64px' }}>
      <div style={CONTAINER}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <PhillipsLockup height={48} />
          <span
            style={{
              fontFamily: FONT_ACCENT,
              fontStyle: 'italic',
              fontWeight: 800,
              fontSize: '24px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--branded-red)',
              borderLeft: '2px solid var(--branded-gray-300)',
              paddingLeft: '20px',
              lineHeight: 1,
            }}
          >
            {brandName}
          </span>
        </div>
        <Eyebrow>Product Lines</Eyebrow>
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 'clamp(40px, 5.2vw, 72px)',
            lineHeight: 0.98,
            letterSpacing: '-1.5px',
            color: 'var(--branded-black)',
            margin: '0 0 16px',
          }}
        >
          {brandName} Series.
        </h1>
        {tagline && (
          <p style={{ fontSize: '17px', color: 'var(--branded-gray-700)', maxWidth: '700px', lineHeight: 1.7 }}>{tagline}</p>
        )}
      </div>
    </section>
  );
}

function ProductGrid({ lines }: { lines: NonNullable<SanityBrandProductLines['productLines']> }) {
  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
        {lines.map((line, i) => (
          <BrandedCard key={i} accent="topBorder" padding="36px">
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                borderRadius: 'var(--branded-r-md)',
                overflow: 'hidden',
                background: 'var(--branded-gray-100)',
                marginBottom: '24px',
              }}
            >
              <BrandedImage image={line.image} alt={line.name ?? 'Product'} width={600} height={450} fill sizes="(max-width: 1000px) 100vw, 33vw" />
            </div>
            {line.seriesLabel && <span style={{ ...META_LABEL, color: 'var(--branded-red)', display: 'block', marginBottom: '6px' }}>{line.seriesLabel}</span>}
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '22px', color: 'var(--branded-black)', margin: '0 0 12px' }}>{line.name}</h3>
            {line.description && (
              <p style={{ fontSize: '14px', color: 'var(--branded-gray-600)', lineHeight: 1.7, marginBottom: '20px' }}>{line.description}</p>
            )}
            <KeySpecs line={line} />
            {line.bestFor && (
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'var(--branded-gray-50)', borderRadius: 'var(--branded-r-sm)' }}>
                <span style={{ ...META_LABEL, fontSize: '10px' }}>Best For</span>
                <p style={{ fontSize: '13px', color: 'var(--branded-gray-700)', marginTop: '4px', lineHeight: 1.5 }}>{line.bestFor}</p>
              </div>
            )}
            {line.brochureUrl && (
              <div style={{ marginTop: '20px' }}>
                <Btn href={line.brochureUrl} variant="ghost">View Brochure</Btn>
              </div>
            )}
          </BrandedCard>
        ))}
      </div>
    </BrandedSection>
  );
}

function KeySpecs({ line }: { line: NonNullable<SanityBrandProductLines['productLines']>[number] }) {
  // Prefer keySpecs[] if Sanity provides them; else derive from xTravel/spindle/etc.
  const fromKeySpecs = line.keySpecs?.filter((s) => s.value && s.label).map((s) => ({ label: s.label!, value: s.value! }));
  const derived = [
    { label: 'X-Travel', value: line.xTravel },
    { label: 'Spindle', value: line.spindleSpeed },
    { label: 'Table Load', value: line.tableLoad },
    { label: 'Axes', value: line.axes },
  ].filter((s): s is { label: string; value: string } => typeof s.value === 'string' && s.value.length > 0);
  const specs = fromKeySpecs && fromKeySpecs.length > 0 ? fromKeySpecs : derived;
  if (specs.length === 0) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(specs.length, 2)}, 1fr)`, gap: '12px', borderTop: '1px solid var(--branded-gray-200)', paddingTop: '16px' }}>
      {specs.slice(0, 4).map((s) => (
        <div key={s.label}>
          <div style={{ ...META_LABEL, fontSize: '10px', marginBottom: '4px' }}>{s.label}</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '14px', color: 'var(--branded-black)' }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function SpecStrip({ lines }: { lines: NonNullable<SanityBrandProductLines['productLines']> }) {
  const totalLines = lines.length;
  const withTravel = lines.filter((l) => l.xTravel).length;
  const withAxes = new Set(lines.map((l) => l.axes).filter(Boolean));
  return (
    <BrandedSection variant="soft" tight>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', textAlign: 'center' }}>
        <SpecStripItem value={String(totalLines)} label="Series Available" />
        <SpecStripItem value={String(withTravel)} label="With Spec Sheets" />
        <SpecStripItem value={String(withAxes.size || 1)} label="Axis Configurations" />
      </div>
    </BrandedSection>
  );
}

function SpecStripItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--branded-red)', lineHeight: 1, letterSpacing: '-1px' }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--branded-gray-600)', fontWeight: 600, marginTop: '8px' }}>{label}</div>
    </div>
  );
}

function CTA({ brandName }: { brandName: string }) {
  return (
    <BrandedSection>
      <div
        style={{
          textAlign: 'center',
          background: 'var(--branded-white)',
          borderRadius: 'var(--branded-r-xl)',
          padding: '64px 32px',
          border: '1px solid var(--branded-gray-200)',
          boxShadow: 'var(--branded-shadow-md)',
        }}
      >
        <Eyebrow>Get a Quote</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, marginBottom: '20px' }}>Ready to Spec a {brandName} Machine?</h2>
        <p style={{ color: 'var(--branded-gray-600)', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          Talk to a Phillips applications engineer about your part program, throughput targets, and budget.
        </p>
        <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Btn href="#">Request a Quote</Btn>
          <Btn href="#" variant="ghost">Schedule a Test Cut</Btn>
        </div>
      </div>
    </BrandedSection>
  );
}
