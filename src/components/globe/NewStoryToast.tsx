'use client';
import { useEffect, useState } from 'react';
import { CATEGORY_COLORS } from '@/lib/globe/constants';

interface ToastPin { _id: string; title: string; category: string; locationName: string; }

interface Props { pin: ToastPin; onDismiss: () => void; onClick: () => void; }

export default function NewStoryToast({ pin, onDismiss, onClick }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => { setVisible(false); setTimeout(onDismiss, 300); }, 8000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const color = CATEGORY_COLORS[pin.category] || '#D4CFC7';

  return (
    <div
      onClick={onClick}
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed', bottom: '24px', left: '24px', zIndex: 50,
        background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(245,242,237,0.08)',
        borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px',
        cursor: 'pointer', maxWidth: '360px',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        opacity: visible ? 1 : 0, transition: 'all 0.3s ease',
      }}
    >
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
      <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#D4CFC7', flex: 1 }}>
        A new story appeared in <strong style={{ color: '#F5F2ED' }}>{pin.locationName}</strong>
      </div>
      <div style={{ color: '#8B7355', fontSize: '14px', flexShrink: 0 }}>→</div>
      <button onClick={(e) => { e.stopPropagation(); setVisible(false); setTimeout(onDismiss, 300); }} style={{ background: 'none', border: 'none', color: 'rgba(245,242,237,0.3)', fontSize: '16px', cursor: 'pointer', padding: '0 0 0 4px' }} aria-label="Dismiss">×</button>
    </div>
  );
}
