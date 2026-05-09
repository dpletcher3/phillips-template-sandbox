import Image from 'next/image';
import { urlFor } from '../../../../sanity/lib/image';

import TemplateBadge from '@/components/TemplateBadge';
import BrandedNav from '@/components/nav/BrandedNav';
import BrandedFooter from '@/components/branded/BrandedFooter';
import BrandStripe from '@/components/branded/BrandStripe';
import PhotoStrip from '@/components/branded/PhotoStrip';
import Eyebrow from '@/components/branded/Eyebrow';
import BrandedSection from '@/components/branded/BrandedSection';

import type { ImageRef, RichText, RichBlock } from '../branded-home-data';
import type { SubnavItem } from '../branded-solution-data';

/**
 * Shared helpers for Branded template clients (page types added in prompt 7+).
 *
 * Existing `BrandedHomeClient` and `BrandedSolutionClient` were written
 * before this file existed and inline their own helpers — they're left
 * alone to keep this prompt focused. Future cleanup can consolidate.
 */

/* ============================================================
   TOKENS
   ============================================================ */

export const CONTAINER: React.CSSProperties = {
  width: '100%',
  maxWidth: '1240px',
  margin: '0 auto',
  padding: '0 32px',
};

export const FONT_DISPLAY = 'var(--font-montserrat), system-ui, sans-serif';
export const FONT_ACCENT = 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif';

export const SECTION_HEADING: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  fontWeight: 700,
  fontSize: 'clamp(30px, 3.4vw, 42px)',
  lineHeight: 1.15,
  letterSpacing: '-0.6px',
  color: 'var(--branded-black)',
};

export const STD_BOLD: React.CSSProperties = {
  color: 'var(--branded-black)',
  fontWeight: 700,
};

export const META_LABEL: React.CSSProperties = {
  fontFamily: FONT_ACCENT,
  fontStyle: 'italic',
  fontWeight: 700,
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: 'var(--branded-gray-500)',
};

/* ============================================================
   IMAGE URL HELPER (handles ImageRef OR raw Sanity image OR null)
   ============================================================ */

export function imageUrl(input: unknown, width: number, height?: number, fallback = ''): string {
  if (!input) return fallback;
  if (typeof input === 'string') return input;
  if (typeof input !== 'object') return fallback;
  const obj = input as Record<string, unknown>;

  // ImageRef shape: { sanity, src, alt }
  if (obj.sanity) {
    try {
      const b = urlFor(obj.sanity).auto('format').width(width);
      return (height ? b.height(height).fit('crop') : b).url();
    } catch {
      return fallback;
    }
  }
  if (typeof obj.src === 'string') return obj.src;

  // Raw Sanity image object
  if (obj.asset || obj._type === 'image') {
    try {
      const b = urlFor(input).auto('format').width(width);
      return (height ? b.height(height).fit('crop') : b).url();
    } catch {
      return fallback;
    }
  }
  return fallback;
}

/** Get alt text from an image-like value, or return the supplied fallback. */
export function imageAlt(input: unknown, fallback = ''): string {
  if (typeof input !== 'object' || !input) return fallback;
  const obj = input as Record<string, unknown>;
  if (typeof obj.alt === 'string') return obj.alt;
  return fallback;
}

/* ============================================================
   RICH TEXT
   ============================================================ */

export function renderRichText(rt: RichText | unknown, boldStyle: React.CSSProperties = STD_BOLD): React.ReactNode {
  if (!rt) return null;
  if (typeof rt === 'string') {
    return rt
      .split(/\n\n+/)
      .filter((p) => p.trim().length > 0)
      .map((para, i) => <p key={i}>{renderInline(para, boldStyle)}</p>);
  }
  if (!Array.isArray(rt)) return null;
  return rt
    .filter((b: unknown): b is RichBlock => {
      return typeof b === 'object' && b !== null && (b as Record<string, unknown>)._type === 'block';
    })
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

/** Lightweight block-content → plain text (matches the codebase's existing helpers). */
export function toPlainText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (!Array.isArray(value)) return '';
  return value
    .filter((b: Record<string, unknown>) => b._type === 'block')
    .map((b: Record<string, unknown>) =>
      Array.isArray(b.children)
        ? b.children
            .map((c: Record<string, unknown>) => (typeof c.text === 'string' ? c.text : ''))
            .join('')
        : '',
    )
    .filter((line: string) => line.length > 0)
    .join('\n\n');
}

/* ============================================================
   BUTTON
   ============================================================ */

export interface BtnProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'light';
  withArrow?: boolean;
  style?: React.CSSProperties;
}

