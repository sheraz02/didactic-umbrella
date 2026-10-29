import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/*
 * Fonts are self-hosted (files in ./fonts, both licensed under the SIL Open
 * Font License) and loaded through next/font, so there is no request to a
 * third-party font server and no layout shift.
 */
const newsreader = localFont({
  src: "./fonts/newsreader-latin-opsz-normal.woff2",
  variable: "--font-newsreader",
  weight: "200 800",
  style: "normal",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin-wght-normal.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const title = "Rexsis Consultancy | Tax, Accounting & Bookkeeping Services";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: "%s | Rexsis Consultancy",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${dmSans.variable}`}>
      <body className="min-h-screen">
        {children}
        <script
          type="application/ld+json"
          // "<" is escaped so the JSON can never close the script tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
