import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4701392445476807">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4701392445476807"
     crossorigin="anonymous"></script>
      </body>
    </html>
  );
}
