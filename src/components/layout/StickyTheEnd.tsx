'use client';
import { useState, useEffect } from 'react';

export default function StickyTheEnd() {
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
        <img src="/logo-theend.png" alt="The End" style={{ height: '24px', width: 'auto', display: 'block' }} />
      </a>
    </div>
  );
}
