export default function NavSamplesGrid() {
  return (
    <div style={{
      background: '#09090B',
      padding: '64px 28px',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '9px',
        letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.45)',
        marginBottom: '14px',
        marginTop: 0,
      }}>
        {'// Nav Samples'}
      </p>

      <h2 style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: '32px',
        color: 'rgba(255,255,255,0.95)',
        margin: '0 0 12px',
      }}>
        Navigation Prototypes
      </h2>

      <p style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.45)',
        marginBottom: '40px',
        marginTop: 0,
      }}>
        Interactive nav samples for each template theme
      </p>

      <div style={{
        background: '#111113',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: '2px solid rgba(255,255,255,0.07)',
        padding: '24px',
        maxWidth: '300px',
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          color: 'rgba(255,255,255,0.85)',
          margin: '0 0 6px',
        }}>
          Strong Nav
        </p>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)',
          margin: 0,
        }}>
          Coming in Prompt 2
        </p>
      </div>
    </div>
  )
}
