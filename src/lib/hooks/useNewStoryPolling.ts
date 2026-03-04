'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

interface NewPin { _id: string; title: string; category: string; latitude: number; longitude: number; locationName: string; coverImageUrl?: string; }

export function useNewStoryPolling(enabled: boolean = true) {
  const [newPin, setNewPin] = useState<NewPin | null>(null);
  const [isSilenced, setIsSilenced] = useState(false);
  const arrivedAt = useRef(new Date().toISOString());

  const dismiss = useCallback(() => setNewPin(null), []);
  const silence = useCallback(() => { setIsSilenced(true); setNewPin(null); }, []);

  useEffect(() => {
    if (!enabled || isSilenced) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/globe/latest?since=${arrivedAt.current}`);
        const data = await res.json();
        if (data.newPin) {
          setNewPin(data.newPin);
          arrivedAt.current = new Date().toISOString();
        }
      } catch {}
    }, 180000);
    return () => clearInterval(interval);
  }, [enabled, isSilenced]);

  return { newPin, dismiss, silence, isSilenced };
}
