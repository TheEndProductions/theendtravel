import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SAMPLE_PINS } from '@/data/samplePins';
import GlobeProvider from '@/components/globe/GlobeProvider';
import GlobeHeader from '@/components/globe/GlobeHeader';
import GlobeStats from '@/components/globe/GlobeStats';
import PinDetailPanel from '@/components/globe/PinDetailPanel';
import ClusterPanel from '@/components/globe/ClusterPanel';

const GlobeCanvas = dynamic(() => import('@/components/globe/GlobeCanvas'), { ssr: false });

export const metadata: Metadata = {
  title: 'Journey Map',
  description: 'Explore the globe. Every pin is a story — films, journal entries, gear in the wild, and humanitarian projects.',
};

export default async function JourneyMapPage() {
  // In production: fetch from Sanity
  // const pins = await sanityClient.fetch(ALL_PINS_QUERY);
  const pins = SAMPLE_PINS;

  return (
    <GlobeProvider pins={pins}>
      <div style={{ width: '100vw', height: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <GlobeHeader />
        <div style={{ flex: 1, position: 'relative' }}>
          <GlobeCanvas />
          <PinDetailPanel />
          <ClusterPanel />
        </div>
        <GlobeStats />
      </div>
    </GlobeProvider>
  );
}
