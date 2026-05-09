/**
 * RedBlockFrame — portrait photo with an offset red block behind it.
 *
 * Distinctive Phillips treatment used for portraits in the opto and
 * robotics references. The red block sits 28px down/right of the photo,
 * creating an offset shadow-like accent in solid brand red.
 *
 * Defaults match the reference HTMLs: 4×5 aspect, 360px max width, 28px
 * offset, `--branded-r-md` (12px) corners on both photo and block.
 *
 * @example
 *   <RedBlockFrame src="/portraits/joe.jpg" alt="Joe Sommers, GM" />
 *   <RedBlockFrame src={url} alt="" aspectRatio="3 / 4" maxWidth="320px" />
 */
interface RedBlockFrameProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio for the photo. @default '4 / 5' */
  aspectRatio?: string;
  /** CSS max-width for the entire framed unit. @default '360px' */
  maxWidth?: string;
  /** Pixel offset of the red block from the photo. @default 28 */
  offset?: number;
  className?: string;
}

export default function RedBlockFrame({
  src,
  alt,
  aspectRatio = '4 / 5',
  maxWidth = '360px',
  offset = 28,
  className,
}: RedBlockFrameProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth,
        aspectRatio,
      }}
    >
      {/* Offset red block sitting behind the photo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: `${offset}px`,
          left: `${offset}px`,
          right: 0,
          bottom: 0,
          background: 'var(--branded-red)',
          borderRadius: 'var(--branded-r-md)',
        }}
      />
      {/* Photo, offset toward the top-left */}
      <div
        className="bg-branded-gray-100"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: `${offset}px`,
          bottom: `${offset}px`,
          borderRadius: 'var(--branded-r-md)',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary remote URLs in sandbox; opt out of next/image to keep primitive host-agnostic */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  );
}
