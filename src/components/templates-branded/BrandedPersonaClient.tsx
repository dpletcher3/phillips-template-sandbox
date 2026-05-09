import {
  BrandedPageShell,
  Btn,
  CONTAINER,
  FONT_ACCENT,
  FONT_DISPLAY,
  META_LABEL,
  NoContentYet,
  SECTION_HEADING,
  imageUrl,
} from './_shared/branded-helpers';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';
import Eyebrow from '@/components/branded/Eyebrow';

export interface SanityPersonaPage {
  persona?: string;
  headline?: string;
  heroImage?: unknown;
  description?: string;
  featuredSolutions?: Array<{
    name?: string;
    slug?: { current?: string };
    offering?: string;
    shortDesc?: string;
  }>;
  featuredBrands?: Array<{
    name?: string;
    slug?: { current?: string };
    tagline?: string;
    category?: string[];
  }>;
  ctaLabel?: string;
  ctaUrl?: string;
  forLabel?: string;
  stats?: Array<{ value?: string; label?: string }>;
  filterTabs?: Array<{
    id?: string;
    label?: string;
    solutions?: Array<{ name?: string; slug?: { current?: string }; offering?: string; shortDesc?: string }>;
    brands?: Array<{ name?: string; slug?: { current?: string }; tagline?: string; category?: string[] }>;
  }>;
}

interface Props {
  data: SanityPersonaPage | null;
  persona: string;
}

export default function BrandedPersonaClient({ data, persona }: Props) {
  if (!data?.persona) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Persona" slug={persona} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero data={data} />
      {data.stats && data.stats.length > 0 && <StatsStrip stats={data.stats} />}
      {data.featuredSolutions && data.featuredSolutions.length > 0 && <FeaturedSolutions items={data.featuredSolutions} />}
      {data.featuredBrands && data.featuredBrands.length > 0 && <FeaturedBrands items={data.featuredBrands} />}
      {data.filterTabs && data.filterTabs.length > 0 && <FilterTabs tabs={data.filterTabs} />}
      <CTA label={data.ctaLabel} url={data.ctaUrl} forLabel={data.forLabel} />
    </BrandedPageShell>
  );
}

function Hero({ data }: { data: SanityPersonaPage }) {
  const url = imageUrl(data.heroImage, 1600, 900, 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1600&h=900&fit=crop&auto=format&q=80');
  const personaTitle = (data.persona ?? '').replace(/^./, (c) => c.toUpperCase());
  return (
    <section style={{ position: 'relative', width: '100%', aspectRatio: '16 / 6', minHeight: '440px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(95deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.10) 80%), url("${url}") center/cover no-repeat`,
        }}
      />
      <div style={{ ...CONTAINER, position: 'relative', zIndex: 2, color: 'var(--branded-white)', maxWidth: '900px' }}>
        <Eyebrow color="var(--branded-white)">{data.forLabel ?? `For ${personaTitle}s`}</Eyebrow>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(40px, 5.6vw, 76px)', lineHeight: 1, letterSpacing: '-1.8px', color: 'var(--branded-white)', margin: '0 0 20px' }}>
          {data.headline ?? personaTitle}
        </h1>
        {data.description && (
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.94)', lineHeight: 1.6, maxWidth: '640px', fontWeight: 500 }}>
            {data.description}
          </p>
        )}
      </div>
    </section>
  );
}

function StatsStrip({ stats }: { stats: NonNullable<SanityPersonaPage['stats']> }) {
  return (
    <BrandedSection variant="soft" tight>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '32px', textAlign: 'center' }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--branded-red)', lineHeight: 1, letterSpacing: '-1px' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--branded-gray-600)', fontWeight: 600, marginTop: '8px' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </BrandedSection>
  );
}

