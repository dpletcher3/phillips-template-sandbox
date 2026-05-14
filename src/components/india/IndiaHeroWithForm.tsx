'use client'

import { useState } from 'react'
import { PHILLIPS_COLORS, F_LIGHT } from '@/lib/constants'
import { IndiaH2, IndiaCtaButton, IndiaGlassCard } from './atoms'
import IndiaRepeatableLeadForm from './IndiaRepeatableLeadForm'
import type { LeadForm } from './types'

export type IndiaHeroWithFormProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  backgroundImage: string | { src: string; alt: string }
  primaryCta?: { label: string; href: string }
  form: LeadForm
}

/**
 * Hero with right-rail lead-gen form per §5.1. Always renders the form
 * — there is no formless variant.
 *
 * Layout:
 *   Desktop (≥1024px): 60/40 split, content left + form glass card right
 *   Tablet  (760–1023): stacks vertically, full-width
 *   Mobile  (<760):  tap-to-reveal form via a "Get in Touch" button
 *
 * Composes IndiaRepeatableLeadForm internally with placement='hero'
 * and __internalFromHero=true (which silences the soft guardrail
 * warning RepeatableLeadForm fires when consumers use placement='hero'
 * directly).
 */
export default function IndiaHeroWithForm({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  form,
}: IndiaHeroWithFormProps) {
  const bg =
    typeof backgroundImage === 'string'
      ? { src: backgroundImage, alt: '' }
      : backgroundImage

  const [formOpen, setFormOpen] = useState(false)

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 540,
        overflow: 'hidden',
        background: PHILLIPS_COLORS.black,
        color: '#fff',
      }}
    >
      {/* Scoped responsive rules + mobile-reveal display variable */}
      <style>{`
        .india-hero-grid {
          display: grid;
          grid-template-columns: 6fr 4fr;
          gap: 48px;
          align-items: center;
          padding: 80px 48px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .india-hero-form-wrap { display: block; }
        .india-hero-mobile-toggle { display: none; }
        @media (max-width: 1023px) {
          .india-hero-grid {
            grid-template-columns: 1fr;
            padding: 48px 24px;
          }
        }
        @media (max-width: 760px) {
          .india-hero-grid { padding: 32px 20px; }
          .india-hero-form-wrap { display: var(--india-hero-mobile-form, none); }
          .india-hero-mobile-toggle { display: block; }
        }
      `}</style>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bg.src}
        alt={bg.alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      {/* Left-to-right dark gradient to keep the glass card legible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.2) 100%)',
          zIndex: 0,
        }}
      />

      <div className="india-hero-grid">
        {/* Left column — headline content in a glass card */}
        <IndiaGlassCard intensity="medium">
          {eyebrow && (
            <div
              style={{
                ...F_LIGHT,
                fontSize: 11,
                letterSpacing: 2,
                color: PHILLIPS_COLORS.red,
                marginBottom: 16,
              }}
            >
              {eyebrow}
            </div>
          )}
          <IndiaH2 align="left">{title}</IndiaH2>
          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 16,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                margin: '24px 0 0',
              }}
            >
              {subtitle}
            </p>
          )}
          {primaryCta && (
            <div style={{ marginTop: 28 }}>
              <IndiaCtaButton variant="hero" size="md" href={primaryCta.href}>
                {primaryCta.label}
              </IndiaCtaButton>
            </div>
          )}

          {/* Mobile-only toggle button (hidden on tablet+ via media query) */}
          <button
            type="button"
            className="india-hero-mobile-toggle"
            onClick={() => setFormOpen(v => !v)}
            style={{
              marginTop: 20,
              padding: '12px 28px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff',
              fontFamily: 'var(--font-barlow-condensed), sans-serif',
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              cursor: 'pointer',
              width: '100%',
            }}
            aria-expanded={formOpen}
            aria-controls="india-hero-form"
          >
            {formOpen ? 'Hide form' : 'Get in touch'}
          </button>
        </IndiaGlassCard>

        {/* Right column — form. variant='card' supplies its own glass card,
            so no extra wrap here. */}
        <div
          id="india-hero-form"
          className="india-hero-form-wrap"
          style={
            {
              ['--india-hero-mobile-form' as string]: formOpen ? 'block' : 'none',
            } as React.CSSProperties
          }
        >
          <IndiaRepeatableLeadForm
            form={form}
            placement="hero"
            variant="card"
            // Suppresses the soft placement='hero' guardrail warning during
            // legitimate hero composition. See IndiaRepeatableLeadForm for
            // the internal-use rationale.
            __internalFromHero
          />
        </div>
      </div>
    </section>
  )
}
