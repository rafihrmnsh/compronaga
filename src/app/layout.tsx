import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ScrollUI from "@/components/ScrollUI";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | General Contractor & Engineering`, template: `%s | ${site.short}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "id_ID", siteName: site.name, url: site.url,
    title: `${site.name} | General Contractor & Engineering`, description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name} - proyek storage tank` }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};
export const viewport: Viewport = { themeColor: "#0d1638", width: "device-width", initialScale: 1 };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.short,
  url: site.url,
  logo: `${site.url}/logo.png`,
  description: site.description,
  foundingDate: site.founded,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }} />
        <ScrollUI />
        <RevealObserver />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
