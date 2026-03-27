import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://free-api-world.vercel.app/"),
  title: {
    default: "FreeAPIWorld — Universe of Free APIs",
    template: "%s | FreeAPIWorld",
  },
  description:
    "Discover 10,000+ free public APIs for developers. Browse by category, filter by auth type, and find the perfect API for your next project — all for free.",
  keywords: [
    "free apis",
    "public apis",
    "api directory",
    "open apis",
    "developer tools",
    "rest api",
    "free api list",
    "api finder",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://free-api-world.vercel.app/",
    siteName: "FreeAPIWorld",
    title: "FreeAPIWorld — Universe of Free APIs",
    description:
      "The largest directory of free public APIs for developers. Browse, filter, and discover APIs instantly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeAPIWorld — Universe of Free APIs",
    description: "The largest directory of free public APIs for developers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    monetag: "15a703566233503bbd2b7f5aeedbcacb",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <Header />
      <main>{children}</main>
      <Footer />

      {/* Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4701392445476807"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </body>
  );
}
