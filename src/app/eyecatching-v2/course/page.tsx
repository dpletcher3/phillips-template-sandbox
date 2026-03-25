export default function CoursePage() {
  const modules = [
    { num: '01', name: 'Crash Recovery', desc: 'Diagnose and recover from machine crashes. Assess damage, replace components, and verify alignment.' },
    { num: '02', name: 'Geometry Inspection', desc: 'Ball bar testing, laser alignment, and circular interpolation diagnostics.' },
    { num: '03', name: 'Geometry Correction', desc: 'Parameter adjustments, pitch error compensation, and backlash correction.' },
    { num: '04', name: 'Spindle Replacement', desc: 'Complete spindle removal, bearing replacement, and dynamic balancing procedures.', active: true },
    { num: '05', name: 'Guide Rail Service', desc: 'Linear guide inspection, preload adjustment, and way cover replacement.' },
    { num: '06', name: 'Ballscrew Service', desc: 'Ballscrew inspection, replacement, and backlash compensation setup.' },
  ];

  const details = [
    { label: 'Duration', value: '5 Days (40 Hours)' },
    { label: 'Format', value: 'In-Person, Hands-On' },
    { label: 'Level', value: 'Advanced' },
    { label: 'Machine', value: 'Haas ST Series', red: true },
    { label: 'Certificate', value: 'Phillips Certified' },
  ];

  const prereqs = [
    'Basic Lathe Operation Certificate',
    '2+ Years Service Experience',
    'Electrical Safety Training',
  ];

  return (
    <div style={{ background: '#f8f8f5', color: '#333', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>

      {/* SECTION 1 — Maroon Topbar */}
      <div style={{ background: '#3F0017', padding: '9px 44px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Training</span>
        <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 10 }}>&rarr;</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.6)', letterSpacing: '1px' }}>Service Tracks</span>
        <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 10 }}>&rarr;</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.6)', letterSpacing: '1px' }}>Advanced Lathe Service</span>
      </div>

      {/* SECTION 2 — Hero */}
      <div style={{ background: '#fff', padding: 44, display: 'grid', gridTemplateColumns: '1fr 290px', gap: 36, alignItems: 'start' }}>

        {/* Left column */}
        <div>
          {/* Track badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fde8e7', padding: '6px 14px', borderRadius: 20, marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F9423A' }} />
            <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#F9423A' }}>CNC Training Track</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px,5vw,56px)', textTransform: 'uppercase', lineHeight: .88, color: '#000', margin: '0 0 16px' }}>
            ADVANCED LATHE<br />SERVICE<br /><span style={{ color: '#F9423A' }}>TRAINING.</span>
          </h1>

          {/* Level badge */}
          <div style={{ display: 'inline-block', padding: '4px 12px', background: '#000', color: '#fff', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: 2, marginBottom: 16 }}>
            Advanced &middot; 40 Hours
          </div>

          {/* Description */}
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.75, marginBottom: 16 }}>
            Master the art of CNC lathe service and repair. This advanced course covers crash recovery, geometry inspection and correction, spindle replacement, and precision alignment — everything you need to keep turning centers running at peak performance.
          </p>

          {/* Prerequisites */}
          <p style={{ fontSize: 11, color: '#888', marginBottom: 24 }}>
            Prerequisites: Basic Lathe Operation, 2+ years service experience
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: '#F9423A', color: '#fff', border: 'none', padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4 }}>
              Enroll Now
            </button>
            <button style={{ background: 'transparent', color: '#000', border: '1px solid #000', padding: '12px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4 }}>
              View Dates
            </button>
          </div>
        </div>

        {/* Right column */}
        <div style={{ position: 'sticky' as const, top: 16 }}>
          <div style={{ background: '#f8f8f5', borderTop: '3px solid #F9423A', padding: 20, borderRadius: '0 0 4px 4px' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, textTransform: 'uppercase', color: '#000', marginBottom: 16 }}>
              Course Details
            </div>
            {details.map((d, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #e8e8e4', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#999' }}>{d.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: d.red ? '#F9423A' : '#333' }}>{d.value}</span>
              </div>
            ))}
            <button style={{ width: '100%', padding: '12px', background: '#F9423A', color: '#fff', border: 'none', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer', marginTop: 16 }}>
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Body */}
      <div style={{ padding: '36px 44px', display: 'grid', gridTemplateColumns: '1fr 260px', gap: 36 }}>

        {/* Left — Modules */}
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, textTransform: 'uppercase', color: '#000', marginBottom: 20 }}>
            Course Modules
          </div>
          {modules.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #e8e8e4', alignItems: 'flex-start' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 13,
                background: m.active ? '#F9423A' : '#f0f0ec',
                color: m.active ? '#fff' : '#999',
              }}>
                {m.num}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: m.active ? '#000' : '#555' }}>{m.name}</div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 4, lineHeight: 1.5 }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — Prerequisites card */}
        <div style={{ background: '#fff', padding: 20, borderRadius: 4, border: '1px solid #e8e8e4' }}>
          <div style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: 16 }}>
            Prerequisites
          </div>
          {prereqs.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f0f0ec' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F9423A' }} />
              <span style={{ fontSize: 11, color: '#555' }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
