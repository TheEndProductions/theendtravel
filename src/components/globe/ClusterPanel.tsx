'use client';
import { useGlobe } from './GlobeProvider';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/globe/constants';
import type { GlobePin } from '@/types/globe';

function PinList({ pins, title, onPinClick, onClose }: { pins: GlobePin[]; title: string; onPinClick: (pin: GlobePin) => void; onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, width: '380px', height: '100%',
      background: 'rgba(10,10,10,0.95)', borderLeft: '1px solid rgba(245,242,237,0.08)',
      overflowY: 'auto', zIndex: 10, display: 'flex', flexDirection: 'column',
    }} role="dialog" aria-label={title}>
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(245,242,237,0.06)' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>
          {pins.length} {pins.length === 1 ? 'Story' : 'Stories'}
        </div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>
          {title}
        </h2>
      </div>

      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {pins.map((pin) => {
          const color = CATEGORY_COLORS[pin.category] || '#F5F2ED';
          return (
            <button
              key={pin.id}
              onClick={() => onPinClick(pin)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '14px 12px', borderRadius: '8px', border: 'none',
                background: 'transparent', cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.2s', width: '100%',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,242,237,0.04)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: color, marginTop: '4px', flexShrink: 0,
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: 600, color: '#F5F2ED' }}>
                  {pin.title}
                </div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355' }}>
                  {CATEGORY_LABELS[pin.category]} · {pin.locationName}
                </div>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '12px', color: 'rgba(212,207,199,0.5)', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {pin.excerpt}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px',
          borderRadius: '50%', border: 'none', background: 'rgba(10,10,10,0.7)',
          color: '#F5F2ED', fontSize: '18px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label="Close panel"
      >×</button>
    </div>
  );
}

export default function ClusterPanel() {
  const { selectedClusterPins, selectCluster, selectPin, activeFilter, filteredPins, setFilter, selectedPin } = useGlobe();

  // Don't show if a single pin is selected
  if (selectedPin) return null;

  // Show cluster list
  if (selectedClusterPins.length > 0) {
    return (
      <PinList
        pins={selectedClusterPins}
        title="Nearby Pins"
        onPinClick={(pin) => { selectCluster([]); selectPin(pin); }}
        onClose={() => selectCluster([])}
      />
    );
  }

  // Show filtered category list
  if (activeFilter !== 'all') {
    const label = CATEGORY_LABELS[activeFilter] || activeFilter;
    return (
      <PinList
        pins={filteredPins}
        title={label}
        onPinClick={(pin) => { selectPin(pin); }}
        onClose={() => setFilter('all')}
      />
    );
  }

  return null;
}
