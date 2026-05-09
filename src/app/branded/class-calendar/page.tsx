import type { Metadata } from 'next';
import { client } from '../../../../sanity/lib/client';
import { classCalendarQuery } from '@/lib/queries';
import BrandedClassCalendarClient, { type SanityClassEvent } from '@/components/templates-branded/BrandedClassCalendarClient';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Class Calendar | Phillips',
  description: 'Upcoming Phillips training classes and registration',
};

export default async function BrandedClassCalendarPage() {
  const events = await client.fetch<SanityClassEvent[] | null>(classCalendarQuery).catch(() => null);
  return <BrandedClassCalendarClient events={events} />;
}
