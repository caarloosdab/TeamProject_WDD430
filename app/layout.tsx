import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://handcrafted-haven.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description: "Discover artisan-made products, meet independent makers, and shop responsibly.",
  keywords: [
    "handcrafted",
    "artisan marketplace",
    "sustainable gifts",
    "independent sellers",
    "ethical shopping",
  ],
  openGraph: {
    title: "Handcrafted Haven",
    description: "Browse curated artisan products and connect with the makers behind them.",
    url: siteUrl,
    siteName: "Handcrafted Haven",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Haven",
    description: "Curated collections from independent artisans around the world.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
