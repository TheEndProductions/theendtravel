'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyTheEnd() {
  const pathname = usePathname();
  if (pathname === '/journey-map') return null;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10001,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      pointerEvents: 'none',
    }}>
      <a href="/" style={{ pointerEvents: 'auto' }} aria-label="Home">
        <img src="/logo-theend.png" alt="The End" style={{ height: 'var(--theend-height)', width: 'auto', display: 'block' }} />
      </a>
    </div>
  );
}
