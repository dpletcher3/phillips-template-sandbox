export default function StrongNav() {
  const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: '58px',
      background: 'rgba(9,9,11,.88)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 48px',
    }}>
      <a href="/strong" style={{
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: '13px',
        letterSpacing: '4px',
        color: 'rgba(255,255,255,0.95)',
        textDecoration: 'none',
        textTransform: 'uppercase' as const,
      }}>
        PHILLIPS
      </a>

      <div style={{ display: 'flex', gap: '32px' }}>
        {['Solutions', 'Brands', 'Training', 'Resources'].map(item => (
          <span key={item} style={{
            fontFamily: MONO,
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.70)',
            cursor: 'pointer',
          }}>
            {item}
          </span>
        ))}
      </div>

      <button style={{
        background: 'transparent',
        border: '1px solid #F9423A',
        color: '#F9423A',
        fontFamily: MONO,
        fontSize: '9px',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase' as const,
        padding: '8px 18px',
        cursor: 'pointer',
      }}>
        Request a Quote
      </button>
    </nav>
  )
}