export function Btn({ href, children, variant = 'primary', withArrow = true, style }: BtnProps) {
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
   PAGE SHELL — wraps nav + children + foot for consistent chrome
   ============================================================ */

export interface BrandedPageShellProps {
  children: React.ReactNode;
  /** Render the sticky sub-nav under the header. */
  subnavItems?: SubnavItem[];
  /** Override the community tagline. */
  communityTagline?: string;
  /** Override the photo strip. */
  communityPhotos?: ImageRef[];
}

export function BrandedPageShell({ children, subnavItems, communityTagline, communityPhotos }: BrandedPageShellProps) {
  return (
    <>
      <TemplateBadge label="BRANDED" color="#F68B33" />
      <BrandedNav
        showSubnav={!!subnavItems?.length}
        subnavItems={subnavItems ?? []}
      />
      {children}
      <BrandedPageFoot tagline={communityTagline} photos={communityPhotos} />
    </>
  );
}

/* ============================================================
   PAGE FOOT — community tagline + photo strip + brand stripe + footer
   ============================================================ */

const U = (path: string, w = 400, h = 500, q = 70) =>
  `https://images.unsplash.com/${path}?w=${w}&h=${h}&fit=crop&auto=format&q=${q}`;

export const DEFAULT_COMMUNITY_TAGLINE =
  'We are a community of manufacturing experts dedicated to delivering the best solutions';

export const DEFAULT_COMMUNITY_PHOTOS: ImageRef[] = [
  { src: U('photo-1581091226033-d5c48150dbaa'), alt: '' },
  { src: U('photo-1580894732930-0babd100d356'), alt: '' },
  { src: U('photo-1580894732444-8ecded7900cd'), alt: '' },
  { src: U('photo-1581089789966-df27db014448'), alt: '' },
  { src: U('photo-1580983218765-f663bec07b37'), alt: '' },
  { src: U('photo-1580983230786-ce385a434707'), alt: '' },
  { src: U('photo-1581091224003-01e7c2e69f6f'), alt: '' },
  { src: U('photo-1581094271901-8022df4466f9'), alt: '' },
];

export function BrandedPageFoot({ tagline, photos }: { tagline?: string; photos?: ImageRef[] }) {
  const photoUrls = (photos ?? DEFAULT_COMMUNITY_PHOTOS).map((p) => imageUrl(p, 400, 500));
  return (
    <>
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
            {tagline ?? DEFAULT_COMMUNITY_TAGLINE}
          </h2>
        </div>
        <PhotoStrip images={photoUrls} />
      </section>
      <BrandStripe />
      <BrandedFooter />
    </>
  );
}

/* ============================================================
   GRACEFUL "NO CONTENT YET" STATE
   ============================================================ */

/**
 * Used when a route is hit but the dataset has no matching document.
 * Renders inside the page shell so chrome (nav/footer) stays consistent.
 */
export function NoContentYet({
  type,
  slug,
  heading = 'No content yet.',
}: {
  type: string;
  slug?: string;
  heading?: string;
}) {
  return (
    <BrandedSection>
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Eyebrow>{type}</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, marginTop: '12px' }}>{heading}</h2>
        <p style={{ color: 'var(--branded-gray-600)', maxWidth: '520px', margin: '20px auto', lineHeight: 1.7 }}>
          {slug ? (
            <>This {type.toLowerCase()} (<code>{slug}</code>) doesn&rsquo;t exist in the Sanity dataset yet. Create it in Studio and the page will populate automatically.</>
          ) : (
            <>No {type.toLowerCase()} documents in the Sanity dataset yet. Once content is created the page will populate automatically.</>
          )}
        </p>
      </div>
    </BrandedSection>
  );
}

/* ============================================================
   IMAGE — wraps next/image with sensible defaults for Branded layouts
   ============================================================ */

export function BrandedImage({
  image,
  alt,
  width,
  height,
  fallback,
  fill = false,
  sizes,
  priority,
  style,
  className,
}: {
  image: unknown;
  alt: string;
  width: number;
  height?: number;
  fallback?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  const url = imageUrl(image, width, height, fallback);
  if (!url) return null;
  if (fill) {
    return <Image src={url} alt={alt} fill style={{ objectFit: 'cover', ...style }} sizes={sizes ?? '100vw'} priority={priority} className={className} />;
  }
  return <Image src={url} alt={alt} width={width} height={height ?? Math.round(width * 0.75)} style={style} sizes={sizes} priority={priority} className={className} />;
}

/* ============================================================
   TYPE RE-EXPORTS
   ============================================================ */

export type { ImageRef, RichText, RichBlock } from '../branded-home-data';
export type { SubnavItem } from '../branded-solution-data';
