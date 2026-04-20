'use client';

import { useState, useRef, useCallback } from 'react';

type SubmissionType = 'journal' | 'film' | 'photo';

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

export default function SubmissionForm() {
  const [type, setType] = useState<SubmissionType>('journal');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locResults, setLocResults] = useState<LocationResult[]>([]);
  const [locLoading, setLocLoading] = useState(false);

  const [journalBody, setJournalBody] = useState('');
  const [filmUrl, setFilmUrl] = useState('');
  const [filmDescription, setFilmDescription] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const [gearUsed, setGearUsed] = useState<string[]>([]);
  const [gearInput, setGearInput] = useState('');

  const [showCredits, setShowCredits] = useState(false);
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');

  const [consentReview, setConsentReview] = useState(false);
  const [consentGlobe, setConsentGlobe] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchLoc = useCallback((q: string) => {
    if (debRef.current) clearTimeout(debRef.current);
    if (!q || q.length < 3) { setLocResults([]); return; }
    debRef.current = setTimeout(async () => {
      setLocLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`);
        const data = await res.json();
        setLocResults(data);
      } catch { setLocResults([]); }
      setLocLoading(false);
    }, 400);
  }, []);

  const selectLoc = (r: LocationResult) => {
    setLocationName(r.display_name);
    setLatitude(r.lat);
    setLongitude(r.lon);
    setLocResults([]);
  };

  const addGear = () => {
    const v = gearInput.trim();
    if (v && !gearUsed.includes(v)) setGearUsed([...gearUsed, v]);
    setGearInput('');
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhotoFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Please add your name.');
    if (!email.trim()) return setError('Please add your email.');
    if (!title.trim()) return setError('Please add a title.');
    if (!latitude) return setError('Please select a location from the dropdown.');
    if (type === 'journal' && journalBody.trim().length < 20) return setError('Journal entry should be at least 20 characters.');
    if (type === 'film' && !filmUrl.trim()) return setError('Please add a film URL.');
    if (type === 'photo' && photoFiles.length === 0) return setError('Please upload at least one photo.');
    if (!consentReview) return setError('Please acknowledge the review notice.');

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) return setError('Form endpoint not configured. Contact us directly.');

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('submission_type', type);
      fd.append('name', name);
      fd.append('email', email);
      fd.append('title', title);
      fd.append('location', locationName);
      fd.append('latitude', latitude);
      fd.append('longitude', longitude);
      if (type === 'journal') fd.append('journal_body', journalBody);
      if (type === 'film') { fd.append('film_url', filmUrl); fd.append('film_description', filmDescription); }
      if (type === 'photo') {
        fd.append('photo_caption', photoCaption);
        photoFiles.forEach((f, i) => fd.append(`photo_${i + 1}`, f));
      }
      if (gearUsed.length) fd.append('gear_used', gearUsed.join(', '));
      if (instagram) fd.append('instagram', instagram);
      if (website) fd.append('website', website);
      fd.append('consent_globe_pin', consentGlobe ? 'yes' : 'no');
      fd.append('_subject', `[SUBMISSION] ${title}`);

      const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setType('journal'); setName(''); setEmail(''); setTitle('');
    setLocationName(''); setLatitude(''); setLongitude(''); setLocResults([]);
    setJournalBody(''); setFilmUrl(''); setFilmDescription('');
    setPhotoCaption(''); setPhotoFiles([]);
    setGearUsed([]); setGearInput('');
    setShowCredits(false); setInstagram(''); setWebsite('');
    setConsentReview(false); setConsentGlobe(false);
    setSubmitted(false); setError('');
  };

  const inputStyle: React.CSSProperties = { height: '44px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.12)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', padding: '0 14px', outline: 'none', width: '100%' };
  const textareaStyle: React.CSSProperties = { ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical', lineHeight: 1.6 };
  const labelStyle: React.CSSProperties = { fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.1em' };
  const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px' };

  if (submitted) {
    return (
      <div style={{ width: '100%', padding: '48px 32px', background: 'rgba(10,10,10,0.6)', border: '1px solid rgba(245,242,237,0.12)', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Received</div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', color: '#F5F2ED', margin: 0 }}>Story Submitted</h2>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#D4CFC7', lineHeight: 1.65, margin: 0, maxWidth: '380px' }}>Thank you for sharing. We review every submission personally and will reach out at {email} once it&apos;s ready for the map.</p>
        <button type="button" onClick={resetForm} style={{ marginTop: '8px', height: '44px', padding: '0 24px', background: 'transparent', color: '#F5F2ED', border: '1px solid rgba(245,242,237,0.24)', borderRadius: '6px', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>Submit Another</button>
      </div>
    );
  }

  const typeButton = (t: SubmissionType, label: string) => (
    <button type="button" onClick={() => setType(t)} style={{
      flex: 1, height: '52px',
      background: type === t ? 'rgba(196,83,10,0.12)' : 'rgba(10,10,10,0.6)',
      border: `1px solid ${type === t ? '#C4530A' : 'rgba(245,242,237,0.12)'}`,
      borderRadius: '6px',
      color: type === t ? '#F5F2ED' : '#D4CFC7',
      fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em',
      cursor: 'pointer', transition: 'all 0.2s'
    }}>{label}</button>
  );

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={fieldStyle}>
        <label style={labelStyle}>Submission Type</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {typeButton('journal', 'Journal')}
          {typeButton('film', 'Film')}
          {typeButton('photo', 'Photo')}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Your Name</label>
          <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Email</label>
          <input type="email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Title</label>
        <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder={type === 'journal' ? 'The name of your entry' : type === 'film' ? 'Film title' : 'Name for this photo set'} />
      </div>

      <div style={{ ...fieldStyle, position: 'relative' }}>
        <label style={labelStyle}>Location</label>
        <input style={inputStyle} value={locationName} onChange={e => { setLocationName(e.target.value); setLatitude(''); setLongitude(''); searchLoc(e.target.value); }} placeholder="Search for a place..." />
        {locLoading && <div style={{ position: 'absolute', right: '14px', top: '36px', fontSize: '11px', color: '#8B7355', fontFamily: '"JetBrains Mono", monospace' }}>...</div>}
        {locResults.length > 0 && (
          <div style={{ position: 'absolute', top: '76px', left: 0, right: 0, background: '#0A0A0A', border: '1px solid rgba(245,242,237,0.16)', borderRadius: '6px', zIndex: 10, overflow: 'hidden' }}>
            {locResults.map((r, i) => (
              <button key={i} type="button" onClick={() => selectLoc(r)} style={{ display: 'block', width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', borderBottom: i < locResults.length - 1 ? '1px solid rgba(245,242,237,0.06)' : 'none', color: '#F5F2ED', textAlign: 'left', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontSize: '13px', lineHeight: 1.4 }}>{r.display_name}</button>
            ))}
          </div>
        )}
      </div>

      {type === 'journal' && (
        <div style={fieldStyle}>
          <label style={labelStyle}>Your Entry <span style={{ color: 'rgba(139,115,85,0.6)' }}>({journalBody.length}/5000)</span></label>
          <textarea style={{ ...textareaStyle, minHeight: '200px' }} maxLength={5000} value={journalBody} onChange={e => setJournalBody(e.target.value)} placeholder="Tell the story..." />
        </div>
      )}

      {type === 'film' && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Film URL</label>
            <input style={inputStyle} value={filmUrl} onChange={e => setFilmUrl(e.target.value)} placeholder="YouTube, Vimeo, or direct link" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description <span style={{ color: 'rgba(139,115,85,0.6)' }}>({filmDescription.length}/1000)</span></label>
            <textarea style={{ ...textareaStyle, minHeight: '120px' }} maxLength={1000} value={filmDescription} onChange={e => setFilmDescription(e.target.value)} placeholder="What's this film about?" />
          </div>
        </>
      )}

      {type === 'photo' && (
        <>
          <div style={fieldStyle}>
            <label style={labelStyle}>Photos {photoFiles.length > 0 && <span style={{ color: '#C4530A' }}>({photoFiles.length} selected)</span>}</label>
            <label style={{ ...inputStyle, display: 'flex', alignItems: 'center', cursor: 'pointer', color: photoFiles.length > 0 ? '#F5F2ED' : '#8B7355', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', letterSpacing: '0.1em' }}>
              <input type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />
              {photoFiles.length > 0 ? photoFiles.map(f => f.name).join(', ') : 'CHOOSE FILES...'}
            </label>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Caption <span style={{ color: 'rgba(139,115,85,0.6)' }}>({photoCaption.length}/1000)</span></label>
            <textarea style={{ ...textareaStyle, minHeight: '120px' }} maxLength={1000} value={photoCaption} onChange={e => setPhotoCaption(e.target.value)} placeholder="A few words about these photos..." />
          </div>
        </>
      )}

      <div style={fieldStyle}>
        <label style={labelStyle}>Gear Used <span style={{ color: 'rgba(139,115,85,0.6)' }}>(optional)</span></label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input style={{ ...inputStyle, flex: 1 }} value={gearInput} onChange={e => setGearInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addGear(); } }} placeholder="e.g. Leica M6, Peak Design bag..." />
          <button type="button" onClick={addGear} style={{ height: '44px', padding: '0 18px', background: 'transparent', color: '#F5F2ED', border: '1px solid rgba(245,242,237,0.24)', borderRadius: '6px', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>Add</button>
        </div>
        {gearUsed.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {gearUsed.map((g, i) => (
              <button key={i} type="button" onClick={() => setGearUsed(gearUsed.filter((_, j) => j !== i))} style={{ padding: '4px 10px', background: 'rgba(196,83,10,0.12)', color: '#F5F2ED', border: '1px solid rgba(196,83,10,0.4)', borderRadius: '4px', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>{g} ×</button>
            ))}
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid rgba(245,242,237,0.08)', paddingTop: '20px' }}>
        <button type="button" onClick={() => setShowCredits(!showCredits)} style={{ background: 'transparent', border: 'none', color: '#8B7355', fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', padding: 0 }}>
          {showCredits ? '− ' : '+ '}Credits & Links (optional)
        </button>
        {showCredits && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Instagram</label>
              <input style={inputStyle} value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@handle" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Website</label>
              <input style={inputStyle} value={website} onChange={e => setWebsite(e.target.value)} placeholder="yourdomain.com" />
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(245,242,237,0.08)', paddingTop: '20px' }}>
        <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" checked={consentReview} onChange={e => setConsentReview(e.target.checked)} style={{ marginTop: '3px', accentColor: '#C4530A' }} />
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#D4CFC7', lineHeight: 1.5 }}>I understand my submission will be reviewed before being published.</span>
        </label>
        <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" checked={consentGlobe} onChange={e => setConsentGlobe(e.target.checked)} style={{ marginTop: '3px', accentColor: '#C4530A' }} />
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#D4CFC7', lineHeight: 1.5 }}>Pin this location on the Journey Map globe.</span>
        </label>
      </div>

      {error && <div style={{ padding: '12px 14px', background: 'rgba(196,83,10,0.12)', border: '1px solid rgba(196,83,10,0.4)', borderRadius: '6px', color: '#F5F2ED', fontFamily: '"DM Sans", sans-serif', fontSize: '13px' }}>{error}</div>}

      <button type="submit" disabled={submitting} style={{ height: '48px', background: submitting ? 'rgba(196,83,10,0.4)' : '#C4530A', color: '#F5F2ED', border: 'none', borderRadius: '6px', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: submitting ? 'default' : 'pointer' }}>{submitting ? 'Sending...' : 'Submit Story'}</button>

      <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '12px', color: '#8B7355', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>Stories are reviewed before appearing on the map.</p>
    </form>
  );
}
