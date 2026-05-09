/**
 * BrandedSection — page section wrapper with four background variants.
 *
 *  - `default` — white background, no overlay
 *  - `soft`    — `--branded-gray-50` background (subtle separation)
 *  - `tinted`  — slate-blue gradient with a soft 60° striped overlay
 *  - `dark`    — black with a faint 45/-45° crosshatch pattern; text becomes white
 *
 * Default vertical padding is 112px (matches the `section { padding: 112px 0 }`
 * baseline in the reference HTMLs); pass `tight` for the 80px variant.
 *
 * The section also wraps children in the canonical 1240px / 32px container,
 * lifted above the overlay layer via `position: relative; z-index: 1`. Pass
 * `disableContainer` to opt out (e.g. for full-bleed inner content).
 *
 * @example
 *   <BrandedSection>...</BrandedSection>
 *   <BrandedSection variant="soft" tight>...</BrandedSection>
 *   <BrandedSection variant="dark"><Eyebrow color="var(--branded-white)">…</Eyebrow></BrandedSection>
 */
type BrandedSectionVariant = 'default' | 'soft' | 'tinted' | 'dark';

interface BrandedSectionProps {
  children: React.ReactNode;
  /** Background treatment. @default 'default' */
  variant?: BrandedSectionVariant;
  /** Use the 80px tight padding instead of the 112px default. */
  tight?: boolean;
  /** Skip the 1240px container so children can go full-bleed. */
  disableContainer?: boolean;
  /** Optional id (for hash-link sub-nav targeting). */
  id?: string;
  className?: string;
}

export default function BrandedSection({
  children,
  variant = 'default',
  tight = false,
  disableContainer = false,
  id,
  className,
}: BrandedSectionProps) {
  const padY = tight ? '80px' : '112px';
  const baseStyle: React.CSSProperties = {
    padding: `${padY} 0`,
    position: 'relative',
    overflow: variant === 'dark' || variant === 'tinted' ? 'hidden' : undefined,
  };

  let background: string | undefined;
  let textColor: string | undefined;
  if (variant === 'soft') {
    background = 'var(--branded-gray-50)';
  } else if (variant === 'tinted') {
    background = 'linear-gradient(180deg, #E9EFF4 0%, #D9E3EB 100%)';
  } else if (variant === 'dark') {
    background = 'var(--branded-black)';
    textColor = 'var(--branded-white)';
  }

  const inner = disableContainer ? (
    children
  ) : (
    <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  );

  return (
    <section
      id={id}
      className={className}
      style={{ ...baseStyle, background, color: textColor }}
    >
      {variant === 'tinted' && <TintedOverlay />}
      {variant === 'dark' && <DarkOverlay />}
      {inner}
    </section>
  );
}

/** 60° striped overlay for `tinted` sections. */
function TintedOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(60deg, rgba(255,255,255,0.16) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.16) 75%)',
        backgroundSize: '32px 56px',
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    />
  );
}

/** Crosshatch overlay for `dark` sections. */
function DarkOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(45deg, rgba(255,255,255,0.025) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.025) 75%), linear-gradient(-45deg, rgba(255,255,255,0.025) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.025) 75%)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }}
    />
  );
}

export type { BrandedSectionVariant, BrandedSectionProps };
