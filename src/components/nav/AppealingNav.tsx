export default function AppealingNav() {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
      padding: '16px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(249,66,58,.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <a href="/" style={{
        fontFamily: '"Barlow Condensed", sans-serif',
        color: '#fff', fontSize: '18px', fontWeight: 800,
        letterSpacing: '2px', position: 'relative', zIndex: 1,
        textDecoration: 'none',
      }}>PHILLIPS</a>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {['Solutions','Brands','Training','Resources'].map(l => (
          <span key={l} style={{ color: '#fff', fontSize: '11px',
            letterSpacing: '1px', textTransform: 'uppercase', opacity: .6, cursor: 'pointer' }}>
            {l}
          </span>
        ))}
        <button style={{
          background: '#F9423A', color: '#fff', border: 'none',
          padding: '9px 22px', fontSize: '10px', fontWeight: 600,
          letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
          animation: 'pulse 2.5s infinite',
        }}>Get a Quote</button>
      </div>
    </nav>
  )
}
