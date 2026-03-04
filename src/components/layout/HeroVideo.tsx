'use client';
import { useRef, useState, useEffect } from 'react';

interface Props { hookDone: boolean; }

export default function HeroVideo({ hookDone }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Play once hook is done
  useEffect(() => {
    if (hookDone && videoRef.current && !hasPlayed) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setHasPlayed(true);
    }
  }, [hookDone, hasPlayed]);

  // Replay when scrolled back into view
  useEffect(() => {
    if (!hasPlayed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current && ended) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
          setEnded(false);
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.3 }
    );
    const el = videoRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [hasPlayed, ended]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <video
        ref={videoRef}
        src="/hero-bg-web.mp4"
        muted
        playsInline
        onEnded={() => setEnded(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: ended ? 0 : 1,
          transition: 'opacity 1s ease',
        }}
      />
      <LastFrameCapture videoRef={videoRef} show={ended} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.95) 100%)' }} />
    </div>
  );
}

function LastFrameCapture({ videoRef, show }: { videoRef: React.RefObject<HTMLVideoElement>; show: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (show && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        setCaptured(true);
      }
    }
  }, [show, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: show && captured ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    />
  );
}
