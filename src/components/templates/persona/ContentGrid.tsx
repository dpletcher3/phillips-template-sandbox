'use client'

import { GridCell } from './types'

/* ----------------------------------------------------------------
   Reusable grid component used across all persona filter tabs.
   Cells hover to solid #F9423A with white text.
   ---------------------------------------------------------------- */

interface Props {
  cells: GridCell[]
  columns: number
}

export default function ContentGrid({ cells, columns }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 0,
      }}
    >
      {cells.map((cell) => (
        <a
          key={cell.label}
          href={cell.href || '#'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '28px 24px',
            border: '1px solid #eee',
            textDecoration: 'none',
            color: '#000',
            minHeight: 160,
            transition: 'background .25s, color .25s, border-color .25s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background = '#F9423A'
            el.style.borderColor = '#F9423A'
            el.style.color = '#fff'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background = '#fff'
            el.style.borderColor = '#eee'
            el.style.color = '#000'
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                textTransform: 'uppercase' as const,
                letterSpacing: 1,
                margin: '0 0 8px',
              }}
            >
              {cell.label}
            </h4>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 11,
                lineHeight: 1.7,
                opacity: 0.55,
                margin: 0,
              }}
            >
              {cell.description}
            </p>
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              marginTop: 16,
              alignSelf: 'flex-end',
            }}
          >
            →
          </div>
        </a>
      ))}
    </div>
  )
}
