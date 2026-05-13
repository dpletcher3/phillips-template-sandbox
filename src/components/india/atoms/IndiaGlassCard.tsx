type Props = {
  children: React.ReactNode
  intensity?: 'light' | 'medium' | 'heavy'
  className?: string
}

// india-blue (#00AEEF) at discrete alphas + backdrop-filter blur amounts
// per §6.3 of docs/india-design-system.md. TBD-verify against the hero
// glass cards in docs/inspiration/<slug>/desktop.png.
const INTENSITY_MAP: Record<NonNullable<Props['intensity']>, { bg: string; blur: number }> = {
  light:  { bg: 'rgba(0, 174, 239, 0.15)', blur: 8 },
  medium: { bg: 'rgba(0, 174, 239, 0.25)', blur: 14 },
  heavy:  { bg: 'rgba(0, 174, 239, 0.88)', blur: 20 },
}

/**
 * Translucent blue panel per §2 ("Blue lives on glass") and §6.3.
 * Used over photographic backgrounds (hero) and over photo-on-photo
 * sections where text needs a legible surface.
 */
export default function IndiaGlassCard({
  children,
  intensity = 'heavy',
  className,
}: Props) {
  const i = INTENSITY_MAP[intensity]
  return (
    <div
      className={className}
      style={{
        background: i.bg,
        backdropFilter: `blur(${i.blur}px)`,
        WebkitBackdropFilter: `blur(${i.blur}px)`,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: 32,
        color: '#fff',
      }}
    >
      {children}
    </div>
  )
}
