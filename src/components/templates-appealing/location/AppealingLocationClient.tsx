'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IMAGES } from '@/lib/appealing-images'
import { LocationData } from '@/components/templates/location/types'
import TemplateBadge from '@/components/TemplateBadge'
import AppealingNav from '@/components/nav/AppealingNav'

interface Props {
  data: LocationData
}

export default function AppealingLocationClient({ data }: Props) {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const serviceImages = [IMAGES.engineer, IMAGES.machineShop, IMAGES.machine5axis, IMAGES.training, IMAGES.cnc3, IMAGES.precision]

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,66,58,.4)} 50%{box-shadow:0 0 0 12px rgba(249,66,58,0)} }
      `}</style>

      <TemplateBadge label="APPEALING" color="#3F0017" />
      <AppealingNav />

      {/* ── Hero ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}>
        {/* Left — dark gradient panel */}
        <div style={{
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 60%, #3F0017 100%)',
          padding: '48px',
        }}>
          <span style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,.4)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}>
            {data.region || 'Phillips'}
          </span>

          <h1 style={{
            fontFamily: '"Barlow Condensed", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 0.95,
            margin: '0 0 8px 0',
          }}>
            {data.city}
          </h1>

          <div style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,.3)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            {data.state}
          </div>

          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,.5)',
            margin: '0 0 8px 0',
            whiteSpace: 'pre-line',
          }}>
            {data.address}
          </p>

          <p style={{
            fontSize: '16px',
            color: '#F9423A',
            fontWeight: 700,
            margin: '8px 0 24px',
          }}>
            {data.phone}
          </p>

          {/* Hours grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '24px',
          }}>
            {data.hours.map((h, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,.04)',
                padding: '12px',
              }}>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,.4)',
                  marginBottom: '4px',
                }}>
                  {h.label}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#fff',
                }}>
                  {h.value}
                </div>
              </div>
            ))}
          </div>

          <button style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,.2)',
            padding: '10px 24px',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
            Get Directions
          </button>
        </div>

        {/* Right — map placeholder */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '340px' }}>
          <Image src={IMAGES.facility} alt={`Phillips ${data.city}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: '64px 48px', background: '#fff' }}>
        <h2 style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 800,
          fontSize: '22px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          margin: '0 0 32px 0',
          color: '#000',
        }}>
          OUR SERVICES
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {data.services.map((service, i) => {
            const isEven = i % 2 === 0
            const isHovered = hoveredService === i
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  height: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: isEven
                    ? 'linear-gradient(180deg, #F9423A 0%, #c5342e 100%)'
                    : 'linear-gradient(180deg, #1a1a1a 0%, #000 100%)',
                  padding: '24px',
                  cursor: 'pointer',
                }}
              >
                <Image src={serviceImages[i] || IMAGES.engineer} alt="" fill style={{ objectFit: 'cover', opacity: 0.15 }} />
                <div style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 900,
                  fontSize: '36px',
                  color: '#F9423A',
                  opacity: isEven ? 0.4 : 0.3,
                }}>
                  {service.number}
                </div>
                <div style={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#fff',
                  marginTop: '8px',
                }}>
                  {service.name}
                </div>
                <div style={{
                  maxHeight: isHovered ? '100px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,.6)',
                  marginTop: '8px',
                  lineHeight: 1.5,
                }}>
                  {service.description}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section style={{ padding: '48px', textAlign: 'center', background: '#fff' }}>
        <h2 style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 800,
          fontSize: '28px',
          margin: '0 0 12px 0',
          color: '#000',
        }}>
          Schedule a Demo at{' '}
          <span style={{ color: '#F9423A' }}>{data.city}</span>
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#647883',
          margin: '0 0 28px 0',
          maxWidth: '520px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          Visit our technology center and see the latest CNC machines running live. Our applications engineers are ready to help.
        </p>
        <button style={{
          background: '#F9423A',
          color: '#fff',
          border: 'none',
          padding: '14px 36px',
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          animation: 'pulse 2.5s infinite',
        }}>
          Book a Visit
        </button>
      </section>
    </div>
  )
}
