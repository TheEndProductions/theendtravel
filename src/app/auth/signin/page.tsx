'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try { await signIn('resend', { email, callbackUrl: '/community/submit' }); }
    catch { setStatus('error'); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#8B7355', letterSpacing: '0.15em', textTransform: 'uppercase' }}>TheEndProductions</div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Enter the Community</h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#D4CFC7', lineHeight: 1.6, margin: 0 }}>Share your story with the world. We'll send you a link to sign in — no password needed.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="email" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
          <input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} style={{ height: '48px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '16px', fontFamily: '"DM Sans", sans-serif', padding: '0 16px', outline: 'none' }} autoFocus autoComplete="email" />
        </div>
        <button onClick={handleSubmit} disabled={status === 'loading'} style={{ height: '48px', borderRadius: '6px', border: 'none', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, cursor: 'pointer', opacity: status === 'loading' ? 0.6 : 1 }}>{status === 'loading' ? 'Sending...' : 'Continue Your Journey →'}</button>
        {status === 'error' && <p style={{ fontSize: '13px', color: '#C4530A', margin: 0 }}>Something went wrong. Please try again.</p>}
        <p style={{ fontSize: '13px', color: 'rgba(212,207,199,0.5)', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>We'll send a magic link to your inbox. It expires in 24 hours.</p>
      </div>
    </div>
  );
}
