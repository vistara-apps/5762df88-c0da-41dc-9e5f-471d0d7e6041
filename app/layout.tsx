import type { Metadata } from "next";
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
