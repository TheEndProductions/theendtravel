'use client';
import { phaseOpacity } from './useHookTimeline';

export default function HookHeadline({ elapsed }: { elapsed: number }) {
  const words = [
    { text: 'To See The World', start: 3.5 },
    { text: '&', start: 4.2 },
    { text: 'To Find Each Other', start: 4.7 },
  ];
  const brandOpacity = phaseOpacity(elapsed, 5.5, 6.0, 7.0, 8.0);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', gap: '8px' }}>
      {words.map(({ text, start }) => {
        const opacity = phaseOpacity(elapsed, start, start + 0.4, 7.0, 8.0);
        const translateY = opacity < 1 ? (1 - opacity) * 14 : 0;
        return (
          <div key={text} style={{ fontFamily: '"Playfair Display", serif', fontSize: text === '&' ? '20px' : '42px', fontWeight: 600, color: '#F5F2ED', opacity, transform: `translateY(${translateY}px)`, transition: 'none', letterSpacing: text === '&' ? '0.1em' : '-0.01em' }}>
            {text}
          </div>
        );
      })}
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#8B7355', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: brandOpacity, marginTop: '16px' }}>TheEndProductions</div>
    </div>
  );
}
