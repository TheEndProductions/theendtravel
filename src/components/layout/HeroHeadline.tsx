'use client';
import { useState, useEffect } from 'react';

export default function HeroHeadline() {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      setElapsed((now - start) / 1000);
      if ((now - start) / 1000 < 10) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  const fadeIn = (start: number, duration: number = 0.5) => {
    if (elapsed < start) return { opacity: 0, transform: 'translateY(16px)' };
    const t = Math.min((elapsed - start) / duration, 1);
    return { opacity: t, transform: `translateY(${(1 - t) * 16}px)` };
  };

  const line1 = fadeIn(0.5);
  const amp = fadeIn(1.2);
  const line2 = fadeIn(1.7);
  const subtitle = fadeIn(3.8, 0.8);
  const buttons = fadeIn(4.8, 0.8);

  return (
    <div id="hero-headline" style={{ position: 'relative', zIndex: 1, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 7vw, 56px)', fontWeight: 600, color: '#F5F2ED', lineHeight: 1.15, letterSpacing: '-0.01em', ...line1 }}>
        To See The World
      </div>
      <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 400, color: '#F5F2ED', letterSpacing: '0.1em', ...amp }}>
        &amp;
      </div>
      <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 7vw, 56px)', fontWeight: 600, color: '#F5F2ED', lineHeight: 1.15, letterSpacing: '-0.01em', ...line2 }}>
        To Find Each Other
      </div>

      <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(14px, 2.5vw, 17px)', color: '#D4CFC7', lineHeight: 1.7, margin: 0, maxWidth: '540px', marginTop: '20px', ...subtitle }}>
        Pack your bags, do what you love & seek what is meaningful all the way to The End.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px', justifyContent: 'center', ...buttons }}>
        <a href="/journey-map" style={{ display: 'inline-flex', alignItems: 'center', height: '48px', padding: '0 28px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none' }}>Explore the Map →</a>
        <a href="/films" style={{ display: 'inline-flex', alignItems: 'center', height: '48px', padding: '0 28px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', textDecoration: 'none' }}>Watch Films</a>
      </div>
    </div>
  );
}
