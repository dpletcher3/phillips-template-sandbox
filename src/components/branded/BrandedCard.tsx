/**
 * BrandedCard — rounded white card with optional red accent.
 *
 * Three accent variants drawn from the references:
 *  - `topLeft`    — 48×4px red bar inset 56px from top-left, with content
 *                   margin pushing past it. Used on the "Inspired By Your
 *                   Ingenuity" / "Application Support" / "Training" cards.
 *  - `topBorder`  — 4px red top border. Used on the "Let's Work Together" card.
 *  - `leftBorder` — 3px red left border. Used on the "Next Up" sidebar card.
 *  - `none`       — plain card, no accent.
 *
 * The card itself: white background, gray-200 1px border, `--branded-r-lg`
 * (20px) corners, `--branded-shadow-md`. Internal padding is 56px on
 * desktop; consumers can override via `padding` prop.
 *
 * @example
 *   <BrandedCard accent="topLeft">
 *     <h2>Inspired By Your Ingenuity</h2>
 *     <p>...</p>
 *   </BrandedCard>
 *
 *   <BrandedCard accent="leftBorder" padding="36px">
 *     <Eyebrow>Next Up</Eyebrow>
 *     <a>Streamlining production…</a>
 *   </BrandedCard>
 */
type BrandedCardAccent = 'topLeft' | 'topBorder' | 'leftBorder' | 'none';

interface BrandedCardProps {
  children: React.ReactNode;
  /** Which red accent treatment to apply. @default 'none' */
  accent?: BrandedCardAccent;
  /** Override card padding. @default '56px' */
  padding?: string;
  /** Override the default white background (e.g. soft gray for the wt-card variant). */
  background?: string;
  className?: string;
}

export default function BrandedCard({
  children,
  accent = 'none',
  padding = '56px',
  background = 'var(--branded-white)',
  className,
}: BrandedCardProps) {
  const isTopLeft = accent === 'topLeft';
  const borderTop = accent === 'topBorder' ? '4px solid var(--branded-red)' : undefined;
  const borderLeft = accent === 'leftBorder' ? '3px solid var(--branded-red)' : undefined;

  return (
    <div
      className={`border border-branded-gray-200 ${className ?? ''}`}
      style={{
        position: 'relative',
        background,
        borderRadius: 'var(--branded-r-lg)',
        padding,
        boxShadow: 'var(--branded-shadow-md)',
        borderTop,
        borderLeft,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isTopLeft && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: padding,
            left: padding,
            width: '48px',
            height: '4px',
            background: 'var(--branded-red)',
            borderRadius: '2px',
          }}
        />
      )}
      {children}
    </div>
  );
}

export type { BrandedCardAccent, BrandedCardProps };
