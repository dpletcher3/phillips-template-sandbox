/**
 * SkewedBars — Phillips signature graphic.
 *
 * Three (or N) red vertical bars wrapped in a `skewX(-18deg)` flex container.
 * Used as a decorative accent above hero headlines and elsewhere on every
 * Branded page. Pure CSS skew (not SVG); for the Phillips logo lockup which
 * skews bars *inside* an SVG wordmark, use {@link PhillipsLockup} instead.
 *
 * @example Default (3 bars, 8×36px, 6px gap, -18° skew)
 *   <SkewedBars />
 *
 * @example Compact, used inline next to a label
 *   <SkewedBars barWidth={6} barHeight={24} gap={4} />
 */
interface SkewedBarsProps {
  /** Number of bars to render. @default 3 */
  count?: number;
  /** Width of each bar in px. @default 8 */
  barWidth?: number;
  /** Height of each bar in px. @default 36 */
  barHeight?: number;
  /** Gap between bars in px. @default 6 */
  gap?: number;
  /** Skew angle in degrees (negative leans left). @default -18 */
  skewDeg?: number;
  className?: string;
}

export default function SkewedBars({
  count = 3,
  barWidth = 8,
  barHeight = 36,
  gap = 6,
  skewDeg = -18,
  className,
}: SkewedBarsProps) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        gap: `${gap}px`,
        transform: `skewX(${skewDeg}deg)`,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: `${barWidth}px`,
            height: `${barHeight}px`,
            background: 'var(--branded-red)',
          }}
        />
      ))}
    </span>
  );
}
