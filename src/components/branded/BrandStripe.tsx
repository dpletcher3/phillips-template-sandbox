/**
 * BrandStripe — the 4-color Phillips brand stripe.
 *
 * Equal-width horizontal bands in red / maroon / gold / blue. Appears
 * before the footer on every Branded page (sometimes also as a section
 * divider). The stripe is purely decorative; do not use as a navigation
 * indicator.
 *
 * @example
 *   <BrandStripe />                 // 14px tall, full width
 *   <BrandStripe height="6px" />    // thin divider variant
 */
interface BrandStripeProps {
  /** CSS height value (e.g. "14px", "0.5rem"). @default '14px' */
  height?: string;
  className?: string;
}

export default function BrandStripe({ height = '14px', className }: BrandStripeProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        height,
      }}
    >
      <span style={{ background: 'var(--branded-red)' }} />
      <span style={{ background: 'var(--branded-maroon)' }} />
      <span style={{ background: 'var(--branded-gold)' }} />
      <span style={{ background: 'var(--branded-blue)' }} />
    </div>
  );
}
