'use client'

import { useSearchParams, useRouter } from 'next/navigation'

type TopTab = 'templates' | 'nav'

export default function TabBar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const active: TopTab = searchParams.get('tab') === 'nav' ? 'nav' : 'templates'

  const tabs: { key: TopTab; label: string }[] = [
    { key: 'templates', label: 'Templates' },
    { key: 'nav', label: 'Nav Samples' },
  ]

  return (
    <div style={{
      background: '#09090B',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      gap: 0,
      padding: '0 60px',
    }}>
      {tabs.map(t => {
        const isActive = active === t.key
        return (
          <button
            key={t.key}
            onClick={() => {
              const params = new URLSearchParams()
              if (t.key !== 'templates') params.set('tab', t.key)
              router.push(`/${params.toString() ? `?${params.toString()}` : ''}`)
            }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '14px 24px',
              color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
              borderBottom: isActive ? '2px solid #F9423A' : '2px solid transparent',
              background: 'transparent',
              border: 'none',
              borderBlockEnd: isActive ? '2px solid #F9423A' : '2px solid transparent',
              cursor: 'pointer',
              borderRadius: 0,
              marginBottom: '-1px',
            }}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
