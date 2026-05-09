/**
 * Eyebrow — small label that sits above headings.
 *
 * Barlow Condensed italic, 700 weight, 13px, uppercase, 2.5px tracked. The
 * default color is `--branded-red`; on dark hero backgrounds pass
 * `color="var(--branded-white)"` (typically with reduced opacity wrapper).
 *
 * @example
 *   <Eyebrow>Customer Stories</Eyebrow>
 *   <Eyebrow color="var(--branded-white)">Phillips Robotics</Eyebrow>
 */
interface EyebrowProps {
  children: React.ReactNode;
  /** Override the default red color. Pass any valid CSS color or var(). */
  color?: string;
  /** Render element. @default 'span' */
  as?: 'span' | 'div' | 'p';
  className?: string;
}

export default function Eyebrow({
  children,
  color = 'var(--branded-red)',
  as: Tag = 'span',
  className,
}: EyebrowProps) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif',
        fontStyle: 'italic',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '2.5px',
        fontSize: '13px',
        color,
        display: 'inline-block',
        marginBottom: '14px',
      }}
    >
      {children}
    </Tag>
  );
}
