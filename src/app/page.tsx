import type { Metadata } from 'next';
import HomepageClient from './HomepageClient';

export const metadata: Metadata = {
  title: 'TheEndProductions — To See The World & To Find Each Other',
  description: 'Travel filmmaking, expedition gear, and stories from the road. A creative studio built on human connection.',
};

export default function HomePage() {
  return <HomepageClient />;
}
