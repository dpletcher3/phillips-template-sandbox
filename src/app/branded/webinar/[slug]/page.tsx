import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { webinarQuery, allWebinarSlugsQuery } from '@/lib/queries';
import BrandedWebinarClient, { type SanityWebinar } from '@/components/templates-branded/BrandedWebinarClient';

export const revalidate = 30;

interface Fetched extends SanityWebinar {
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allWebinarSlugsQuery).catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<Fetched | null>(webinarQuery, { slug: params.slug }).catch(() => null);
  return {
    title: data?.seo?.metaTitle ?? `${data?.title ?? 'Webinar'} | Phillips`,
    description: data?.seo?.metaDescription ?? data?.description ?? '',
  };
}

export default async function BrandedWebinarPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<Fetched | null>(webinarQuery, { slug: params.slug }).catch(() => null);
  return <BrandedWebinarClient data={data} slug={params.slug} />;
}
