'use client';
import { ENDLESS_PIECES } from '@/lib/config/kickstarter';

interface Props {
  activeId: string;
  opacity?: number;
}

export default function BagAmbientBackground({ activeId, opacity = 0.55 }: Props) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {ENDLESS_PIECES.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: activeId === p.id ? opacity : 0,
            transition: 'opacity 600ms ease',
            backgroundImage: `url(/endless-bg-${p.id}.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
            transform: 'scale(1.04)',
          }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.55) 100%)' }} />
    </div>
  );
}
