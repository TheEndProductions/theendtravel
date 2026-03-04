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

      {/* Content */}
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>{piece.name}</h3>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#D4CFC7', lineHeight: 1.65, margin: 0 }}>{piece.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
            {piece.features.map((f) => (
              <div key={f} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#D4CFC7', padding: '8px 0', borderBottom: '1px solid rgba(245,242,237,0.06)' }}>{f}</div>
            ))}
          </div>
        </div>
        <div style={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Specs</div>
          {Object.entries(piece.specs).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(245,242,237,0.06)' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'rgba(212,207,199,0.5)' }}>{key}</span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#D4CFC7' }}>{val}</span>
            </div>
          ))}
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 600, color: '#F5F2ED', marginTop: '12px' }}>${piece.priceIndividual}</div>
        </div>
      </div>
    </div>
  );
}
