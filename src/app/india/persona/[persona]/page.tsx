// Persona route. Brief Task 5 specified "/india/persona/page.tsx (singleton,
// no [slug])", but personaPage is not a singleton — it has multiple
// instances keyed by the `persona` enum (manufacturer, federal, machinist,
// researcher, partner-distributor). Every existing family routes persona
// as /family/persona/[persona]/page.tsx; we follow that convention for
// consistency. Surfaced in the session summary.
import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { personaPageQuery } from '@/lib/queries'
import IndiaPersonaClient, { type SanityPersonaPage } from '@/components/templates-india/persona/IndiaPersonaClient'

export const revalidate = 30

const PERSONA_VALUES = ['manufacturer', 'federal', 'machinist', 'researcher', 'partner-distributor'] as const

export async function generateStaticParams() {
  return PERSONA_VALUES.map(persona => ({ persona }))
}

export async function generateMetadata({
  params,
}: {
  params: { persona: string }
}): Promise<Metadata> {
  const personaPage = await client
    .fetch<SanityPersonaPage | null>(personaPageQuery, { persona: params.persona })
    .catch(() => null)
  return {
    title: personaPage?.headline
      ? `${personaPage.headline} | Phillips Template Sandbox`
      : `For ${params.persona} | Phillips Template Sandbox`,
    description:
      personaPage?.description || 'Phillips Corporation persona page (india family)',
  }
}

export default async function IndiaPersonaPage({ params }: { params: { persona: string } }) {
  const personaPage = await client
    .fetch<SanityPersonaPage | null>(personaPageQuery, { persona: params.persona })
    .catch(() => null)
  if (!personaPage) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Persona page not found</h1>
        <p>
          No Sanity personaPage document matched persona <code>{params.persona}</code>.
        </p>
      </main>
    )
  }
  return <IndiaPersonaClient personaPage={personaPage} />
}
