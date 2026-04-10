export default function LiteSection({ children, alt, style }: { children: React.ReactNode; alt?: boolean; style?: React.CSSProperties }) {
  return (
    <section style={{
      background: alt ? '#F2F4F6' : '#ffffff',
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
