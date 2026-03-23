'use client'

import { useRef, useState, useCallback } from 'react'
import { ProductLine } from './types'

/* ----------------------------------------------------------------
   Sanity fields → ProductLineScroll mapping:
   - brand.productLines[]       → cards array
   - productLine.name           → series name heading
   - productLine.seriesLabel    → gold label
   - productLine.models         → model string
   - productLine.description    → card description
   - productLine.image          → card image placeholder
   ---------------------------------------------------------------- */

interface Props {
  productLines: ProductLine[]
}

export default function ProductLineScroll({ productLines }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragState = useRef({ startX: 0, scrollLeft: 0 })

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    dragState.current = { startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft }
    el.style.cursor = 'grabbing'
  }, [])

  const onMouseUp = useCallback(() => {
    setIsDragging(false)
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollRef.current.offsetLeft
      const walk = (x - dragState.current.startX) * 1.5
      scrollRef.current.scrollLeft = dragState.current.scrollLeft - walk
    },
    [isDragging],
  )

  return (
    <section id="product-lines" style={{ background: '#000', padding: '64px 0 72px' }}>
      {/* Section label */}
      <div style={{ padding: '0 56px', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 2, background: '#F9423A' }} />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,.5)',
            }}
          >
            Product Lines
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              color: 'rgba(255,255,255,.2)',
              marginLeft: 8,
            }}
          >
            — drag to explore
          </span>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          paddingLeft: 56,
          paddingRight: 56,
          paddingBottom: 12,
          cursor: 'grab',
          scrollbarWidth: 'none' as const,
          userSelect: isDragging ? 'none' : 'auto',
        }}
      >
        {productLines.map((pl) => (
          <div
            key={pl.name}
            style={{
              minWidth: 280,
              maxWidth: 320,
              flex: '0 0 auto',
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: 6,
              overflow: 'hidden',
              transition: 'border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,66,58,.25)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)' }}
          >
            {/* Image placeholder */}
            <div style={{ position: 'relative', height: 160, background: 'rgba(255,255,255,.02)' }}>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: '#F9423A',
                }}
              />
            </div>

            {/* Card content */}
            <div style={{ padding: '20px 24px 24px' }}>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: 'uppercase' as const,
                  color: '#F68B33',
                  marginBottom: 6,
                }}
              >
                {pl.seriesLabel}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  textTransform: 'uppercase' as const,
                  letterSpacing: 1,
                  color: '#fff',
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                {pl.name}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 11,
                  color: 'rgba(255,255,255,.35)',
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                {pl.models}
              </div>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,.35)',
                  margin: 0,
                }}
              >
                {pl.description}
              </p>

              {/* Quick specs row */}
              {(pl.axes || pl.xTravel || pl.spindleSpeed) && (
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: '1px solid rgba(255,255,255,.05)',
                  }}
                >
                  {pl.axes && (
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>{pl.axes}</div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: 1, textTransform: 'uppercase' as const }}>Axes</div>
                    </div>
                  )}
                  {pl.xTravel && (
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' }}>{pl.xTravel}</div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: 'rgba(255,255,255,.25)', letterSpacing: 1, textTransform: 'uppercase' as const }}>X Travel</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
