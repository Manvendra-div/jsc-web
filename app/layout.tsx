import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "JSC Compiler";
const titleTemplate = "%s | JSC Compiler";
const defaultTitle = "JSC Compiler | Just a Simple Compiler Based on Python";
const description =
  "Run, test, and iterate on new JSC code in a fast, browser-based compiler playground.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
  applicationName: siteName,
  description,
  keywords: [
    "own interpreter",
    "compiler",
    "online code runner",
    "JS playground",
    "TypeScript",
    "web IDE",
    "JSC",
    "Just a Simple Compiler",
  ],
  authors: [{ name: "JSC Team" }],
  creator: "JSC Team",
  publisher: "JSC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description,
    images: [
      {
        url: "/window.svg",
        width: 1200,
        height: 630,
        alt: "JSC Compiler playground interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@JSC",
    creator: "@JSC",
    title: defaultTitle,
    description,
    images: ["/window.svg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"></script>
      </body>
    </html>
  );
}
