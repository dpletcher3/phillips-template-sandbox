'use client'

import PersonaHero from '@/components/templates/persona/PersonaHero'
import PersonaFilterTabs from '@/components/templates/persona/PersonaFilterTabs'
import { PersonaData } from '@/components/templates/persona/types'

export default function PersonaPageClient({ persona }: { persona: PersonaData }) {
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
