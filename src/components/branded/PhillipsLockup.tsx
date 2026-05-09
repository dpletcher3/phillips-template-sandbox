/**
 * PhillipsLockup — the Phillips wordmark.
 *
 * Three skewed red bars + "Phillips" set in Barlow Condensed italic 900 +
 * a registered-trademark superscript, all rendered as a single inline SVG so
 * it scales perfectly to any height. This is the canonical Phillips lockup;
 * use it in headers, footers, and wherever the brand mark appears.
 *
 * The bars are SVG (not CSS-skewed) so they stay locked to the wordmark
 * regardless of layout context. For the standalone decorative bars seen
 * above hero headlines, use {@link SkewedBars} instead.
 *
 * @example
 *   <PhillipsLockup height={40} />            // header size
 *   <PhillipsLockup height={32} ariaLabel="Phillips Corporation home" />
 */
interface PhillipsLockupProps {
  /** Rendered height in px; width auto-scales with the 220×46 viewBox. @default 40 */
  height?: number;
  /** Accessible label. @default 'Phillips Corporation' */
  ariaLabel?: string;
  className?: string;
}

export default function PhillipsLockup({
  height = 40,
  ariaLabel = 'Phillips Corporation',
  className,
}: PhillipsLockupProps) {
  return (
    <svg
      viewBox="0 0 220 46"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ height, width: 'auto', display: 'block' }}
    >
      <g transform="translate(0,3) skewX(-22)">
        <rect x="0"  y="0" width="9" height="40" fill="var(--branded-red)" />
        <rect x="14" y="0" width="9" height="40" fill="var(--branded-red)" />
        <rect x="28" y="0" width="9" height="40" fill="var(--branded-red)" />
      </g>
      <text
        x="50"
        y="36"
        fontFamily="var(--font-barlow-condensed), 'Barlow Condensed', sans-serif"
        fontStyle="italic"
        fontWeight={900}
        fontSize={44}
        letterSpacing={-1}
        fill="var(--branded-black)"
      >
        Phillips
      </text>
      <text
        x="195"
        y="14"
        fontSize={11}
        fontWeight={700}
        fill="var(--branded-black)"
        fontFamily="var(--font-montserrat), Montserrat, sans-serif"
      >
        ®
      </text>
    </svg>
  );
}
