'use client';
import { CROSSFADE_IMAGES } from './hookConstants';
import { phaseOpacity } from './useHookTimeline';

export default function HookCrossfade({ elapsed }: { elapsed: number }) {
  const windowOpacity = phaseOpacity(elapsed, 4.0, 4.3, 6.0, 6.3);
  if (windowOpacity <= 0) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
      {CROSSFADE_IMAGES.map((bg, i) => {
        const start = 4.0 + i * 0.6;
        const opacity = phaseOpacity(elapsed, start, start + 0.3, start + 0.5, start + 0.8);
        return (
          <div key={i} style={{ position: 'absolute', inset: 0, background: bg, opacity: opacity * 0.35 * windowOpacity }} />
        );
      })}
    </div>
  );
}
