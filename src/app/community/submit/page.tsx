import type { Metadata } from 'next';
import SubmissionForm from '@/components/community/SubmissionForm';

export const metadata: Metadata = {
  title: 'Submit Your Story',
  description: 'Share your travel story or gear experience on the Journey Map.',
};

export default function SubmitPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', position: 'relative' }}>
      <video src="/escalator_web.mp4" muted loop playsInline autoPlay style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>The Community</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Submit Your Story</h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.65, margin: 0, maxWidth: '440px' }}>Your journey belongs on the map. Share a moment, a place, a story — and become part of something bigger.</p>
        </div>
        <SubmissionForm />
      </div>

      <div style={{ maxWidth: '560px', margin: '60px auto 0', height: '1px', background: 'rgba(245,242,237,0.06)' }} />

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '60px 0 80px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Get in Touch</div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Contact Us</h2>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.7, margin: 0, maxWidth: '440px' }}>Have a question, collaboration idea, or just want to say hello? We'd love to hear from you.</p>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <input type="text" placeholder="Your Name" style={{ height: '44px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', padding: '0 14px', outline: 'none', width: '100%' }} />
          <input type="email" placeholder="Your Email" style={{ height: '44px', borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', padding: '0 14px', outline: 'none', width: '100%' }} />
          <textarea placeholder="Your Message" rows={5} style={{ borderRadius: '6px', border: '1px solid rgba(245,242,237,0.15)', background: 'rgba(10,10,10,0.6)', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', padding: '12px 14px', outline: 'none', width: '100%', resize: 'vertical' }} />
          <button style={{ height: '48px', borderRadius: '6px', border: 'none', background: '#C4530A', color: '#F5F2ED', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, cursor: 'pointer', marginTop: '4px' }}>Send Message →</button>
        </div>
      </div>
      </div>
    </div>
  );
}
