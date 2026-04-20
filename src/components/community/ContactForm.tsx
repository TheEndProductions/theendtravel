'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !message.trim()) { setError('Please fill out all fields.'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) { setError('Form not configured.'); return; }
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('email', email);
      fd.append('message', message);
      fd.append('_subject', `[CONTACT] ${name}`);
      const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  const inputStyle: React.CSSProperties = { height: '44px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', padding: '0 14px', outline: 'none', width: '100%' };

  if (status === 'success') {
    return (
      <div style={{ width: '100%', padding: '32px 24px', background: 'rgba(10,10,10,0.6)', border: '1px solid rgba(245,242,237,0.12)', borderRadius: '8px', textAlign: 'center', marginTop: '8px' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Received</div>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#F5F2ED', margin: 0, lineHeight: 1.6 }}>Message received. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
      <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
      <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
      <textarea placeholder="Your Message" rows={5} value={message} onChange={e => setMessage(e.target.value)} style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }} />
      {error && <div style={{ padding: '10px 14px', background: 'rgba(196,83,10,0.12)', border: '1px solid rgba(196,83,10,0.4)', borderRadius: '6px', color: '#F5F2ED', fontFamily: '"DM Sans", sans-serif', fontSize: '13px' }}>{error}</div>}
      <button type="submit" disabled={status === 'loading'} style={{ height: '48px', borderRadius: '6px', border: 'none', background: status === 'loading' ? 'rgba(196,83,10,0.4)' : '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, cursor: status === 'loading' ? 'default' : 'pointer', marginTop: '4px' }}>{status === 'loading' ? 'Sending...' : 'Send Message →'}</button>
    </form>
  );
}
