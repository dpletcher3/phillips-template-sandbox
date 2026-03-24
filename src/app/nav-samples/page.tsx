import NavSamplesGrid from '@/components/sandbox/NavSamplesGrid'

export default function NavSamplesPage() {
  return (
    <main style={{ background: '#09090B', minHeight: '100vh' }}>
      <div style={{ padding: '28px 28px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <a href="/" style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#F9423A',
          textDecoration: 'none',
        }}>
          ← Back to Sandbox
        </a>
      </div>
      <NavSamplesGrid />
    </main>
  )
}
