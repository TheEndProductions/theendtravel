'use client';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Films', href: '/films' },
  { label: 'Journal', href: '/journal' },
  { label: 'Journey Map', href: '/journey-map' },
  { label: 'Shop', href: '/shop' },
  { label: 'The Endless Backpack', href: '/endless' },
  { label: 'Hand of Humanity', href: '/hand-of-humanity' },
  { label: 'Community', href: '/community/submit' },
  { label: 'Mission', href: '/mission' },
  { label: 'Contact', href: '/contact' },
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10001, width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(245,242,237,0.15)', background: open ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)', backdropFilter: 'blur(12px)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', transition: 'background 0.2s' }}>
        <span style={{ display: 'block', width: '18px', height: '1.5px', background: '#F5F2ED', transition: 'transform 0.3s, opacity 0.3s', transform: open ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
        <span style={{ display: 'block', width: '18px', height: '1.5px', background: '#F5F2ED', transition: 'opacity 0.3s', opacity: open ? 0 : 1 }} />
        <span style={{ display: 'block', width: '18px', height: '1.5px', background: '#F5F2ED', transition: 'transform 0.3s, opacity 0.3s', transform: open ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
      </button>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>TheEndProductions</div>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 600, color: '#F5F2ED', textDecoration: 'none', padding: '10px 0', opacity: 0.8 }}>{label}</a>
          ))}
        </div>
      )}
    </>
  );
}
