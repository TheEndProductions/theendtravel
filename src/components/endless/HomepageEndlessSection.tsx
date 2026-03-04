'use client';
import { ENDLESS_PIECES } from '@/lib/config/kickstarter';
import KickstarterCTA from './KickstarterCTA';

export default function HomepageEndlessSection() {
  return (
    <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'center' }}>
      {/* Image placeholder */}
      <div style={{ flex: '1 1 400px', aspectRatio: '4/3', borderRadius: '12px', background: 'linear-gradient(135deg, #1a1510 0%, #0A0A0A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: 'rgba(245,242,237,0.3)', fontFamily: '"JetBrains Mono", monospace' }}>
        [THE ENDLESS SYSTEM — 4 pieces, dark editorial backdrop]
      </div>

      {/* Content */}
      <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Coming Soon</div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 600, color: '#F5F2ED', margin: 0, lineHeight: 1.2 }}>The Endless Backpack</h2>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#D4CFC7', lineHeight: 1.65, margin: 0 }}>A system, not just a bag. 4 pieces that work together to carry everything that matters.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ENDLESS_PIECES.map((p) => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(245,242,237,0.06)' }}>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#D4CFC7' }}>{p.name}</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'rgba(212,207,199,0.4)' }}>{p.specs.Volume}</span>
            </div>
          ))}
        </div>

        <KickstarterCTA compact source="homepage" />

        <a href="/endless" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#C4530A', textDecoration: 'none', fontWeight: 600 }}>Explore the Ecosystem →</a>
      </div>
    </div>
  );
}
