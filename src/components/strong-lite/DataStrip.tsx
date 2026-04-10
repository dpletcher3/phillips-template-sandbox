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
        @keyframes marqueeLite {
          to { transform: translateX(-33.333%); }
        }
      `}</style>
      <div style={{
        borderTop: '1px solid rgba(13,13,14,0.08)',
        borderBottom: '1px solid rgba(13,13,14,0.08)',
        overflow: 'hidden',
        background: '#F2F4F6',
        padding: '14px 0',
      }}>
        <div style={{
          display: 'inline-flex',
          animation: 'marqueeLite 28s linear infinite',
          whiteSpace: 'nowrap' as const,
        }}>
          {repeated.map((item, i) => (
            <span key={i} style={{
              fontFamily: MONO,
              fontSize: '11px',
              letterSpacing: '1px',
              marginRight: '48px',
            }}>
              <span style={{ color: 'rgba(13,13,14,0.50)' }}>{item.label}: </span>
              <span style={{ color: '#F9423A', fontWeight: 700 }}>{item.value}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
