'use client';

import { useState, useEffect } from 'react';

export default function StickyLogo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <a href="/" aria-label="Home" style={{
      position: 'fixed',
      top: '12px',
      left: '12px',
      zIndex: 10001,
      display: 'block',
      opacity: 0.85,
      transition: 'opacity 0.2s',
    }}
    onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
    onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.85'; }}
    >
      <img src="/logo.png" alt="TheEndProductions" style={{ height: isMobile ? '30px' : '200px', width: 'auto', display: 'block' }} />
    </a>
  );
}
