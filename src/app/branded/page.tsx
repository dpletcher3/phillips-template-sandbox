import type { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { homePageQuery } from '@/lib/queries';
import BrandedHomeClient from '@/components/templates-branded/BrandedHomeClient';
import { FALLBACK_HOME, type BrandedHomeData, type ImageRef, type RichText, type CtaRef } from '@/components/templates-branded/branded-home-data';

/**
 * Branded family home page (`/branded`).
 *
 * Fetches the homePage singleton (`*[_type == "homePage"][0]`) and
 * overlays each populated field onto FALLBACK_HOME so the route always
 * renders a complete page — even on a fresh Sanity dataset or when the
 * fetch errors. ISR revalidation is 30s (matches existing routes).
 */
export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
  const sanity = await client.fetch<SanityHomePage | null>(homePageQuery).catch(() => null);
  return {
    title: sanity?.seo?.metaTitle ?? FALLBACK_HOME.seo?.metaTitle ?? 'Phillips Corporation',
    description: sanity?.seo?.metaDescription ?? FALLBACK_HOME.seo?.metaDescription ?? '',
  };
}

export default async function BrandedHomePage() {
  const sanity = await client.fetch<SanityHomePage | null>(homePageQuery).catch(() => null);
  const data = transformHome(sanity);
  return <BrandedHomeClient data={data} />;
}

/* ============================================================
   GROQ result type — every field is optional because Sanity
   may return null/missing fields on a fresh dataset.
   ============================================================ */

interface SanityImage {
  asset?: { _ref?: string };
  _type?: string;
  alt?: string;
}

interface SanityCaseStudyRef {
  title?: string;
  slug?: { current?: string };
  heroImage?: SanityImage;
  summary?: string;
  kickerTags?: string[];
}

interface SanityHomePage {
  // Hero
  heroImage?: SanityImage;
  progressBarsAccent?: boolean;
  headline?: string;
  bodyText?: unknown;
  ctaText?: string;
  // Inspired
  inspiredHeading?: string;
  inspiredBody?: unknown;
  inspiredImage?: SanityImage;
  // Hybrid
  hybridHeading?: string;
  hybridSubheading?: string;
  partnerPills?: Array<{ label?: string }>;
  hybridBody?: unknown;
  hybridImage?: SanityImage;
  hybridCta?: { label?: string; href?: string };
  // Op
  opEyebrow?: string;
  opHeading?: string;
  opSubheading?: string;
  opBody?: unknown;
  opTileImages?: SanityImage[];
  opCta?: { label?: string; href?: string };
  // Haas
  haasEyebrow?: string;
  haasHeading?: string;
  haasBody?: unknown;
  haasImage?: SanityImage;
  // Innov
  innovHeading?: string;
  innovCards?: Array<{
    icon?: string;
    title?: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: string;
  }>;
  // LG
  lgHeading?: string;
  lgRegions?: Array<{
    regionName?: string;
    subLabels?: Array<{ label?: string; locations?: string[] }>;
  }>;
  lgRegionButtons?: Array<{ label?: string; href?: string }>;
  // Impact
  impactEyebrow?: string;
  impactHeading?: string;
  impactCards?: SanityCaseStudyRef[];
  // Machinist
  machinistHeading?: string;
  machinistBody?: unknown;
  machinistHighlight?: string;
  qrImage?: SanityImage;
  // WT
  wtEyebrow?: string;
  wtHeading?: string;
  wtBody?: unknown;
  wtCtas?: Array<{ label?: string; href?: string; variant?: string }>;
  wtImage?: SanityImage;
  // Community
  communityTagline?: string;
  communityPhotos?: SanityImage[];
  // SEO
  seo?: { metaTitle?: string; metaDescription?: string };
}

/* ============================================================
   Transform: overlay sanity values onto FALLBACK_HOME.
   Every field falls back to the reference content when missing.
   ============================================================ */

