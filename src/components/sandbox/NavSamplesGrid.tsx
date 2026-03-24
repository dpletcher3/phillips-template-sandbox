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
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 10,
          }}>
            {'// Nav Samples'}
          </div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 28,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: -0.5,
            margin: '0 0 8px',
          }}>
            Navigation Prototypes
          </h2>
          <p style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
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
          {/* Future nav variants drop in here */}
        </div>

      </div>
    </div>
  )
}
