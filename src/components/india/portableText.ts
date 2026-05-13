import type { PortableTextComponents } from '@portabletext/react'
import { createElement } from 'react'
import SanityImage from '@/components/SanityImage'
import IndiaH2 from './atoms/IndiaH2'

// India-specific PortableText overrides.
//
// Per docs/india-design-system.md §10 RESOLVED item 4, india primitives
// (IndiaProTipsCallout, IndiaGlasseyTabs, etc.) pass this map explicitly
// to <PortableText> at the call site:
//
//   <PortableText value={...} components={indiaPortableTextComponents} />

const RED = '#F9423A'
const GREY = '#647883'

// TBD-verify: §3 names the "red-tick" motif as a 48px × 3px red rectangle
// in its H2-underline context. The list-item context is not explicitly
// dimensioned in the design doc; this implementation uses a small inline
// red rectangle (12px × 3px) to keep the same motif language. §5.8
// (IndiaTickCheckList) separately describes a "check-tick" which may
// imply a ✓ glyph — that is a different component, not this PortableText
// override. Confirm during session 5c component build that this matches
// the design intent for callout body lists.

export const indiaPortableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => createElement(IndiaH2, null, children),
    h3: ({ children }) =>
      createElement(
        'h3',
        {
          style: {
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontWeight: 700,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            fontSize: 20,
            lineHeight: 1.2,
            letterSpacing: 1,
            margin: '24px 0 12px',
          },
        },
        children,
      ),
    normal: ({ children }) =>
      createElement(
        'p',
        {
          style: {
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontSize: 14,
            lineHeight: 1.85,
            margin: '0 0 16px',
            color: GREY,
          },
        },
        children,
      ),
  },
  list: {
    bullet: ({ children }) =>
      createElement(
        'ul',
        {
          style: { listStyle: 'none', padding: 0, margin: '0 0 16px' },
        },
        children,
      ),
  },
  listItem: {
    bullet: ({ children }) =>
      createElement(
        'li',
        {
          style: {
            position: 'relative',
            listStyle: 'none',
            paddingLeft: 24,
            margin: '0 0 8px',
            fontSize: 14,
            lineHeight: 1.7,
          },
        },
        createElement('span', {
          'aria-hidden': true,
          style: {
            position: 'absolute',
            left: 0,
            top: '0.6em',
            width: 12,
            height: 3,
            background: RED,
          },
        }),
        children,
      ),
  },
  marks: {
    strong: ({ children }) => createElement('strong', null, children),
    em: ({ children }) => createElement('em', null, children),
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      const isExternal = /^https?:\/\//.test(href) && !href.includes('phillipscorp.com')
      // Tailwind utilities: no-underline by default, underline on hover.
      // Color stays india-red via arbitrary value class.
      return createElement(
        'a',
        {
          href,
          ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
          className: 'text-[#F9423A] no-underline hover:underline',
        },
        children,
      )
    },
  },
  types: {
    image: ({ value }) =>
      createElement(SanityImage, {
        image: value,
        alt: (value?.alt as string) ?? '',
        width: 800,
        height: 600,
        style: { margin: '16px 0', maxWidth: '100%', height: 'auto' },
      }),
  },
}
