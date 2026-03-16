'use client';
import { useState, useCallback, useRef } from 'react';
import { useGlobe } from './GlobeProvider';
import type { PinCategory } from '@/types/globe';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/globe/constants';

const FILTERS: (PinCategory | 'all')[] = ['all', 'film', 'journal', 'gear', 'humanitarian', 'story'];

export default function GlobeHeader() {
  const { activeFilter, setFilter, setSearch, searchQuery } = useGlobe();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = useCallback((val: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(val), 200);
  }, [setSearch]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', padding: '12px 16px' }}>
      <input
        type="text"
        placeholder="Search places..."
        defaultValue={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search globe locations"
        style={{ height: '36px', borderRadius: '18px', border: '1px solid rgba(245,242,237,0.12)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '13px', fontFamily: '"DM Sans", sans-serif', padding: '0 16px', outline: 'none', minWidth: '160px' }}
      />
      {FILTERS.map((f) => {
        const isActive = activeFilter === f;
        const color = f === 'all' ? '#F5F2ED' : CATEGORY_COLORS[f];
        return (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={isActive}
            style={{ height: '32px', padding: '0 14px', borderRadius: '16px', border: isActive ? `1px solid ${color}` : '1px solid rgba(245,242,237,0.1)', background: isActive ? `${color}22` : 'transparent', color: isActive ? color : 'rgba(245,242,237,0.5)', fontSize: '12px', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
          >
            {f === 'all' ? 'All' : CATEGORY_LABELS[f]}
          </button>
        );
      })}
      <a href="/" aria-label="Home" style={{ marginLeft: 'auto', opacity: 0.85, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}>
        <img src="/logo.png" alt="Home" style={{ height: '45px', width: 'auto' }} />
      </a>
    </div>
  );
}
