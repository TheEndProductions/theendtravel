'use client';
import { useState, useCallback } from 'react';
import type { JournalEntry } from './types';

interface JournalBookProps {
  journal: JournalEntry;
  onClose: () => void;
}

const PAPER_BG = '#D4C9A8';
const PAPER_DARK = '#C4B898';
const INK_COLOR = '#1A1610';

function CoffeeStain({ top, left, size, opacity }: { top: string; left: string; size: string; opacity: number }) {
  return (
    <div style={{
      position: 'absolute',
      top,
      left,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(ellipse at 40% 40%, rgba(139,100,60,${opacity}) 0%, rgba(139,100,60,${opacity * 0.3}) 50%, transparent 70%)`,
      pointerEvents: 'none',
    }} />
  );
}

function DogEar({ side }: { side: 'left' | 'right' }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      [side]: 0,
      width: '30px',
      height: '30px',
      background: `linear-gradient(${side === 'right' ? '315deg' : '225deg'}, ${PAPER_DARK} 50%, rgba(0,0,0,0.08) 50%)`,
      pointerEvents: 'none',
    }} />
  );
}

function PageNumber({ num, side }: { num: number; side: 'left' | 'right' }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      [side]: '28px',
      fontFamily: '"Caveat", cursive',
      fontSize: '14px',
      color: 'rgba(26,22,16,0.3)',
    }}>
      {num}
    </div>
  );
}

function SideNote({ text, top, right }: { text: string; top: string; right: string }) {
  return (
    <div style={{
      position: 'absolute',
      top,
      right,
      fontFamily: '"Caveat", cursive',
      fontSize: '12px',
      color: 'rgba(26,22,16,0.25)',
      transform: 'rotate(2deg)',
      maxWidth: '80px',
      lineHeight: 1.3,
      pointerEvents: 'none',
    }}>
      {text}
    </div>
  );
}

export default function JournalBook({ journal, onClose }: JournalBookProps) {
  const [currentPage, setCurrentPage] = useState(-1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'back'>('forward');
  const totalPages = journal.pages.length;

  const flipForward = useCallback(() => {
    if (isFlipping || currentPage >= totalPages - 1) return;
    setFlipDirection('forward');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setIsFlipping(false);
    }, 500);
  }, [isFlipping, currentPage, totalPages]);

  const flipBack = useCallback(() => {
    if (isFlipping || currentPage < -1) return;
    setFlipDirection('back');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setIsFlipping(false);
    }, 500);
  }, [isFlipping, currentPage]);

  const isCover = currentPage === -1;
  const isLastPage = currentPage === totalPages - 1;

  const pageDecorations: Record<number, JSX.Element> = {
    0: <CoffeeStain top="15%" left="72%" size="80px" opacity={0.15} />,
    2: <><DogEar side="right" /><SideNote text="remember this" top="30%" right="12px" /></>,
    3: <CoffeeStain top="60%" left="8%" size="60px" opacity={0.1} />,
    4: <SideNote text="the source" top="45%" right="16px" />,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        @keyframes flipForward {
          0% { transform: perspective(1200px) rotateY(0deg); }
          100% { transform: perspective(1200px) rotateY(-180deg); }
        }
        @keyframes flipBack {
          0% { transform: perspective(1200px) rotateY(-180deg); }
          100% { transform: perspective(1200px) rotateY(0deg); }
        }
        .page-flip-forward {
          animation: flipForward 0.5s ease-in-out forwards;
          transform-origin: left center;
        }
        .page-flip-back {
          animation: flipBack 0.5s ease-in-out forwards;
          transform-origin: left center;
        }
      `}</style>

      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(245,242,237,0.15)',
          background: 'rgba(10,10,10,0.8)',
          color: '#F5F2ED',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}
      >x</button>

      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
      }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          {journal.location} &middot; {journal.date}
        </div>
        <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '14px', color: 'rgba(212,207,199,0.5)' }}>
          by {journal.author}
        </div>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        aspectRatio: '3/4',
        cursor: 'pointer',
        userSelect: 'none',
      }}>
        <div
          onClick={flipBack}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '30%',
            height: '100%',
            zIndex: 20,
            cursor: currentPage > -1 ? 'w-resize' : 'default',
          }}
        />
        <div
          onClick={flipForward}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '70%',
            height: '100%',
            zIndex: 20,
            cursor: !isLastPage ? 'e-resize' : 'default',
          }}
        />

        {isCover ? (
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '4px 12px 12px 4px',
            background: `linear-gradient(145deg, ${journal.coverColor} 0%, ${journal.spineColor} 100%)`,
            boxShadow: '8px 8px 32px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: '16px',
              border: '1px solid rgba(196,156,80,0.25)',
              borderRadius: '4px',
            }} />
            <div style={{
              position: 'absolute',
              inset: '20px',
              border: '1px solid rgba(196,156,80,0.12)',
              borderRadius: '3px',
            }} />
            <h2 style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 700,
              color: 'rgba(245,242,237,0.9)',
              textAlign: 'center',
              lineHeight: 1.3,
              margin: 0,
              position: 'relative',
              zIndex: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}>
              {journal.title}
            </h2>
            <div style={{ width: '60px', height: '1px', background: 'rgba(196,156,80,0.3)', margin: '20px 0', position: 'relative', zIndex: 1 }} />
            <div style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '18px',
              color: 'rgba(196,156,80,0.6)',
              position: 'relative',
              zIndex: 1,
            }}>
              {journal.author}
            </div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              color: 'rgba(196,156,80,0.35)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginTop: '8px',
              position: 'relative',
              zIndex: 1,
            }}>
              {journal.location}
            </div>
            <div style={{
              position: 'absolute',
              bottom: '28px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              color: 'rgba(245,242,237,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Tap to open
            </div>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '8px',
              height: '100%',
              background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)',
              borderRadius: '4px 0 0 4px',
            }} />
            <div style={{
              position: 'absolute',
              right: '-3px',
              top: '8px',
              width: '5px',
              height: 'calc(100% - 16px)',
              background: 'repeating-linear-gradient(to bottom, #D4C9A8 0px, #D4C9A8 1px, #C4B898 1px, #C4B898 2px)',
              borderRadius: '0 3px 3px 0',
              opacity: 0.7,
            }} />
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '4px 8px 8px 4px',
            background: PAPER_BG,
            boxShadow: '6px 6px 24px rgba(0,0,0,0.4), inset 2px 0 8px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 30% 20%, transparent 40%, rgba(180,165,130,0.15) 100%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '20px',
              height: '100%',
              background: 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              inset: '60px 36px 50px 44px',
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(160,140,110,0.15) 31px, rgba(160,140,110,0.15) 32px)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'relative',
              zIndex: 2,
              padding: '52px 40px 60px 48px',
              height: '100%',
              overflowY: 'auto',
            }}>
              <p style={{
                fontFamily: '"Caveat", cursive',
                fontSize: 'clamp(18px, 2.5vw, 22px)',
                fontWeight: 500,
                color: INK_COLOR,
                lineHeight: 1.55,
                margin: 0,
                whiteSpace: 'pre-line',
              }}>
                {journal.pages[currentPage]?.content}
              </p>
            </div>
            {pageDecorations[currentPage]}
            <PageNumber num={currentPage + 1} side="right" />
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px',
                color: 'rgba(26,22,16,0.2)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                {currentPage + 1} / {totalPages}
              </span>
            </div>
          </div>
        )}

        {isFlipping && (
          <div
            className={flipDirection === 'forward' ? 'page-flip-forward' : 'page-flip-back'}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '4px 8px 8px 4px',
              background: flipDirection === 'forward' ? PAPER_BG : `linear-gradient(145deg, ${journal.coverColor}, ${journal.spineColor})`,
              boxShadow: '4px 4px 16px rgba(0,0,0,0.3)',
              zIndex: 15,
              backfaceVisibility: 'hidden',
            }}
          />
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '24px',
        alignItems: 'center',
      }}>
        <div
          onClick={() => setCurrentPage(-1)}
          style={{
            width: isCover ? '10px' : '6px',
            height: isCover ? '10px' : '6px',
            borderRadius: '50%',
            background: isCover ? '#C4530A' : 'rgba(245,242,237,0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        />
        {journal.pages.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(i)}
            style={{
              width: currentPage === i ? '10px' : '6px',
              height: currentPage === i ? '10px' : '6px',
              borderRadius: '50%',
              background: currentPage === i ? '#C4530A' : 'rgba(245,242,237,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '13px',
          color: '#8B7355',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Back to Shelf
      </button>
    </div>
  );
}
