'use client';
import { useState } from 'react';
import HomepageEndlessSection from '@/components/endless/HomepageEndlessSection';
import HeroVideo from '@/components/layout/HeroVideo';

const Section = ({ children, bg, id }: { children: React.ReactNode; bg?: string; id?: string }) => (
  <section id={id} style={{ padding: '100px 24px', background: bg || 'transparent' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>{children}</div>
  </section>
);

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>{children}</div>
);

export default function HomepageClient() {

  return (
    <>
      <div>

        {/* 1. Hero */}
        <section id="hero" style={{ position: 'relative', width: '100vw', height: '70svh', overflow: 'hidden', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
            <HeroVideo hookDone={true} />
            <div style={{ position: 'relative', zIndex: 1, height: '70svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', maxWidth: '720px', padding: '0 24px' }}>
            <SectionEyebrow>TheEndProductions</SectionEyebrow>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(28px, 6vw, 64px)', fontWeight: 600, color: '#F5F2ED', margin: 0, lineHeight: 1.1 }}>To See The World<br /><em style={{ fontWeight: 400, color: '#8B7355' }}>& To Find Each Other</em></h1>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.7, margin: 0, maxWidth: '540px' }}>Travel filmmaking, expedition gear, and stories from the road. A creative studio built on the belief that human connection is the greatest adventure.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
              <a href="/journey-map" style={{ display: 'inline-flex', alignItems: 'center', height: '48px', padding: '0 28px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none' }}>Explore the Map →</a>
              <a href="/films" style={{ display: 'inline-flex', alignItems: 'center', height: '48px', padding: '0 28px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Watch Films</a>
            </div>
          </div>
        </section>

        {/* 2. Mission */}
        <Section bg="rgba(26,21,16,0.3)">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <SectionEyebrow>Our Mission</SectionEyebrow>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>We believe the best stories are found, not scripted.</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.7, margin: 0 }}>Every film, every product, every project begins with a simple question: what happens when you show up with an open heart? The End Productions exists at the intersection of adventure, storytelling, and the quiet moments that change everything.</p>
          </div>
        </Section>

        {/* 3. Films */}
        <Section>
          <SectionEyebrow>Films</SectionEyebrow>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0, marginBottom: '24px' }}>Stories From The Road</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {['The Edge of Somewhere', 'Still Walking', 'Between Walls'].map((title, i) => (
              <div key={title} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(245,242,237,0.06)' }}>
                <div style={{ aspectRatio: '16/9', background: `linear-gradient(135deg, hsl(${i * 30 + 20}, 20%, 12%) 0%, #0A0A0A 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: 'rgba(245,242,237,0.3)', fontFamily: '"JetBrains Mono", monospace' }}>[FILM STILL]</div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 600, color: '#F5F2ED', margin: '0 0 6px' }}>{title}</h3>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: 'rgba(212,207,199,0.6)', margin: 0 }}>{i === 2 ? 'In Production' : 'Short Film'}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="/films" style={{ display: 'inline-flex', marginTop: '24px', fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#C4530A', textDecoration: 'none', fontWeight: 600 }}>View All Films →</a>
        </Section>

        {/* 4. Endless Backpack */}
        <Section bg="rgba(26,21,16,0.3)" id="endless">
          <SectionEyebrow>Gear</SectionEyebrow>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0, marginBottom: '32px' }}>The Endless Backpack System</h2>
          <HomepageEndlessSection />
        </Section>

        {/* 5. Journal */}
        <Section>
          <SectionEyebrow>Journal</SectionEyebrow>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0, marginBottom: '24px' }}>Words From The Road</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {['The Art of Getting Lost', 'Letters from Alfama', 'What the River Knows'].map((title, i) => (
              <div key={title} style={{ padding: '24px', borderRadius: '10px', border: '1px solid rgba(245,242,237,0.06)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355' }}>{['Kyoto, Japan', 'Lisbon, Portugal', 'Varanasi, India'][i]}</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>{title}</h3>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: 'rgba(212,207,199,0.6)', lineHeight: 1.6, margin: 0 }}>A story from the road, waiting to be read.</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. Journey Map teaser */}
        <Section bg="rgba(26,21,16,0.3)">
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px', aspectRatio: '16/10', borderRadius: '12px', background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: 'rgba(245,242,237,0.3)', fontFamily: '"JetBrains Mono", monospace' }}>[GLOBE PREVIEW]</div>
            <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SectionEyebrow>Journey Map</SectionEyebrow>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Every Pin Is a Story</h2>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#D4CFC7', lineHeight: 1.65, margin: 0 }}>An interactive globe with every film location, journal entry, gear sighting, and humanitarian project. Community members can add their own stories too.</p>
              <a href="/journey-map" style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', height: '44px', padding: '0 24px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none' }}>Explore the Globe →</a>
            </div>
          </div>
        </Section>

        {/* 7. Hand of Humanity */}
        <Section>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <SectionEyebrow>Hand of Humanity</SectionEyebrow>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Every Journey Gives Back</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.7, margin: 0 }}>A portion of every purchase funds clean water initiatives, school rebuilds, and youth photography programs around the world. Travel should leave places better than we found them.</p>
            <a href="/hand-of-humanity" style={{ display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 24px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>See Our Projects →</a>
          </div>
        </Section>

        {/* 8. Community */}
        <Section bg="rgba(26,21,16,0.3)">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <SectionEyebrow>Community</SectionEyebrow>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Your Story Belongs Here</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.7, margin: 0 }}>Share your own travel story and become part of the Journey Map. Every community submission adds a new pin to the globe.</p>
            <a href="/community/submit" style={{ display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 24px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none' }}>Submit Your Story →</a>
          </div>
        </Section>

        {/* 9. Footer */}
        <footer style={{ padding: '48px 24px', borderTop: '1px solid rgba(245,242,237,0.06)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: '#8B7355', letterSpacing: '0.1em' }}>TheEndProductions</div>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: 'rgba(212,207,199,0.4)', marginTop: '8px' }}>To see the world & to find each other.</p>
            </div>
            <div style={{ display: 'flex', gap: '24px', fontFamily: '"DM Sans", sans-serif', fontSize: '13px' }}>
              {[['Films', '/films'], ['Journal', '/journal'], ['Journey Map', '/journey-map'], ['Shop', '/shop'], ['Mission', '/mission'], ['Contact', '/contact']].map(([label, href]) => (
                <a key={label} href={href} style={{ color: 'rgba(212,207,199,0.5)', textDecoration: 'none' }}>{label}</a>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: '1200px', margin: '24px auto 0', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'rgba(212,207,199,0.25)' }}>© {new Date().getFullYear()} TheEndProductions. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}
