'use client';
import { useState, useEffect } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [pr, setPr] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPr(mq.matches);
    const h = (e: MediaQueryListEvent) => setPr(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return pr;
}
