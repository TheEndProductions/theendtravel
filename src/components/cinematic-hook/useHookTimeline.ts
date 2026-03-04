'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

export type HookPhase = 'idle' | 'stars' | 'globe' | 'markers' | 'crossfade' | 'headline' | 'dissolve' | 'complete';

const PHASE_TIMINGS: { phase: HookPhase; start: number; end: number }[] = [
  { phase: 'stars', start: 0, end: 1.5 },
  { phase: 'globe', start: 1.5, end: 4.0 },
  { phase: 'markers', start: 4.0, end: 7.0 },
  { phase: 'crossfade', start: 7.0, end: 9.5 },
  { phase: 'headline', start: 9.5, end: 13.0 },
  { phase: 'dissolve', start: 13.0, end: 14.5 },
];

const TOTAL_DURATION = 14.5;

export function phaseOpacity(elapsed: number, fadeIn: number, fadeInEnd: number, fadeOut?: number, fadeOutEnd?: number): number {
  if (elapsed < fadeIn) return 0;
  if (elapsed < fadeInEnd) return (elapsed - fadeIn) / (fadeInEnd - fadeIn);
  if (fadeOut === undefined || fadeOutEnd === undefined) return 1;
  if (elapsed < fadeOut) return 1;
  if (elapsed < fadeOutEnd) return 1 - (elapsed - fadeOut) / (fadeOutEnd - fadeOut);
  return 0;
}

export function useHookTimeline(onComplete: () => void) {
  const [phase, setPhase] = useState<HookPhase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(0);

  const tick = useCallback((now: number) => {
    const el = (now - startRef.current) / 1000;
    setElapsed(el);
    const current = PHASE_TIMINGS.find((p) => el >= p.start && el < p.end);
    if (current) setPhase(current.phase);
    if (el >= TOTAL_DURATION) { setPhase('complete'); onComplete(); return; }
    rafRef.current = requestAnimationFrame(tick);
  }, [onComplete]);

  const start = useCallback(() => {
    startRef.current = performance.now();
    setPhase('stars');
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const skipNow = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPhase('complete');
    setElapsed(TOTAL_DURATION);
    onComplete();
  }, [onComplete]);

  useEffect(() => { return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }; }, []);

  return { phase, elapsed, start, skipNow };
}
