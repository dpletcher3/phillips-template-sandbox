import Image from 'next/image'
import { EC_IMAGES } from '@/lib/eyecatching-images'

export default function PostPage() {
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#fff', color: '#333' }}>

      {/* SECTION 1 — Header */}
      <header style={{ padding: '44px 52px 0' }}>
        {/* Categories */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <a
            href="#"
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#F9423A',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Additive Manufacturing
          </a>
          <a
            href="#"
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#F9423A',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Industry Trends
          </a>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(28px,4.5vw,54px)',
            color: '#111',
            lineHeight: 1.15,
            margin: '0 0 20px',
          }}
        >
          Why Naval Shipyards Are Betting on{' '}
          <span style={{ fontStyle: 'italic', color: '#F9423A' }}>Metal AM</span>{' '}
          for Maintenance Parts
        </h1>

        {/* Byline */}
        <div
          style={{
            borderTop: '2px solid #000',
            padding: '14px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#3F0017',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            DG
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>Dan Grant</div>
            <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>
              March 15, 2026 &middot; 12 min read &middot; Additive Manufacturing
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2 — Cinematic image */}
      <div style={{ position: 'relative', height: 320, width: '100%', overflow: 'hidden' }}>
        <Image
          src={EC_IMAGES.metalAM}
          alt="Metal additive manufacturing"
          fill
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,.3), transparent 60%)',
          }}
        />
      </div>

      {/* SECTION 3 — Body layout */}
      <div
        style={{
          padding: '40px 52px',
          display: 'grid',
          gridTemplateColumns: '1fr 220px',
          gap: 52,
        }}
      >
        {/* Left column */}
        <div style={{ maxWidth: 620 }}>
          {/* First paragraph with drop cap */}
          <p style={{ fontSize: 13.5, color: '#333', lineHeight: 1.9, margin: 0 }}>
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 60,
                float: 'left' as const,
                lineHeight: 0.8,
                marginRight: 8,
                marginTop: 4,
                color: '#111',
              }}
            >
              T
            </span>
            he United States Navy maintains one of the most complex logistics networks in the
            world. When a ship needs a replacement part, the traditional supply chain can take
            weeks or months — an unacceptable delay when readiness is the mission.
          </p>

          {/* Body paragraph 2 */}
          <p style={{ fontSize: 13.5, color: '#333', lineHeight: 1.9, marginTop: 20 }}>
            Metal additive manufacturing is changing this equation. By producing certified
            replacement parts on-demand at or near the point of need, naval maintenance
            facilities are reducing lead times from months to days. The technology has matured
            rapidly, with powder-bed fusion systems now capable of producing parts that meet or
            exceed the mechanical properties of traditionally manufactured components.
          </p>

          {/* Body paragraph 3 */}
          <p style={{ fontSize: 13.5, color: '#333', lineHeight: 1.9, marginTop: 20 }}>
            Phillips Corporation has been at the forefront of this transformation, working with
            naval shipyards and fleet readiness centers to deploy metal AM capabilities that
            integrate with existing maintenance workflows.
          </p>

          {/* Pull quote */}
          <blockquote
            style={{
              borderLeft: '4px solid #F9423A',
              background: '#fff8f7',
              padding: '20px 24px',
              margin: '28px 0',
            }}
          >
            <p
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 17,
                fontStyle: 'italic',
                color: '#333',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              &ldquo;The ability to print a flight-critical bracket overnight instead of waiting
              six months for a casting completely changes how we think about depot-level
              maintenance.&rdquo;
            </p>
          </blockquote>

          {/* Subheading */}
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 24,
              color: '#111',
              margin: '28px 0 16px',
            }}
          >
            From Prototype to Production
          </h2>

          {/* Body paragraph 4 */}
          <p style={{ fontSize: 13.5, color: '#333', lineHeight: 1.9, marginTop: 20 }}>
            The journey from prototyping curiosity to production-grade capability has been
            neither quick nor simple. Early adopters within the naval maintenance community
            began experimenting with metal AM primarily for tooling and fixtures — low-risk
            applications that allowed teams to build confidence in the technology. As material
            databases grew and process parameters were refined, the scope expanded to include
            structural components, fluid-handling parts, and eventually flight-critical hardware.
          </p>

          {/* Body paragraph 5 */}
          <p style={{ fontSize: 13.5, color: '#333', lineHeight: 1.9, marginTop: 20 }}>
            Today, several fleet readiness centers operate dedicated additive manufacturing
            cells staffed by trained technicians who can take a legacy part drawing, reverse-
            engineer the geometry, optimize it for AM production, and deliver a qualified
            replacement in a fraction of the traditional lead time. This shift represents more
            than a technological upgrade — it is a fundamental rethinking of how the Navy
            sustains aging platforms while maintaining the highest standards of safety and
            performance.
          </p>
        </div>

        {/* Right column — Table of Contents */}
        <div style={{ position: 'sticky' as const, top: 16, alignSelf: 'start' as const }}>
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#999',
              paddingBottom: 8,
              borderBottom: '2px solid #000',
              marginBottom: 12,
            }}
          >
            In this article
          </div>
          <div
            style={{
              padding: '8px 0',
              borderBottom: '1px solid #eee',
              fontSize: 11,
              color: '#F9423A',
              fontWeight: 600,
            }}
          >
            The Supply Chain Problem
          </div>
          <div
            style={{
              padding: '8px 0',
              borderBottom: '1px solid #eee',
              fontSize: 11,
              color: '#555',
            }}
          >
            Metal AM as a Solution
          </div>
          <div
            style={{
              padding: '8px 0',
              borderBottom: '1px solid #eee',
              fontSize: 11,
              color: '#555',
            }}
          >
            From Prototype to Production
          </div>
          <div
            style={{
              padding: '8px 0',
              borderBottom: '1px solid #eee',
              fontSize: 11,
              color: '#555',
            }}
          >
            What&apos;s Next for Naval AM
          </div>
        </div>
      </div>

      {/* SECTION 4 — Related articles */}
      <section style={{ background: '#f4f4f0', padding: '28px 52px' }}>
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 20,
            textTransform: 'uppercase',
            color: '#000',
            marginBottom: 16,
          }}
        >
          Related Articles
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {/* Card 1 */}
          <div
            style={{
              background: '#fff',
              padding: 20,
              borderRadius: 4,
              borderTop: '3px solid transparent',
              transition: 'all .3s',
            }}
          >
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
              Federal
            </div>
            <h4
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 16,
                color: '#111',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              How FRC East Achieved 40% Cycle Time Reduction
            </h4>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: '#fff',
              padding: 20,
              borderRadius: 4,
              borderTop: '3px solid transparent',
              transition: 'all .3s',
            }}
          >
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
              Technology
            </div>
            <h4
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 16,
                color: '#111',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              Powder-Bed Fusion vs. DED: Choosing the Right AM Process
            </h4>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: '#fff',
              padding: 20,
              borderRadius: 4,
              borderTop: '3px solid transparent',
              transition: 'all .3s',
            }}
          >
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
              Training
            </div>
            <h4
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 16,
                color: '#111',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              Building an AM-Ready Workforce in Naval Maintenance
            </h4>
          </div>
        </div>
      </section>
    </div>
  )
}
