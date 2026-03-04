'use client';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { GlobePin, PinCategory } from '@/types/globe';

interface GlobeContextType {
  pins: GlobePin[];
  filteredPins: GlobePin[];
  activeFilter: PinCategory | 'all';
  searchQuery: string;
  selectedPin: GlobePin | null;
  hoveredPin: GlobePin | null;
  cameraZoom: number;
  setFilter: (f: PinCategory | 'all') => void;
  setSearch: (q: string) => void;
  selectPin: (p: GlobePin | null) => void;
  hoverPin: (p: GlobePin | null) => void;
  setCameraZoom: (z: number) => void;
}

const GlobeContext = createContext<GlobeContextType | null>(null);

export function useGlobe() {
  const ctx = useContext(GlobeContext);
  if (!ctx) throw new Error('useGlobe must be inside GlobeProvider');
  return ctx;
}

export default function GlobeProvider({ pins: allPins, children }: { pins: GlobePin[]; children: React.ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<PinCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPin, setSelectedPin] = useState<GlobePin | null>(null);
  const [hoveredPin, setHoveredPin] = useState<GlobePin | null>(null);
  const [cameraZoom, setCameraZoom] = useState(2.8);

  const filteredPins = useMemo(() => {
    let result = allPins;
    if (activeFilter !== 'all') result = result.filter((p) => p.category === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.locationName.toLowerCase().includes(q) || (p.country && p.country.toLowerCase().includes(q)));
    }
    return result;
  }, [allPins, activeFilter, searchQuery]);

  const setFilter = useCallback((f: PinCategory | 'all') => setActiveFilter(f), []);
  const setSearch = useCallback((q: string) => setSearchQuery(q), []);
  const selectPin = useCallback((p: GlobePin | null) => setSelectedPin(p), []);
  const hoverPin = useCallback((p: GlobePin | null) => setHoveredPin(p), []);

  const value = useMemo(() => ({
    pins: allPins, filteredPins, activeFilter, searchQuery, selectedPin, hoveredPin, cameraZoom,
    setFilter, setSearch, selectPin, hoverPin, setCameraZoom,
  }), [allPins, filteredPins, activeFilter, searchQuery, selectedPin, hoveredPin, cameraZoom, setFilter, setSearch, selectPin, hoverPin]);

  return <GlobeContext.Provider value={value}>{children}</GlobeContext.Provider>;
}
