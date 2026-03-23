import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { personaPageQuery } from '@/lib/queries'

export const revalidate = 30
import { MANUFACTURER_MOCK } from '@/components/templates/persona/mockData'
import AppealingPersonaClient from '@/components/templates-appealing/persona/AppealingPersonaClient'

interface SanityPersonaPage {
  persona?: string
  headline?: string
  heroImage?: unknown
  description?: string
  featuredSolutions?: Array<{
    name?: string
    slug?: { current?: string }
    offering?: string
    shortDesc?: string
  }>
  featuredBrands?: Array<{
    name?: string
    slug?: { current?: string }
    tagline?: string
    category?: string[]
  }>
  ctaLabel?: string
  ctaUrl?: string
  forLabel?: string
  stats?: Array<{ value?: string; label?: string }>
  filterTabs?: Array<{
    id?: string
    label?: string
    solutions?: Array<{ name?: string; slug?: { current?: string }; offering?: string; shortDesc?: string }>
    brands?: Array<{ name?: string; slug?: { current?: string }; tagline?: string; category?: string[] }>
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

const PERSONA_SLUGS = ['manufacturer', 'federal', 'educator']

function transformPersona(sanity: SanityPersonaPage | null) {
  if (!sanity?.persona) return MANUFACTURER_MOCK

  return {
    ...MANUFACTURER_MOCK,
    persona: sanity.persona,
    description: sanity.description || MANUFACTURER_MOCK.description,
    ctaLabel: sanity.ctaLabel || MANUFACTURER_MOCK.ctaLabel,
    ctaUrl: sanity.ctaUrl || MANUFACTURER_MOCK.ctaUrl,
    tabs: {
      ...MANUFACTURER_MOCK.tabs,
      stats: sanity.stats?.length
        ? sanity.stats.map(s => ({ value: s.value ?? '', label: s.label ?? '' }))
        : MANUFACTURER_MOCK.tabs.stats,
      solutions: sanity.featuredSolutions?.length
        ? sanity.featuredSolutions.map(s => ({
            label: s.name || '',
            description: s.shortDesc || '',
            href: s.slug?.current ? `/solution/${s.slug.current}` : '/solution',
          }))
        : MANUFACTURER_MOCK.tabs.solutions,
      brands: sanity.featuredBrands?.length
        ? sanity.featuredBrands.map(b => ({
            label: b.name || '',
            description: b.tagline || '',
            href: b.slug?.current ? `/brand/${b.slug.current}` : '/brand',
          }))
        : MANUFACTURER_MOCK.tabs.brands,
    },
  }
}

export async function generateStaticParams() {
  return PERSONA_SLUGS.map(p => ({ persona: p }))
}

export async function generateMetadata({ params }: { params: { persona: string } }): Promise<Metadata> {
  const page = await client.fetch<SanityPersonaPage | null>(personaPageQuery, { persona: params.persona }).catch(() => null)
  const label = params.persona.charAt(0).toUpperCase() + params.persona.slice(1)
  return {
    title: page?.seo?.metaTitle || `${label} | Phillips Template Sandbox`,
    description: page?.seo?.metaDescription || page?.description || `Phillips Corporation ${label} landing page`,
  }
}

export default async function PersonaPage({ params }: { params: { persona: string } }) {
  const sanityPersona = await client.fetch<SanityPersonaPage | null>(personaPageQuery, { persona: params.persona }).catch(() => null)
  const persona = transformPersona(sanityPersona)

  return <AppealingPersonaClient persona={persona} />
}
