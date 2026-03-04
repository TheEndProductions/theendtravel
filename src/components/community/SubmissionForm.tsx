'use client';
import { useState, useRef, useCallback } from 'react';

interface LocationResult { display_name: string; lat: string; lon: string; }

export default function SubmissionForm() {
  const [form, setForm] = useState({ name: '', title: '', category: 'gear' as 'gear' | 'story', locationName: '', latitude: null as number | null, longitude: null as number | null, storyText: '', gearUsed: [] as string[], consent: false });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [locResults, setLocResults] = useState<LocationResult[]>([]);
  const [locQuery, setLocQuery] = useState('');
  const [gearInput, setGearInput] = useState('');
  const debRef = useRef<ReturnType<typeof setTimeout>>();

  const searchLoc = useCallback((q: string) => {
    setLocQuery(q);
    setForm((f) => ({ ...f, locationName: q, latitude: null, longitude: null }));
    if (debRef.current) clearTimeout(debRef.current);
    if (q.length < 3) { setLocResults([]); return; }
    debRef.current = setTimeout(async () => {
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`, { headers: { 'Accept-Language': 'en' } });
        setLocResults(await r.json());
      } catch { setLocResults([]); }
    }, 400);
  }, []);

  const selectLoc = (r: LocationResult) => {
    setForm((f) => ({ ...f, locationName: r.display_name, latitude: parseFloat(r.lat), longitude: parseFloat(r.lon) }));
    setLocQuery(r.display_name);
    setLocResults([]);
  };

  const addGear = () => { const t = gearInput.trim(); if (!t || form.gearUsed.includes(t)) return; setForm((f) => ({ ...f, gearUsed: [...f.gearUsed, t] })); setGearInput(''); };

  const submit = async () => {
    if (!form.title.trim()) { setError('Title is required.'); return; }
    if (!form.latitude) { setError('Please select a location.'); return; }
    if (form.storyText.length < 10) { setError('Story must be at least 10 characters.'); return; }
    if (!form.consent) { setError('Consent is required.'); return; }
    setStatus('submitting'); setError('');
    try {
      const r = await fetch('/api/community/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus(r.ok ? 'success' : 'error');
      if (!r.ok) { const d = await r.json(); setError(d.error || 'Something went wrong.'); }
    } catch { setError('Network error.'); setStatus('error'); }
  };

  const inputStyle: React.CSSProperties = { height: '44px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.12)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', padding: '0 14px', outline: 'none' };
  const labelStyle: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em' };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', color: '#F5F2ED', margin: 0 }}>Story Submitted</h2>
      <p style={{ fontSize: '15px', color: '#D4CFC7', lineHeight: 1.6, margin: 0 }}>Your story is under review. It will appear on the Journey Map once approved.</p>
      <button onClick={() => setStatus('idle')} style={{ height: '44px', padding: '0 24px', borderRadius: '6px', border: 'none', background: '#C4530A', color: '#F5F2ED', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Submit Another</button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '560px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><label style={labelStyle}>Name (optional)</label><input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="How you'd like to be credited" style={inputStyle} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><label style={labelStyle}>Story Title *</label><input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Give your story a name" style={inputStyle} required /></div>
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}><legend style={labelStyle}>Category</legend><div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>{(['gear', 'story'] as const).map((v) => (<label key={v} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#D4CFC7', cursor: 'pointer' }}><input type="radio" name="cat" checked={form.category === v} onChange={() => setForm((f) => ({ ...f, category: v }))} style={{ accentColor: '#C4530A' }} />{v === 'gear' ? 'Gear in the Wild' : 'Travel Story'}</label>))}</div></fieldset>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}><label style={labelStyle}>Location *</label><input value={locQuery} onChange={(e) => searchLoc(e.target.value)} placeholder="Search for a place..." style={inputStyle} autoComplete="off" />{locResults.length > 0 && <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, background: '#1A1816', border: '1px solid rgba(139,115,85,0.2)', borderRadius: '6px', marginTop: '4px', maxHeight: '180px', overflowY: 'auto' }}>{locResults.map((r, i) => (<button key={i} onClick={() => selectLoc(r)} style={{ display: 'block', width: '100%', padding: '10px 14px', border: 'none', background: 'transparent', color: '#D4CFC7', fontSize: '13px', textAlign: 'left', cursor: 'pointer', borderBottom: '1px solid rgba(139,115,85,0.08)' }}>{r.display_name}</button>))}</div>}{form.latitude && <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'rgba(139,115,85,0.5)' }}>{form.latitude.toFixed(4)}, {form.longitude?.toFixed(4)}</div>}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between' }}>Your Story * <span style={{ color: 'rgba(139,115,85,0.5)' }}>{form.storyText.length}/2000</span></label><textarea value={form.storyText} onChange={(e) => setForm((f) => ({ ...f, storyText: e.target.value.slice(0, 2000) }))} placeholder="Tell us what happened here..." rows={5} style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical', lineHeight: 1.6 }} required /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}><label style={labelStyle}>Gear Used (optional)</label><div style={{ display: 'flex', gap: '8px' }}><input value={gearInput} onChange={(e) => setGearInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addGear(); } }} placeholder="e.g. The Endless Pack" style={{ ...inputStyle, flex: 1 }} /><button onClick={addGear} style={{ height: '44px', padding: '0 16px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.12)', background: 'transparent', color: '#8B7355', fontSize: '13px', cursor: 'pointer' }}>+ Add</button></div>{form.gearUsed.length > 0 && <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>{form.gearUsed.map((g) => (<span key={g} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '12px', background: 'rgba(139,115,85,0.15)', color: '#D4CFC7', fontSize: '12px' }}>{g}<button onClick={() => setForm((f) => ({ ...f, gearUsed: f.gearUsed.filter((x) => x !== g) }))} style={{ background: 'none', border: 'none', color: '#8B7355', cursor: 'pointer', fontSize: '14px', padding: 0 }}>×</button></span>))}</div>}</div>
      <label style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}><input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} style={{ accentColor: '#C4530A', marginTop: '3px' }} /><span style={{ fontSize: '13px', color: '#D4CFC7', lineHeight: 1.5 }}>I consent to having my story displayed publicly on The End Productions. *</span></label>
      {error && <p style={{ fontSize: '13px', color: '#C4530A', margin: 0 }} role="alert">{error}</p>}
      <button onClick={submit} disabled={status === 'submitting'} style={{ height: '48px', borderRadius: '6px', border: 'none', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontWeight: 600, cursor: 'pointer', opacity: status === 'submitting' ? 0.6 : 1 }}>{status === 'submitting' ? 'Submitting...' : 'Submit Your Story'}</button>
      <p style={{ fontSize: '12px', color: 'rgba(212,207,199,0.4)', margin: 0, textAlign: 'center' }}>Stories are reviewed before appearing on the map.</p>
    </div>
  );
}
