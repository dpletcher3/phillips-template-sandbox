import type { PortableTextComponents } from '@portabletext/react'
import { createElement } from 'react'

// India-specific PortableText overrides.
//
// Per docs/india-design-system.md §10 RESOLVED item 4, india primitives
// (IndiaProTipsCallout, IndiaGlasseyTabs, etc.) pass this map explicitly
// to <PortableText> at the call site:
//
//   <PortableText value={...} components={indiaPortableTextComponents} />
//
// Only listItem.bullet is overridden at this stage — that's the red-tick
// list-item treatment from §3 / §5.4 / §5.8. All other rendering inherits
// the shared defaults from src/components/PortableText.tsx.

const RED = '#F9423A'

// TBD-verify: §3 names the "red-tick" motif as a 48px × 3px red rectangle
// in its H2-underline context. The list-item context is not explicitly
// dimensioned in the design doc; this implementation uses a small inline
// red rectangle (12px × 3px) to keep the same motif language. §5.8
// (IndiaTickCheckList) separately describes a "check-tick" which may
// imply a ✓ glyph — that is a different component, not this PortableText
// override. Confirm during session 5b component build that this matches
// the design intent for callout body lists.
export const indiaPortableTextComponents: PortableTextComponents = {
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
}
