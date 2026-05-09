/**
 * Subnav — sticky horizontal sub-navigation.
 *
 * Used on detail pages such as Opto-for-Haas, where it sits directly under
 * {@link BrandedHeader} (which is at z-index 50 and ~84px tall) and lets
 * users jump to in-page anchors. The active link gets a 3px red underline.
 *
 * This primitive is intentionally a server component: the active item is
 * passed as a prop. To wire scroll-based active tracking, wrap this in a
 * thin client component at the page layer that updates `activeId` on scroll.
 *
 * Mobile: the bar is horizontally scrollable (overflow-x: auto) with the
 * scrollbar hidden via webkit/-moz pseudo-rules.
 *
 * @example
 *   <Subnav
 *     items={[
 *       { id: 'application-support', label: 'Application Support', href: '#application-support' },
 *       { id: 'training',            label: 'Training',            href: '#training' },
 *       { id: 'automation',          label: 'Automation & Robotics', href: '#automation' },
 *     ]}
 *     activeId="automation"
 *   />
 */
interface SubnavItem {
  /** Stable id for active-state matching; usually the anchor target. */
  id: string;
  label: string;
  href: string;
}

interface SubnavProps {
  items: SubnavItem[];
  /** Which item id is currently active. */
  activeId?: string;
  /** CSS top offset; defaults to the BrandedHeader height. @default '84px' */
  top?: string;
  className?: string;
}

export default function Subnav({ items, activeId, top = '84px', className }: SubnavProps) {
  return (
    <nav
      aria-label="Page sections"
      className={`border-b border-branded-gray-200 ${className ?? ''}`}
      style={{
        position: 'sticky',
        top,
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'saturate(140%) blur(8px)',
        WebkitBackdropFilter: 'saturate(140%) blur(8px)',
      }}
    >
      <style>{`
        [data-branded-subnav-inner]::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        data-branded-subnav-inner
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          height: '52px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={active ? 'true' : undefined}
              className="hover:text-branded-red"
              style={{
                fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
                fontWeight: active ? 700 : 500,
                fontSize: '13px',
                color: active ? 'var(--branded-black)' : 'var(--branded-gray-600)',
                whiteSpace: 'nowrap',
                padding: '16px 0',
                position: 'relative',
                textDecoration: 'none',
                transition: 'color 0.18s ease',
              }}
            >
              {item.label}
              {active && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '3px',
                    background: 'var(--branded-red)',
                  }}
                />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export type { SubnavItem, SubnavProps };
