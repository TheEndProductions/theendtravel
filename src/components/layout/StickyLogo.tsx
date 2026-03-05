'use client';

export default function StickyLogo() {
  return (
    <a href="/" aria-label="Home" style={{
      position: 'fixed',
      top: '18px',
      left: '20px',
      zIndex: 10001,
      display: 'block',
      opacity: 0.85,
      transition: 'opacity 0.2s',
    }}
    onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
    onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.85'; }}
    >
      <img src="/logo.png" alt="TheEndProductions" style={{ height: '180px', width: 'auto', display: 'block' }} />
    </a>
  );
}
