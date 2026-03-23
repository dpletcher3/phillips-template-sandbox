/*
  ================================================================
  TEAM MEMBER TEMPLATE — Connect to Sanity
  ================================================================
  Sanity schema: teamMember (sanity/schemas/documents/teamMember.ts)

  Section → Field mapping:
  - Hero left     → teamMember.name, teamMember.title, teamMember.isLeadership
  - Hero right    → teamMember.photo
  - Bio           → teamMember.bio
  - LinkedIn      → teamMember.linkedinUrl
  ================================================================
*/

'use client'

const RED = '#F9423A'
const MAROON = '#3F0017'
const SERIF = "'Georgia', 'Times New Roman', serif"

const MOCK = {
  name: 'Dan Pletcher',
  title: 'Vice President',
  department: 'Executive Leadership',
  isLeadership: true,
  issueLabel: 'Phillips People · Issue 042',
  bio: [
    'Dan Pletcher joined Phillips Corporation in 2003 and has served in progressively senior roles across sales, applications engineering, and strategic planning. As Vice President, he oversees the company\'s technology partnerships, federal division, and digital transformation initiatives.',
    'Under Dan\'s leadership, Phillips has expanded its 5-axis portfolio to include Hermle, Mazak, and DMG MORI — establishing the company as the premier source for precision machining technology in the Northeast and Mid-Atlantic. He also spearheaded the launch of the Phillips Federal Division, now serving NAVAIR, Army arsenals, and DoD workforce development programs.',
    'Dan is a frequent speaker at IMTS, Eastec, and military manufacturing summits. He holds a degree in Mechanical Engineering from the University of Maryland and is a certified Lean Six Sigma Black Belt.',
  ],
  facts: [
    { label: 'Joined Phillips', value: '2003' },
    { label: 'Territory', value: 'Northeast & Mid-Atlantic' },
    { label: 'Specialization', value: '5-Axis, Federal, Strategic Partnerships' },
    { label: 'Education', value: 'BS Mechanical Engineering, UMD' },
  ],
  linkedinUrl: '#',
}

export default function TeamMemberTemplate() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#1a1a1a', fontFamily: "'Montserrat', sans-serif" }}>
      <a href="/" style={{ position: 'absolute', top: 24, left: 56, color: RED, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', zIndex: 10 }}>← Sandbox</a>

      {/* ---- SPLIT HERO ---- */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh' }}>
        {/* Left: maroon panel */}
        <div style={{ position: 'relative', background: MAROON, padding: '80px 48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, border: '1px solid rgba(255,255,255,.05)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, border: '1px solid rgba(255,255,255,.04)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 20 }}>{MOCK.issueLabel}</div>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1.1, color: '#fff', margin: '0 0 16px' }}>{MOCK.name}</h1>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 20 }}>{MOCK.title}</div>
            {MOCK.isLeadership && (
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 14px', border: '1px solid rgba(255,255,255,.15)', borderRadius: 2, color: 'rgba(255,255,255,.5)' }}>Leadership Team</span>
            )}
          </div>
        </div>

        {/* Right: photo placeholder */}
        <div style={{ background: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '60%', height: '70%', background: '#eae8e3', borderRadius: 4, minHeight: 300 }} />
        </div>
      </section>

      {/* ---- BIO + FACTS ---- */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, padding: '56px 56px 80px' }}>
        {/* Left: bio */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 32, height: 2, background: RED }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: '#999' }}>Biography</span>
          </div>
          {MOCK.bio.map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.9, color: '#555', margin: '0 0 20px' }}>{p}</p>
          ))}
          <a href={MOCK.linkedinUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: RED, textDecoration: 'none', marginTop: 8 }}>
            LinkedIn Profile →
          </a>
        </div>

        {/* Right: facts */}
        <div style={{ alignSelf: 'start' }}>
          <div style={{ background: '#f9f7f3', borderRadius: 8, padding: '28px 24px' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: '#1a1a1a', marginBottom: 20 }}>Quick Facts</div>
            {MOCK.facts.map((f, i) => (
              <div key={f.label} style={{ padding: '14px 0', borderTop: i > 0 ? '1px solid #e8e6e1' : 'none' }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 13, color: '#444' }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
