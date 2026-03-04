'use client';
import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '@/lib/cookies';

const COOKIE_KEY = 'theend_hook_seen';

export function useCinematicHook() {
  const [shouldShowHook, setShouldShowHook] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const seen = getCookie(COOKIE_KEY);
    setIsFirstVisit(!seen);
    setShouldShowHook(true);
  }, []);

  const markAsSeen = () => { setCookie(COOKIE_KEY, 'true', 30); };

  return { shouldShowHook, isFirstVisit, markAsSeen };
}
