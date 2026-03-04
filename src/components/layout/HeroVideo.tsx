'use client';
import { useRef, useState, useEffect, useCallback } from 'react';

interface Props { hookDone: boolean; }

export default function HeroVideo({ hookDone }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ended, setEnded] = useState(false);

  // Play once hook finishes
  useEffect(() => {
    if (hookDone && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [hookDone]);

  // When video ends, pause on last frame
  const handleEnded = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration - 0.1;
      videoRef.current.pause();
    }
    setEnded(true);
  }, []);

  // Observe scroll — replay when scrolled back into view after it ended
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let wasOutOfView = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          wasOutOfView = true;
          video.pause();
        } else if (entry.isIntersecting && wasOutOfView) {
          video.currentTime = 0;
          video.play().catch(() => {});
          setEnded(false);
          wasOutOfView = false;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hookDone]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <video
        ref={videoRef}
        src="/hero-bg-web.mp4"
        muted
        playsInline
        onEnded={handleEnded}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.95) 100%)' }} />
    </div>
  );
}
