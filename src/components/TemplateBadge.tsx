export default function TemplateBadge({ label = 'EYE CATCHING' }: { label?: string }) {
  return (
    <div style={{
      position: 'fixed',
      top: '12px',
      right: '12px',
      zIndex: 9999,
      background: '#F9423A',
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
      boxShadow: '0 2px 12px rgba(249,66,58,0.4)',
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
