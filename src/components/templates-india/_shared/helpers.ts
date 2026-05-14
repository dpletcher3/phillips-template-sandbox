// Shared helpers for india page-type Clients (session 5d).
// Keep this file thin — it's not a place for business logic, just
// adapters that smooth over the Sanity → composite-props boundary.

import { urlFor } from '../../../../sanity/lib/image'
import type { LeadForm } from '@/components/india'

/**
 * Convert a Sanity image object (or string) to a URL safely. Returns
 * undefined if the input is null/undefined or if urlFor throws (which
 * happens on malformed asset refs — e.g. when test data slips a string
 * URL through).
 */
export function sanityImageUrl(image: unknown): string | undefined {
  if (!image) return undefined
  if (typeof image === 'string') return image
  try {
    return urlFor(image).auto('format').url()
  } catch {
    return undefined
  }
}

/**
 * Sample LeadForm for india Group A Clients in 5d. Hardcoded for now
 * because the Sanity-linked LeadForm field has not been added to the
 * page-type document schemas yet.
 *
 * TBD-verify: replace with a per-document Sanity-linked LeadForm field
 * (e.g. `leadForm: leadForm` reference on Brand/Solution/personaPage)
 * in a follow-up session. Until then, every india Client uses this
 * same form contents.
 */
export const SAMPLE_LEAD_FORM: LeadForm = {
  title: 'Get in touch',
  subtitle: 'Talk to a specialist about your manufacturing challenge.',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'company', type: 'text', required: false },
    { name: 'phone', type: 'tel', required: false },
  ],
  submitLabel: 'Send',
  destinationId: 'india-group-a-default',
  regionScope: 'in',
}

/**
 * Read the intent enum off any india page-type document. Defaults to
 * 'awareness' per §10 RESOLVED item 5 when the field is unset (or when
 * the GROQ projection doesn't fetch it — the existing queries.ts
 * projections do not include `intent` yet; that's a TBD-verify for a
 * follow-up session).
 */
export type Intent = 'awareness' | 'consideration' | 'conversion'

export function readIntent(doc: { intent?: string | null } | null | undefined): Intent {
  const v = doc?.intent
  if (v === 'consideration' || v === 'conversion') return v
  return 'awareness'
}
