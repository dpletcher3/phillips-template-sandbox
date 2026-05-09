import {
  BrandedImage,
  BrandedPageShell,
  Btn,
  CONTAINER,
  FONT_DISPLAY,
  META_LABEL,
  NoContentYet,
  SECTION_HEADING,
} from './_shared/branded-helpers';
import BrandedSection from '@/components/branded/BrandedSection';
import BrandedCard from '@/components/branded/BrandedCard';
import Eyebrow from '@/components/branded/Eyebrow';

export interface SanityLocation {
  name?: string;
  slug?: { current?: string };
  region?: string;
  address?: string;
  phone?: string;
  photo?: unknown;
  services?: string[];
  eyebrow?: string;
  hours?: string;
  marqueeItems?: string[];
  directionsUrl?: string;
}

interface Props {
  data: SanityLocation | null;
  slug: string;
}

export default function BrandedLocationClient({ data, slug }: Props) {
  if (!data?.name) {
    return (
      <BrandedPageShell>
        <NoContentYet type="Location" slug={slug} />
      </BrandedPageShell>
    );
  }
  return (
    <BrandedPageShell>
      <Hero data={data} />
      <MapAndContact data={data} />
      {data.services && data.services.length > 0 && <Services services={data.services} />}
    </BrandedPageShell>
  );
}

function Hero({ data }: { data: SanityLocation }) {
  return (
    <section style={{ background: 'var(--branded-white)' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 6', minHeight: '400px', background: 'var(--branded-gray-100)', overflow: 'hidden' }}>
        <BrandedImage image={data.photo} alt={data.name ?? 'Location'} width={1600} height={600} fill priority sizes="100vw" />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.32) 100%)' }} />
      </div>
      <div style={{ ...CONTAINER, marginTop: '-100px', position: 'relative', zIndex: 2 }}>
        <BrandedCard accent="topLeft" padding="40px" background="var(--branded-white)">
          <Eyebrow>{data.eyebrow ?? data.region ?? 'Location'}</Eyebrow>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1, letterSpacing: '-1.4px', color: 'var(--branded-black)', margin: '12px 0 16px' }}>
            {data.name}
          </h1>
          {data.address && (
            <p style={{ fontSize: '16px', color: 'var(--branded-gray-700)', lineHeight: 1.5, marginBottom: '16px' }}>{data.address}</p>
          )}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {data.phone && <Btn href={`tel:${data.phone}`} withArrow={false}>Call {data.phone}</Btn>}
            {data.directionsUrl && <Btn href={data.directionsUrl} variant="ghost">Get Directions</Btn>}
          </div>
        </BrandedCard>
      </div>
    </section>
  );
}

function MapAndContact({ data }: { data: SanityLocation }) {
  return (
    <BrandedSection>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px', alignItems: 'stretch' }}>
        <MapPlaceholder address={data.address ?? ''} />
        <HoursContactCard data={data} />
      </div>
    </BrandedSection>
  );
}

function MapPlaceholder({ address }: { address: string }) {
  // TODO(schema-extension): wire to a real embed (Google Maps iframe / Mapbox)
  // once the schema includes lat/lng or a place ID.
  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #ECF1F4 0%, #D9E3EB 100%)',
        borderRadius: 'var(--branded-r-lg)',
        overflow: 'hidden',
        aspectRatio: '4 / 3',
        boxShadow: 'var(--branded-shadow-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at center, var(--branded-gray-300) 1px, transparent 1.5px)', backgroundSize: '14px 14px', opacity: 0.4 }} />
      <div style={{ position: 'relative', textAlign: 'center', zIndex: 1, padding: '40px' }}>
        <div style={{ width: '48px', height: '48px', background: 'var(--branded-red)', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', margin: '0 auto 24px', position: 'relative', boxShadow: 'var(--branded-shadow-red)' }}>
          <span aria-hidden="true" style={{ position: 'absolute', inset: '14px', borderRadius: '50%', background: 'var(--branded-white)' }} />
        </div>
        <Eyebrow>Map</Eyebrow>
        <p style={{ fontSize: '15px', color: 'var(--branded-gray-700)', maxWidth: '320px', margin: '12px auto 0', lineHeight: 1.5 }}>{address}</p>
      </div>
    </div>
  );
}

function HoursContactCard({ data }: { data: SanityLocation }) {
  return (
    <BrandedCard accent="leftBorder" padding="32px">
      {data.hours && (
        <>
          <Eyebrow>Hours</Eyebrow>
          <p style={{ fontSize: '15px', color: 'var(--branded-gray-700)', whiteSpace: 'pre-line', lineHeight: 1.7, margin: '12px 0 24px' }}>
            {data.hours}
          </p>
        </>
      )}
      <Eyebrow>Contact</Eyebrow>
      <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.phone && (
          <li style={{ fontSize: '14px', color: 'var(--branded-gray-700)' }}>
            <strong style={{ ...META_LABEL, fontSize: '11px', display: 'inline-block', marginRight: '8px' }}>Phone</strong>
            <a href={`tel:${data.phone}`} style={{ color: 'var(--branded-black)', fontWeight: 600 }}>{data.phone}</a>
          </li>
        )}
        {data.address && (
          <li style={{ fontSize: '14px', color: 'var(--branded-gray-700)' }}>
            <strong style={{ ...META_LABEL, fontSize: '11px', display: 'inline-block', marginRight: '8px' }}>Address</strong>
            {data.address}
          </li>
        )}
      </ul>
    </BrandedCard>
  );
}

function Services({ services }: { services: string[] }) {
  return (
    <BrandedSection variant="soft">
      <div style={{ marginBottom: '32px' }}>
        <Eyebrow>What We Offer Here</Eyebrow>
        <h2 style={SECTION_HEADING}>Services at this location</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {services.map((s, i) => (
          <div
            key={i}
            style={{
              padding: '20px 24px',
              background: 'var(--branded-white)',
              borderRadius: 'var(--branded-r-md)',
              border: '1px solid var(--branded-gray-200)',
              borderTop: '3px solid var(--branded-red)',
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--branded-black)',
              boxShadow: 'var(--branded-shadow-sm)',
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </BrandedSection>
  );
}
