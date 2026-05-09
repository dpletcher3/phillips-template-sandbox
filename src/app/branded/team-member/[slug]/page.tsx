import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { teamMemberQuery, allTeamMemberSlugsQuery } from '@/lib/queries';
import BrandedTeamMemberClient, { type SanityTeamMember } from '@/components/templates-branded/BrandedTeamMemberClient';

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allTeamMemberSlugsQuery).catch(() => [] as Array<{ slug: string }>);
  return (slugs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch<SanityTeamMember | null>(teamMemberQuery, { slug: params.slug }).catch(() => null);
  return {
    title: `${data?.name ?? 'Team Member'} | Phillips`,
    description: data?.title ?? '',
  };
}

export default async function BrandedTeamMemberPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch<SanityTeamMember | null>(teamMemberQuery, { slug: params.slug }).catch(() => null);
  return <BrandedTeamMemberClient data={data} slug={params.slug} />;
}
