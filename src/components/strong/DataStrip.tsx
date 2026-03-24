'use client'

interface DataStripItem {
  label: string
  value: string
}

export default function DataStrip({ items }: { items: DataStripItem[] }) {
  const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'
  const repeated = [...items, ...items, ...items]

  return (
    <>
      <style>{`
        @keyframes marquee {
          to { transform: translateX(-33.333%); }
        }
      `}</style>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        background: '#09090B',
        padding: '14px 0',
      }}>
        <div style={{
          display: 'inline-flex',
          animation: 'marquee 28s linear infinite',
          whiteSpace: 'nowrap' as const,
        }}>
          {repeated.map((item, i) => (
            <span key={i} style={{
              fontFamily: MONO,
              fontSize: '11px',
              letterSpacing: '1px',
              marginRight: '48px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.70)' }}>{item.label}: </span>
              <span style={{ color: '#00D4FF', fontWeight: 700 }}>{item.value}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
