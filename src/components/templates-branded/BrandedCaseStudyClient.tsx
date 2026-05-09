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
  renderRichText,
} from './_shared/branded-helpers';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';
import Eyebrow from '@/components/branded/Eyebrow';

export interface SanityCaseStudy {
  title?: string;
  slug?: { current?: string };
  customer?: string;
  industry?: string;
  isFederal?: boolean;
  heroImage?: unknown;
  summary?: string;
  body?: unknown;
  relatedBrands?: Array<{
    name?: string;
    slug?: { current?: string };
    logo?: unknown;
  }>;
  results?: Array<{ label?: string; value?: string }>;
  pullQuote?: string;
  pullQuoteAttribution?: string;
  kickerTags?: string[];
  byline?: string;
}

interface Props {
  data: SanityCaseStudy | null;
  slug: string;
}

export default function BrandedCaseStudyClient({ data, slug }: Props) {
  if (!data?.title) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Case Study" slug={slug} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero data={data} />
      <Byline data={data} />
      {data.results && data.results.length > 0 && <Results results={data.results} />}
      {data.pullQuote && <PullQuote quote={data.pullQuote} attribution={data.pullQuoteAttribution} />}
      {data.body !== undefined && data.body !== null && <Body body={data.body} />}
      {data.relatedBrands && data.relatedBrands.length > 0 && <RelatedBrands brands={data.relatedBrands} />}
      <NextUp />
    </BrandedPageShell>
  );
}

function Hero({ data }: { data: SanityCaseStudy }) {
  const url = imageUrl(data.heroImage, 1600, 900, 'https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=1600&h=900&fit=crop&auto=format&q=80');
  return (
    <section style={{ position: 'relative', width: '100%', aspectRatio: '16 / 6', minHeight: '440px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(95deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.10) 80%, rgba(0,0,0,0) 100%), url("${url}") center/cover no-repeat`,
        }}
      />
      <div style={{ ...CONTAINER, position: 'relative', zIndex: 2, color: 'var(--branded-white)', maxWidth: '900px' }}>
        {data.kickerTags && data.kickerTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {data.kickerTags.map((tag) => (
              <span key={tag} style={{ fontFamily: FONT_ACCENT, fontStyle: 'italic', fontWeight: 700, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '6px 12px', background: 'var(--branded-red)', color: 'var(--branded-white)', borderRadius: 'var(--branded-r-sm)' }}>
                {tag}
              </span>
            ))}
            {data.isFederal && (
              <span style={{ fontFamily: FONT_ACCENT, fontStyle: 'italic', fontWeight: 700, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '6px 12px', background: 'var(--branded-maroon)', color: 'var(--branded-white)', borderRadius: 'var(--branded-r-sm)' }}>
                Federal
              </span>
            )}
          </div>
        )}
        <Eyebrow color="var(--branded-white)">{data.industry ?? 'Case Study'}</Eyebrow>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1, letterSpacing: '-1.8px', color: 'var(--branded-white)', margin: '0 0 16px' }}>
          {data.title}
        </h1>
        {data.customer && (
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.94)', fontWeight: 600, letterSpacing: '0.5px' }}>{data.customer}</p>
        )}
      </div>
    </section>
  );
}

function Byline({ data }: { data: SanityCaseStudy }) {
  return (
    <BrandedSection tight>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', borderBottom: '1px solid var(--branded-gray-200)', paddingBottom: '24px' }}>
        {data.byline && (
          <div>
            <span style={META_LABEL}>By</span>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '15px', color: 'var(--branded-black)', marginTop: '4px' }}>{data.byline}</div>
          </div>
        )}
        {data.summary && (
          <p style={{ flex: 1, maxWidth: '720px', fontSize: '17px', color: 'var(--branded-gray-700)', lineHeight: 1.65, fontWeight: 500 }}>{data.summary}</p>
        )}
      </div>
    </BrandedSection>
  );
}

function Results({ results }: { results: NonNullable<SanityCaseStudy['results']> }) {
  return (
    <BrandedSection variant="soft">
      <div style={{ marginBottom: '40px' }}>
        <Eyebrow>Results</Eyebrow>
        <h2 style={SECTION_HEADING}>Outcome at a Glance</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(results.length, 4)}, 1fr)`, gap: '32px' }}>
        {results.map((r, i) => (
          <div key={i} style={{ background: 'var(--branded-white)', padding: '32px', borderRadius: 'var(--branded-r-lg)', borderTop: '4px solid var(--branded-red)', boxShadow: 'var(--branded-shadow-sm)' }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--branded-red)', letterSpacing: '-1px', lineHeight: 1, marginBottom: '12px' }}>
              {r.value}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--branded-gray-700)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>{r.label}</div>
          </div>
        ))}
      </div>
    </BrandedSection>
  );
}

function PullQuote({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <BrandedSection tight>
      <div
        style={{
          background: 'var(--branded-white)',
          padding: '56px 48px 48px',
          borderRadius: 'var(--branded-r-lg)',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          boxShadow: 'var(--branded-shadow-md)',
          border: '1px solid var(--branded-gray-200)',
        }}
      >
        <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: '32px', width: '36px', height: '38px', background: 'var(--branded-red)', borderRadius: '0 0 4px 4px' }} />
        <span aria-hidden="true" style={{ position: 'absolute', top: '-2px', left: '36px', fontFamily: 'Georgia, serif', fontSize: '46px', color: 'var(--branded-white)', lineHeight: 1, fontWeight: 700 }}>
          “
        </span>
        <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: '22px', lineHeight: 1.5, color: 'var(--branded-black)', marginBottom: '20px' }}>
          {quote}
        </p>
        {attribution && (
          <p style={{ fontSize: '14px', color: 'var(--branded-gray-600)', fontWeight: 600 }}>— {attribution}</p>
        )}
      </div>
    </BrandedSection>
  );
}

function Body({ body }: { body: unknown }) {
  return (
    <BrandedSection>
      <article style={{ maxWidth: '780px', margin: '0 auto', fontSize: '17px', lineHeight: 1.75, color: 'var(--branded-gray-700)' }}>
        {renderRichText(body as never)}
      </article>
    </BrandedSection>
  );
}

function RelatedBrands({ brands }: { brands: NonNullable<SanityCaseStudy['relatedBrands']> }) {
  return (
    <BrandedSection variant="soft" tight>
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>Equipment Used</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, fontSize: '28px' }}>Related Brands</h2>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {brands.map((b, i) => (
          <a
            key={i}
            href={b.slug?.current ? `/branded/brand/${b.slug.current}` : '#'}
            style={{ background: 'var(--branded-white)', border: '1px solid var(--branded-gray-200)', padding: '16px 24px', borderRadius: 'var(--branded-r-md)', textDecoration: 'none', color: 'var(--branded-gray-700)', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '14px', boxShadow: 'var(--branded-shadow-sm)' }}
          >
            {b.name}
          </a>
        ))}
      </div>
    </BrandedSection>
  );
}

function NextUp() {
  // TODO(schema-extension): add a `nextUp` field to caseStudy schema (or query
  // for the next-most-recent case study) — for now, link to all stories.
  return (
    <BrandedSection>
      <BrandedCard accent="leftBorder" padding="36px">
        <Eyebrow>Next Up</Eyebrow>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: '8px 0 20px', lineHeight: 1.4 }}>
          Browse all Phillips customer stories
        </h3>
        <Btn href="/branded">All Stories</Btn>
      </BrandedCard>
    </BrandedSection>
  );
}
