import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hand of Humanity — TheEndProductions',
  description: 'Our non-profit giving back every step of the way. 10% of all proceeds fund projects around the world.',
};

export default function HandOfHumanityPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>

      {/* Hero */}
      <section style={{ padding: '160px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Our Non-Profit</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 600, color: '#F5F2ED', margin: 0, lineHeight: 1.15 }}>Hand of Humanity</h1>
          <div style={{ width: '40px', height: '1px', background: 'rgba(245,242,237,0.15)', marginTop: '8px' }} />
        </div>
      </section>

      {/* Main Message */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0 }}>In everyone's journey comes a time when you could extend a helping hand to those in need, in small or big ways this becomes true. We believe in this virtue with our whole being, that's why we created Hand of Humanity.</p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0 }}>Our rhyme, our reason, our muse, however you want to refer to it, we believe in giving back, every step of the way.</p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0 }}>At The End, we extend an open hand to all, inviting you to join our community. Here, every ending is merely the beginning of another beautiful journey.</p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0 }}>That's why your support of our brand and our gear doesn't end with us. <span style={{ color: '#F5F2ED', fontWeight: 600 }}>10% of all proceeds</span> go towards the creation, operation & the growth of our non-profit organization Hand of Humanity.</p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0 }}>These strides will be documented and shared with the community here on our website and through our email list. Be a part of the journey below.</p>
        </div>
      </section>

      <div style={{ maxWidth: '700px', margin: '0 auto', height: '1px', background: 'rgba(245,242,237,0.06)' }} />

      {/* Projects / Stories */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Our Work</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 600, color: '#F5F2ED', margin: '0 0 32px' }}>Stories From the Field</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Clean Water Initiative', location: 'Port-au-Prince, Haiti', date: 'Nov 2024', excerpt: 'Partnered with local organizations to install water filtration systems serving communities in need.' },
              { title: 'School Rebuild Project', location: 'Kathmandu, Nepal', date: 'Feb 2025', excerpt: 'After the earthquake, we helped rebuild a primary school serving 200 children.' },
              { title: 'Youth Photography Workshop', location: 'Nairobi, Kenya', date: 'Jun 2025', excerpt: 'Teaching visual storytelling to young people who have stories the world needs to hear.' },
            ].map((project) => (
              <div key={project.title} style={{ padding: '24px', borderRadius: '12px', border: '1px solid rgba(245,242,237,0.06)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355' }}>{project.location} · {project.date}</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>{project.title}</h3>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: 'rgba(212,207,199,0.6)', lineHeight: 1.65, margin: 0 }}>{project.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '800px', margin: '0 auto', height: '1px', background: 'rgba(245,242,237,0.06)' }} />

      {/* Join / Email CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Be Part of the Journey</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Join Our Community</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.7, margin: 0 }}>Stay connected with our projects, stories, and the impact your support makes around the world.</p>
          <a href="/community" style={{ display: 'inline-flex', alignItems: 'center', height: '48px', padding: '0 32px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none', marginTop: '8px' }}>Join the Community →</a>
        </div>
      </section>
    </div>
  );
}
