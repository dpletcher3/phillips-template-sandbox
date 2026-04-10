'use client'

import { useEffect, useRef, useState } from 'react'

interface BarFillProps {
  label: string
  value: string
  percent: number
  highlight?: boolean
  dark?: boolean
}

export default function BarFill({ label, value, percent, highlight, dark }: BarFillProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'
  const fillColor = highlight ? '#F68B33' : 'linear-gradient(90deg, #F9423A, #00D4FF)'

  const labelColor = dark ? 'rgba(255,255,255,0.70)' : 'rgba(13,13,14,0.55)'
  const valueColor = highlight ? '#F68B33' : '#F9423A'
  const trackColor = dark ? 'rgba(255,255,255,0.07)' : 'rgba(13,13,14,0.08)'

  return (
    <div ref={ref} style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 500, color: labelColor }}>
          {label}
        </span>
        <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: valueColor }}>
          {value}
        </span>
      </div>
      <div style={{ height: '2px', background: trackColor, borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: visible ? `${percent}%` : '0%',
          background: fillColor,
          borderRadius: '1px',
          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>
    </div>
  )
}
