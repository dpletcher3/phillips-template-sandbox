import {
  BrandedPageShell,
  Btn,
  CONTAINER,
  FONT_ACCENT,
  FONT_DISPLAY,
  NoContentYet,
  SECTION_HEADING,
  imageUrl,
} from './_shared/branded-helpers';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';
import RedBlockFrame from '@/components/branded/RedBlockFrame';
import Eyebrow from '@/components/branded/Eyebrow';

export interface SanityTeamMember {
  name?: string;
  slug?: { current?: string };
  title?: string;
  photo?: unknown;
  bio?: string;
  isLeadership?: boolean;
  linkedinUrl?: string;
  issueLabel?: string;
  facts?: Array<{ label?: string; value?: string }>;
}

interface Props {
  data: SanityTeamMember | null;
  slug: string;
}

export default function BrandedTeamMemberClient({ data, slug }: Props) {
  if (!data?.name) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Team Member" slug={slug} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero data={data} />
      {data.bio && <Bio bio={data.bio} />}
      {data.facts && data.facts.length > 0 && <ExpertisePills facts={data.facts} />}
      <ContactStrip linkedinUrl={data.linkedinUrl} />
      <OtherMembers />
    </BrandedPageShell>
  );
}

function Hero({ data }: { data: SanityTeamMember }) {
  const photoUrl = imageUrl(data.photo, 720, 900);
  return (
    <section style={{ background: 'var(--branded-white)', padding: '64px 0' }}>
      <div style={CONTAINER}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.8fr) 1.4fr', gap: '64px', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {photoUrl ? (
              <RedBlockFrame src={photoUrl} alt={data.name ?? 'Portrait'} />
            ) : (
              <div style={{ width: '320px', aspectRatio: '4/5', background: 'var(--branded-gray-100)', borderRadius: 'var(--branded-r-md)' }} />
            )}
          </div>
          <div>
            {data.isLeadership && <Eyebrow>Leadership</Eyebrow>}
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1, letterSpacing: '-1.4px', color: 'var(--branded-black)', margin: '0 0 12px' }}>
              {data.name}
            </h1>
            {data.title && (
              <p style={{ fontFamily: FONT_ACCENT, fontStyle: 'italic', fontWeight: 700, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--branded-red)', marginBottom: '20px' }}>
                {data.title}
              </p>
            )}
            {data.issueLabel && (
              <p style={{ fontSize: '15px', color: 'var(--branded-gray-600)', maxWidth: '480px', lineHeight: 1.65 }}>
                {data.issueLabel}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Bio({ bio }: { bio: string }) {
  return (
    <BrandedSection variant="soft" tight>
      <article style={{ maxWidth: '720px', margin: '0 auto', fontSize: '17px', lineHeight: 1.75, color: 'var(--branded-gray-700)' }}>
        {bio.split(/\n\n+/).map((p, i) => (
          <p key={i} style={{ marginBottom: '20px' }}>{p}</p>
        ))}
      </article>
    </BrandedSection>
  );
}

function ExpertisePills({ facts }: { facts: NonNullable<SanityTeamMember['facts']> }) {
  return (
    <BrandedSection tight>
      <div style={{ marginBottom: '24px' }}>
        <Eyebrow>Expertise</Eyebrow>
        <h2 style={{ ...SECTION_HEADING, fontSize: '28px' }}>Areas of Focus</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {facts.map((fact, i) => (
          <BrandedCard key={i} accent="leftBorder" padding="24px">
            {fact.value && (
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: '24px', color: 'var(--branded-red)', lineHeight: 1, marginBottom: '8px' }}>
                {fact.value}
              </div>
            )}
            <div style={{ fontSize: '13px', color: 'var(--branded-gray-700)', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 600 }}>
              {fact.label}
            </div>
          </BrandedCard>
        ))}
      </div>
    </BrandedSection>
  );
}

function ContactStrip({ linkedinUrl }: { linkedinUrl?: string }) {
  return (
    <BrandedSection variant="soft">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '32px 40px',
          background: 'var(--branded-white)',
          border: '1px solid var(--branded-gray-200)',
          borderRadius: 'var(--branded-r-lg)',
          boxShadow: 'var(--branded-shadow-md)',
        }}
      >
        <div>
          <Eyebrow>Get in Touch</Eyebrow>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: 0 }}>Reach out for a project conversation</h3>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Btn href="mailto:contact@phillipscorp.com">Email</Btn>
          {linkedinUrl && <Btn href={linkedinUrl} variant="ghost">LinkedIn</Btn>}
        </div>
      </div>
    </BrandedSection>
  );
}

function OtherMembers() {
  // TODO(schema-extension): query other team members (e.g. same department or
  // limit by isLeadership) — for now, link back to the home/team listing.
  return (
    <BrandedSection>
      <BrandedCard accent="leftBorder" padding="32px">
        <Eyebrow>Meet the rest of the team</Eyebrow>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: '20px', color: 'var(--branded-black)', margin: '8px 0 20px' }}>
          Phillips engineers are here to help.
        </h3>
        <Btn href="/branded">All Team Members</Btn>
      </BrandedCard>
    </BrandedSection>
  );
}
