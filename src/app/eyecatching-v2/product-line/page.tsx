import { EC_IMAGES } from '@/lib/eyecatching-images'
import Image from 'next/image'

const SPEC_ROWS = [
  { label: 'Type', values: ['Vertical Mill', 'CNC Lathe', '5-Axis Universal', 'Horizontal Mill'] },
  { label: 'Travel (mm)', values: ['508–1626', 'N/A', '500–1500', '560–1626'] },
  { label: 'Max RPM', values: ['8,100', '4,000', '8,100', '8,100'] },
  { label: 'Tool Capacity', values: ['20+1', '12', '40+1', '40+1'] },
  { label: 'Coolant', values: ['Flood', 'Flood', 'Through-Spindle', 'Through-Spindle'] },
]

const COLUMNS = [
  { name: 'VF Series', image: EC_IMAGES.machineVMC, featured: false },
  { name: 'ST Series', image: EC_IMAGES.machineTurning, featured: false },
  { name: 'UMC Series', image: EC_IMAGES.machine5axis, featured: true },
  { name: 'EC Series', image: EC_IMAGES.machineFloor, featured: false },
]

const VF_MODELS = [
  { name: 'VF-2', spec: '508×406×508mm Travel' },
  { name: 'VF-5', spec: '1270×660×635mm Travel' },
  { name: 'VF-14', spec: '1626×813×762mm Travel' },
]

const UMC_MODELS = [
  { name: 'UMC-500', spec: 'Full 5-Axis, 12K RPM' },
  { name: 'UMC-750', spec: 'Larger Envelope, 12K RPM' },
  { name: 'UMC-1500SS', spec: 'Super-Speed, 15K RPM' },
]

const UMC_BADGES = ['Full 5-Axis', '500–1500mm', '12,000 RPM']

