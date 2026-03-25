import NavSampleCard from './NavSampleCard'

export default function NavSamplesGrid() {
  return (
    <div style={{
      background: '#09090B',
      minHeight: '80vh',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 28px 80px' }}>

        {/* Section header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
            fontWeight: 700,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontSize: 11,
            color: '#F9423A',
            marginBottom: 10,
          }}>
            {'// Nav Samples'}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-barlow-condensed), Barlow Condensed, sans-serif',
            fontSize: 32,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#fff',
            margin: '0 0 8px',
          }}>
            Navigation Prototypes
          </h2>
          <p style={{
            fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: 480,
            margin: 0,
            lineHeight: 1.5,
          }}>
            Full-fidelity interactive nav prototypes for each template theme.
            Click any card to preview or open full-screen.
          </p>
        </div>

        {/* Card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          <NavSampleCard
            title="Strong"
            description="Full dark mega nav — I'm a…, Solutions, Brands, Training, Resources, About. All 6 panels fully interactive."
            theme="Full dark · JetBrains Mono · Red + Cyan + Gold"
            iframeSrc="/nav-samples/strong.html"
            accentColor="#F9423A"
          />
          <NavSampleCard
            title="Simple"
            description="Clean white mega nav — I'm a…, Solutions, Brands, Training, Resources, About. All 6 panels fully interactive."
            theme="White panels · Barlow Condensed · Red accent system"
            iframeSrc="/nav-samples/simple.html"
            accentColor="#000000"
          />
        </div>

      </div>
    </div>
  )
}
