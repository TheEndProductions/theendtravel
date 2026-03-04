'use client';
import { useState, useEffect } from 'react';
import { KICKSTARTER_CONFIG } from '@/lib/config/kickstarter';

interface Props { compact?: boolean; source?: string; }

export default function KickstarterCTA({ compact = false, source = 'other' }: Props) {
  const { phase, campaignUrl, launchDate, fundingPercent, fundingGoal, fundingCurrent, backersCount } = KICKSTARTER_CONFIG;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (phase !== 'pre-launch') return;
    const update = () => {
      const diff = new Date(launchDate).getTime() - Date.now();
      if (diff <= 0) { setCountdown({ days: 0, hours: 0, minutes: 0 }); return; }
      setCountdown({ days: Math.floor(diff / 864e5), hours: Math.floor((diff % 864e5) / 36e5), minutes: Math.floor((diff % 36e5) / 6e4) });
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, [phase, launchDate]);

  const handleSignup = async () => {
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/kickstarter/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source }) });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (phase === 'pre-launch') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: compact ? 'flex-start' : 'center' }}>
        <div style={{ display: 'flex', gap: '16px', fontFamily: '"JetBrains Mono", monospace' }}>
          {[['days', countdown.days], ['hrs', countdown.hours], ['min', countdown.minutes]].map(([label, val]) => (
            <div key={label as string} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#F5F2ED' }}>{String(val).padStart(2, '0')}</div>
              <div style={{ fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label as string}</div>
            </div>
          ))}
        </div>
        {status === 'success' ? (
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#8B7355' }}>You're on the list. We'll let you know the moment it goes live.</p>
        ) : (
          <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '400px' }}>
            <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSignup()} style={{ flex: 1, height: '44px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', padding: '0 14px', outline: 'none' }} />
            <button onClick={handleSignup} disabled={status === 'loading'} style={{ height: '44px', padding: '0 20px', borderRadius: '6px', border: 'none', background: '#C4530A', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>{status === 'loading' ? '...' : 'Get Notified →'}</button>
          </div>
        )}
      </div>
    );
  }

  if (phase === 'active') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' }}>
        <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(245,242,237,0.1)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min(fundingPercent, 100)}%`, background: '#C4530A', borderRadius: '4px', transition: 'width 1s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }}>
          <span style={{ color: '#F5F2ED' }}>{fundingPercent}% funded</span>
          <span style={{ color: '#8B7355' }}>${fundingCurrent.toLocaleString()} / ${fundingGoal.toLocaleString()}</span>
          <span style={{ color: '#8B7355' }}>{backersCount} backers</span>
        </div>
        <a href={campaignUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '48px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none' }}>Back This Project →</a>
      </div>
    );
  }

  // post-campaign
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: compact ? 'flex-start' : 'center' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 600, color: '#F5F2ED' }}>$329</span>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#8B7355', textDecoration: 'line-through' }}>$376</span>
        <span style={{ padding: '2px 8px', borderRadius: '10px', background: 'rgba(196,83,10,0.15)', color: '#C4530A', fontSize: '12px', fontFamily: '"JetBrains Mono", monospace' }}>Save $47</span>
      </div>
      <a href="/shop/all/endless-system" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '48px', padding: '0 32px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none' }}>Buy the Ecosystem →</a>
    </div>
  );
}
