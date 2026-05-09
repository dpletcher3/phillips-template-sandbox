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

export interface SanityGuide {
  title?: string;
  slug?: { current?: string };
  topic?: string;
  heroImage?: unknown;
  intro?: unknown;
  body?: unknown;
  docNumber?: string;
  readTime?: string;
  level?: string;
  tableOfContents?: string[];
  callouts?: Array<{ type?: string; title?: string; body?: string }>;
}

interface Props {
  data: SanityGuide | null;
  slug: string;
}

export default function BrandedGuideClient({ data, slug }: Props) {
  if (!data?.title) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Guide" slug={slug} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero data={data} />
      {data.callouts && data.callouts.length > 0 && <Callouts callouts={data.callouts} />}
      <Body data={data} />
      <NextChapter />
    </BrandedPageShell>
  );
}

function Hero({ data }: { data: SanityGuide }) {
  const url = imageUrl(data.heroImage, 1600, 900, 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1600&h=900&fit=crop&auto=format&q=80');
  return (
    <section style={{ position: 'relative', width: '100%', aspectRatio: '16 / 5.5', minHeight: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(95deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.10) 80%), url("${url}") center/cover no-repeat`,
        }}
      />
      <div style={{ ...CONTAINER, position: 'relative', zIndex: 2, color: 'var(--branded-white)', maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
          {data.level && <Badge variant="primary">{data.level}</Badge>}
          {data.readTime && <Badge variant="ghost">{data.readTime} read</Badge>}
          {data.docNumber && <Badge variant="ghost">{data.docNumber}</Badge>}
        </div>
        <Eyebrow color="var(--branded-white)">{data.topic ?? 'Guide'}</Eyebrow>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1, letterSpacing: '-1.6px', color: 'var(--branded-white)', margin: 0 }}>
          {data.title}
        </h1>
      </div>
    </section>
  );
}

function Badge({ children, variant }: { children: React.ReactNode; variant: 'primary' | 'ghost' }) {
  const style: React.CSSProperties = variant === 'primary'
    ? { background: 'var(--branded-red)', color: 'var(--branded-white)' }
    : { background: 'transparent', color: 'var(--branded-white)', border: '1px solid rgba(255,255,255,0.4)' };
  return (
    <span style={{ ...style, fontFamily: FONT_ACCENT, fontStyle: 'italic', fontWeight: 700, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 'var(--branded-r-sm)' }}>
      {children}
    </span>
  );
}

function Callouts({ callouts }: { callouts: NonNullable<SanityGuide['callouts']> }) {
  return (
    <BrandedSection variant="soft" tight>
      <div style={{ marginBottom: '24px' }}>
        <Eyebrow>Before You Start</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, fontSize: '28px' }}>Key Callouts</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {callouts.map((c, i) => (
          <BrandedCard key={i} accent="leftBorder" padding="28px">
            {c.type && <span style={{ ...META_LABEL, color: 'var(--branded-red)', display: 'block', marginBottom: '8px' }}>{c.type}</span>}
            {c.title && (
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '17px', color: 'var(--branded-black)', margin: '0 0 10px' }}>{c.title}</h3>
            )}
            {c.body && <p style={{ fontSize: '14px', color: 'var(--branded-gray-600)', lineHeight: 1.65 }}>{c.body}</p>}
          </BrandedCard>
        ))}
      </div>
    </BrandedSection>
  );
}

function Body({ data }: { data: SanityGuide }) {
  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: data.tableOfContents?.length ? '240px 1fr' : '1fr', gap: '48px', alignItems: 'start' }}>
        {data.tableOfContents && data.tableOfContents.length > 0 && (
          <aside style={{ position: 'sticky', top: '160px' }}>
            <Eyebrow>Contents</Eyebrow>
            <ol style={{ listStyle: 'decimal inside', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.tableOfContents.map((heading, i) => (
                <li key={i} style={{ fontSize: '14px', color: 'var(--branded-gray-600)', lineHeight: 1.5 }}>{heading}</li>
              ))}
            </ol>
          </aside>
        )}
        <article style={{ maxWidth: '720px', fontSize: '17px', lineHeight: 1.75, color: 'var(--branded-gray-700)' }}>
          {data.intro !== undefined && data.intro !== null && (
            <div style={{ fontSize: '19px', color: 'var(--branded-black)', fontWeight: 500, lineHeight: 1.6, marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--branded-gray-200)' }}>
              {renderRichText(data.intro as never)}
            </div>
          )}
          {renderRichText(data.body as never)}
        </article>
      </div>
    </BrandedSection>
  );
}

function NextChapter() {
  // TODO(schema-extension): add a `nextChapter` field (or guide-series support) so
  // editors can chain guides — for now this is a generic "back to all" CTA.
  return (
    <BrandedSection variant="soft" tight>
      <BrandedCard accent="leftBorder" padding="32px">
        <Eyebrow>Next Chapter</Eyebrow>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: '8px 0 20px' }}>Continue your learning path</h3>
        <Btn href="/branded">All Guides</Btn>
      </BrandedCard>
    </BrandedSection>
  );
}
