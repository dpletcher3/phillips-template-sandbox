import {
  BrandedPageShell,
  Btn,
  CONTAINER,
  FONT_ACCENT,
  FONT_DISPLAY,
  META_LABEL,
  NoContentYet,
  SECTION_HEADING,
} from './_shared/branded-helpers';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';
import Eyebrow from '@/components/branded/Eyebrow';

export interface SanityCourse {
  title?: string;
  slug?: { current?: string };
  track?: string;
  audience?: string;
  duration?: string;
  description?: string;
  relatedBrands?: Array<{ name?: string; slug?: { current?: string } }>;
  trackLabel?: string;
  levelLabel?: string;
  modules?: Array<{ title?: string; body?: string; duration?: string }>;
  prerequisites?: string[];
  machineLabel?: string;
}

interface Props {
  data: SanityCourse | null;
  slug: string;
}

export default function BrandedCourseClient({ data, slug }: Props) {
  if (!data?.title) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Course" slug={slug} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <CourseStyles />
      <Hero data={data} />
      {data.modules && data.modules.length > 0 && <Modules modules={data.modules} />}
      {data.prerequisites && data.prerequisites.length > 0 && <Prerequisites items={data.prerequisites} />}
      <Instructor />
      <CTA title={data.title} />
    </BrandedPageShell>
  );
}

function CourseStyles() {
  return (
    <style>{`
      .branded-crs-acc summary {
        list-style: none;
        cursor: pointer;
        padding: 18px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        font-family: var(--font-montserrat), system-ui, sans-serif;
        font-weight: 700;
        font-size: 15px;
        color: var(--branded-black);
        transition: color 0.18s ease;
      }
      .branded-crs-acc summary:hover { color: var(--branded-red); }
      .branded-crs-acc summary::-webkit-details-marker { display: none; }
      .branded-crs-acc summary::after {
        content: "+";
        font-family: var(--font-barlow-condensed), "Barlow Condensed", sans-serif;
        font-style: italic;
        font-weight: 700;
        font-size: 24px;
        color: var(--branded-red);
        line-height: 1;
        flex-shrink: 0;
        transition: transform 0.2s ease;
      }
      .branded-crs-acc details[open] summary::after { content: "−"; }
      .branded-crs-acc details { border-bottom: 1px solid var(--branded-gray-200); }
      .branded-crs-acc { border-top: 1px solid var(--branded-gray-200); }
    `}</style>
  );
}

function Hero({ data }: { data: SanityCourse }) {
  const pills = [
    data.trackLabel ?? data.track,
    data.audience,
    data.levelLabel,
    data.duration,
  ].filter(Boolean) as string[];
  return (
    <section style={{ background: 'var(--branded-gray-50)', padding: '80px 0' }}>
      <div style={{ ...CONTAINER, maxWidth: '900px' }}>
        {pills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {pills.map((p, i) => (
              <span
                key={i}
                style={{
                  fontFamily: FONT_ACCENT,
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  background: i === 0 ? 'var(--branded-red)' : 'var(--branded-white)',
                  color: i === 0 ? 'var(--branded-white)' : 'var(--branded-gray-700)',
                  border: i === 0 ? 'none' : '1px solid var(--branded-gray-200)',
                  borderRadius: 'var(--branded-r-sm)',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        )}
        <Eyebrow>Phillips Education</Eyebrow>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, letterSpacing: '-1.4px', color: 'var(--branded-black)', margin: '0 0 20px' }}>
          {data.title}
        </h1>
        {data.description && <p style={{ fontSize: '17px', color: 'var(--branded-gray-700)', lineHeight: 1.7, marginBottom: '24px' }}>{data.description}</p>}
        {data.machineLabel && (
          <div style={{ ...META_LABEL, fontSize: '12px' }}>Machines: {data.machineLabel}</div>
        )}
      </div>
    </section>
  );
}

function Modules({ modules }: { modules: NonNullable<SanityCourse['modules']> }) {
  return (
    <BrandedSection>
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>What You&rsquo;ll Learn</Eyebrow>
        <h2 style={SECTION_HEADING}>Course Modules</h2>
      </div>
      <BrandedCard padding="40px">
        <div className="branded-crs-acc">
          {modules.map((m, i) => (
            <details key={i} {...(i === 0 ? { open: true } : {})}>
              <summary>
                <span>
                  <span style={{ color: 'var(--branded-red)', marginRight: '8px' }}>{String(i + 1).padStart(2, '0')}</span>
                  {m.title}
                  {m.duration && <span style={{ ...META_LABEL, marginLeft: '12px', fontSize: '11px' }}>{m.duration}</span>}
                </span>
              </summary>
              <div style={{ padding: '0 0 20px', fontSize: '14px', color: 'var(--branded-gray-600)', lineHeight: 1.7 }}>
                {m.body}
              </div>
            </details>
          ))}
        </div>
      </BrandedCard>
    </BrandedSection>
  );
}

function Prerequisites({ items }: { items: string[] }) {
  return (
    <BrandedSection variant="soft" tight>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
        <div>
          <Eyebrow>Before You Enroll</Eyebrow>
          <h2 style={{ ...SECTION_HEADING, fontSize: '28px' }}>Prerequisites</h2>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', background: 'var(--branded-red)', color: 'var(--branded-white)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '11px', marginTop: '2px' }}>
                ✓
              </span>
              <span style={{ fontSize: '15px', color: 'var(--branded-gray-700)', lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </BrandedSection>
  );
}

function Instructor() {
  // TODO(schema-extension): add `instructor` reference field to course schema
  // (could point at `teamMember`) — for now a generic credential block.
  return (
    <BrandedSection>
      <BrandedCard accent="topLeft" padding="48px">
        <h2 style={{ ...SECTION_HEADING, marginTop: '28px', marginBottom: '14px', fontSize: '28px' }}>Taught by Phillips Instructors</h2>
        <p style={{ color: 'var(--branded-gray-600)', maxWidth: '640px', fontSize: '15px', lineHeight: 1.7 }}>
          All Phillips courses are delivered by certified applications engineers with deep, hands-on experience on the machines you&rsquo;ll be running.
        </p>
      </BrandedCard>
    </BrandedSection>
  );
}

function CTA({ title }: { title: string }) {
  return (
    <BrandedSection variant="soft">
      <div style={{ textAlign: 'center' }}>
        <Eyebrow>Ready to Enroll?</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, marginBottom: '24px' }}>Reserve Your Seat in {title}</h2>
        <Btn href="#">Enroll Now</Btn>
      </div>
    </BrandedSection>
  );
}
