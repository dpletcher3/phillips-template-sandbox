import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { brandQuery, allBrandSlugsQuery } from '@/lib/queries';
import BrandedBrandClient, { type SanityBrand } from '@/components/templates-branded/BrandedBrandClient';

export const revalidate = 30;

interface SanityBrandFetched extends SanityBrand {
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function generateStaticParams() {
  const slugs = await client
    .fetch<Array<{ slug: string }>>(allBrandSlugsQuery)
    .catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client
    .fetch<SanityBrandFetched | null>(brandQuery, { slug: params.slug })
    .catch(() => null);
  return {
    title: data?.seo?.metaTitle ?? `${data?.name ?? 'Brand'} | Phillips`,
    description: data?.seo?.metaDescription ?? data?.tagline ?? '',
  };
}

export default async function BrandedBrandPage({ params }: { params: { slug: string } }) {
  const data = await client
    .fetch<SanityBrandFetched | null>(brandQuery, { slug: params.slug })
    .catch(() => null);
  return <BrandedBrandClient data={data} slug={params.slug} />;
}
