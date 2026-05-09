import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { caseStudyQuery, allCaseStudySlugsQuery } from '@/lib/queries';
import BrandedCaseStudyClient, { type SanityCaseStudy } from '@/components/templates-branded/BrandedCaseStudyClient';

export const revalidate = 30;

interface Fetched extends SanityCaseStudy {
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allCaseStudySlugsQuery).catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<Fetched | null>(caseStudyQuery, { slug: params.slug }).catch(() => null);
  return {
    title: data?.seo?.metaTitle ?? `${data?.title ?? 'Case Study'} | Phillips`,
    description: data?.seo?.metaDescription ?? data?.summary ?? '',
  };
}

export default async function BrandedCaseStudyPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<Fetched | null>(caseStudyQuery, { slug: params.slug }).catch(() => null);
  return <BrandedCaseStudyClient data={data} slug={params.slug} />;
}
