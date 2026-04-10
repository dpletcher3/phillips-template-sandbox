export default function DarkEye({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <div style={{ width: '22px', height: '2px', background: '#F9423A' }} />
      <span style={{
        fontFamily: 'var(--font-mono, "JetBrains Mono"), monospace',
        fontSize: '9px',
        fontWeight: 700,
        letterSpacing: '5px',
        textTransform: 'uppercase' as const,
        color: '#F9423A',
      }}>
        {label}
      </span>
    </div>
  )
}