function transformHome(s: SanityHomePage | null): BrandedHomeData {
  if (!s) return FALLBACK_HOME;

  return {
    hero: {
      image: imgRef(s.heroImage, FALLBACK_HOME.hero.image),
      showProgressBars: s.progressBarsAccent ?? FALLBACK_HOME.hero.showProgressBars,
      headline: s.headline ?? FALLBACK_HOME.hero.headline,
      body: rich(s.bodyText, FALLBACK_HOME.hero.body),
      cta: s.ctaText ?? FALLBACK_HOME.hero.cta,
    },
    inspired: {
      heading: s.inspiredHeading ?? FALLBACK_HOME.inspired.heading,
      body: rich(s.inspiredBody, FALLBACK_HOME.inspired.body),
      image: imgRef(s.inspiredImage, FALLBACK_HOME.inspired.image),
    },
    hybrid: {
      heading: s.hybridHeading ?? FALLBACK_HOME.hybrid.heading,
      subheading: s.hybridSubheading ?? FALLBACK_HOME.hybrid.subheading,
      partnerPills: s.partnerPills?.length
        ? s.partnerPills.map((p) => p.label ?? '').filter(Boolean)
        : FALLBACK_HOME.hybrid.partnerPills,
      body: rich(s.hybridBody, FALLBACK_HOME.hybrid.body),
      image: imgRef(s.hybridImage, FALLBACK_HOME.hybrid.image),
      cta: cta(s.hybridCta, FALLBACK_HOME.hybrid.cta),
    },
    op: {
      eyebrow: s.opEyebrow ?? FALLBACK_HOME.op.eyebrow,
      heading: s.opHeading ?? FALLBACK_HOME.op.heading,
      subheading: s.opSubheading ?? FALLBACK_HOME.op.subheading,
      body: rich(s.opBody, FALLBACK_HOME.op.body),
      tileImages: [
        imgRef(s.opTileImages?.[0], FALLBACK_HOME.op.tileImages[0]),
        imgRef(s.opTileImages?.[1], FALLBACK_HOME.op.tileImages[1]),
      ],
      cta: cta(s.opCta, FALLBACK_HOME.op.cta),
    },
    haas: {
      eyebrow: s.haasEyebrow ?? FALLBACK_HOME.haas.eyebrow,
      heading: s.haasHeading ?? FALLBACK_HOME.haas.heading,
      body: rich(s.haasBody, FALLBACK_HOME.haas.body),
      image: imgRef(s.haasImage, FALLBACK_HOME.haas.image),
    },
    innov: {
      heading: s.innovHeading ?? FALLBACK_HOME.innov.heading,
      cards: s.innovCards?.length
        ? s.innovCards.map((c, i) => ({
            iconKey: normalizeIconKey(c.icon, FALLBACK_HOME.innov.cards[i]?.iconKey ?? 'machining'),
            title: c.title ?? '',
            body: c.body ?? '',
            cta: { label: c.ctaLabel ?? 'Select Region', href: c.ctaHref ?? '#' },
          }))
        : FALLBACK_HOME.innov.cards,
    },
    lg: {
      heading: s.lgHeading ?? FALLBACK_HOME.lg.heading,
      regions: s.lgRegions?.length
        ? s.lgRegions.map((r) => ({
            regionName: r.regionName ?? '',
            subLabels: (r.subLabels ?? []).map((sl) => ({
              label: sl.label,
              locations: sl.locations ?? [],
            })),
          }))
        : FALLBACK_HOME.lg.regions,
      regionButtons: s.lgRegionButtons?.length
        ? s.lgRegionButtons.map((b) => ({ label: b.label ?? '', href: b.href ?? '#' }))
        : FALLBACK_HOME.lg.regionButtons,
    },
    impact: {
      eyebrow: s.impactEyebrow ?? FALLBACK_HOME.impact.eyebrow,
      heading: s.impactHeading ?? FALLBACK_HOME.impact.heading,
      cards: s.impactCards?.length
        ? s.impactCards.map((c, i) => ({
            title: c.title ?? '',
            meta: c.kickerTags?.[0] ?? 'Case Study',
            slug: c.slug?.current ? `/branded/case-study/${c.slug.current}` : '#',
            heroImage: imgRef(c.heroImage, FALLBACK_HOME.impact.cards[i % FALLBACK_HOME.impact.cards.length].heroImage),
          }))
        : FALLBACK_HOME.impact.cards,
    },
    machinist: {
      heading: s.machinistHeading ?? FALLBACK_HOME.machinist.heading,
      body: rich(s.machinistBody, FALLBACK_HOME.machinist.body),
      highlight: s.machinistHighlight ?? FALLBACK_HOME.machinist.highlight,
      qrImage: s.qrImage ? { sanity: s.qrImage, alt: s.qrImage.alt ?? 'QR code' } : FALLBACK_HOME.machinist.qrImage,
    },
    wt: {
      eyebrow: s.wtEyebrow ?? FALLBACK_HOME.wt.eyebrow,
      heading: s.wtHeading ?? FALLBACK_HOME.wt.heading,
      body: rich(s.wtBody, FALLBACK_HOME.wt.body),
      ctas: s.wtCtas?.length
        ? s.wtCtas.map((c) => ({
            label: c.label ?? '',
            href: c.href ?? '#',
            variant: c.variant === 'ghost' ? 'ghost' : 'primary',
          }))
        : FALLBACK_HOME.wt.ctas,
      image: imgRef(s.wtImage, FALLBACK_HOME.wt.image),
    },
    community: {
      tagline: s.communityTagline ?? FALLBACK_HOME.community.tagline,
      photos: s.communityPhotos?.length
        ? s.communityPhotos.map((p, i) => ({
            sanity: p,
            alt: p.alt ?? FALLBACK_HOME.community.photos[i % FALLBACK_HOME.community.photos.length]?.alt ?? '',
          }))
        : FALLBACK_HOME.community.photos,
    },
    seo: s.seo ?? FALLBACK_HOME.seo,
  };
}

/* ---- Tiny helpers ---- */

function imgRef(s: SanityImage | undefined, fb: ImageRef): ImageRef {
  if (!s) return fb;
  return { sanity: s, alt: s.alt ?? fb.alt };
}

function rich(s: unknown, fb: RichText): RichText {
  if (Array.isArray(s) && s.length > 0) return s as RichText;
  if (typeof s === 'string' && s.length > 0) return s;
  return fb;
}

function cta(s: { label?: string; href?: string } | undefined, fb: CtaRef): CtaRef {
  if (!s) return fb;
  return { label: s.label ?? fb.label, href: s.href ?? fb.href };
}

function normalizeIconKey(
  icon: string | undefined,
  fb: 'machining' | 'additive' | 'optimization' | 'workforce',
): 'machining' | 'additive' | 'optimization' | 'workforce' {
  if (icon === 'machining' || icon === 'additive' || icon === 'optimization' || icon === 'workforce') {
    return icon;
  }
  return fb;
}
