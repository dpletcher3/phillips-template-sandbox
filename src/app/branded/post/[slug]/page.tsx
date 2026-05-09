import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { postQuery, allPostSlugsQuery } from '@/lib/queries';
import BrandedPostClient, { type SanityPost } from '@/components/templates-branded/BrandedPostClient';

export const revalidate = 30;

interface Fetched extends SanityPost {
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allPostSlugsQuery).catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<Fetched | null>(postQuery, { slug: params.slug }).catch(() => null);
  return {
    title: data?.seo?.metaTitle ?? `${data?.title ?? 'Post'} | Phillips`,
    description: data?.seo?.metaDescription ?? data?.excerpt ?? '',
  };
}

export default async function BrandedPostPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<Fetched | null>(postQuery, { slug: params.slug }).catch(() => null);
  return <BrandedPostClient data={data} slug={params.slug} />;
}
