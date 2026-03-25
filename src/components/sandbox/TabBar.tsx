'use client'

import { useSearchParams, useRouter } from 'next/navigation'

type TopTab = 'templates' | 'nav'

export default function TabBar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const active: TopTab = searchParams.get('tab') === 'nav' ? 'nav' : 'templates'

  const tabs: { key: TopTab; label: string; count: number; badgeBg: string; badgeColor: string }[] = [
    { key: 'templates', label: 'Templates', count: 12, badgeBg: 'rgba(255,255,255,0.06)', badgeColor: 'rgba(255,255,255,0.45)' },
    { key: 'nav', label: 'Nav Samples', count: 2, badgeBg: 'rgba(249,66,58,0.15)', badgeColor: '#F9423A' },
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
              fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              padding: '14px 24px',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
              background: 'transparent',
              border: 'none',
              borderBlockEnd: isActive ? '3px solid #F9423A' : '3px solid transparent',
              cursor: 'pointer',
              borderRadius: 0,
              marginBottom: '-1px',
            }}
          >
            {t.label}
            <span style={{
              background: t.badgeBg,
              color: t.badgeColor,
              fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
              fontWeight: 700,
              fontSize: 11,
              padding: '1px 6px',
              marginLeft: 6,
            }}>
              {t.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
