'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyLogo() {
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
      top: '12px',
      left: '12px',
      zIndex: 10001,
      display: 'block',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
    }}>
      <img src="/logo-hand.png" alt="TheEndProductions" style={{ height: 'var(--logo-height)', width: 'auto', display: 'block' }} />
    </a>
  );
}
