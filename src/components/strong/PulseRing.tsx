'use client'

export default function PulseRing({ size = 10 }: { size?: number }) {
  return (
    <>
      <style>{`
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,66,58,.5); }
          50% { box-shadow: 0 0 0 6px rgba(249,66,58,0); }
        }
      `}</style>
      <span style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#F9423A',
        animation: 'pulseRing 2s ease-in-out infinite',
        flexShrink: 0,
      }} />
    </>
  )
}
