import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const EndlessClient = dynamic(() => import('./EndlessClient'), { ssr: false });

export const metadata: Metadata = {
  title: 'The Endless Backpack Ecosystem',
  description: 'A 4-piece modular travel system. Pack, Daypack, Sling, Kit — built to work together for any journey.',
};

export default function EndlessPage() {
  return <EndlessClient />;
}
