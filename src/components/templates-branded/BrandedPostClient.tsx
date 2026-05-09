import {
  BrandedImage,
  BrandedPageShell,
  CONTAINER,
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

export interface SanityPost {
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  categories?: string[];
  mainImage?: unknown;
  excerpt?: string;
  body?: unknown;
  author?: { name?: string; title?: string; photo?: unknown };
  readTime?: string;
  heroImageCaption?: string;
  pullQuote?: string;
  tableOfContents?: string[];
  relatedPosts?: Array<{
    title?: string;
    slug?: { current?: string };
    categories?: string[];
    publishedAt?: string;
  }>;
}

interface Props {
  data: SanityPost | null;
  slug: string;
}

export default function BrandedPostClient({ data, slug }: Props) {
  if (!data?.title) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Post" slug={slug} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero data={data} />
      <BodyWithToc data={data} />
      {data.pullQuote && <PullQuote text={data.pullQuote} />}
      {data.author && <AuthorCard author={data.author} />}
      {data.relatedPosts && data.relatedPosts.length > 0 && <RelatedPosts posts={data.relatedPosts} />}
    </BrandedPageShell>
  );
}

function Hero({ data }: { data: SanityPost }) {
  const url = imageUrl(data.mainImage, 1600, 900, 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1600&h=900&fit=crop&auto=format&q=80');
  return (
    <section style={{ background: 'var(--branded-white)' }}>
      <div style={{ ...CONTAINER, paddingTop: '80px', paddingBottom: '40px', maxWidth: '900px' }}>
        <Eyebrow>{data.categories?.[0] ?? 'Article'}</Eyebrow>
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-1.4px',
            color: 'var(--branded-black)',
            margin: '0 0 16px',
          }}
        >
          {data.title}
        </h1>
        {data.excerpt && <p style={{ fontSize: '18px', color: 'var(--branded-gray-700)', lineHeight: 1.65, marginBottom: '24px' }}>{data.excerpt}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', color: 'var(--branded-gray-600)', fontSize: '13px' }}>
          {data.author?.name && <span><strong style={{ color: 'var(--branded-black)' }}>{data.author.name}</strong></span>}
          {data.publishedAt && <span>{formatDate(data.publishedAt)}</span>}
          {data.readTime && <span>{data.readTime} read</span>}
          {data.categories && data.categories.length > 0 && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {data.categories.slice(1).map((c) => (
                <span key={c} style={{ ...META_LABEL, fontSize: '10px', padding: '4px 10px', background: 'var(--branded-gray-100)', borderRadius: 'var(--branded-r-sm)' }}>{c}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 7', background: 'var(--branded-gray-100)' }}>
        <BrandedImage image={data.mainImage} alt={data.title ?? 'Article hero'} width={1600} height={700} fallback={url} fill priority sizes="100vw" />
        {data.heroImageCaption && (
          <div style={{ ...CONTAINER, position: 'absolute', bottom: '12px', left: 0, right: 0 }}>
            <span style={{ fontSize: '12px', color: 'var(--branded-white)', background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: 'var(--branded-r-sm)' }}>
              {data.heroImageCaption}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

function BodyWithToc({ data }: { data: SanityPost }) {
  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: data.tableOfContents?.length ? '240px 1fr' : '1fr', gap: '48px', alignItems: 'start' }}>
        {data.tableOfContents && data.tableOfContents.length > 0 && (
          <aside style={{ position: 'sticky', top: '160px' }}>
            <Eyebrow>On This Page</Eyebrow>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.tableOfContents.map((heading, i) => (
                <li key={i}>
                  <a href={`#${slugify(heading)}`} style={{ fontSize: '14px', color: 'var(--branded-gray-600)', textDecoration: 'none', lineHeight: 1.5 }}>
                    {heading}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
        <article style={{ maxWidth: '720px', fontSize: '17px', lineHeight: 1.75, color: 'var(--branded-gray-700)' }}>
          {renderRichText(data.body as never) ?? <p style={{ color: 'var(--branded-gray-500)' }}>{data.excerpt}</p>}
        </article>
      </div>
    </BrandedSection>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <BrandedSection tight>
      <blockquote
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '40px 48px',
          borderLeft: '4px solid var(--branded-red)',
          background: 'var(--branded-gray-50)',
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          fontStyle: 'italic',
          fontSize: '24px',
          lineHeight: 1.45,
          color: 'var(--branded-black)',
        }}
      >
        “{text}”
      </blockquote>
    </BrandedSection>
  );
}

function AuthorCard({ author }: { author: NonNullable<SanityPost['author']> }) {
  return (
    <BrandedSection variant="soft" tight>
      <BrandedCard padding="32px">
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden', background: 'var(--branded-gray-100)', flexShrink: 0, position: 'relative' }}>
            <BrandedImage image={author.photo} alt={author.name ?? 'Author'} width={200} height={200} fill sizes="88px" />
          </div>
          <div>
            <span style={META_LABEL}>About the Author</span>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: '6px 0 4px' }}>{author.name}</h3>
            {author.title && <p style={{ fontSize: '14px', color: 'var(--branded-gray-600)' }}>{author.title}</p>}
          </div>
        </div>
      </BrandedCard>
    </BrandedSection>
  );
}

function RelatedPosts({ posts }: { posts: NonNullable<SanityPost['relatedPosts']> }) {
  return (
    <BrandedSection>
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>Keep Reading</Eyebrow>
        <h2 style={SECTION_HEADING}>Related Articles</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {posts.map((p, i) => (
          <a
            key={i}
            href={p.slug?.current ? `/branded/post/${p.slug.current}` : '#'}
            style={{ display: 'block', background: 'var(--branded-white)', border: '1px solid var(--branded-gray-200)', borderTop: '3px solid var(--branded-red)', padding: '28px', borderRadius: 'var(--branded-r-lg)', textDecoration: 'none', color: 'inherit', boxShadow: 'var(--branded-shadow-sm)' }}
          >
            <span style={META_LABEL}>{p.categories?.[0] ?? 'Article'}</span>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '17px', color: 'var(--branded-black)', margin: '12px 0 8px', lineHeight: 1.35 }}>{p.title}</h3>
            {p.publishedAt && <span style={{ fontSize: '12px', color: 'var(--branded-gray-500)' }}>{formatDate(p.publishedAt)}</span>}
          </a>
        ))}
      </div>
    </BrandedSection>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso;
  }
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
