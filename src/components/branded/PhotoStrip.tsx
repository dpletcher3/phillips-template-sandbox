/**
 * PhotoStrip — full-bleed grayscale photo strip.
 *
 * Eight photos rendered side-by-side as a single 24:5 band, all converted
 * to grayscale with slight contrast bump. Appears immediately above the
 * footer on every Branded page (typically with a {@link BrandStripe} below
 * it). Decorative; images are aria-hidden.
 *
 * Implementation note: each cell uses `background-image` rather than
 * `<img>` so we can apply `filter: grayscale(1)` without nesting wrappers.
 * If fewer than 8 images are provided the strip cycles through them.
 *
 * @example
 *   <PhotoStrip images={[img1, img2, img3, img4, img5, img6, img7, img8]} />
 */
interface PhotoStripProps {
  /** Image URLs. Cycles if fewer than `cells` provided. */
  images: string[];
  /** Number of cells across. @default 8 */
  cells?: number;
  className?: string;
}

export default function PhotoStrip({ images, cells = 8, className }: PhotoStripProps) {
  if (images.length === 0) return null;
  const filled = Array.from({ length: cells }, (_, i) => images[i % images.length]);

  return (
    <div
      aria-hidden="true"
      className={`bg-branded-gray-700 ${className ?? ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cells}, 1fr)`,
        gap: 0,
        width: '100%',
        aspectRatio: '24 / 5',
        overflow: 'hidden',
      }}
    >
      {filled.map((url, i) => (
        <div
          key={i}
          style={{
            backgroundImage: `url("${url}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1) contrast(1.05)',
          }}
        />
      ))}
    </div>
  );
}
