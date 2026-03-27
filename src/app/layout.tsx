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
    "Discover 10,000+ free public APIs for developers.",
  keywords: ["free apis", "public apis", "api directory"],
  openGraph: {
    type: "website",
    url: "https://free-api-world.vercel.app/",
    siteName: "FreeAPIWorld",
    title: "FreeAPIWorld — Universe of Free APIs",
    description:
      "The largest directory of free public APIs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeAPIWorld",
    description: "The largest directory of free APIs.",
  },
  robots: {
    index: true,
    follow: true,
  },

  // ✅ Monetag meta
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
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* ✅ Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4701392445476807"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* ✅ Monetag script 1 */}
        <Script
          src="https://5gvci.com/act/files/tag.min.js?z=10793455"
          strategy="afterInteractive"
        />

        {/* ✅ Monetag script 2 */}
        <Script id="monetag-vignette" strategy="afterInteractive">
          {`
            (function(s){
              s.dataset.zone='10793461';
              s.src='https://izcle.com/vignette.min.js';
            })(
              [document.documentElement, document.body]
              .filter(Boolean)
              .pop()
              .appendChild(document.createElement('script'))
            );
          `}
        </Script>

        {/* ✅ Monetag script 3 */}
        <Script id="monetag-popup" strategy="afterInteractive">
          {`
            (function(s){
              s.dataset.zone='10793462';
              s.src='https://nap5k.com/tag.min.js';
            })(
              [document.documentElement, document.body]
              .filter(Boolean)
              .pop()
              .appendChild(document.createElement('script'))
            );
          `}
        </Script>

      </body>
    </html>
  );
}