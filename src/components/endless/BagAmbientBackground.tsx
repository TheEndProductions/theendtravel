'use client';
import { ENDLESS_PIECES } from '@/lib/config/kickstarter';

interface Props {
  activeId: string;
  opacity?: number;
}

export default function BagAmbientBackground({ activeId, opacity = 0.55 }: Props) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {ENDLESS_PIECES.map((p) => {
        const bg = (p as { bg?: string }).bg;
        if (!bg) return null;

        const isActive = activeId === p.id;
        const isVideo = bg.endsWith('.mp4') || bg.endsWith('.webm') || bg.endsWith('.mov');
        const layerStyle: React.CSSProperties = {
          position: 'absolute',
          inset: 0,
          opacity: isActive ? opacity : 0,
          transition: 'opacity 600ms ease',
          transform: 'scale(1.04)',
          filter: 'blur(2px)',
          width: '100%',
          height: '100%',
        };

        if (isVideo) {
          return (
            <video
              key={p.id}
              src={bg}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              style={{ ...layerStyle, objectFit: 'cover' }}
            />
          );
        }

        return (
          <div
            key={p.id}
            style={{
              ...layerStyle,
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        );
      })}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.55) 100%)' }} />
    </div>
  );
}
