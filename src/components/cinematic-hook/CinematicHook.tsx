'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useHookTimeline, phaseOpacity } from './useHookTimeline';
import HookCrossfade from './HookCrossfade';
import HookHeadline from './HookHeadline';
import HookSkipButton from './HookSkipButton';

const HookGlobe = dynamic(() => import('./HookGlobe'), { ssr: false });

type Capability = 'full' | 'reduced' | 'static';

function detectCapability(): Capability {
  if (typeof window === 'undefined') return 'static';
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (!gl2) return 'reduced';
    const debug = gl2.getExtension('WEBGL_debug_renderer_info');
    if (debug) {
      const renderer = gl2.getParameter(debug.UNMASKED_RENDERER_WEBGL).toLowerCase();
      if (renderer.includes('swiftshader') || renderer.includes('llvmpipe')) return 'reduced';
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced';
    return 'full';
  } catch { return 'static'; }
}

interface Props { onComplete: () => void; isFirstVisit: boolean; }

export default function CinematicHook({ onComplete, isFirstVisit }: Props) {
  const [capability, setCapability] = useState<Capability>('static');
  const { phase, elapsed, start, skipNow } = useHookTimeline(onComplete);

  useEffect(() => {
    setCapability(detectCapability());
    const timer = setTimeout(start, 100);
    return () => clearTimeout(timer);
  }, [start]);

  if (phase === 'complete') return null;

  const overlayOpacity = phaseOpacity(elapsed, 0, 0, 13.0, 14.5);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#0A0A0A', opacity: overlayOpacity }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)' }} />
      {capability === 'full' ? (
        <HookGlobe elapsed={elapsed} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0A0A0A 70%)', opacity: phaseOpacity(elapsed, 1.5, 4.0) }} />
      )}
      <HookCrossfade elapsed={elapsed} />
      <HookHeadline elapsed={elapsed} />
      {!isFirstVisit && <HookSkipButton onSkip={skipNow} />}
    </div>
  );
}
