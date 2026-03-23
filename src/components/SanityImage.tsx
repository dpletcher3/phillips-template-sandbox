import Image from 'next/image'
import { urlFor } from '../../sanity/lib/image'

interface SanityImageProps {
  image: unknown
  alt?: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  style?: React.CSSProperties
  sizes?: string
  priority?: boolean
  placeholder?: React.ReactNode
}

export default function SanityImage({
  image,
  alt = '',
  width,
  height,
  fill,
  className,
  style,
  sizes,
  priority,
  placeholder,
}: SanityImageProps) {
  if (!image) {
    return (
      placeholder ?? (
        <div
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
            background: 'rgba(255,255,255,.04)',
            ...style,
          }}
        />
      )
    )
  }

  const url = urlFor(image).auto('format').url()

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        className={className}
        style={{ objectFit: 'cover', ...style }}
        sizes={sizes || '100vw'}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      style={style}
      sizes={sizes}
      priority={priority}
    />
  )
}
