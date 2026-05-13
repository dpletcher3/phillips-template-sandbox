type Props = {
  children: React.ReactNode
  position?: 'bottom-left' | 'bottom-center' | 'top-left'
}

// Position anchors per §6.4. Designed to be positioned absolutely over
// an image — parent must have position: relative.
const POSITION_MAP: Record<NonNullable<Props['position']>, React.CSSProperties> = {
  'bottom-left':   { position: 'absolute', bottom: 12, left: 12 },
  'bottom-center': { position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)' },
  'top-left':      { position: 'absolute', top: 12, left: 12 },
}

/**
 * Translucent dark label used as an overlay caption on photo tiles.
 * Per §6.4: translucent black (0.55 alpha) fill, white italic uppercase
 * Barlow Condensed text, mildly rounded corners.
 */
export default function IndiaCaptionPill({
  children,
  position = 'bottom-left',
}: Props) {
  return (
    <span
      style={{
        ...POSITION_MAP[position],
        background: 'rgba(0, 0, 0, 0.55)',
        color: '#fff',
        fontFamily: 'var(--font-barlow-condensed), sans-serif',
        fontWeight: 400,
        fontStyle: 'italic',
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        padding: '6px 10px',
        borderRadius: 4,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
