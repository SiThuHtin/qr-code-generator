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
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Silly QR. All rights reserved.
              </span>
              <nav className="flex gap-6 text-sm">
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
                <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</a>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
