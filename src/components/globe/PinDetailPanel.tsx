'use client';
import { useGlobe } from './GlobeProvider';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/globe/constants';

const YOUTUBE_MAP: Record<string, string> = { 'i-once-imagined': 'Ts9Xr9Nvz3w' };

export default function PinDetailPanel() {
  const { selectedPin, selectPin } = useGlobe();
  if (!selectedPin) return null;

  const color = CATEGORY_COLORS[selectedPin.category];

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, width: '380px', height: '100%', background: 'rgba(10,10,10,0.95)', borderLeft: '1px solid rgba(245,242,237,0.08)', overflowY: 'auto', zIndex: 10, display: 'flex', flexDirection: 'column' }} role="dialog" aria-label="Pin details">
      {/* Cover */}
      {selectedPin.relatedLinks.filmSlug && YOUTUBE_MAP[selectedPin.relatedLinks.filmSlug] ? (
        <div style={{ aspectRatio: '16/9', background: '#000' }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_MAP[selectedPin.relatedLinks.filmSlug]}?modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={selectedPin.title}
          />
        </div>
      ) : (
        <div style={{ height: '200px', background: `linear-gradient(135deg, ${color}33, #0A0A0A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: 'rgba(245,242,237,0.3)', fontFamily: '"JetBrains Mono", monospace' }}>
          [COVER IMAGE]
        </div>
      )}

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Category badge */}
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '4px 10px', borderRadius: '12px', background: `${color}22`, color, fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {CATEGORY_LABELS[selectedPin.category]}
        </div>

        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>{selectedPin.title}</h2>

        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#8B7355' }}>
          {selectedPin.locationName}{selectedPin.dateISO && ` · ${new Date(selectedPin.dateISO).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
        </div>

        {selectedPin.authorName && (
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: 'rgba(212,207,199,0.6)' }}>by {selectedPin.authorName}</div>
        )}

        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#D4CFC7', lineHeight: 1.65, margin: 0 }}>{selectedPin.excerpt}</p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          {selectedPin.relatedLinks.filmSlug && (
            <a href={`/films/${selectedPin.relatedLinks.filmSlug}`} style={{ padding: '8px 16px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', textDecoration: 'none', fontWeight: 600 }}>Watch Film →</a>
          )}
          {selectedPin.relatedLinks.journalSlug && (
            <a href={`/journal/${selectedPin.relatedLinks.journalSlug}`} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', color: '#F5F2ED', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Read Story →</a>
          )}
          {selectedPin.relatedLinks.productHandle && (
            <a href={`/shop/all/${selectedPin.relatedLinks.productHandle}`} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', color: '#F5F2ED', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Shop Gear →</a>
          )}
        </div>

        {selectedPin.gearUsed && selectedPin.gearUsed.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Gear Used</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {selectedPin.gearUsed.map((g) => (
                <span key={g} style={{ padding: '3px 8px', borderRadius: '10px', background: 'rgba(139,115,85,0.15)', color: '#D4CFC7', fontSize: '11px', fontFamily: '"DM Sans", sans-serif' }}>{g}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Close button */}
      <button onClick={() => selectPin(null)} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: 'rgba(10,10,10,0.7)', color: '#F5F2ED', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close panel">×</button>
    </div>
  );
}
