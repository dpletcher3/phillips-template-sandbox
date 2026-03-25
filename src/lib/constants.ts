export const PHILLIPS_COLORS = {
  red:    '#F9423A',
  blue:   '#00AEEF',
  gold:   '#F68B33',
  black:  '#000000',
  maroon: '#3F0017',
  grey:   '#647883',
  light:  '#D7DFE3',
  bg:     '#F2F4F6',
} as const

export const FONT = {
  display: {
    fontFamily: 'var(--font-bc), sans-serif',
    fontWeight: 700,
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  body: {
    fontFamily: 'var(--font-bc), sans-serif',
    fontWeight: 400,
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  light: {
    fontFamily: 'var(--font-bc), sans-serif',
    fontWeight: 300,
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, React.CSSProperties>

// Convenience inline style fragments
export const F_DISPLAY = FONT.display
export const F_BODY    = FONT.body
export const F_LIGHT   = FONT.light

export const NAV_ITEMS = [
  { id: 'ima',       label: "I'm a…"             },
  { id: 'solutions', label: 'Solutions'           },
  { id: 'brands',    label: 'Brands'              },
  { id: 'education', label: 'Training & Education'},
  { id: 'resources', label: 'Resources'           },
  { id: 'about',     label: 'About'               },
] as const
