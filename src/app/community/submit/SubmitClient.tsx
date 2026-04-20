'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  SubmissionType,
  WizardStep,
  FormState,
  INITIAL_FORM_STATE,
  SUBMISSION_TYPES,
} from './types';

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '';
const STEP_ORDER: WizardStep[] = ['type', 'details', 'meta', 'review'];
const STEP_LABELS: Record<WizardStep, string> = {
  type: 'What',
  details: 'Story',
  meta: 'Where & Who',
  review: 'Review',
  success: '',
};

export default function SubmitClient() {
  const [step, setStep] = useState<WizardStep>('type');
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const selectedTypeInfo = useMemo(
    () => SUBMISSION_TYPES.find((t) => t.id === form.type) ?? null,
    [form.type]
  );

  const canAdvanceDetails = () => {
    if (form.type === 'journal')
      return form.journalTitle.trim().length > 0 && form.journalBody.trim().length >= 50;
    if (form.type === 'film')
      return form.filmTitle.trim().length > 0 && /^https?:\/\/.+/.test(form.filmVideoUrl);
    if (form.type === 'photo')
      return form.photoFiles.length > 0 && form.photoCaption.trim().length > 0;
    return false;
  };

  const canSubmit = () =>
    form.author.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.consentRelease;

  const handleSubmit = async () => {
    if (submitting) return;
    setErrorMsg(null);
    if (!ENDPOINT) {
      setErrorMsg('Submission endpoint missing. Please refresh or email ethan.adams.fox@gmail.com directly.');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('submissionType', form.type || '');
      if (form.type === 'journal') {
        fd.append('journalTitle', form.journalTitle);
        fd.append('journalBody', form.journalBody);
      } else if (form.type === 'film') {
        fd.append('filmTitle', form.filmTitle);
        fd.append('filmVideoUrl', form.filmVideoUrl);
        fd.append('filmDescription', form.filmDescription);
      } else if (form.type === 'photo') {
        fd.append('photoCaption', form.photoCaption);
        form.photoFiles.forEach((file, idx) => fd.append('photo_' + idx, file));
      }
      fd.append('author', form.author);
      fd.append('email', form.email);
      fd.append('locationName', form.locationName);
      fd.append('locationCountry', form.locationCountry);
      fd.append('locationLat', form.locationLat);
      fd.append('locationLng', form.locationLng);
      fd.append('dateTaken', form.dateTaken);
      fd.append('gearUsed', form.gearUsed);
      fd.append('instagramHandle', form.instagramHandle);
      fd.append('websiteUrl', form.websiteUrl);
      fd.append('consentRelease', String(form.consentRelease));
      fd.append('consentPinGlobe', String(form.consentPinGlobe));

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Submission failed');
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again in a moment or email ethan.adams.fox@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <main className="submit-page">
        <header className="submit-header">
          <Link href="/community" className="submit-back">← Back to Community</Link>
          <h1 className="submit-title">Share Your Journey</h1>
          <p className="submit-subtitle">Your words, your lens, your frame — woven into the world we are mapping together.</p>
        </header>

        {step !== 'success' && <Progress step={step} />}

        <section className="submit-parchment">
          {step === 'type' && (
            <TypeStep
              selected={form.type}
              onSelect={(t) => { update('type', t); setStep('details'); }}
            />
          )}
          {step === 'details' && selectedTypeInfo && (
            <DetailsStep
              typeInfo={selectedTypeInfo}
              form={form}
              update={update}
              onBack={() => setStep('type')}
              onNext={() => setStep('meta')}
              canAdvance={canAdvanceDetails()}
            />
          )}
          {step === 'meta' && (
            <MetaStep
              form={form}
              update={update}
              onBack={() => setStep('details')}
              onNext={() => setStep('review')}
            />
          )}
          {step === 'review' && (
            <ReviewStep
              form={form}
              update={update}
              onBack={() => setStep('meta')}
              onSubmit={handleSubmit}
              submitting={submitting}
              errorMsg={errorMsg}
              canSubmit={canSubmit()}
            />
          )}
          {step === 'success' && <SuccessStep />}
        </section>

        <footer className="submit-footer">
          <p>Submissions are reviewed personally. You'll hear back within a week.</p>
        </footer>
      </main>
    </>
  );
}

function Progress({ step }: { step: WizardStep }) {
  const currentIdx = STEP_ORDER.indexOf(step);
  return (
    <nav className="submit-progress" aria-label="Submission progress">
      {STEP_ORDER.map((s, idx) => {
        const state = idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'pending';
        return (
          <div key={s} className={'submit-progress-step submit-progress-' + state}>
            <span className="submit-progress-num">{idx + 1}</span>
            <span className="submit-progress-label">{STEP_LABELS[s]}</span>
          </div>
        );
      })}
    </nav>
  );
}

function TypeStep({
  selected,
  onSelect,
}: {
  selected: SubmissionType | null;
  onSelect: (t: SubmissionType) => void;
}) {
  return (
    <div className="submit-step">
      <h2 className="submit-step-title">What are you sharing?</h2>
      <p className="submit-step-hint">Choose the form your submission takes. You can only pick one at a time.</p>
      <div className="submit-type-grid">
        {SUBMISSION_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={'submit-type-card ' + (selected === t.id ? 'submit-type-selected' : '')}
            onClick={() => onSelect(t.id)}
            style={{ ['--accent' as any]: t.accentColor }}
          >
            <span className="submit-type-icon">{t.icon}</span>
            <span className="submit-type-label">{t.label}</span>
            <span className="submit-type-tagline">{t.tagline}</span>
            <span className="submit-type-desc">{t.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailsStep({
  typeInfo,
  form,
  update,
  onBack,
  onNext,
  canAdvance,
}: {
  typeInfo: (typeof SUBMISSION_TYPES)[number];
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onBack: () => void;
  onNext: () => void;
  canAdvance: boolean;
}) {
  return (
    <div className="submit-step">
      <h2 className="submit-step-title">
        <span className="submit-step-accent">{typeInfo.icon}</span> {typeInfo.label}
      </h2>
      <p className="submit-step-hint">{typeInfo.tagline}</p>

      {typeInfo.id === 'journal' && (
        <>
          <Field label="Title">
            <input type="text" value={form.journalTitle} onChange={(e) => update('journalTitle', e.target.value)} placeholder="Give Me Your Hand & I'll Give You My Mind" className="submit-input" />
          </Field>
          <Field label="Entry" hint="Write it as you'd say it. At least a few paragraphs — don't rush it.">
            <textarea value={form.journalBody} onChange={(e) => update('journalBody', e.target.value)} rows={14} placeholder="The sun came up over the ridge and I remembered something I had forgotten..." className="submit-textarea" />
            <span className="submit-wordcount">{form.journalBody.trim().split(/\s+/).filter(Boolean).length} words</span>
          </Field>
        </>
      )}

      {typeInfo.id === 'film' && (
        <>
          <Field label="Film Title">
            <input type="text" value={form.filmTitle} onChange={(e) => update('filmTitle', e.target.value)} placeholder="Edge of Somewhere" className="submit-input" />
          </Field>
          <Field label="Video URL" hint="YouTube or Vimeo. Set the video to Public or Unlisted.">
            <input type="url" value={form.filmVideoUrl} onChange={(e) => update('filmVideoUrl', e.target.value)} placeholder="https://youtube.com/watch?v=..." className="submit-input" />
          </Field>
          <Field label="The Story Behind It" hint="Optional. What were you trying to capture?">
            <textarea value={form.filmDescription} onChange={(e) => update('filmDescription', e.target.value)} rows={5} className="submit-textarea" />
          </Field>
        </>
      )}

      {typeInfo.id === 'photo' && (
        <>
          <Field label="Photograph(s)" hint="Up to 5 images, 10MB max each. JPG or PNG.">
            <input type="file" accept="image/jpeg,image/png,image/jpg" multiple onChange={(e) => {
              const files = Array.from(e.target.files || []).slice(0, 5);
              update('photoFiles', files);
            }} className="submit-fileinput" />
            {form.photoFiles.length > 0 && (
              <ul className="submit-filelist">
                {form.photoFiles.map((f, i) => (
                  <li key={i}>{f.name} <span className="submit-filesize">· {(f.size / 1024 / 1024).toFixed(1)} MB</span></li>
                ))}
              </ul>
            )}
          </Field>
          <Field label="Caption" hint="What was happening? What did the moment feel like?">
            <textarea value={form.photoCaption} onChange={(e) => update('photoCaption', e.target.value)} rows={5} className="submit-textarea" />
          </Field>
        </>
      )}

      <div className="submit-nav">
        <button type="button" className="submit-btn submit-btn-ghost" onClick={onBack}>← Back</button>
        <button type="button" className="submit-btn submit-btn-primary" onClick={onNext} disabled={!canAdvance}>Continue →</button>
      </div>
    </div>
  );
}

function MetaStep({
  form,
  update,
  onBack,
  onNext,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const canAdvance = form.author.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  return (
    <div className="submit-step">
      <h2 className="submit-step-title">Where & Who</h2>
      <p className="submit-step-hint">Let us know who you are and where this moment found you.</p>

      <div className="submit-row">
        <Field label="Your Name *">
          <input type="text" value={form.author} onChange={(e) => update('author', e.target.value)} className="submit-input" />
        </Field>
        <Field label="Your Email *" hint="We'll use this to write back.">
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="submit-input" />
        </Field>
      </div>

      <Field label="Location" hint="e.g. Wasatch Mountains, Utah">
        <input type="text" value={form.locationName} onChange={(e) => update('locationName', e.target.value)} className="submit-input" />
      </Field>

      <div className="submit-row">
        <Field label="Country" hint="Optional">
          <input type="text" value={form.locationCountry} onChange={(e) => update('locationCountry', e.target.value)} className="submit-input" />
        </Field>
        <Field label="When" hint="Optional. Year is fine.">
          <input type="text" value={form.dateTaken} onChange={(e) => update('dateTaken', e.target.value)} placeholder="2025" className="submit-input" />
        </Field>
      </div>

      <details className="submit-advanced">
        <summary>Advanced — precise globe pin & credits</summary>
        <div className="submit-row">
          <Field label="Latitude" hint="Optional. For an exact pin on the globe.">
            <input type="text" value={form.locationLat} onChange={(e) => update('locationLat', e.target.value)} placeholder="40.7608" className="submit-input" />
          </Field>
          <Field label="Longitude" hint="Optional">
            <input type="text" value={form.locationLng} onChange={(e) => update('locationLng', e.target.value)} placeholder="-111.8910" className="submit-input" />
          </Field>
        </div>
        <Field label="Gear Used" hint="Optional. If you used The End Endless Pack, let us know.">
          <input type="text" value={form.gearUsed} onChange={(e) => update('gearUsed', e.target.value)} className="submit-input" />
        </Field>
        <div className="submit-row">
          <Field label="Instagram" hint="Optional. For credit.">
            <input type="text" value={form.instagramHandle} onChange={(e) => update('instagramHandle', e.target.value)} placeholder="@yourhandle" className="submit-input" />
          </Field>
          <Field label="Website" hint="Optional">
            <input type="text" value={form.websiteUrl} onChange={(e) => update('websiteUrl', e.target.value)} placeholder="https://..." className="submit-input" />
          </Field>
        </div>
      </details>

      <div className="submit-nav">
        <button type="button" className="submit-btn submit-btn-ghost" onClick={onBack}>← Back</button>
        <button type="button" className="submit-btn submit-btn-primary" onClick={onNext} disabled={!canAdvance}>Review →</button>
      </div>
    </div>
  );
}

function ReviewStep({
  form,
  update,
  onBack,
  onSubmit,
  submitting,
  errorMsg,
  canSubmit,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  errorMsg: string | null;
  canSubmit: boolean;
}) {
  const typeInfo = SUBMISSION_TYPES.find((t) => t.id === form.type);
  return (
    <div className="submit-step">
      <h2 className="submit-step-title">Review</h2>
      <p className="submit-step-hint">Take a look — this is what we'll receive.</p>

      <div className="submit-summary">
        <Row label="Type">{typeInfo?.label ?? '—'}</Row>
        {form.type === 'journal' && (
          <>
            <Row label="Title">{form.journalTitle}</Row>
            <Row label="Length">{form.journalBody.trim().split(/\s+/).filter(Boolean).length} words</Row>
          </>
        )}
        {form.type === 'film' && (
          <>
            <Row label="Film">{form.filmTitle}</Row>
            <Row label="Video">{form.filmVideoUrl}</Row>
          </>
        )}
        {form.type === 'photo' && (
          <>
            <Row label="Photos">{form.photoFiles.length} attached</Row>
            <Row label="Caption">{form.photoCaption.slice(0, 80)}{form.photoCaption.length > 80 ? '…' : ''}</Row>
          </>
        )}
        <Row label="Author">{form.author}</Row>
        <Row label="Email">{form.email}</Row>
        {form.locationName && <Row label="Location">{form.locationName}</Row>}
        {form.dateTaken && <Row label="When">{form.dateTaken}</Row>}
      </div>

      <div className="submit-consent">
        <label className="submit-checkbox">
          <input type="checkbox" checked={form.consentRelease} onChange={(e) => update('consentRelease', e.target.checked)} />
          <span><strong>I grant The End permission</strong> to publish this submission on theendtravel.com and in brand channels, with credit to me. I confirm this is my original work.</span>
        </label>
        <label className="submit-checkbox">
          <input type="checkbox" checked={form.consentPinGlobe} onChange={(e) => update('consentPinGlobe', e.target.checked)} />
          <span><strong>Pin this on the interactive globe</strong> (optional). If my location is included, it may appear as a pin on the journey map.</span>
        </label>
      </div>

      {errorMsg && <div className="submit-error">{errorMsg}</div>}

      <div className="submit-nav">
        <button type="button" className="submit-btn submit-btn-ghost" onClick={onBack} disabled={submitting}>← Back</button>
        <button type="button" className="submit-btn submit-btn-primary submit-btn-send" onClick={onSubmit} disabled={!canSubmit || submitting}>
          {submitting ? 'Sending…' : 'Send Submission ✦'}
        </button>
      </div>
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="submit-step submit-success">
      <div className="submit-seal">✦</div>
      <h2 className="submit-step-title submit-success-title">Received.</h2>
      <p className="submit-success-body">Thank you for trusting us with a piece of your journey. We read every submission by hand — you'll hear back within a week, whether we're bringing yours into the library or not.</p>
      <Link href="/" className="submit-btn submit-btn-ghost">← Return home</Link>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="submit-field">
      <label className="submit-field-label">{label}</label>
      {hint && <span className="submit-field-hint">{hint}</span>}
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="submit-summary-row">
      <span className="submit-summary-label">{label}</span>
      <span className="submit-summary-value">{children || '—'}</span>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

.submit-page { min-height: 100vh; background: #0A0A0A; color: #F5F2ED; font-family: 'Cormorant Garamond', Georgia, serif; padding: 80px 24px 120px; }
.submit-header { max-width: 720px; margin: 0 auto 40px; text-align: center; }
.submit-back { display: inline-block; margin-bottom: 32px; color: #D4CFC7; text-decoration: none; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; transition: opacity 200ms; }
.submit-back:hover { opacity: 1; color: #F5F2ED; }
.submit-title { font-family: 'Caveat', cursive; font-size: clamp(44px, 7vw, 72px); font-weight: 600; color: #F5F2ED; margin: 0 0 12px; letter-spacing: -0.01em; }
.submit-subtitle { font-size: 18px; color: #D4CFC7; font-style: italic; opacity: 0.85; margin: 0; line-height: 1.5; }

.submit-progress { max-width: 720px; margin: 0 auto 32px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.submit-progress-step { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 8px; border-top: 2px solid #2A2218; transition: all 300ms; }
.submit-progress-active { border-top-color: #C4530A; }
.submit-progress-done { border-top-color: #5C3A1E; }
.submit-progress-num { font-family: 'Caveat', cursive; font-size: 24px; color: #5C4A3A; }
.submit-progress-active .submit-progress-num { color: #C4530A; }
.submit-progress-done .submit-progress-num { color: #D4CFC7; }
.submit-progress-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #7A6F63; }
.submit-progress-active .submit-progress-label { color: #F5F2ED; }
.submit-progress-done .submit-progress-label { color: #D4CFC7; }

.submit-parchment { max-width: 720px; margin: 0 auto; background: radial-gradient(ellipse at top, rgba(92,58,30,0.12) 0%, transparent 60%), linear-gradient(#E8DCC0, #D4C9A8); color: #1A1610; border-radius: 4px; padding: 56px 48px; box-shadow: 0 0 0 1px rgba(26,22,16,0.1), 0 30px 60px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3), inset 0 0 80px rgba(92,58,30,0.08); position: relative; }
.submit-parchment::before { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(circle at 20% 30%, rgba(92,58,30,0.04) 0%, transparent 2%), radial-gradient(circle at 80% 70%, rgba(92,58,30,0.03) 0%, transparent 3%); border-radius: inherit; }

.submit-step { position: relative; }
.submit-step-title { font-family: 'Caveat', cursive; font-size: 40px; color: #1A1610; margin: 0 0 8px; font-weight: 600; }
.submit-step-accent { color: #5C3A1E; }
.submit-step-hint { color: #4A3520; font-style: italic; margin: 0 0 32px; font-size: 17px; }

.submit-type-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
.submit-type-card { text-align: left; background: rgba(255,255,255,0.25); border: 1.5px solid rgba(26,22,16,0.15); border-radius: 3px; padding: 24px 28px; cursor: pointer; font-family: inherit; color: #1A1610; display: grid; grid-template-columns: auto 1fr; grid-template-areas: "icon label" "icon tagline" "desc desc"; gap: 4px 20px; transition: all 250ms; position: relative; }
.submit-type-card:hover { border-color: var(--accent, #5C3A1E); background: rgba(255,255,255,0.4); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(92,58,30,0.15); }
.submit-type-selected { border-color: var(--accent, #5C3A1E); background: rgba(255,255,255,0.5); box-shadow: 0 0 0 2px var(--accent, #5C3A1E), 0 8px 20px rgba(92,58,30,0.2); }
.submit-type-icon { grid-area: icon; font-size: 32px; color: var(--accent, #5C3A1E); align-self: center; }
.submit-type-label { grid-area: label; font-family: 'Caveat', cursive; font-size: 28px; font-weight: 600; color: #1A1610; line-height: 1; }
.submit-type-tagline { grid-area: tagline; font-style: italic; color: var(--accent, #5C3A1E); font-size: 15px; }
.submit-type-desc { grid-area: desc; margin-top: 12px; color: #3A2817; font-size: 15px; line-height: 1.5; }

.submit-field { margin-bottom: 24px; display: block; }
.submit-field-label { display: block; font-family: 'Caveat', cursive; font-size: 22px; color: #1A1610; margin-bottom: 2px; font-weight: 600; }
.submit-field-hint { display: block; font-size: 13px; color: #6B5D4B; font-style: italic; margin-bottom: 8px; }
.submit-input, .submit-textarea { width: 100%; background: transparent; border: none; border-bottom: 1.5px solid rgba(26,22,16,0.25); padding: 8px 2px; font-family: inherit; font-size: 17px; color: #1A1610; box-sizing: border-box; transition: border-color 200ms; }
.submit-input:focus, .submit-textarea:focus { outline: none; border-bottom-color: #5C3A1E; }
.submit-textarea { resize: vertical; line-height: 1.6; border: 1px solid rgba(26,22,16,0.15); padding: 12px 14px; background: rgba(255,255,255,0.2); border-radius: 2px; }
.submit-fileinput { display: block; width: 100%; padding: 12px; border: 1.5px dashed rgba(26,22,16,0.25); background: rgba(255,255,255,0.2); border-radius: 2px; font-family: inherit; color: #3A2817; cursor: pointer; }
.submit-filelist { list-style: none; padding: 0; margin: 12px 0 0; font-size: 14px; color: #3A2817; }
.submit-filelist li { margin-bottom: 4px; }
.submit-filesize { color: #6B5D4B; }
.submit-wordcount { display: block; text-align: right; font-size: 12px; color: #6B5D4B; font-style: italic; margin-top: 6px; }

.submit-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.submit-advanced { margin-top: 12px; border-top: 1px solid rgba(26,22,16,0.15); padding-top: 16px; }
.submit-advanced > summary { cursor: pointer; font-family: 'Caveat', cursive; font-size: 20px; color: #5C3A1E; margin-bottom: 16px; list-style: none; }
.submit-advanced > summary::-webkit-details-marker { display: none; }
.submit-advanced > summary::before { content: '+ '; }
.submit-advanced[open] > summary::before { content: '− '; }

.submit-summary { background: rgba(255,255,255,0.3); border: 1px solid rgba(26,22,16,0.15); border-radius: 2px; padding: 20px 24px; margin-bottom: 24px; }
.submit-summary-row { display: grid; grid-template-columns: 140px 1fr; gap: 16px; padding: 8px 0; border-bottom: 1px dotted rgba(26,22,16,0.15); font-size: 15px; }
.submit-summary-row:last-child { border-bottom: none; }
.submit-summary-label { font-family: 'Caveat', cursive; font-size: 19px; color: #5C3A1E; }
.submit-summary-value { color: #1A1610; word-break: break-word; }

.submit-consent { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
.submit-checkbox { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: start; padding: 14px 16px; background: rgba(255,255,255,0.2); border: 1px solid rgba(26,22,16,0.12); border-radius: 2px; cursor: pointer; line-height: 1.5; font-size: 15px; color: #1A1610; }
.submit-checkbox input { width: 18px; height: 18px; accent-color: #5C3A1E; margin-top: 3px; }

.submit-error { background: rgba(196,83,10,0.1); border: 1px solid rgba(196,83,10,0.3); padding: 12px 16px; border-radius: 2px; color: #8B3A08; margin-bottom: 20px; font-size: 15px; }

.submit-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; gap: 12px; }
.submit-btn { display: inline-flex; align-items: center; justify-content: center; padding: 12px 28px; border: none; border-radius: 2px; font-family: 'Cormorant Garamond', serif; font-size: 17px; letter-spacing: 0.04em; cursor: pointer; transition: all 200ms; text-decoration: none; }
.submit-btn-ghost { background: transparent; color: #3A2817; border: 1px solid rgba(26,22,16,0.3); }
.submit-btn-ghost:hover:not(:disabled) { background: rgba(26,22,16,0.08); border-color: #5C3A1E; }
.submit-btn-primary { background: #5C3A1E; color: #F5F2ED; font-weight: 500; }
.submit-btn-primary:hover:not(:disabled) { background: #4A2E16; transform: translateY(-1px); box-shadow: 0 6px 14px rgba(74,46,22,0.4); }
.submit-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
.submit-btn-send { background: #C4530A; }
.submit-btn-send:hover:not(:disabled) { background: #A8460A; }

.submit-success { text-align: center; padding: 32px 0; }
.submit-seal { font-family: 'Caveat', cursive; font-size: 80px; color: #C4530A; line-height: 1; margin-bottom: 16px; }
.submit-success-title { font-size: 56px; }
.submit-success-body { color: #3A2817; font-size: 18px; max-width: 480px; margin: 0 auto 32px; line-height: 1.6; font-style: italic; }

.submit-footer { max-width: 720px; margin: 48px auto 0; text-align: center; color: #7A6F63; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; }

@media (max-width: 640px) {
  .submit-page { padding: 48px 16px 80px; }
  .submit-parchment { padding: 36px 24px; }
  .submit-row { grid-template-columns: 1fr; gap: 0; }
  .submit-nav { flex-direction: column-reverse; align-items: stretch; }
  .submit-btn { width: 100%; }
}
`;
