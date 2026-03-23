/*
  ================================================================
  PERSONA TEMPLATE — Connect to Sanity
  ================================================================
  Sanity schema: personaPage (sanity/schemas/singletons/personaPage.ts)

  Section → Field mapping:
  - Left hero panel  → personaPage.persona, personaPage.headline, personaPage.heroImage, personaPage.description
  - CTA              → personaPage.ctaLabel, personaPage.ctaUrl
  - Solutions tab    → personaPage.featuredSolutions[] (references to solution)
  - Brands tab       → personaPage.featuredBrands[] (references to brand)
  - Federal tab      → custom field or filtered content
  - Stats            → derived / configurable

  To connect: replace MANUFACTURER_MOCK with a GROQ fetch in a
  server component wrapper, then pass data as props.
  ================================================================
*/

'use client'

import PersonaHero from '@/components/templates/persona/PersonaHero'
import PersonaFilterTabs from '@/components/templates/persona/PersonaFilterTabs'
import { MANUFACTURER_MOCK } from '@/components/templates/persona/mockData'

export default function PersonaTemplate() {
  const persona = MANUFACTURER_MOCK

  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#000',
      }}
    >
      {/* Left 45% — dark hero */}
      <PersonaHero data={persona} />

      {/* Right 55% — white panel with filter tabs */}
      <PersonaFilterTabs tabs={persona.tabs} />
    </main>
  )
}
