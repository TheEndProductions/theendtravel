import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Our Mission — TheEndProductions', description: 'Thoughtful design, built to last, for a purpose.' };
export default function MissionPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <section style={{ padding: '160px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Our Mission</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 600, color: '#F5F2ED', margin: 0, lineHeight: 1.15 }}>Built Different. Built With Purpose.</h1>
          <div style={{ width: '40px', height: '1px', background: 'rgba(245,242,237,0.15)', marginTop: '8px' }} />
        </div>
      </section>
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>01</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Thoughtful Design.</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0, maxWidth: '640px' }}>We know what it is like to live by your gear. Every decision that goes into our design process has your adventures in mind. Made by travelers, for travelers. Sustainably and responsibly sourced.</p>
        </div>
      </section>
      <div style={{ maxWidth: '800px', margin: '0 auto', height: '1px', background: 'rgba(245,242,237,0.06)' }} />
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>02</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Made to Live.</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0, maxWidth: '640px' }}>We guarantee build quality to withstand the test of life, time, and travel. If at any time at all our bags defect or do not perform to our standards, we will get you a new bag. We make gear for those that need their gear to work for them when it counts the most.</p>
        </div>
      </section>
      <div style={{ maxWidth: '800px', margin: '0 auto', height: '1px', background: 'rgba(245,242,237,0.06)' }} />
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>03</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>For a Purpose.</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0, maxWidth: '640px' }}>At The End, we extend an open hand to all, inviting you to join our community. Here, every ending is merely the beginning of another beautiful journey.</p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0, maxWidth: '640px' }}>Your support of our brand and our gear does not end with us. <span style={{ color: '#F5F2ED', fontWeight: 600 }}>10% of all profits</span> go towards the creation, operation, and growth of our non-profit organization, Hand of Humanity.</p>
        </div>
      </section>
      <div style={{ maxWidth: '800px', margin: '0 auto', height: '1px', background: 'rgba(245,242,237,0.06)' }} />
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Every Journey Gives Back</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Hand of Humanity</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.7, margin: 0, maxWidth: '480px' }}>Clean water initiatives, school rebuilds, and youth photography programs around the world. Travel should leave places better than we found them.</p>
          <a href="/hand-of-humanity" style={{ display: 'inline-flex', alignItems: 'center', height: '48px', padding: '0 32px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none', marginTop: '8px' }}>Learn About Our Non-Profit →</a>
        </div>
      </section>
    </div>
  );
}
