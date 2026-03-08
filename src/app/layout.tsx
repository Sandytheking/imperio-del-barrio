import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://imperiodelbarrio.com'),
  title: 'Imperio del Barrio 🏘️ — Juego Idle Dominicano Gratis',
  description: 'Empieza con una barbería y $500. Construye un imperio económico dominicano — 21 negocios, 7 etapas sociales. Juego idle gratis en el navegador.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Imperio' },
  keywords: ['juego idle', 'juego dominicano', 'imperio del barrio', 'clicker game', 'juego gratis', 'negocios', 'barrio', 'dominicana'],
  authors: [{ name: 'Imperio del Barrio' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Imperio del Barrio 🏘️ — Juego Idle Dominicano',
    description: 'De barbería a banco central. Construye tu imperio desde el barrio. 100% gratis.',
    url: 'https://imperiodelbarrio.com',
    siteName: 'Imperio del Barrio',
    images: [{ url: '/images/share-bg.jpg', width: 1200, height: 630 }],
    locale: 'es_DO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imperio del Barrio 🏘️ — Juego Idle Dominicano',
    description: 'De barbería a banco central. 100% gratis en el navegador.',
    images: ['/images/share-bg.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1E1B2E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WZTFLYC73Q" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WZTFLYC73Q');
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0F0D1A' }}>
        {children}
      </body>
    </html>
  );
}

