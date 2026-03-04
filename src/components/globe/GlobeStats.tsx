'use client';
import { useMemo } from 'react';
import { useGlobe } from './GlobeProvider';

export default function GlobeStats() {
  const { pins } = useGlobe();
  const countries = useMemo(() => new Set(pins.map((p) => p.country).filter(Boolean)).size, [pins]);
  const films = useMemo(() => pins.filter((p) => p.category === 'film').length, [pins]);

  return (
    <div style={{ padding: '8px 16px', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'rgba(212,207,199,0.5)', letterSpacing: '0.05em' }}>
      {pins.length} locations · {countries} countries · {films} films
    </div>
  );
}
