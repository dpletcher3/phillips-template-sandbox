import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { brandProductLinesQuery, allBrandSlugsQuery } from '@/lib/queries';
import BrandedProductLinesClient, { type SanityBrandProductLines } from '@/components/templates-branded/BrandedProductLinesClient';

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allBrandSlugsQuery).catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<SanityBrandProductLines | null>(brandProductLinesQuery, { slug: params.slug }).catch(() => null);
  return {
    title: `${data?.name ?? 'Product Lines'} | Phillips`,
    description: `${data?.name ?? ''} product lines and specifications`,
  };
}

export default async function BrandedProductLinesPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<SanityBrandProductLines | null>(brandProductLinesQuery, { slug: params.slug }).catch(() => null);
  return <BrandedProductLinesClient data={data} slug={params.slug} />;
}
