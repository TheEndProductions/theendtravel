'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyLogo() {
  const pathname = usePathname();
  if (pathname === '/journey-map') return null;

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a href="/" aria-label="Home"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        top: '12px',
        left: '12px',
        zIndex: 10001,
        display: 'block',
        opacity: visible ? 1 : 0,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        filter: hovered ? 'drop-shadow(0 8px 20px rgba(0,0,0,0.6)) drop-shadow(0 2px 6px rgba(0,0,0,0.4))' : 'none',
        transition: 'opacity 0.6s ease, transform 0.3s ease, filter 0.3s ease',
      }}>
      <img src="/logo-hand.png" alt="TheEndProductions" style={{ height: 'var(--logo-height)', width: 'auto', display: 'block' }} />
    </a>
  );
}
