/**
 * Family color convention (passed via `color` prop):
 *   • EyeCatching →  #F9423A   (Phillips red)
 *   • Appealing   →  #3F0017   (maroon)
 *   • Simple      →  #000000   (black, white text)
 *   • Strong      →  #09090B   (near-black w/ cyan #00D4FF text)
 *   • Branded     →  #F68B33   (gold)
 *     ↑ picked because it's distinct from the four existing variants,
 *       sits inside the Phillips brand palette, and doesn't compete
 *       with the red used heavily in the Branded family's design.
 *
 * The component itself is generic — these are the conventions used
 * across the family clients. See `src/components/sandbox/TemplatesGrid.tsx`
 * for the matching tab badges.
 */
export default function TemplateBadge({
  label = 'EYE CATCHING',
  color = '#F9423A'
}: {
  label?: string
  color?: string
}) {
  return (
    <div style={{
      position: 'fixed',
      top: '12px',
      right: '12px',
      zIndex: 9999,
      background: color,
      color: '#fff',
      fontFamily: '"Barlow Condensed", sans-serif',
      fontSize: '11px',
      fontWeight: 900,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '6px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      boxShadow: `0 2px 12px ${color}66`,
      pointerEvents: 'none',
      userSelect: 'none',
    }}>
      <span style={{
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#fff',
        opacity: 0.8,
        flexShrink: 0,
      }} />
      {label}
    </div>
  )
}
