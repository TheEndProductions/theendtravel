'use client';
import NavMenu from '@/components/layout/NavMenu';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0A" />
        <title>TheEndProductions — To See The World & To Find Each Other</title>
        <meta name="description" content="Travel filmmaking, expedition gear, and stories from the road." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0A0A0A', color: '#F5F2ED', fontFamily: '"DM Sans", system-ui, sans-serif', WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>
        <NavMenu />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
