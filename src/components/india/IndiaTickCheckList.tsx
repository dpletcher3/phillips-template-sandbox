import { PHILLIPS_COLORS } from '@/lib/constants'

type Props = {
  items: string[]
  variant?: 'default' | 'inverted'
}

// Red-tick marker — same red as the §3 H2 underline, sized for inline use
// per docs/india-design-system.md §3 / §5.8. TBD-verify exact dimensions
// against the "Advantages" list on docs/inspiration/fiber-laser-cutting/desktop.png.
const TICK_WIDTH = 12
const TICK_HEIGHT = 3

/**
 * Red-tick bullet list per §5.8. Items are upright sentence-case body
 * type (the only typographic exception in the family — all-caps is hard
 * to read at list density). `variant='inverted'` is for dark surfaces.
 */
export default function IndiaTickCheckList({
  items,
  variant = 'default',
}: Props) {
  const isInverted = variant === 'inverted'
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        color: isInverted ? '#fff' : PHILLIPS_COLORS.black,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            position: 'relative',
            paddingLeft: 24,
            margin: '0 0 10px',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              top: '0.65em',
              width: TICK_WIDTH,
              height: TICK_HEIGHT,
              background: PHILLIPS_COLORS.red,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}
