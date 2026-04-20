import type { Metadata } from 'next';
import SubmitClient from './SubmitClient';

export const metadata: Metadata = {
  title: 'Submit to The End — Share Your Journey',
  description:
    'Share your journal entries, films, and photographs with the community. Every submission becomes part of the world we are mapping together.',
};

export default function SubmitPage() {
  return <SubmitClient />;
}
