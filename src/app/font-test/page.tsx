export default function FontTest() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: 60 }}>
      <div style={{ fontFamily: 'var(--font-bc), sans-serif', fontWeight: 700,
        fontStyle: 'italic', textTransform: 'uppercase' as const,
        fontSize: 80, color: '#fff', lineHeight: 1, marginBottom: 24 }}>
        Display Bold Italic
      </div>
      <div style={{ fontFamily: 'var(--font-bc), sans-serif', fontWeight: 400,
        fontStyle: 'italic', textTransform: 'uppercase' as const,
        fontSize: 80, color: '#F9423A', lineHeight: 1, marginBottom: 24 }}>
        Body Regular Italic
      </div>
      <div style={{ fontFamily: 'var(--font-bc), sans-serif', fontWeight: 300,
        fontStyle: 'italic', textTransform: 'uppercase' as const,
        fontSize: 80, color: 'rgba(255,255,255,.45)', lineHeight: 1 }}>
        Light Thin Italic
      </div>
      <div style={{ marginTop: 40, fontFamily: 'JetBrains Mono, monospace',
        fontSize: 12, color: 'rgba(255,255,255,.3)', letterSpacing: 2 }}>
        JETBRAINS MONO — HUD LABELS ONLY (Strong templates)
      </div>
    </div>
  )
}
