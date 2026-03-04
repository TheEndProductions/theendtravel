export default function CheckEmailPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontSize: '48px' }}>✉</div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Check Your Inbox</h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#D4CFC7', lineHeight: 1.6, margin: 0 }}>We sent you a magic link. Click it to continue your journey. The link expires in 24 hours.</p>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'rgba(139,115,85,0.7)', lineHeight: 1.5, margin: 0 }}>Don't see it? Check spam. The email comes from hello@theendtravel.com.</p>
      </div>
    </div>
  );
}
