import Image from 'next/image'
import { EC_IMAGES } from '@/lib/eyecatching-images'

const marqueeItems = [
  'CHARLOTTE, NC',
  'SALES',
  'SERVICE',
  'DEMO CENTER',
  'TRAINING',
]

const hoursTiles = [
  { label: 'Sales', value: 'Mon\u2013Fri 8\u20135' },
  { label: 'Service', value: '24/7 Support' },
  { label: 'Parts', value: 'Mon\u2013Fri 8\u20135' },
  { label: 'Training', value: 'By Schedule' },
]

const serviceCards = [
  { num: '01', name: 'Sales', img: EC_IMAGES.engineer, desc: 'Full-service machine tool sales with application engineering support for every purchase.' },
  { num: '02', name: 'Service', img: EC_IMAGES.machineShop, desc: 'Factory-trained technicians providing preventive maintenance, emergency repair, and machine relocation.' },
  { num: '03', name: 'Demo Center', img: EC_IMAGES.machine5axis, desc: '15,000 sq ft technology center with live cutting demos and application testing.' },
  { num: '04', name: 'Training', img: EC_IMAGES.trainingRoom, desc: 'Hands-on CNC training programs for operators, programmers, and maintenance technicians.' },
  { num: '05', name: 'Parts', img: EC_IMAGES.cncClose, desc: 'Genuine OEM replacement parts with same-day shipping on common items.' },
  { num: '06', name: 'Applications', img: EC_IMAGES.machineVMC, desc: 'Dedicated applications engineers for toolpath optimization, fixturing, and process development.' },
]

export default function LocationPage() {
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: '#000', color: '#fff', minHeight: '100vh' }}>

      {/* ── SECTION 1 — Split Hero ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '44% 56%', minHeight: '52vh' }}>

        {/* Left cell */}
        <div style={{ background: '#F9423A', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>

          {/* Decorative circles */}
          <div style={{ position: 'absolute', bottom: -70, right: -70, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,.12)' }} />
          <div style={{ position: 'absolute', bottom: -30, right: -30, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(255,255,255,.08)' }} />

          {/* Top content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.6)', marginBottom: 12 }}>
              Mid-Atlantic Region
            </p>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(56px,8vw,88px)', textTransform: 'uppercase', lineHeight: .88, color: '#fff', margin: 0 }}>
              CHARLOTTE,<br />NC.
            </h1>
          </div>

          {/* Bottom content */}
          <div style={{ position: 'relative', zIndex: 1, marginTop: 32 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', lineHeight: 1.6, marginBottom: 12 }}>
              4801 Hovis Road<br />Charlotte, NC 28208
            </p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#fff', marginBottom: 16 }}>
              (704) 392-9700
            </p>
            <button style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: 'none', padding: '10px 20px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, backdropFilter: 'blur(4px)', marginBottom: 20 }}>
              Get Directions &rarr;
            </button>

            {/* Hours grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {hoursTiles.map((tile) => (
                <div key={tile.label} style={{ background: 'rgba(255,255,255,.1)', padding: '10px 14px', borderRadius: 4 }}>
                  <div style={{ fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,.5)' }}>{tile.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#fff', marginTop: 2 }}>{tile.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right cell */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src={EC_IMAGES.building}
            alt="Phillips Charlotte office"
            fill={true}
            style={{ objectFit: 'cover', filter: 'brightness(.8)' }}
          />
          {/* Left gradient overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: 'linear-gradient(to right, rgba(249,66,58,.2) 0%, transparent 40%)', zIndex: 1 }} />
        </div>
      </section>

      {/* ── SECTION 2 — Marquee Strip ── */}
      <div style={{ background: '#000', overflow: 'hidden', whiteSpace: 'nowrap' as const, padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 24 }}>
          {[0, 1].map((pass) =>
            marqueeItems.map((item, i) => (
              <span key={`${pass}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 24 }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 12, color: '#fff', letterSpacing: '4px', textTransform: 'uppercase' }}>
                  {item}
                </span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#F9423A', flexShrink: 0 }} />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── SECTION 3 — Service Grid ── */}
      <section style={{ background: '#0a0a0a', padding: '36px 44px' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>
          Our Services
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {serviceCards.map((card) => (
            <div
              key={card.num}
              style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', padding: 22, borderRadius: 4, position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'all .3s', minHeight: 160 }}
            >
              {/* Background image layer */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                <Image
                  src={card.img}
                  alt={card.name}
                  fill={true}
                  style={{ objectFit: 'cover', opacity: 0.1 }}
                />
                {/* Dark gradient overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(10,10,10,.9), rgba(10,10,10,.7))' }} />
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#F9423A', lineHeight: 1, marginBottom: 8 }}>
                  {card.num}
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 15, textTransform: 'uppercase', color: '#fff', marginBottom: 8 }}>
                  {card.name}
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', lineHeight: 1.6, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
