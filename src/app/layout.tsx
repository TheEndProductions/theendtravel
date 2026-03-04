import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://theendtravel.com'),
  title: {
    default: 'TheEndProductions — To See The World & To Find Each Other',
    template: '%s — TheEndProductions',
  },
  description: 'Travel filmmaking, expedition gear, and stories from the road.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theendtravel.com',
    siteName: 'TheEndProductions',
    title: 'TheEndProductions — To See The World & To Find Each Other',
    description: 'Travel filmmaking, expedition gear, and stories from the road.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Organization',
          name: 'TheEndProductions', url: 'https://theendtravel.com',
          description: 'Travel filmmaking, expedition gear, and stories from the road.',
        })}} />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0A0A0A', color: '#F5F2ED', fontFamily: '"DM Sans", system-ui, sans-serif', WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>
        <a href="#main-content" style={{ position: 'absolute', left: '-9999px', top: '16px', zIndex: 99999, padding: '8px 16px', background: '#C4530A', color: '#F5F2ED', borderRadius: '4px', fontSize: '14px', textDecoration: 'none' }} onFocus={(e) => { (e.target as HTMLElement).style.left = '16px'; }} onBlur={(e) => { (e.target as HTMLElement).style.left = '-9999px'; }}>Skip to content</a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