export default function ProductLinePage() {
  return (
    <div style={{ background: '#000', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── SECTION 1 — Intro ── */}
      <section style={{ padding: '60px', maxWidth: 900 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#F9423A',
          letterSpacing: '1.5px',
          marginBottom: 12,
          textTransform: 'uppercase',
          margin: '0 0 12px',
        }}>
          Haas Automation · Product Lines
        </p>

        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(36px,6vw,64px)',
          textTransform: 'uppercase',
          lineHeight: .9,
          color: '#fff',
          margin: '0 0 20px',
        }}>
          Find the Right<br />
          <span style={{ color: '#F9423A' }}>MACHINE</span> for Your Shop.
        </h1>

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, marginBottom: 12 }}>
          Whether you&rsquo;re running a job shop or a high-volume production facility, Haas has a machine built for your application. Compare series below to find the right fit.
        </p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.8, marginBottom: 12 }}>
          Every Haas machine is built in Oxnard, California — designed for reliability, simplicity, and value.
        </p>
      </section>

      {/* ── SECTION 2 — Comparison Table ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,.08)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        overflowX: 'auto' as const,
        padding: '0 60px',
      }}>
        {/* Column Headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(4, 1fr)', gap: 0 }}>
          {/* Empty label cell */}
          <div />
          {COLUMNS.map((col) => (
            <div
              key={col.name}
              style={{
                padding: '0 16px',
                ...(col.featured ? { borderTop: '2px solid #F9423A' } : {}),
              }}
            >
              {/* Image container */}
              <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(.5)' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: '#F9423A',
                }} />
              </div>

              {/* Series name */}
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 20,
                textTransform: 'uppercase',
                padding: '12px 0 8px',
                color: '#fff',
                margin: 0,
              }}>
                {col.name}
              </p>

              {/* More Info button */}
              <button style={{
                fontSize: 9,
                fontWeight: 700,
                color: '#F9423A',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0 16px',
              }}>
                More Info →
              </button>
            </div>
          ))}
        </div>

        {/* Spec Rows */}
        {SPEC_ROWS.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px repeat(4, 1fr)',
              background: i % 2 === 0 ? 'rgba(255,255,255,.02)' : 'transparent',
            }}
          >
            {/* Row label */}
            <div style={{
              padding: '12px 16px',
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'rgba(255,255,255,.3)',
              borderBottom: '1px solid rgba(255,255,255,.04)',
            }}>
              {row.label}
            </div>

            {/* Values */}
            {row.values.map((val, j) => (
              <div
                key={`${row.label}-${j}`}
                style={{
                  padding: '12px 16px',
                  fontSize: 12,
                  color: 'rgba(255,255,255,.5)',
                  borderBottom: '1px solid rgba(255,255,255,.04)',
                }}
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* ── SECTION 3 — VF Series Detail ── */}
      <section style={{ padding: 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44 }}>
        {/* Left — Text */}
        <div>
          <p style={{
            fontSize: 9,
            fontWeight: 700,
            color: '#F9423A',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 8,
            margin: '0 0 8px',
          }}>
            Vertical Machining Centers
          </p>

          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 36,
            textTransform: 'uppercase',
            color: '#fff',
            margin: '0 0 8px',
          }}>
            VF Series
          </h2>

          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: 'italic',
            fontSize: 16,
            color: 'rgba(255,255,255,.4)',
            marginBottom: 16,
            margin: '0 0 16px',
          }}>
            The backbone of every job shop.
          </p>

          <p style={{
            fontSize: 13,
            color: 'rgba(255,255,255,.45)',
            lineHeight: 1.8,
            marginBottom: 24,
            margin: '0 0 24px',
          }}>
            The VF series represents the most popular CNC vertical machining centers in the world. From the compact VF-1 to the massive VF-14, there&rsquo;s a VF for every application.
          </p>

          {/* Model rows */}
          {VF_MODELS.map((model) => (
            <div
              key={model.name}
              style={{
                borderBottom: '1px solid rgba(255,255,255,.06)',
                padding: '12px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 16,
                textTransform: 'uppercase',
                color: '#fff',
              }}>
                {model.name}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.35)' }}>
                {model.spec}
              </span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,.2)' }}>→</span>
            </div>
          ))}
        </div>

        {/* Right — Image */}
        <div style={{ position: 'relative', height: '100%', minHeight: 380, borderRadius: 4, overflow: 'hidden' }}>
          <Image
            src={EC_IMAGES.machineVMC}
            alt="VF Series"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(.7)' }}
          />
        </div>
      </section>

      {/* ── SECTION 4 — UMC Series Detail ── */}
      <section style={{
        padding: 60,
        background: '#0a0a0a',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 44,
      }}>
        {/* Left — Image */}
        <div style={{ position: 'relative', height: '100%', minHeight: 380, borderRadius: 4, overflow: 'hidden' }}>
          <Image
            src={EC_IMAGES.machine5axis}
            alt="UMC Series"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(.7)' }}
          />
        </div>

        {/* Right — Text */}
        <div>
          <p style={{
            fontSize: 9,
            fontWeight: 700,
            color: '#F9423A',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: '0 0 8px',
          }}>
            5-Axis Universal Machining
          </p>

          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 36,
            textTransform: 'uppercase',
            color: '#fff',
            margin: '0 0 8px',
          }}>
            UMC Series
          </h2>

          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: 'italic',
            fontSize: 16,
            color: 'rgba(255,255,255,.4)',
            margin: '0 0 16px',
          }}>
            Full simultaneous 5-axis capability.
          </p>

          <p style={{
            fontSize: 13,
            color: 'rgba(255,255,255,.45)',
            lineHeight: 1.8,
            margin: '0 0 24px',
          }}>
            The UMC series delivers true 5-axis machining with a built-in dual-axis trunnion table. From the UMC-500 to the UMC-1500SS, these machines handle complex geometries with ease.
          </p>

          {/* Spec callout badges */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {UMC_BADGES.map((badge) => (
              <span
                key={badge}
                style={{
                  border: '1px solid rgba(255,255,255,.1)',
                  padding: '8px 14px',
                  display: 'inline-block',
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,.5)',
                  borderRadius: 2,
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Model rows */}
          {UMC_MODELS.map((model) => (
            <div
              key={model.name}
              style={{
                borderBottom: '1px solid rgba(255,255,255,.06)',
                padding: '12px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 16,
                textTransform: 'uppercase',
                color: '#fff',
              }}>
                {model.name}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.35)' }}>
                {model.spec}
              </span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,.2)' }}>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5 — Bottom CTA Bar ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid rgba(255,255,255,.08)',
      }}>
        {/* CTA 1 — Talk to an Engineer */}
        <div style={{
          padding: '24px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'pointer',
          transition: 'background .3s',
        }}>
          <div style={{
            width: 36,
            height: 36,
            background: '#F9423A',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            ✉
          </div>
          <div>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 14,
              textTransform: 'uppercase',
              color: '#fff',
              margin: 0,
            }}>
              Talk to an Engineer
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', margin: 0 }}>
              Application Engineering Team
            </p>
          </div>
        </div>

        {/* CTA 2 — Download Spec Sheet */}
        <div style={{
          padding: '24px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'pointer',
          transition: 'background .3s',
        }}>
          <div style={{
            width: 36,
            height: 36,
            background: '#222',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            ↓
          </div>
          <div>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 14,
              textTransform: 'uppercase',
              color: '#fff',
              margin: 0,
            }}>
              Download Spec Sheet
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', margin: 0 }}>
              PDF · All Models
            </p>
          </div>
        </div>

        {/* CTA 3 — See Case Studies */}
        <div style={{
          padding: '24px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'pointer',
          transition: 'background .3s',
        }}>
          <div style={{
            width: 36,
            height: 36,
            background: '#222',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            ◆
          </div>
          <div>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 14,
              textTransform: 'uppercase',
              color: '#fff',
              margin: 0,
            }}>
              See Case Studies
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', margin: 0 }}>
              Real Customer Results
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
