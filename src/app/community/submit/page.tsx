import type { Metadata } from 'next';
import SubmissionForm from '@/components/community/SubmissionForm';

export const metadata: Metadata = {
  title: 'Submit Your Story',
  description: 'Share your travel story or gear experience on the Journey Map.',
};

export default function SubmitPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>The Community</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Submit Your Story</h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#D4CFC7', lineHeight: 1.65, margin: 0, maxWidth: '440px' }}>Your journey belongs on the map. Share a moment, a place, a story — and become part of something bigger.</p>
        </div>
        <SubmissionForm />
      </div>
    </div>
  );
}
