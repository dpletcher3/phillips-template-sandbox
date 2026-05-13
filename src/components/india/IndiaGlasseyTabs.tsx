'use client'

import { useState } from 'react'
import { PHILLIPS_COLORS, F_DISPLAY } from '@/lib/constants'
import SanityImage from '@/components/SanityImage'
import PortableText from '@/components/PortableText'
import { IndiaCtaButton } from './atoms'
import { indiaPortableTextComponents } from './portableText'
import type { PhotoTab } from './types'

export type IndiaGlasseyTabsProps = {
  tabs: PhotoTab[]
  initialTabIndex?: number
}

// TBD-verify: gradient direction and color stops. The medical-industry
// reference (docs/inspiration/medical-industry/desktop.png) shows the
// overlay darkening toward the bottom of each card with a red-to-maroon
// transition. This is a best-guess top→bottom linear gradient; fine-
// tune in session 5d+ once viewed against the live reference.
const TAB_OVERLAY_GRADIENT =
  `linear-gradient(180deg, rgba(249,66,58,0.55) 0%, rgba(63,0,23,0.85) 100%)`
const TAB_OVERLAY_GRADIENT_ACTIVE =
  `linear-gradient(180deg, rgba(249,66,58,0.30) 0%, rgba(63,0,23,0.60) 100%)`

/**
 * Photo-tab strip per §5.5. Desktop: horizontal row of photo cards with
 * red-gradient overlays, plus a body content area below the strip.
 * Mobile: vertical <details> accordion — each row expands inline.
 *
 * The original (WordPress) implementation used EAEL `eael-tabs-glassey`;
 * this re-implements in plain React without the WordPress dependency.
 */
export default function IndiaGlasseyTabs({
  tabs,
  initialTabIndex = 0,
}: IndiaGlasseyTabsProps) {
  const safeInitial = Math.min(Math.max(initialTabIndex, 0), Math.max(tabs.length - 1, 0))
  const [activeIndex, setActiveIndex] = useState(safeInitial)
  const active = tabs[activeIndex]

  return (
    <section style={{ background: '#fff', padding: '64px 48px', color: PHILLIPS_COLORS.black }}>
      <style>{`
        .india-tabs-desktop { display: block; }
        .india-tabs-mobile  { display: none; }
        @media (max-width: 760px) {
          .india-tabs-desktop { display: none; }
          .india-tabs-mobile  { display: block; }
        }
        .india-tab-card {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          cursor: pointer;
          border: none;
          padding: 0;
          background: transparent;
          color: inherit;
          font: inherit;
        }
        .india-tab-card:focus-visible { outline: 2px solid #F9423A; outline-offset: 2px; }
        .india-tab-card img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .india-tab-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 20px 16px;
          color: #fff;
        }
        .india-tab-card-active { outline: 3px solid #F9423A; outline-offset: -3px; }
      `}</style>

      {/* ---- Desktop: tab strip + body ---- */}
      <div className="india-tabs-desktop" style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          role="tablist"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
            gap: 12,
            marginBottom: 32,
          }}
        >
          {tabs.map((tab, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`india-tab-panel-${i}`}
                id={`india-tab-${i}`}
                onClick={() => setActiveIndex(i)}
                className={`india-tab-card${isActive ? ' india-tab-card-active' : ''}`}
              >
                {typeof tab.image === 'string' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tab.image}
                    alt={tab.label}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <SanityImage image={tab.image} alt={tab.label} fill />
                )}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive ? TAB_OVERLAY_GRADIENT_ACTIVE : TAB_OVERLAY_GRADIENT,
                  }}
                />
                <span className="india-tab-overlay">
                  <span
                    style={{
                      ...F_DISPLAY,
                      fontSize: 18,
                      lineHeight: 1.15,
                      letterSpacing: 1,
                      textAlign: 'center',
                    }}
                  >
                    {tab.label}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {active && (
          <div
            id={`india-tab-panel-${activeIndex}`}
            role="tabpanel"
            aria-labelledby={`india-tab-${activeIndex}`}
            style={{
              padding: '8px 0',
            }}
          >
            <PortableText value={active.body} components={indiaPortableTextComponents} />
            {active.ctaUrl && (
              <div style={{ marginTop: 20 }}>
                <IndiaCtaButton variant="body" size="md" href={active.ctaUrl}>
                  Learn more
                </IndiaCtaButton>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---- Mobile: accordion of <details> per tab ---- */}
      <div className="india-tabs-mobile">
        {tabs.map((tab, i) => (
          <details
            key={i}
            style={{
              borderBottom: `1px solid ${PHILLIPS_COLORS.light}`,
            }}
          >
            <summary
              style={{
                position: 'relative',
                listStyle: 'none',
                cursor: 'pointer',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
              }}
            >
              {typeof tab.image === 'string' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tab.image}
                  alt={tab.label}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <SanityImage image={tab.image} alt={tab.label} fill />
              )}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: TAB_OVERLAY_GRADIENT,
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  ...F_DISPLAY,
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                {tab.label}
              </span>
            </summary>
            <div style={{ padding: '20px 4px' }}>
              <PortableText value={tab.body} components={indiaPortableTextComponents} />
              {tab.ctaUrl && (
                <div style={{ marginTop: 16 }}>
                  <IndiaCtaButton variant="body" size="md" href={tab.ctaUrl}>
                    Learn more
                  </IndiaCtaButton>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
