import type { Metadata } from 'next';
import { client } from '../../../../../sanity/lib/client';
import { personaPageQuery } from '@/lib/queries';
import BrandedPersonaClient, { type SanityPersonaPage } from '@/components/templates-branded/BrandedPersonaClient';

export const revalidate = 30;

const PERSONA_SLUGS = ['manufacturer', 'federal', 'educator'];

interface Fetched extends SanityPersonaPage {
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function generateStaticParams() {
  return PERSONA_SLUGS.map((p) => ({ persona: p }));
}

export async function generateMetadata({ params }: { params: { persona: string } }): Promise<Metadata> {
  const data = await client.fetch<Fetched | null>(personaPageQuery, { persona: params.persona }).catch(() => null);
  const label = params.persona.charAt(0).toUpperCase() + params.persona.slice(1);
  return {
    title: data?.seo?.metaTitle ?? `${label} | Phillips`,
    description: data?.seo?.metaDescription ?? data?.description ?? '',
  };
}

export default async function BrandedPersonaPage({ params }: { params: { persona: string } }) {
  const data = await client.fetch<Fetched | null>(personaPageQuery, { persona: params.persona }).catch(() => null);
  return <BrandedPersonaClient data={data} persona={params.persona} />;
}
