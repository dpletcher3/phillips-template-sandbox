'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import TabBar from '@/components/sandbox/TabBar'
import TemplatesGrid from '@/components/sandbox/TemplatesGrid'
import NavSamplesGrid from '@/components/sandbox/NavSamplesGrid'

function SandboxContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') === 'nav' ? 'nav' : 'templates'

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
      <TabBar />
      {activeTab === 'templates' ? <TemplatesGrid /> : <NavSamplesGrid />}
    </main>
  )
}

export default function SandboxIndex() {
  return (
    <Suspense fallback={
      <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }} />
    }>
      <SandboxContent />
    </Suspense>
  )
}
