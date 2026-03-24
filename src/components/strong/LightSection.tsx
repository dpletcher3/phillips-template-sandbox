export default function LightSection({ children, alt, style }: { children: React.ReactNode; alt?: boolean; style?: React.CSSProperties }) {
  return (
    <section style={{
      background: alt ? '#F4F5F7' : '#ffffff',
      padding: '60px 48px',
      ...style,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}
