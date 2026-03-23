'use client'

import { useEffect, useRef, useState } from 'react'
import { SpecBar } from './types'

/* ----------------------------------------------------------------
   Sanity fields → SpecBars mapping:
   - Spec bars are derived from productLine spec fields
     (xTravel, spindleSpeed, tableLoad, etc.)
   - Could also be a custom object array on the brand document
   ---------------------------------------------------------------- */

interface Props {
  specs: SpecBar[]
}

export default function SpecBars({ specs }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {specs.map((s, i) => {
        const pct = (s.value / s.max) * 100

        return (
          <div key={s.label}>
            {/* Label row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase' as const,
                  color: 'rgba(255,255,255,.5)',
                }}
              >
                {s.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: '#fff',
                  }}
                >
                  {typeof s.value === 'number' && s.value < 1
                    ? `±${s.value}`
                    : s.value.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 10,
                    color: 'rgba(255,255,255,.3)',
                    letterSpacing: 1,
                  }}
                >
                  {s.unit}
                </span>
              </div>
            </div>

            {/* Bar track */}
            <div
              style={{
                height: 6,
                background: 'rgba(255,255,255,.06)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: triggered ? `${pct}%` : '0%',
                  background: i === 0 ? '#F9423A' : 'rgba(255,255,255,.2)',
                  borderRadius: 3,
                  transition: `width 1s cubic-bezier(.22,1,.36,1) ${i * 0.12}s`,
                }}
              />
            </div>

            {/* Note */}
            {s.note && (
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  color: 'rgba(255,255,255,.2)',
                  marginTop: 6,
                }}
              >
                {s.note}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
