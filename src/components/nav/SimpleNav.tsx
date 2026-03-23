export default function SimpleNav() {
  return (
    <nav style={{
      background: '#000', padding: '14px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="/" style={{ fontFamily: '"Barlow Condensed", sans-serif',
        color: '#fff', fontSize: '18px', fontWeight: 800, letterSpacing: '2px',
        textDecoration: 'none' }}>
        PHILLIPS
      </a>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {['Solutions','Brands','Training','Resources'].map(l => (
          <span key={l} style={{ color: '#fff', fontSize: '11px',
            letterSpacing: '1px', textTransform: 'uppercase', opacity: .6, cursor: 'pointer' }}>
            {l}
          </span>
        ))}
        <button style={{ background: '#F9423A', color: '#fff', border: 'none',
          padding: '9px 22px', fontSize: '10px', fontWeight: 600,
          letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>
          Get a Quote
        </button>
      </div>
    </nav>
  )
}
