import type { Metadata } from 'next';
import JournalClient from './JournalClient';

export const metadata: Metadata = {
  title: 'Journal — TheEndProductions',
  description: 'Stories from the road. Handwritten reflections, travel journals, and community stories.',
};

export default function JournalPage() {
  return <JournalClient />;
}
