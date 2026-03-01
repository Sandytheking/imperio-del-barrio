import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Imperio del Barrio 🏘️',
  description: 'El tycoon del barrio dominicano. Construye tu imperio negocio por negocio.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Imperio' },
  openGraph: {
    title: 'Imperio del Barrio',
    description: 'Construye tu imperio desde la barbería hasta el bar VIP',
    images: ['/og-image.png'],
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
          href="https://fonts.googleapis.com/css2?family=Boogaloo&family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#1E1B2E' }}>
        {children}
      </body>
    </html>
  );
}
