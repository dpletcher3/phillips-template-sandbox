import Image from 'next/image'
import PulseRing from './PulseRing'

interface StrongHeroProps {
  tag: string
  line1: string
  line2: string
  line3Accent: string
  subtitle: string
  body: string
  cta1?: string
  cta2?: string
  heroImage?: string
  minHeight?: string
  children?: React.ReactNode
}

export default function StrongHero({
  tag, line1, line2, line3Accent, subtitle, body,
  cta1 = 'Request a Quote', cta2 = 'Learn More',
  heroImage, minHeight = '62vh', children,
}: StrongHeroProps) {
  const MONO = 'var(--font-mono, "JetBrains Mono"), monospace'

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight,
      background: '#09090B',
      display: 'flex',
      alignItems: 'center',
    }}>
      {heroImage && (
        <>
          <Image src={heroImage} alt="" fill style={{ objectFit: 'cover', opacity: 0.18 }} priority />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, #09090B 0%, transparent 25%, transparent 70%, #09090B 100%), linear-gradient(90deg, #09090B 0%, rgba(9,9,11,.4) 60%)',
          }} />
        </>
      )}

      <div style={{
        position: 'relative', zIndex: 1,
        padding: '80px 48px 64px',
        maxWidth: '1280px', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: children ? '1fr 1fr' : '1fr',
        gap: '48px', alignItems: 'center',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <PulseRing />
            <span style={{
              fontFamily: MONO,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '4px',
              textTransform: 'uppercase' as const,
              color: '#F9423A',
            }}>
              {tag}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-inter, Inter), sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 0.92,
            letterSpacing: '-2px',
            color: 'rgba(255,255,255,0.95)',
            margin: '0 0 20px',
          }}>
            {line1}<br />{line2}<br />
            <span style={{ color: '#F9423A' }}>{line3Accent}</span>
          </h1>

          <div style={{ width: '32px', height: '2px', background: '#F9423A', marginBottom: '12px' }} />

          <p style={{
            fontFamily: MONO,
            fontSize: '11px',
            letterSpacing: '1px',
            color: 'rgba(255,255,255,0.70)',
            margin: '0 0 16px',
          }}>
            {subtitle}
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '14px',
            lineHeight: 1.7,
            margin: '0 0 28px',
            maxWidth: '480px',
          }}>
            {body}
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              background: '#F9423A', color: '#fff', border: 'none',
              padding: '13px 30px', fontFamily: MONO,
              fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase' as const, cursor: 'pointer',
            }}>
              {cta1}
            </button>
            <button style={{
              background: 'transparent', color: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(255,255,255,.3)',
              padding: '13px 30px', fontFamily: MONO,
              fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase' as const, cursor: 'pointer',
            }}>
              {cta2}
            </button>
          </div>
        </div>

        {children && <div>{children}</div>}
      </div>
    </section>
  )
}
