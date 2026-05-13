'use client'

import { useState } from 'react'
import { PHILLIPS_COLORS } from '@/lib/constants'

type Props = {
  variant: 'hero' | 'body'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP: Record<NonNullable<Props['size']>, { padding: string; fontSize: number }> = {
  sm: { padding: '8px 18px', fontSize: 10 },
  md: { padding: '13px 30px', fontSize: 11 },
  lg: { padding: '16px 36px', fontSize: 13 },
}

/**
 * Two-tone CTA per §2:
 *   variant='hero' → india-orange (#F15C30, scoped reproduction color)
 *   variant='body' → india-red (PHILLIPS_COLORS.red)
 *
 * The orange color is defined as a CSS custom property scoped to this
 * component only — it is NOT in PHILLIPS_COLORS and NOT in globals.css,
 * per the §2 footnote rule. The variant prop is the only way to pick a
 * color; there is no free-color escape hatch.
 */
export default function IndiaCtaButton({
  variant,
  children,
  href,
  onClick,
  size = 'md',
}: Props) {
  const [hovered, setHovered] = useState(false)

  const sizeStyle = SIZE_MAP[size]
  const bg = variant === 'hero' ? 'var(--india-orange-cta)' : PHILLIPS_COLORS.red

  const style = {
    // Scoped CSS variable — defined here, not in globals.css. See §2 footnote.
    '--india-orange-cta': '#F15C30',
    background: bg,
    color: '#fff',
    fontFamily: 'var(--font-barlow-condensed), sans-serif',
    fontWeight: 700,
    fontStyle: 'italic' as const,
    fontSize: sizeStyle.fontSize,
    padding: sizeStyle.padding,
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'filter 0.15s ease',
    filter: hovered ? 'brightness(0.92)' : 'brightness(1)',
  } as React.CSSProperties

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  if (href) {
    return (
      <a href={href} style={style} {...handlers} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" style={style} onClick={onClick} {...handlers}>
      {children}
    </button>
  )
}
