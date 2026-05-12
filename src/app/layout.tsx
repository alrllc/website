import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://website-fawn-nine-35.vercel.app"),
  title: {
    default: "ALR Career Consulting LLC | Career Counseling and Coaching",
    template: "%s | ALR Career Consulting LLC",
  },
  description:
    "Bilingual career counseling, career coaching, resume enhancement, interview preparation, and workforce education support from ALR Career Consulting LLC.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ALR Career Consulting LLC",
    description:
      "Bilingual career counseling, career coaching, resume enhancement, and workforce education support.",
    url: "/",
    siteName: "ALR Career Consulting LLC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALR Career Consulting LLC",
    description:
      "Bilingual career counseling, career coaching, resume enhancement, and workforce education support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
