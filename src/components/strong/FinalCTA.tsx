export default function FinalCTA({
  tag,
  headline,
  accentWord,
  description,
  cta1 = 'Request a Quote',
  cta2 = 'Contact Us',
}: {
  tag: string
  headline: string
  accentWord: string
  description: string
  cta1?: string
  cta2?: string
}) {
  const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'
  const parts = headline.split(accentWord)

  return (
    <section style={{
      background: '#09090B',
      padding: '110px 48px',
      textAlign: 'center' as const,
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{
          fontFamily: MONO,
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '4px',
          textTransform: 'uppercase' as const,
          color: '#F68B33',
          marginBottom: '20px',
        }}>
          {tag}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-inter, Inter), sans-serif',
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 900,
          lineHeight: 1.1,
          color: 'rgba(255,255,255,0.95)',
          margin: '0 0 16px',
          letterSpacing: '-1px',
        }}>
          {parts[0]}<span style={{ color: '#F9423A' }}>{accentWord}</span>{parts[1] || ''}
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '15px',
          lineHeight: 1.7,
          margin: '0 0 32px',
        }}>
          {description}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button style={{
            background: '#F9423A',
            color: '#fff',
            border: 'none',
            padding: '13px 30px',
            fontFamily: MONO,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            cursor: 'pointer',
          }}>
            {cta1}
          </button>
          <button style={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(255,255,255,.3)',
            padding: '13px 30px',
            fontFamily: MONO,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase' as const,
            cursor: 'pointer',
          }}>
            {cta2}
          </button>
        </div>
      </div>
    </section>
  )
}
