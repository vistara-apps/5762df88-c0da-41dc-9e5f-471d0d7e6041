import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoiceBound: Hindi AI Control',
  description: 'Secure, user-owned Hindi voice AI for device & smart home control on Base',
  openGraph: {
    title: 'VoiceBound: Hindi AI Control',
    description: 'Secure, user-owned Hindi voice AI for device & smart home control on Base',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/splash.png',
    'fc:frame:button:1': 'Launch VoiceBound',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://voicebound.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
