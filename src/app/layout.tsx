import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free QR Code Generator",
  description: "Create Free QR Codes — A simple and fast solution for all your needs. Instantly generate high-quality QR codes for URLs, text, or files up to 10MB. Always free and fast.",
  applicationName: "Silly QR",
  keywords: ["Free QR Code Generator", "QR Code Generator", "Silly QR", "File to QR", "Create QR Code"],
  openGraph: {
    title: "Free QR Code Generator",
    description: "Create Free QR Codes — A simple and fast solution for all your needs. Instantly generate high-quality QR codes for URLs, text, or files up to 10MB. Always free and fast.",
    siteName: "Silly QR",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
