/**
 * BrandedTopBar — 32px utility bar above the main header.
 *
 * Holds the country selector with a small US flag SVG. Rendered above
 * {@link BrandedHeader} on every Branded page. The flag is a self-contained
 * inline SVG (no external assets) so the bar is fully portable.
 *
 * @example
 *   <BrandedTopBar />
 *   <BrandedTopBar country="USA" />
 */
interface BrandedTopBarProps {
  /** Country label shown next to the flag. @default 'USA' */
  country?: string;
  className?: string;
}

export default function BrandedTopBar({ country = 'USA', className }: BrandedTopBarProps) {
  return (
    <div
      className={`bg-branded-gray-100 border-b border-branded-gray-200 ${className ?? ''}`}
      style={{ height: '32px', display: 'flex', alignItems: 'center' }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--branded-gray-600)',
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
        }}
      >
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            font: 'inherit',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label={`Select country (current: ${country})`}
        >
          <FlagUS />
          <span>{country}</span>
          <span style={{ fontSize: '9px', opacity: 0.5 }} aria-hidden="true">▼</span>
        </button>
      </div>
    </div>
  );
}

/** Inline US flag SVG, 20×14, decorative only. */
function FlagUS() {
  // 13 stripes (7 red, 6 white) at ~1.077px each in a 14px height.
  const stripeH = 14 / 13;
  return (
    <svg
      width={20}
      height={14}
      viewBox="0 0 20 14"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ borderRadius: '1px', display: 'block', flexShrink: 0 }}
    >
      {Array.from({ length: 13 }).map((_, i) => (
        <rect
          key={i}
          x={0}
          y={i * stripeH}
          width={20}
          height={stripeH + 0.05 /* hairline overlap to avoid sub-pixel gaps */}
          fill={i % 2 === 0 ? 'var(--branded-flag-red)' : 'var(--branded-white)'}
        />
      ))}
      <rect x={0} y={0} width={9} height={7.5} fill="var(--branded-flag-blue)" />
    </svg>
  );
}
