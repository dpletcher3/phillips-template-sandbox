'use client'

import { useEffect, useState } from 'react'
import { PHILLIPS_COLORS, F_DISPLAY, F_LIGHT } from '@/lib/constants'
import { IndiaCtaButton, IndiaGlassCard } from './atoms'
import type { LeadForm, LeadFormField } from './types'

export type IndiaRepeatableLeadFormProps = {
  form: LeadForm
  placement: 'hero' | 'mid-page' | 'page-bottom'
  variant?: 'inline' | 'card'
}

/**
 * Internal-use prop. Set by IndiaHeroWithForm to suppress the soft
 * placement='hero' guardrail warning during legitimate hero composition.
 * **Do not use from outside the india family.** Not re-exported from
 * the barrel; not part of the public API.
 *
 * @internal
 */
type IndiaRepeatableLeadFormInternalProps = IndiaRepeatableLeadFormProps & {
  __internalFromHero?: boolean
}

// Humanize a fieldName like 'fullName' or 'phone_number' into 'Full Name'.
function labelFor(field: LeadFormField): string {
  return field.name
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim()
}

/**
 * Lead-gen form per §5.10. Designed for non-hero usage (mid-page,
 * page-bottom). The hero (IndiaHeroWithForm) composes this internally
 * with placement='hero', which is supported but logs a console warning
 * if a consumer passes placement='hero' directly (since IndiaHeroWithForm
 * is the more appropriate entry point for hero usage).
 *
 * variant='inline' — fields flow horizontally; CTA at the end of the row.
 * variant='card'   — fields stacked inside an IndiaGlassCard (sidebar/contained).
 */
export default function IndiaRepeatableLeadForm({
  form,
  placement,
  variant = 'inline',
  __internalFromHero,
}: IndiaRepeatableLeadFormInternalProps) {
  useEffect(() => {
    if (placement === 'hero' && !__internalFromHero) {
      // Soft guardrail — not an error. The hero composes this with placement='hero'
      // internally (and sets __internalFromHero=true to silence this warning);
      // this warning catches accidental direct usage by consumers.
      // eslint-disable-next-line no-console
      console.warn(
        "IndiaRepeatableLeadForm used with placement='hero' — consider IndiaHeroWithForm instead."
      )
    }
  }, [placement, __internalFromHero])

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(form.fields.map(f => [f.name, '']))
  )
  const [submitting, setSubmitting] = useState(false)

  function update(name: string, value: string) {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // TBD-verify: D365 / webhook wiring deferred to session 5d+. Today the
    // submit handler is a no-op that logs the payload; nothing is POSTed.
    // eslint-disable-next-line no-console
    console.log('[IndiaRepeatableLeadForm submit]', {
      destinationId: form.destinationId,
      regionScope: form.regionScope,
      placement,
      values,
    })
    // Brief faux-async UX so the button gives feedback even in the stub.
    setTimeout(() => setSubmitting(false), 600)
  }

  const isCard = variant === 'card'

  const formElement = (
    <form onSubmit={handleSubmit} noValidate>
      {form.title && (
        <h3
          style={{
            ...F_DISPLAY,
            fontSize: 20,
            letterSpacing: 1,
            margin: '0 0 8px',
            color: isCard ? '#fff' : PHILLIPS_COLORS.black,
          }}
        >
          {form.title}
        </h3>
      )}
      {form.subtitle && (
        <p
          style={{
            ...F_LIGHT,
            fontStyle: 'normal',
            textTransform: 'none',
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontSize: 13,
            letterSpacing: 0,
            margin: '0 0 20px',
            color: isCard ? 'rgba(255,255,255,0.7)' : PHILLIPS_COLORS.grey,
          }}
        >
          {form.subtitle}
        </p>
      )}
      <div
        style={{
          display: variant === 'inline' ? 'flex' : 'grid',
          flexWrap: variant === 'inline' ? 'wrap' : undefined,
          gridTemplateColumns: variant === 'card' ? '1fr' : undefined,
          gap: 12,
          alignItems: variant === 'inline' ? 'flex-end' : 'stretch',
        }}
      >
        {form.fields.map(field => {
          const id = `lead-${field.name}-${placement}`
          const label = labelFor(field)
          const commonInputStyle: React.CSSProperties = {
            width: '100%',
            padding: '10px 12px',
            border: `1px solid ${isCard ? 'rgba(255,255,255,0.3)' : PHILLIPS_COLORS.light}`,
            background: isCard ? 'rgba(255,255,255,0.08)' : '#fff',
            color: isCard ? '#fff' : PHILLIPS_COLORS.black,
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
          }
          return (
            <div
              key={field.name}
              style={{
                flex: variant === 'inline' ? '1 1 180px' : undefined,
                minWidth: variant === 'inline' ? 180 : undefined,
              }}
            >
              <label
                htmlFor={id}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-barlow-condensed), sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginBottom: 6,
                  color: isCard ? '#fff' : PHILLIPS_COLORS.grey,
                }}
              >
                {label}
                {field.required && <span aria-hidden="true" style={{ color: PHILLIPS_COLORS.red, marginLeft: 4 }}>*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={id}
                  name={field.name}
                  required={field.required}
                  rows={3}
                  value={values[field.name] ?? ''}
                  onChange={e => update(field.name, e.target.value)}
                  style={commonInputStyle}
                />
              ) : field.type === 'select' ? (
                <select
                  id={id}
                  name={field.name}
                  required={field.required}
                  value={values[field.name] ?? ''}
                  onChange={e => update(field.name, e.target.value)}
                  style={commonInputStyle}
                >
                  <option value="" disabled>Select…</option>
                  {(field.options ?? []).map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : 'text'}
                  required={field.required}
                  value={values[field.name] ?? ''}
                  onChange={e => update(field.name, e.target.value)}
                  style={commonInputStyle}
                />
              )}
            </div>
          )
        })}
        <div
          style={{
            alignSelf: variant === 'inline' ? 'flex-end' : 'stretch',
            marginTop: variant === 'inline' ? 0 : 8,
          }}
        >
          <IndiaCtaButton variant="body" size="md">
            {submitting ? 'Sending…' : form.submitLabel}
          </IndiaCtaButton>
        </div>
      </div>
    </form>
  )

  // Placement-driven outer container (vertical padding + background).
  const sectionStyle: React.CSSProperties = {
    padding:
      placement === 'mid-page'
        ? '56px 48px'
        : placement === 'page-bottom'
        ? '48px 48px'
        : '0', // hero usage owns its own outer layout
    background:
      placement === 'mid-page'
        ? PHILLIPS_COLORS.bg
        : 'transparent',
  }

  const inner = isCard ? <IndiaGlassCard intensity="heavy">{formElement}</IndiaGlassCard> : formElement

  return (
    <section style={sectionStyle}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>{inner}</div>
    </section>
  )
}
