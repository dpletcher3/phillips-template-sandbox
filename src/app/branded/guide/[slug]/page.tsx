import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { guideQuery, allGuideSlugsQuery } from '@/lib/queries';
import BrandedGuideClient, { type SanityGuide } from '@/components/templates-branded/BrandedGuideClient';

export const revalidate = 30;

interface Fetched extends SanityGuide {
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allGuideSlugsQuery).catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<Fetched | null>(guideQuery, { slug: params.slug }).catch(() => null);
  return {
    title: data?.seo?.metaTitle ?? `${data?.title ?? 'Guide'} | Phillips`,
    description: data?.seo?.metaDescription ?? '',
  };
}

export default async function BrandedGuidePage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<Fetched | null>(guideQuery, { slug: params.slug }).catch(() => null);
  return <BrandedGuideClient data={data} slug={params.slug} />;
}
