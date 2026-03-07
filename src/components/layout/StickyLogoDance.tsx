'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyLogoDance() {
  const pathname = usePathname();
  if (pathname === '/journey-map') return null;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a href="/" aria-label="Home" style={{
      position: 'fixed',
      top: '4px',
      right: '60px',
      zIndex: 10001,
      display: 'block',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
    }}>
      <img src="/logo-dance.png" alt="TheEndProductions" style={{ height: 'var(--dance-height)', width: 'auto', display: 'block' }} />
    </a>
  );
}
