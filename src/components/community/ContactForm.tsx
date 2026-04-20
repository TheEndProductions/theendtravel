'use client';

import { useState } from 'react';

type InquiryType = 'general' | 'collab' | 'press' | 'partnership' | 'other';

const TYPE_LABELS: Record<InquiryType, string> = {
  general: 'General Question',
  collab: 'Brand Collaboration',
  press: 'Press / Media',
  partnership: 'Partnership',
  other: 'Other',
};

const TYPE_TAGS: Record<InquiryType, string> = {
  general: 'GENERAL',
  collab: 'COLLAB',
  press: 'PRESS',
  partnership: 'PARTNERSHIP',
  other: 'OTHER',
};

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [websiteSocial, setWebsiteSocial] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Please add your name.');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email.');
    if (!message.trim() || message.trim().length < 10) return setError('Please write a message (at least 10 characters).');

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) return setError('Form not configured. Email us directly.');

    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('inquiry_type', TYPE_LABELS[inquiryType]);
      fd.append('name', name);
      fd.append('email', email);
      if (organization) fd.append('organization', organization);
      if (websiteSocial) fd.append('website_or_social', websiteSocial);
      fd.append('message', message);
      fd.append('_subject', `[CONTACT] [${TYPE_TAGS[inquiryType]}] ${organization || name}`);
      fd.append('_replyto', email);

      const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  const inputStyle: React.CSSProperties = { height: '44px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', padding: '0 14px', outline: 'none', width: '100%', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' };
  const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' };

  if (status === 'success') {
    return (
      <div style={{ width: '100%', padding: '32px 24px', background: 'rgba(10,10,10,0.6)', border: '1px solid rgba(245,242,237,0.12)', borderRadius: '8px', textAlign: 'center', marginTop: '8px' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>Received</div>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 600, color: '#F5F2ED', margin: '0 0 8px' }}>Thank you.</h3>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#D4CFC7', margin: 0, lineHeight: 1.6 }}>We&apos;ll reply to {email} within a few days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px', textAlign: 'left' }}>
      <div style={fieldStyle}>
        <label style={labelStyle}>Reason for Reaching Out</label>
        <select value={inquiryType} onChange={e => setInquiryType(e.target.value as InquiryType)} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'><path fill=\'%238B7355\' d=\'M6 8L0 0h12z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px' }}>
          {(Object.keys(TYPE_LABELS) as InquiryType[]).map(k => (
            <option key={k} value={k} style={{ background: '#0A0A0A', color: '#F5F2ED' }}>{TYPE_LABELS[k]}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Your Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        </div>
      </div>

      {(inquiryType === 'collab' || inquiryType === 'press' || inquiryType === 'partnership') && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Brand / Organization</label>
            <input type="text" value={organization} onChange={e => setOrganization(e.target.value)} style={inputStyle} placeholder="Optional" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Website or @Handle</label>
            <input type="text" value={websiteSocial} onChange={e => setWebsiteSocial(e.target.value)} style={inputStyle} placeholder="Optional" />
          </div>
        </div>
      )}

      <div style={fieldStyle}>
        <label style={labelStyle}>Your Message <span style={{ color: 'rgba(139,115,85,0.6)' }}>({message.length}/2000)</span></label>
        <textarea rows={6} maxLength={2000} value={message} onChange={e => setMessage(e.target.value)} placeholder={inquiryType === 'collab' ? 'Tell us about your brand and what you have in mind...' : inquiryType === 'press' ? 'What are you working on, and how can we help?' : 'Tell us what you have in mind...'} style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical', lineHeight: 1.6 }} />
      </div>

      {error && <div style={{ padding: '10px 14px', background: 'rgba(196,83,10,0.12)', border: '1px solid rgba(196,83,10,0.4)', borderRadius: '6px', color: '#F5F2ED', fontFamily: '"DM Sans", sans-serif', fontSize: '13px' }}>{error}</div>}

      <button type="submit" disabled={status === 'loading'} style={{ height: '48px', borderRadius: '6px', border: 'none', background: status === 'loading' ? 'rgba(196,83,10,0.4)' : '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, cursor: status === 'loading' ? 'default' : 'pointer', marginTop: '4px' }}>{status === 'loading' ? 'Sending...' : 'Send Message →'}</button>
    </form>
  );
}
