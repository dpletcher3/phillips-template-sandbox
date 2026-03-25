import Image from 'next/image'
import { EC_IMAGES } from '@/lib/eyecatching-images'

export default function TeamMemberPage() {
  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        background: '#fff',
        color: '#333',
        minHeight: '100vh',
      }}
    >
      {/* SECTION 1 — Split Hero */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '42% 58%',
          minHeight: '52vh',
        }}
      >
        {/* Left Cell */}
        <div
          style={{
            background: '#3F0017',
            padding: 44,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Circle 1 */}
          <div
            style={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.06)',
            }}
          />
          {/* Decorative Circle 2 */}
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.04)',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontSize: 9,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,.3)',
                marginBottom: 12,
              }}
            >
              {`// Phillips Leadership`}
            </p>
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(36px,5vw,62px)',
                color: '#fff',
                lineHeight: 1.05,
                margin: '0 0 8px',
              }}
            >
              Alan Phillips
            </h1>
            <p
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,.45)',
                marginBottom: 16,
              }}
            >
              Chief Executive Officer
            </p>
            <span
              style={{
                display: 'inline-block',
                background: '#F9423A',
                color: '#fff',
                padding: '4px 12px',
                fontSize: 8,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                borderRadius: 2,
              }}
            >
              Leadership Team
            </span>
          </div>
        </div>

        {/* Right Cell */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src={EC_IMAGES.executive}
            alt="Alan Phillips"
            fill={true}
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          {/* Left gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background:
                'linear-gradient(to right, rgba(63,0,23,.3) 0%, transparent 50%)',
              zIndex: 1,
            }}
          />
        </div>
      </section>

      {/* SECTION 2 — Body */}
      <section
        style={{
          padding: 44,
          display: 'grid',
          gridTemplateColumns: '1fr 240px',
          gap: 52,
          background: '#fff',
        }}
      >
        {/* Left Column */}
        <div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 22,
              color: '#111',
              margin: '0 0 20px',
            }}
          >
            About Alan
          </h2>
          <p
            style={{
              fontSize: 13,
              color: '#444',
              lineHeight: 1.85,
              marginBottom: 16,
            }}
          >
            Alan Phillips has led Phillips Corporation for over two decades,
            transforming it from a regional machine tool distributor into one of
            the most respected advanced manufacturing solution providers in the
            Southeast. Under his leadership, Phillips has expanded from a single
            office to multiple technology centers across the Mid-Atlantic and
            Southeast regions.
          </p>
          <p
            style={{
              fontSize: 13,
              color: '#444',
              lineHeight: 1.85,
              marginBottom: 16,
            }}
          >
            A mechanical engineer by training, Alan brings deep technical
            expertise to every customer engagement. He has been instrumental in
            building Phillips&apos; federal programs division, securing contracts
            with major defense installations and naval facilities throughout the
            region.
          </p>
          <p
            style={{
              fontSize: 13,
              color: '#444',
              lineHeight: 1.85,
              marginBottom: 16,
            }}
          >
            Alan serves on the board of the Association for Manufacturing
            Technology (AMT) and is a frequent speaker at industry events on
            topics including workforce development, advanced manufacturing
            adoption, and the future of American manufacturing competitiveness.
          </p>
        </div>

        {/* Right Column */}
        <div style={{ borderLeft: '1px solid #e5e5e0', paddingLeft: 28 }}>
          {/* Title */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 8,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#999',
                marginBottom: 4,
              }}
            >
              Title
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: '#000',
              }}
            >
              Chief Executive Officer
            </p>
          </div>

          {/* Company */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 8,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#999',
                marginBottom: 4,
              }}
            >
              Company
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: '#000',
              }}
            >
              Phillips Corporation
            </p>
          </div>

          {/* Since */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 8,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#999',
                marginBottom: 4,
              }}
            >
              Since
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: '#000',
              }}
            >
              2002
            </p>
          </div>

          {/* Headquarters */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 8,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#999',
                marginBottom: 4,
              }}
            >
              Headquarters
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: '#000',
              }}
            >
              Charlotte, NC
            </p>
          </div>

          {/* Team */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 8,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#999',
                marginBottom: 4,
              }}
            >
              Team
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 18,
                color: '#000',
              }}
            >
              200+ Employees
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
