import { PHILLIPS_COLORS, F_DISPLAY } from '@/lib/constants'

type Props = {
  children: React.ReactNode
  align?: 'left' | 'center'
  as?: 'h2' | 'h3'
}

// Red-tick dimensions per §3 of docs/india-design-system.md.
// TBD-verify against live-page DevTools measurement.
const TICK_WIDTH = 48
const TICK_HEIGHT = 3
const TICK_MARGIN_TOP = 14

/**
 * H2-styled heading with the india family's red-tick underline baked in.
 * - `align='center'` (default) renders the tick centered beneath the text.
 * - `align='left'` suppresses the tick per §3 ("Left-aligned H2s do not get a tick").
 * - `as` lets the component render as a semantic h3 while keeping the H2 visual.
 */
export default function IndiaH2({ children, align = 'center', as: Tag = 'h2' }: Props) {
  const showTick = align === 'center'
  return (
    <div style={{ textAlign: align }}>
      <Tag
        style={{
          ...F_DISPLAY,
          fontSize: 28,
          lineHeight: 1.15,
          letterSpacing: 1.5,
          margin: 0,
          color: 'inherit',
        }}
      >
        {children}
      </Tag>
      {showTick && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: TICK_WIDTH,
            height: TICK_HEIGHT,
            background: PHILLIPS_COLORS.red,
            marginTop: TICK_MARGIN_TOP,
            borderRadius: 0,
          }}
        />
      )}
    </div>
  )
}
