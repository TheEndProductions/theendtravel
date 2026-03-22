'use client';
import PieceSelector from '@/components/endless/PieceSelector';
import BundleComparison from '@/components/endless/BundleComparison';
import KickstarterCTA from '@/components/endless/KickstarterCTA';

const Section = ({ children, bg }: { children: React.ReactNode; bg?: string }) => (
  <section style={{ padding: '80px 24px', background: bg || 'transparent' }}>
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>{children}</div>
  </section>
);

export default function EndlessClient() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', overflow: 'hidden' }}>
        <img src="/endless-hero-banner.jpg" alt="The Endless Backpack" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.0) 10%, rgba(10,10,10,0.15) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', textAlign: 'center', padding: '80px 24px' }}>
                    <h1 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, color: '#F5F2ED', margin: 0, lineHeight: 1.15 }}>
            <span style={{ display: 'block', fontSize: 'clamp(40px, 8vw, 64px)', marginBottom: '8px' }}>Endless.</span>
            <span style={{ display: 'block', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 400, color: '#D4CFC7' }}>An Ecosystem, Not Just a Bag</span>
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.7, margin: 0, maxWidth: '640px' }}>Most travel bags solve one problem. You end up buying five bags that don't work together. The Endless Ecosystem is four pieces engineered as one — they nest, attach, and adapt so you carry exactly what you need, whether that's a week in Southeast Asia or an afternoon in your own city.</p>
        </div>
      </section>

      {/* Pieces */}
      <Section>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>The Ecosystem</div>
        <PieceSelector />
      </Section>

      {/* Bundle */}
      <Section>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Pricing</div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: '0 0 32px' }}>Individual or The Ecosystem</h2>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 500px' }}>
            <BundleComparison />
          </div>
          <div style={{ flex: '0 1 320px', padding: '28px', borderRadius: '12px', border: '1px solid rgba(245,242,237,0.06)', background: 'rgba(10,10,10,0.4)', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Launching Soon</div>
            <KickstarterCTA source="endless-pricing" compact />
          </div>
        </div>
      </Section>

      {/* In the Wild */}
      <Section bg="rgba(26,21,16,0.3)">
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>In the Wild</div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: '0 0 24px' }}>Tested on the Road</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {[{ loc: 'Torres del Paine, Chile', story: 'Five days on the W Trek. The pack handled everything.' },
            { loc: 'Hallstatt, Austria', story: 'The daypack was perfect for day hikes. Light enough to forget.' },
            { loc: 'Chefchaouen, Morocco', story: 'Every wall is a different shade of blue. The sling was ideal for exploring.' }
          ].map((item) => (
            <div key={item.loc} style={{ padding: '20px', borderRadius: '10px', border: '1px solid rgba(245,242,237,0.06)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355' }}>{item.loc}</div>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#D4CFC7', lineHeight: 1.6, margin: 0 }}>{item.story}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section bg="rgba(26,21,16,0.3)">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Ready for Every Journey</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.7, margin: 0, maxWidth: '500px' }}>The Endless Ecosystem was designed by travelers, tested on the road, and built to last.</p>
          <KickstarterCTA source="endless-footer" />
        </div>
      </Section>
    </div>
  );
}
