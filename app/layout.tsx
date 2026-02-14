import type { Metadata } from "next";
import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "VoiceBound: Hindi AI Control",
  description: "Secure, user-owned Hindi voice AI for device & smart home control on Base",
  openGraph: {
    title: "VoiceBound: Hindi AI Control",
    description: "Secure, user-owned Hindi voice AI for device & smart home control on Base",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a1929" />
      </head>
      <body>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
