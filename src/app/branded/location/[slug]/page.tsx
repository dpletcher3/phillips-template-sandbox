import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { locationQuery, allLocationSlugsQuery } from '@/lib/queries';
import BrandedLocationClient, { type SanityLocation } from '@/components/templates-branded/BrandedLocationClient';

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allLocationSlugsQuery).catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<SanityLocation | null>(locationQuery, { slug: params.slug }).catch(() => null);
  return {
    title: `${data?.name ?? 'Location'} | Phillips`,
    description: data?.address ?? data?.region ?? '',
  };
}

export default async function BrandedLocationPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<SanityLocation | null>(locationQuery, { slug: params.slug }).catch(() => null);
  return <BrandedLocationClient data={data} slug={params.slug} />;
}
