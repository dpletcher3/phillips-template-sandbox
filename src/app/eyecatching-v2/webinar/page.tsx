export default function WebinarPage() {
  return (
    <div style={{ background: '#05050f', color: '#fff', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>

      {/* SECTION 1 — Hero */}
      <section style={{ padding: 44, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 44, minHeight: '56vh', position: 'relative', alignItems: 'center' }}>

        {/* Pulsing rings */}
        <div style={{ position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', border: '1px solid rgba(249,66,58,.05)', pointerEvents: 'none', opacity: 0.3 }} />
        <div style={{ position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(249,66,58,.05)', pointerEvents: 'none', opacity: 0.2 }} />
        <div style={{ position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%,-50%)', width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(249,66,58,.05)', pointerEvents: 'none', opacity: 0.15 }} />

        {/* Left column */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Status row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#22c55e' }}>Registration Open</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(28px,4.5vw,52px)', textTransform: 'uppercase', lineHeight: 0.92, color: '#fff', margin: '0 0 20px' }}>
            ADVANCED METAL AM<br />
            FOR <span style={{ color: '#F9423A' }}>NAVAL</span><br />
            MAINTENANCE.
          </h1>

          {/* Date block */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)', padding: '16px 0', margin: '20px 0', display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 52, color: '#fff', lineHeight: 1 }}>28</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.5)' }}>APRIL 2026</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 2 }}>10:00 AM – 11:30 AM ET</div>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, maxWidth: 440 }}>
            Join Phillips Corporation&apos;s additive manufacturing experts for an in-depth look at how metal AM is transforming naval maintenance operations. Learn about real-world deployments, certified materials, and implementation strategies.
          </p>
        </div>

        {/* Right column — Registration card */}
        <div style={{ background: '#fff', borderRadius: 6, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          {/* Gradient top bar */}
          <div style={{ height: 4, background: 'linear-gradient(90deg, #F9423A, #F68B33)' }} />

          {/* Card body */}
          <div style={{ padding: 24 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, textTransform: 'uppercase', color: '#000', margin: '0 0 12px' }}>Register Now</h2>

            {/* Date chip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f8f8f5', borderLeft: '3px solid #F9423A', marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#555' }}>April 28, 2026 &middot; 10:00 AM ET</span>
            </div>

            {/* Input fields */}
            <div style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, color: '#999', marginBottom: 10, background: '#f8f8f8', boxSizing: 'border-box' }}>Full Name</div>
            <div style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, color: '#999', marginBottom: 10, background: '#f8f8f8', boxSizing: 'border-box' }}>Work Email</div>

            {/* Register button */}
            <button style={{ width: '100%', padding: '12px', background: '#F9423A', color: '#fff', border: 'none', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer' }}>Register</button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Speakers */}
      <section style={{ padding: '32px 44px' }}>
        <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>Speakers</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {/* Speaker 1 */}
          <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, padding: 20, transition: 'all .3s' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#3F0017', border: '1px solid rgba(249,66,58,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DG</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, textTransform: 'uppercase', color: '#fff' }}>Dan Grant</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 4 }}>Director, Additive Manufacturing</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', lineHeight: 1.6, marginTop: 8 }}>15+ years in metal AM deployment for defense and aerospace applications.</div>
          </div>

          {/* Speaker 2 */}
          <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, padding: 20, transition: 'all .3s' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#3F0017', border: '1px solid rgba(249,66,58,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>MR</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, textTransform: 'uppercase', color: '#fff' }}>Michael Reid</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 4 }}>Senior Applications Engineer</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', lineHeight: 1.6, marginTop: 8 }}>Specializes in powder-bed fusion process optimization and part qualification.</div>
          </div>

          {/* Speaker 3 */}
          <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 6, padding: 20, transition: 'all .3s' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#3F0017', border: '1px solid rgba(249,66,58,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>TF</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, textTransform: 'uppercase', color: '#fff' }}>T.J. Felice</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 4 }}>Naval Programs Manager</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', lineHeight: 1.6, marginTop: 8 }}>Former USN, leads Phillips&apos; federal additive manufacturing initiatives.</div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Agenda */}
      <section style={{ padding: '32px 44px', background: '#000' }}>
        <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>Agenda</div>

        {[
          { time: '9:00 AM', topic: 'Welcome & Introduction to Naval AM Programs' },
          { time: '9:15 AM', topic: 'Metal AM Technology Overview: Powder-Bed Fusion & DED' },
          { time: '9:45 AM', topic: 'Case Study: FRC East Parts-on-Demand Program' },
          { time: '10:15 AM', topic: 'Materials Qualification & Certification Pathways' },
          { time: '10:45 AM', topic: 'Implementation Roadmap for Maintenance Facilities' },
          { time: '11:15 AM', topic: 'Q&A and Next Steps' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, color: '#F9423A', minWidth: 80, textTransform: 'uppercase' }}>{item.time}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>{item.topic}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
