/**
 * BrandedFooter — minimal black footer.
 *
 * Just the copyright line, set in Montserrat 500 / 11px / 2px tracked /
 * uppercase, against the brand black. Pair with {@link BrandStripe} placed
 * directly above for the canonical Branded page foot.
 *
 * @example
 *   <BrandStripe />
 *   <BrandedFooter />
 *   <BrandedFooter year={2027} owner="Phillips Corporation" />
 */
interface BrandedFooterProps {
  /** Copyright year. @default current year */
  year?: number;
  /** Copyright holder. @default 'Phillips Corporation' */
  owner?: string;
  className?: string;
}

export default function BrandedFooter({
  year = new Date().getFullYear(),
  owner = 'Phillips Corporation',
  className,
}: BrandedFooterProps) {
  return (
    <footer
      className={`bg-branded-black text-branded-gray-400 ${className ?? ''}`}
      style={{
        padding: '36px 0',
        textAlign: 'center',
        fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
        fontWeight: 500,
        fontSize: '11px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
        © {year} {owner}
      </div>
    </footer>
  );
}
