import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { solutionQuery, allSolutionSlugsQuery } from '@/lib/queries';
import BrandedSolutionClient from '@/components/templates-branded/BrandedSolutionClient';
import {
  pickFallback,
  type BrandedSolutionData,
} from '@/components/templates-branded/branded-solution-data';

/**
 * Branded Solution route — `/branded/solution/[slug]`.
 *
 * Drives both `phillips-opto` and `phillips-robotics` (and any future
 * Solution doc) from a single client. The existing `solutionQuery` is
 * reused unchanged. Fields the schema doesn't cover (most rich sections)
 * read from the slug-specific fallback in `branded-solution-data.ts`.
 *
 * Both canonical slugs are added to `generateStaticParams` regardless of
 * Sanity contents so the routes prerender even on a fresh dataset — the
 * same pattern `/simple/solution/[slug]` uses for `5-axis-machining-centers`
 * and `/simple/brand/[slug]` uses for `hermle`.
 *
 * Manual seed (optional): in Sanity Studio, create two `solution` docs
 * with slugs `phillips-opto` and `phillips-robotics`. Populate `name`,
 * `shortDesc`, `description`, `heroImage`, and `seo` to override the
 * fallback content. Other rich sections require schema fields that
 * haven't been added yet — see the `// TODO(schema-extension)` markers
 * in BrandedSolutionClient.tsx.
 */

export const revalidate = 30;

interface SanitySolution {
  name?: string;
  offering?: string;
  shortDesc?: string;
  description?: unknown;
  heroImage?: { asset?: { _ref?: string }; alt?: string } | null;
  seo?: { metaTitle?: string; metaDescription?: string } | null;
}

export async function generateStaticParams() {
  const slugs = await client
    .fetch<Array<{ slug: string }>>(allSolutionSlugsQuery)
    .catch(() => [] as Array<{ slug: string }>);
  const params = (slugs ?? [])
    .filter((s) => typeof s.slug === 'string' && s.slug)
    .map((s) => ({ slug: s.slug }));
  // Always include both canonical Branded fallbacks even when no Sanity doc exists.
  for (const slug of ['phillips-opto', 'phillips-robotics']) {
    if (!params.find((p) => p.slug === slug)) {
      params.push({ slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const fb = pickFallback(params.slug);
  const sanity = await client
    .fetch<SanitySolution | null>(solutionQuery, { slug: params.slug })
    .catch(() => null);
  return {
    title: sanity?.seo?.metaTitle ?? fb.meta?.metaTitle ?? `${sanity?.name ?? 'Solution'} | Phillips`,
    description: sanity?.seo?.metaDescription ?? fb.meta?.metaDescription ?? sanity?.shortDesc ?? '',
  };
}

export default async function BrandedSolutionPage({ params }: { params: { slug: string } }) {
  const sanity = await client
    .fetch<SanitySolution | null>(solutionQuery, { slug: params.slug })
    .catch(() => null);
  const data = transformSolution(sanity, params.slug);
  return <BrandedSolutionClient data={data} />;
}

/**
 * Overlay Sanity-supplied fields onto the slug-specific fallback. The
 * existing `solution` schema doesn't model most of the rich Branded
 * sections, so only the schema-covered fields are wired through here
 * (heroImage, name → bodyLeadIn heading, description → bodyLeadIn body,
 * shortDesc → hero subText, seo). Everything else reads from the
 * fallback verbatim.
 */
function transformSolution(s: SanitySolution | null, slug: string): BrandedSolutionData {
  const fb = pickFallback(slug);
  if (!s) return fb;

  const description = toPlainText(s.description);

  const heroImage = s.heroImage?.asset?._ref
    ? { sanity: s.heroImage, alt: s.heroImage.alt ?? fb.hero.image.alt }
    : fb.hero.image;

  // bodyLeadIn: keep variant + portrait from fallback; let CMS override heading + body.
  const bodyLeadIn: BrandedSolutionData['bodyLeadIn'] | undefined = fb.bodyLeadIn
    ? {
        ...fb.bodyLeadIn,
        heading: s.name ?? fb.bodyLeadIn.heading,
        body: description || fb.bodyLeadIn.body,
      }
    : undefined;

  return {
    ...fb,
    meta: {
      metaTitle: s.seo?.metaTitle ?? fb.meta?.metaTitle,
      metaDescription: s.seo?.metaDescription ?? fb.meta?.metaDescription,
    },
    hero: {
      ...fb.hero,
      image: heroImage,
      subText: s.shortDesc ?? fb.hero.subText,
    },
    bodyLeadIn,
  };
}

/** Block-content → plain text helper, mirroring the codebase's existing `toPlainText`. */
function toPlainText(value: unknown): string {
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
