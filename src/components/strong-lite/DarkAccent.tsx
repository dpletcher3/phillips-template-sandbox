export default function DarkAccent({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{
      background: '#09090B',
      padding: '64px 48px',
      position: 'relative',
      zIndex: 2,
      ...style,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}
