'use client';
import { useState } from 'react';
import { ENDLESS_PIECES } from '@/lib/config/kickstarter';

export default function PieceSelector() {
  const [activeId, setActiveId] = useState('pack');
  const piece = ENDLESS_PIECES.find((p) => p.id === activeId)!;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(245,242,237,0.08)', paddingBottom: '0' }}>
        {ENDLESS_PIECES.map((p) => (
          <button key={p.id} onClick={() => setActiveId(p.id)} style={{ padding: '10px 20px', border: 'none', background: 'transparent', color: activeId === p.id ? '#F5F2ED' : 'rgba(245,242,237,0.4)', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: activeId === p.id ? 600 : 400, cursor: 'pointer', borderBottom: activeId === p.id ? '2px solid #C4530A' : '2px solid transparent', transition: 'all 0.2s' }}>
            {p.name.replace('The ', '')}
          </button>
        ))}
      </div>

      {/* Two-column layout: Media left, Info right */}
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {/* Media Slot */}
        <div style={{
          flex: '1 1 380px', aspectRatio: '4/5', borderRadius: '12px', overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(196,83,10,0.06) 0%, rgba(10,10,10,0.8) 100%)',
          border: '1px solid rgba(245,242,237,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}>
          {piece.media.src ? (
            piece.media.type === 'video' ? (
              <video
                key={piece.id}
                src={piece.media.src}
                muted
                loop
                playsInline
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                key={piece.id}
                src={piece.media.src}
                alt={piece.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,237,0.12)" strokeWidth="1.2">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'rgba(245,242,237,0.2)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{piece.name}</span>
            </div>
          )}
        </div>

        {/* Info right */}
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>{piece.name}</h3>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#D4CFC7', lineHeight: 1.65, margin: 0 }}>{piece.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {piece.features.map((f) => (
              <div key={f} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#D4CFC7', padding: '8px 0', borderBottom: '1px solid rgba(245,242,237,0.06)' }}>{f}</div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Specs</div>
            {Object.entries(piece.specs).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(245,242,237,0.06)' }}>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'rgba(212,207,199,0.5)' }}>{key}</span>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#D4CFC7' }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 600, color: '#F5F2ED', marginTop: '8px' }}>${piece.priceIndividual}</div>
        </div>
      </div>
    </div>
  );
}
