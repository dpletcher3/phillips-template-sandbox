import {
  BrandedImage,
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

export interface SanityWebinar {
  title?: string;
  slug?: { current?: string };
  scheduledAt?: string;
  status?: string; // 'Upcoming' | 'Live' | 'On-Demand'
  registrationUrl?: string;
  recordingUrl?: string;
  description?: string;
  relatedBrands?: Array<{ name?: string; slug?: { current?: string } }>;
  statusLabel?: string;
  speakers?: Array<{ name?: string; title?: string; bio?: string; photo?: unknown }>;
  agenda?: Array<{ time?: string; topic?: string }>;
  formTitle?: string;
}

interface Props {
  data: SanityWebinar | null;
  slug: string;
}

export default function BrandedWebinarClient({ data, slug }: Props) {
  if (!data?.title) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Webinar" slug={slug} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero data={data} />
      {data.speakers && data.speakers.length > 0 && <Speakers speakers={data.speakers} />}
      {data.agenda && data.agenda.length > 0 && <Agenda agenda={data.agenda} />}
      <FormPlaceholder formTitle={data.formTitle} registrationUrl={data.registrationUrl} status={data.status} />
      <RelatedWebinars />
    </BrandedPageShell>
  );
}

function Hero({ data }: { data: SanityWebinar }) {
  const status = data.statusLabel ?? data.status ?? 'Upcoming';
  const statusColor = status.toLowerCase().includes('live')
    ? 'var(--branded-red)'
    : status.toLowerCase().includes('demand')
    ? 'var(--branded-blue)'
    : 'var(--branded-gold)';
  return (
    <section style={{ background: 'var(--branded-gray-50)', padding: '80px 0' }}>
      <div style={{ ...CONTAINER, maxWidth: '900px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span
            style={{
              fontFamily: FONT_ACCENT,
              fontStyle: 'italic',
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '8px 14px',
              background: statusColor,
              color: 'var(--branded-white)',
              borderRadius: 'var(--branded-r-sm)',
            }}
          >
            {status}
          </span>
          {data.scheduledAt && (
            <span style={{ ...META_LABEL, fontSize: '13px', color: 'var(--branded-gray-700)' }}>
              {formatDateTime(data.scheduledAt)}
            </span>
          )}
        </div>
        <Eyebrow>Webinar</Eyebrow>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, letterSpacing: '-1.4px', color: 'var(--branded-black)', margin: '0 0 20px' }}>
          {data.title}
        </h1>
        {data.description && <p style={{ fontSize: '17px', color: 'var(--branded-gray-700)', lineHeight: 1.65, marginBottom: '28px', maxWidth: '720px' }}>{data.description}</p>}
        <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap' }}>
          {data.recordingUrl ? (
            <Btn href={data.recordingUrl}>Watch Recording</Btn>
          ) : data.registrationUrl ? (
            <Btn href={data.registrationUrl}>Register Now</Btn>
          ) : (
            <Btn href="#register">Register Now</Btn>
          )}
          <Btn href="#agenda" variant="ghost" withArrow={false}>View Agenda</Btn>
        </div>
      </div>
    </section>
  );
}

function Speakers({ speakers }: { speakers: NonNullable<SanityWebinar['speakers']> }) {
  return (
    <BrandedSection>
      <div style={{ marginBottom: '40px' }}>
        <Eyebrow>Featured Voices</Eyebrow>
        <h2 style={SECTION_HEADING}>Speakers</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '32px' }}>
        {speakers.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ width: '152px', height: '152px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 18px', background: 'var(--branded-gray-100)', border: '1px solid var(--branded-gray-200)', boxShadow: 'var(--branded-shadow-md)', position: 'relative' }}>
              <BrandedImage image={s.photo} alt={s.name ?? 'Speaker'} width={400} height={400} fill sizes="152px" />
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '15px', color: 'var(--branded-black)', marginBottom: '4px' }}>{s.name}</div>
            {s.title && <div style={{ fontSize: '13px', color: 'var(--branded-gray-500)', marginBottom: '12px' }}>{s.title}</div>}
            {s.bio && <p style={{ fontSize: '13px', color: 'var(--branded-gray-600)', lineHeight: 1.55, maxWidth: '240px', margin: '0 auto' }}>{s.bio}</p>}
          </div>
        ))}
      </div>
    </BrandedSection>
  );
}

function Agenda({ agenda }: { agenda: NonNullable<SanityWebinar['agenda']> }) {
  return (
    <section id="agenda">
      <BrandedSection variant="soft">
        <div style={{ marginBottom: '40px' }}>
          <Eyebrow>What We&rsquo;ll Cover</Eyebrow>
          <h2 style={SECTION_HEADING}>Agenda</h2>
        </div>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, maxWidth: '720px' }}>
          {agenda.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '24px',
                padding: '20px 0',
                borderBottom: i < agenda.length - 1 ? '1px solid var(--branded-gray-200)' : 'none',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '14px', color: 'var(--branded-red)', letterSpacing: '0.5px' }}>{item.time}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: '15px', color: 'var(--branded-black)', lineHeight: 1.5 }}>{item.topic}</span>
            </li>
          ))}
        </ol>
      </BrandedSection>
    </section>
  );
}

function FormPlaceholder({ formTitle, registrationUrl, status }: { formTitle?: string; registrationUrl?: string; status?: string }) {
  // TODO(schema-extension): wire registrationUrl to an actual embedded form
  // (HubSpot, Marketo, etc.) — for now this is a CTA card placeholder.
  return (
    <section id="register">
      <BrandedSection>
        <BrandedCard accent="topBorder" padding="48px" background="var(--branded-gray-50)">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
            <Eyebrow>Reserve Your Seat</Eyebrow>
            <h2 style={{ ...SECTION_HEADING, marginBottom: 0 }}>{formTitle ?? 'Register for the Webinar'}</h2>
            <p style={{ color: 'var(--branded-gray-600)', maxWidth: '520px', lineHeight: 1.65 }}>
              {status?.toLowerCase().includes('demand')
                ? 'Watch the recording at your convenience.'
                : 'A confirmation will be sent to the email you provide. You can add it to your calendar from the confirmation page.'}
            </p>
            {registrationUrl && <Btn href={registrationUrl}>{status?.toLowerCase().includes('demand') ? 'Watch Now' : 'Register Now'}</Btn>}
          </div>
        </BrandedCard>
      </BrandedSection>
    </section>
  );
}

function RelatedWebinars() {
  // TODO(schema-extension): the schema doesn't expose related webinars yet —
  // shipping a static "Browse all" CTA for now.
  return (
    <BrandedSection variant="soft" tight>
      <BrandedCard accent="leftBorder" padding="32px">
        <Eyebrow>More From Phillips</Eyebrow>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: '8px 0 20px' }}>Browse all webinars</h3>
        <Btn href="/branded">All Webinars</Btn>
      </BrandedCard>
    </BrandedSection>
  );
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch {
    return iso;
  }
}
