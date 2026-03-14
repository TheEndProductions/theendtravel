import type { Metadata } from 'next';
import FilmsClient from './FilmsClient';

export const metadata: Metadata = {
  title: 'Films — TheEndProductions',
  description: 'Stories from the road. Travel films that explore human connection across the world.',
};

export default function FilmsPage() {
  return <FilmsClient />;
}
