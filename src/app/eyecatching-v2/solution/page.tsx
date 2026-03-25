'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { EC_IMAGES } from '@/lib/eyecatching-images'

export default function SolutionPage() {
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0])

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarWidths([88, 94, 97, 72])
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const specs = [
    { label: 'X-Travel Range / 400-2000mm', pct: barWidths[0] },
    { label: 'Max Spindle / 42K RPM', pct: barWidths[1] },
    { label: 'Positioning / \u00b13 Micron', pct: barWidths[2] },
    { label: 'Tilt / 155\u00b0', pct: barWidths[3] },
  ]

  const brands = [
    { name: 'Hermle', subtitle: '5-Axis Precision' },
    { name: 'Haas', subtitle: 'Production VMC' },
    { name: 'GF Machining', subtitle: 'High-Speed Milling' },
  ]

  return (
    <div style={{ background: '#f2f2ee', fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── SECTION 1 — Hero ── */}
      <section
        style={{
          background: '#fff',
          padding: 56,
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '4px solid #000',
        }}
      >
        {/* Giant bg number */}
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(200px,30vw,340px)',
            color: '#f5f5f1',
            position: 'absolute',
            right: -20,
            top: -30,
            zIndex: 0,
            lineHeight: 1,
            margin: 0,
          }}
        >
          01
        </div>

        {/* Content grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: 56,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left column */}
          <div>
            {/* Red bar */}
            <div style={{ width: 40, height: 3, background: '#F9423A', marginBottom: 12 }} />

            {/* Offering label */}
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#F9423A',
                marginBottom: 12,
              }}
            >
              CNC Machining
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(48px,7vw,84px)',
                textTransform: 'uppercase',
                lineHeight: 0.88,
                color: '#000',
                margin: '0 0 20px',
              }}
            >
              5-AXIS<br />MACHINING<br />CENTERS
            </h1>

            {/* Type pills */}
            <div style={{ display: 'flex', gap: 8 }}>
              <span
                style={{
                  background: '#000',
                  color: '#fff',
                  padding: '5px 14px',
                  fontSize: 8,
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                Machines
              </span>
              <span
                style={{
                  background: '#F9423A',
                  color: '#fff',
                  padding: '5px 14px',
                  fontSize: 8,
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                Services
              </span>
              <span
                style={{
                  background: '#F68B33',
                  color: '#fff',
                  padding: '5px 14px',
                  fontSize: 8,
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                Training
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                borderLeft: '3px solid #F9423A',
                paddingLeft: 16,
                fontSize: 13,
                color: '#555',
                lineHeight: 1.75,
                margin: '20px 0 24px',
              }}
            >
              Our 5-axis machining solutions combine world-class machine tools from Hermle, GF
              Machining, and Haas with expert application engineering to deliver complete
              manufacturing cells optimized for your production requirements.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 28px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Get Started
              </button>
              <button
                style={{
                  background: 'transparent',
                  color: '#000',
                  border: '1px solid #000',
                  padding: '12px 28px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Contact Sales
              </button>
            </div>
          </div>

          {/* Right column */}
          <div style={{ position: 'relative' }}>
            <Image
              src={EC_IMAGES.machine5axis}
              alt="5-axis machining center"
              width={320}
              height={280}
              style={{ width: '100%', height: 280, objectFit: 'cover' }}
            />
            {/* Red corner */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 60,
                height: 4,
                background: '#F9423A',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — Black spec stripe ── */}
      <section
        style={{
          background: '#000',
          padding: '20px 56px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {[
          { value: '400\u20132000mm', label: 'Travel' },
          { value: '42K', label: 'RPM Max' },
          { value: '\u00b13\u00b5', label: 'Positioning' },
          { value: '155\u00b0', label: 'Tilt Range' },
        ].map((spec, i) => (
          <div
            key={i}
            style={{
              padding: '8px 20px 8px 0',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,.08)' : 'none',
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 26,
                color: '#F9423A',
              }}
            >
              {spec.value}
            </span>
            <span
              style={{
                fontSize: 8,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'rgba(255,255,255,.3)',
                display: 'block',
                marginTop: 2,
              }}
            >
              {spec.label}
            </span>
          </div>
        ))}
      </section>

      {/* ── SECTION 3 — Brand matrix ── */}
      <section style={{ background: '#fff', padding: '44px 56px' }}>
        <div
          style={{
            fontSize: 8,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#F9423A',
            marginBottom: 8,
          }}
        >
          Featured Brands
        </div>

        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 36,
            textTransform: 'uppercase',
            color: '#000',
            margin: '0 0 8px',
          }}
        >
          BEST IN CLASS.
        </h2>

        {/* Gradient rule */}
        <div
          style={{
            height: 3,
            background: 'linear-gradient(90deg, #F9423A, #F68B33, transparent)',
            marginBottom: 24,
            maxWidth: 200,
          }}
        />

        {/* 3-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: '#000',
          }}
        >
          {brands.map((brand, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all .3s',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 22,
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {brand.name}
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{brand.subtitle}</div>
              <span
                style={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 18,
                  color: '#ccc',
                  transition: 'transform .3s',
                }}
              >
                &rarr;
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4 — Full-width image break ── */}
      <section style={{ position: 'relative', height: 280, width: '100%', overflow: 'hidden' }}>
        <Image
          src={EC_IMAGES.machineFloor}
          alt="Machine shop floor"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(.5)' }}
        />
      </section>

      {/* ── SECTION 5 — Spec bars ── */}
      <section
        style={{
          background: '#f8f8f4',
          padding: '44px 56px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 44,
        }}
      >
        {/* Left — animated bars */}
        <div>
          {specs.map((s, i) => (
            <div key={i} style={{ marginBottom: i < specs.length - 1 ? 20 : 0 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>{s.label}</div>
              <div
                style={{
                  height: 2,
                  background: 'rgba(0,0,0,.08)',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${s.pct}%`,
                    background: '#000',
                    borderRadius: 1,
                    transition: 'width 1.4s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right — text + CTA */}
        <div>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.8 }}>
            Phillips Corporation partners with leading machine-tool manufacturers to deliver
            turnkey 5-axis machining solutions. From initial process development through
            installation and training, our team of application engineers ensures your investment
            performs from day one.
          </p>
          <button
            style={{
              background: '#000',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginTop: 20,
            }}
          >
            Talk to an Engineer &rarr;
          </button>
        </div>
      </section>

      {/* ── SECTION 6 — Dark end CTA ── */}
      <section
        style={{
          background: '#000',
          padding: '60px 56px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative rings */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            border: '1px solid rgba(249,66,58,.07)',
            width: 400,
            height: 400,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            border: '1px solid rgba(249,66,58,.07)',
            width: 250,
            height: 250,
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 36,
              textTransform: 'uppercase',
              color: '#fff',
              margin: '0 0 12px',
            }}
          >
            SOLUTION / <span style={{ color: '#F9423A' }}>DESIGN.</span>
          </h2>

          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,.4)',
              maxWidth: 500,
              margin: '0 auto 24px',
              lineHeight: 1.7,
            }}
          >
            From concept to production, our engineering team designs complete machining solutions
            tailored to your specific manufacturing challenges and throughput goals.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button
              style={{
                background: '#fff',
                color: '#000',
                border: 'none',
                padding: '12px 28px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Get Started
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,.25)',
                padding: '12px 28px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
