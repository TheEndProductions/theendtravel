'use client';
import { ENDLESS_PIECES, BUNDLE_PRICE, BUNDLE_SAVINGS } from '@/lib/config/kickstarter';

export default function BundleComparison() {
  const individualTotal = ENDLESS_PIECES.reduce((s, p) => s + p.priceIndividual, 0);

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>
      {/* Individual */}
      <div style={{ flex: '1 1 260px', padding: '28px', borderRadius: '12px', border: '1px solid rgba(245,242,237,0.08)', background: 'rgba(10,10,10,0.4)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Individual Pieces</div>
        {ENDLESS_PIECES.map((p) => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"DM Sans", sans-serif', fontSize: '14px' }}>
            <span style={{ color: '#D4CFC7' }}>{p.name}</span>
            <span style={{ color: 'rgba(212,207,199,0.5)' }}>${p.priceIndividual}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(245,242,237,0.08)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#D4CFC7' }}>Total</span>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 600, color: 'rgba(245,242,237,0.4)', textDecoration: 'line-through' }}>${individualTotal}</span>
        </div>
      </div>

      {/* Bundle */}
      <div style={{ flex: '1 1 260px', padding: '28px', borderRadius: '12px', border: '1px solid #C4530A', background: 'rgba(196,83,10,0.06)', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-12px', right: '16px', padding: '4px 12px', borderRadius: '10px', background: '#C4530A', color: '#F5F2ED', fontSize: '11px', fontFamily: '"JetBrains Mono", monospace', fontWeight: 600 }}>BEST VALUE</div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>The Endless System</div>
        <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#D4CFC7', lineHeight: 1.5 }}>All 4 pieces. One system. Built to work together.</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: 'auto' }}>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 600, color: '#F5F2ED' }}>${BUNDLE_PRICE}</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: '#C4530A' }}>Save ${BUNDLE_SAVINGS}</span>
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'rgba(212,207,199,0.4)' }}>${Math.round(BUNDLE_PRICE / 4)} per piece</div>
      </div>
    </div>
  );
}
