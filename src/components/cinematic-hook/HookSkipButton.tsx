'use client';

interface Props { onSkip: () => void; }

export default function HookSkipButton({ onSkip }: Props) {
  return (
    <button
      onClick={onSkip}
      aria-label="Skip intro"
      style={{
        position: 'absolute', bottom: '32px', right: '32px', zIndex: 10,
        padding: '8px 16px', borderRadius: '20px',
        border: '1px solid rgba(245,242,237,0.15)',
        background: 'rgba(10,10,10,0.5)', color: 'rgba(245,242,237,0.5)',
        fontSize: '12px', fontFamily: '"DM Sans", sans-serif',
        cursor: 'pointer', backdropFilter: 'blur(8px)',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#F5F2ED'; }}
      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(245,242,237,0.5)'; }}
    >
      Skip →
    </button>
  );
}
