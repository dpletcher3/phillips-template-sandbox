import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { courseQuery, allCourseSlugsQuery } from '@/lib/queries';
import BrandedCourseClient, { type SanityCourse } from '@/components/templates-branded/BrandedCourseClient';

export const revalidate = 30;

interface Fetched extends SanityCourse {
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allCourseSlugsQuery).catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<Fetched | null>(courseQuery, { slug: params.slug }).catch(() => null);
  return {
    title: data?.seo?.metaTitle ?? `${data?.title ?? 'Course'} | Phillips`,
    description: data?.seo?.metaDescription ?? data?.description ?? '',
  };
}

export default async function BrandedCoursePage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<Fetched | null>(courseQuery, { slug: params.slug }).catch(() => null);
  return <BrandedCourseClient data={data} slug={params.slug} />;
}
