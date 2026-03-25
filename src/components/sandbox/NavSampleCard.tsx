'use client'

import { useState, useEffect, useCallback } from 'react'

interface NavSampleCardProps {
  title: string
  description: string
  theme: string
  iframeSrc: string
  accentColor: string
}

export default function NavSampleCard({ title, description, theme, iframeSrc, accentColor }: NavSampleCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    if (!modalOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [modalOpen, closeModal])

  return (
    <>
      <div style={{
        background: '#111113',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: `2px solid ${accentColor}`,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top section */}
        <div style={{ padding: '18px 18px 0' }}>
          <div style={{
            fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 18,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#fff',
          }}>
            {title}
          </div>
          <div style={{
            fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
            fontWeight: 700,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontSize: 10,
            color: 'rgba(255,255,255,0.45)',
            marginTop: 4,
          }}>
            {theme}
          </div>
          <div style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontSize: 11.5,
            color: 'rgba(255,255,255,0.55)',
            marginTop: 8,
            lineHeight: 1.5,
          }}>
            {description}
          </div>
        </div>

        {/* Preview section */}
        <div style={{
          marginTop: 14,
          width: '100%',
          height: 180,
          overflow: 'hidden',
          position: 'relative',
        }}>
          <iframe
            src={iframeSrc}
            width="1280"
            height="800"
            style={{
              transform: 'scale(0.219)',
              transformOrigin: 'top left',
              pointerEvents: 'none',
              border: 'none',
            }}
            tabIndex={-1}
            title={`${title} nav preview`}
          />
          <div
            onClick={() => setModalOpen(true)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'transparent',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* Bottom section */}
        <div style={{
          padding: '12px 18px 14px',
          display: 'flex',
          gap: 8,
        }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              flex: 1,
              background: '#F9423A',
              color: '#fff',
              border: 'none',
              fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
              fontSize: 12,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '8px 0',
              cursor: 'pointer',
            }}
          >
            Preview
          </button>
          <button
            onClick={() => window.open(iframeSrc, '_blank')}
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
              fontSize: 12,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '8px 0',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
            }}
          >
            Full Screen ↗
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.92)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Top bar */}
          <div style={{
            height: 44,
            background: '#09090B',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
              fontSize: 12,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.7)',
            }}>
              {title} Nav
            </span>
            <button
              onClick={closeModal}
              style={{
                fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.45)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.95)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
            >
              ✕ Close
            </button>
          </div>

          {/* iframe */}
          <iframe
            src={iframeSrc}
            title="Nav Sample Preview"
            style={{
              flex: 1,
              width: '100%',
              border: 'none',
            }}
          />
        </div>
      )}
    </>
  )
}
