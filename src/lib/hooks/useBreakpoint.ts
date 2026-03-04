'use client';
import { useState, useEffect } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function getBreakpoint(w: number): Breakpoint {
  if (w >= 1024) return 'desktop';
  if (w >= 768) return 'tablet';
  return 'mobile';
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>('desktop');
  useEffect(() => {
    const h = () => setBp(getBreakpoint(window.innerWidth));
    h();
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return bp;
}

export function useIsMobile(): boolean { return useBreakpoint() === 'mobile'; }
export function useIsDesktop(): boolean { return useBreakpoint() === 'desktop'; }