function FeaturedSolutions({ items }: { items: NonNullable<SanityPersonaPage['featuredSolutions']> }) {
  return (
    <BrandedSection>
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>Solutions</Eyebrow>
        <h2 style={SECTION_HEADING}>Tailored to Your Workflow</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {items.map((s, i) => (
          <a
            key={i}
            href={s.slug?.current ? `/branded/solution/${s.slug.current}` : '#'}
            style={{ display: 'block', background: 'var(--branded-white)', border: '1px solid var(--branded-gray-200)', borderTop: '3px solid var(--branded-red)', padding: '32px', borderRadius: 'var(--branded-r-lg)', textDecoration: 'none', color: 'inherit', boxShadow: 'var(--branded-shadow-sm)' }}
          >
            {s.offering && <span style={META_LABEL}>{s.offering}</span>}
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: '12px 0 10px', lineHeight: 1.3 }}>{s.name}</h3>
            {s.shortDesc && <p style={{ fontSize: '14px', color: 'var(--branded-gray-600)', lineHeight: 1.6 }}>{s.shortDesc}</p>}
          </a>
        ))}
      </div>
    </BrandedSection>
  );
}

function FeaturedBrands({ items }: { items: NonNullable<SanityPersonaPage['featuredBrands']> }) {
  return (
    <BrandedSection variant="soft">
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>Brands</Eyebrow>
        <h2 style={SECTION_HEADING}>Equipment You Can Trust</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {items.map((b, i) => (
          <a
            key={i}
            href={b.slug?.current ? `/branded/brand/${b.slug.current}` : '#'}
            style={{ display: 'block', background: 'var(--branded-white)', padding: '24px', borderRadius: 'var(--branded-r-md)', border: '1px solid var(--branded-gray-200)', textDecoration: 'none', color: 'inherit' }}
          >
            <h3 style={{ fontFamily: FONT_ACCENT, fontStyle: 'italic', fontWeight: 900, fontSize: '24px', color: 'var(--branded-black)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{b.name}</h3>
            {b.tagline && <p style={{ fontSize: '13px', color: 'var(--branded-gray-600)', lineHeight: 1.5, marginBottom: '10px' }}>{b.tagline}</p>}
            {b.category && b.category.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {b.category.slice(0, 2).map((c) => (
                  <span key={c} style={{ ...META_LABEL, fontSize: '10px', padding: '3px 8px', background: 'var(--branded-gray-100)', borderRadius: 'var(--branded-r-sm)' }}>{c}</span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </BrandedSection>
  );
}

function FilterTabs({ tabs }: { tabs: NonNullable<SanityPersonaPage['filterTabs']> }) {
  // TODO(schema-extension): tabs are presentational here. Wrap in a client
  // component to make the tab switcher interactive — for now, the first
  // tab's contents are visible and the rest render as labels only.
  const active = tabs[0];
  return (
    <BrandedSection>
      <div style={{ marginBottom: '24px' }}>
        <Eyebrow>Explore</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, fontSize: '32px' }}>Filter by Need</h2>
      </div>
      <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--branded-gray-200)', marginBottom: '32px', overflowX: 'auto' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id ?? i}
            type="button"
            disabled
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: i === 0 ? 700 : 500,
              fontSize: '14px',
              color: i === 0 ? 'var(--branded-black)' : 'var(--branded-gray-500)',
              background: 'transparent',
              border: 'none',
              padding: '14px 0',
              borderBottom: i === 0 ? '3px solid var(--branded-red)' : '3px solid transparent',
              whiteSpace: 'nowrap',
              cursor: 'default',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {active?.solutions && active.solutions.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {active.solutions.map((s, i) => (
            <BrandedCard key={i} accent="leftBorder" padding="24px">
              <h4 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '15px', color: 'var(--branded-black)', margin: '0 0 6px' }}>{s.name}</h4>
              {s.shortDesc && <p style={{ fontSize: '13px', color: 'var(--branded-gray-600)', lineHeight: 1.55 }}>{s.shortDesc}</p>}
            </BrandedCard>
          ))}
        </div>
      )}
    </BrandedSection>
  );
}

function CTA({ label, url, forLabel }: { label?: string; url?: string; forLabel?: string }) {
  return (
    <BrandedSection variant="soft">
      <div style={{ textAlign: 'center' }}>
        <Eyebrow>Get Started</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, marginBottom: '24px' }}>
          {forLabel ? `Built for ${forLabel}` : 'Talk to a Phillips Engineer'}
        </h2>
        <Btn href={url ?? '#'}>{label ?? 'Request a Quote'}</Btn>
      </div>
    </BrandedSection>
  );
}
