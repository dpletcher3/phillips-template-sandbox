// Shared TypeScript shapes for india composite components.
//
// These mirror the Sanity object types from session 5a:
//   sanity/schemas/objects/leadForm.ts
//   sanity/schemas/objects/photoTabSet.ts
//   sanity/schemas/objects/callout.ts
//
// Components consume these directly from a GROQ query result; no
// adapter layer in between. If you change the Sanity schemas, update
// these in lockstep — they are the contract.

import type { PortableTextBlock } from '@portabletext/types'

// ─── leadForm ──────────────────────────────────────────────────────────

export type LeadFormFieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea'

export type LeadFormField = {
  name: string
  type: LeadFormFieldType
  required?: boolean
  options?: string[] // for type='select' only
}

export type LeadForm = {
  title: string
  subtitle?: string
  fields: LeadFormField[]
  submitLabel: string
  destinationId: string // routing key for D365 / webhook (wired in session 5d+)
  regionScope?: 'in' | 'us' | 'me' | 'my' | 'global'
}

// ─── photoTabSet ───────────────────────────────────────────────────────

export type PhotoTab = {
  image: unknown // raw Sanity image object — same shape SanityImage accepts
  label: string
  body: PortableTextBlock[]
  ctaUrl?: string
}

// ─── callout ───────────────────────────────────────────────────────────

export type CalloutType = 'note' | 'tip' | 'protips' | 'warning' | 'callout'

export type Callout = {
  type: CalloutType | string // schema enum, but tolerate unknown values for forward-compat
  title: string
  body: PortableTextBlock[]
  chipLabel?: string // optional explicit override of the type→label mapping
}
