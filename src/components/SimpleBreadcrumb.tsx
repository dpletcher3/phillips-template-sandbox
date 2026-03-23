export default function SimpleBreadcrumb({
  items
}: { items: { label: string; href?: string }[] }) {
  return (
    <div style={{ padding: '13px 48px', fontSize: '11px', color: '#647883',
      background: '#fff', borderBottom: '1px solid #D7DFE3' }}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span style={{ margin: '0 6px' }}>/</span>}
          {item.href
            ? <a href={item.href} style={{ color: '#647883', textDecoration: 'none' }}>{item.label}</a>
            : <b style={{ color: '#000' }}>{item.label}</b>
          }
        </span>
      ))}
    </div>
  )
}
