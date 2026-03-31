'use client';
import { useState } from 'react';
import type { JournalEntry } from './types';

interface BookShelfProps {
  journals: JournalEntry[];
  onSelect: (journal: JournalEntry) => void;
}

export default function BookShelf({ journals, onSelect }: BookShelfProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        padding: '40px 40px 0',
      }}>
        {journals.map((journal) => {
          const isHovered = hoveredId === journal.id;
          return (
            <button
              key={journal.id}
              onClick={() => onSelect(journal)}
              onMouseEnter={() => setHoveredId(journal.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                transition: 'transform 0.4s ease',
                transform: isHovered ? 'translateY(-12px)' : 'translateY(0)',
              }}
            >
              <div style={{
                width: '140px',
                height: '200px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-4px',
                  top: '4px',
                  width: '20px',
                  height: '100%',
                  background: journal.spineColor,
                  borderRadius: '3px 0 0 3px',
                  transform: 'rotateY(-15deg)',
                  transformOrigin: 'right center',
                  boxShadow: isHovered ? '-8px 8px 24px rgba(0,0,0,0.6)' : '-4px 4px 12px rgba(0,0,0,0.4)',
                  transition: 'box-shadow 0.4s ease',
                }} />
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '2px 6px 6px 2px',
                  background: `linear-gradient(145deg, ${journal.coverColor} 0%, ${journal.spineColor} 100%)`,
                  boxShadow: isHovered
                    ? '4px 8px 24px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.2)'
                    : '2px 4px 12px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.15)',
                  transition: 'box-shadow 0.4s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px 16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: '8px',
                    border: '1px solid rgba(196,156,80,0.2)',
                    borderRadius: '2px',
                  }} />
                  <div style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'rgba(245,242,237,0.85)',
                    textAlign: 'center',
                    lineHeight: 1.4,
                    position: 'relative',
                    zIndex: 1,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  }}>
                    {journal.title}
                  </div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '8px',
                    color: 'rgba(196,156,80,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginTop: '12px',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    {journal.author}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    width: '30px',
                    height: '1px',
                    background: 'rgba(196,156,80,0.25)',
                  }} />
                </div>
                <div style={{
                  position: 'absolute',
                  right: '-2px',
                  top: '6px',
                  width: '3px',
                  height: 'calc(100% - 12px)',
                  background: 'repeating-linear-gradient(to bottom, #D4C9A8 0px, #D4C9A8 1px, #C4B898 1px, #C4B898 2px)',
                  borderRadius: '0 2px 2px 0',
                  opacity: 0.6,
                }} />
              </div>
              <div style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '12px',
                color: isHovered ? '#F5F2ED' : 'rgba(212,207,199,0.5)',
                transition: 'color 0.3s ease',
                maxWidth: '140px',
                textAlign: 'center',
                lineHeight: 1.4,
              }}>
                {journal.location}
              </div>
            </button>
          );
        })}

        {[1, 2, 3].map((i) => (
          <div key={`empty-${i}`} style={{
            width: '140px',
            height: '200px',
            borderRadius: '6px',
            border: '1px dashed rgba(245,242,237,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              color: 'rgba(245,242,237,0.1)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>Coming Soon</div>
          </div>
        ))}
      </div>

      <div style={{
        height: '12px',
        background: 'linear-gradient(to bottom, #3D2B1A, #2A1E12)',
        borderRadius: '0 0 4px 4px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        maxWidth: '900px',
        margin: '0 auto',
      }} />
    </div>
  );
}
