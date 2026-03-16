'use client';

import { useEffect, useRef } from 'react';

const films = [
  {
    title: 'I Once Imagined',
    type: 'Short Film',
    location: 'Trail of Ten Falls, Oregon',
    description: 'A journey through ten waterfalls, each one a reflection on what it means to keep moving forward.',
    video: '',
    youtube: 'Ts9Xr9Nvz3w',
  },
  {
    title: 'The Edge of Somewhere',
    type: 'Short Film',
    location: 'Patagonia, Argentina',
    description: 'A solo journey to the southern edge of the world, where the wind speaks louder than words.',
    video: '',
    youtube: '',
  },
  {
    title: 'Still Walking',
    type: 'Short Film',
    location: 'Kyoto, Japan',
    description: 'An old man, a foreign traveler, and the temple path they share without a common language.',
    video: '',
    youtube: '',
  },
  {
    title: 'Between Walls',
    type: 'In Production',
    location: 'Fez, Morocco',
    description: 'Inside the medina, stories live in the walls. A film about the spaces between people.',
    video: '',
    youtube: '',
  },
];

function FilmCard({ film }: { film: typeof films[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(245,242,237,0.06)',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,83,10,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,242,237,0.06)';
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0A0A0A', overflow: 'hidden' }}>
        {film.youtube ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${film.youtube}?modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={film.title}
          />
        ) : film.video ? (
          <video
            ref={videoRef}
            src={film.video}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(196,83,10,0.08) 0%, #0A0A0A 100%)',
            }}
          >
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,237,0.15)" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'rgba(245,242,237,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Coming Soon</span>
            </div>
          </div>
        )}
        {film.type === 'In Production' && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '4px 10px',
              borderRadius: '4px',
              background: 'rgba(196,83,10,0.85)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              color: '#F5F2ED',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            In Production
          </div>
        )}
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>{film.location}</div>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 600, color: '#F5F2ED', margin: '0 0 8px' }}>{film.title}</h3>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: 'rgba(212,207,199,0.6)', lineHeight: 1.65, margin: 0 }}>{film.description}</p>
        <div style={{ marginTop: '12px', fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#C4530A', fontWeight: 600 }}>
          {film.type === 'In Production' ? 'Follow the Journey →' : 'Watch Film →'}
        </div>
      </div>
    </div>
  );
}

export default function FilmsClient() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <section style={{ padding: '160px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Films</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 600, color: '#F5F2ED', margin: 0, lineHeight: 1.15 }}>Stories From The Road</h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0, maxWidth: '540px' }}>Every film begins as a feeling. A conversation with a stranger, a sunrise that demanded witness, a question that wouldn't let go.</p>
          <div style={{ width: '40px', height: '1px', background: 'rgba(245,242,237,0.15)', marginTop: '8px' }} />
        </div>
      </section>

      <section style={{ padding: '0 24px 120px' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
          gap: '32px',
        }}>
          {films.map((film) => (
            <FilmCard key={film.title} film={film} />
          ))}
        </div>
      </section>
    </div>
  );
}
