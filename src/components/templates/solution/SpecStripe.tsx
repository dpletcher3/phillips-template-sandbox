'use client'

import { SpecNumber } from './types'

interface Props {
  specs: SpecNumber[]
}

export default function SpecStripe({ specs }: Props) {
  return (
    <section
      style={{
        background: '#000',
        display: 'grid',
        gridTemplateColumns: `repeat(${specs.length}, 1fr)`,
      }}
    >
      {specs.map((s, i) => (
        <div
          key={s.label}
          style={{
            padding: '44px 36px',
            borderLeft: i > 0 ? '1px solid rgba(255,255,255,.06)' : 'none',
            textAlign: 'center' as const,
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 32,
              color: '#fff',
              letterSpacing: 1,
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,.35)',
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </section>
  )
}
