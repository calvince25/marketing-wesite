import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import JsonLd from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";

export const revalidate = 60;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.growthlab.co.ke'),
  title: {
    default: "GrowthLab | Digital Marketing Agency Kenya & SEO Nairobi",
    template: "%s | GrowthLab Limited"
  },
  description: "GrowthLab Limited is a premier agency for digital marketing in Kenya and SEO in Nairobi. We specialize in web design, SEO, and AI integration for modern brands.",
  keywords: ["digital marketing services Kenya", "digital marketing Nairobi", "website development Nairobi", "web design Kenya", "SEO services Nairobi", "SEO company in Nairobi"],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-512.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-512.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-512.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon/favicon-512.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/favicon-512.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon-512.png',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: "GrowthLab Limited | Digital Marketing Agency Kenya",
    description: "Premier agency for digital marketing and SEO in Kenya. We build high-end digital experiences for ambitious brands.",
    url: 'https://www.growthlab.co.ke',
    siteName: 'GrowthLab Limited',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GrowthLab Limited Digital Marketing',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowthLab Limited | Digital Marketing Kenya',
    description: 'Premier digital agency specializing in SEO and high-end web design in Nairobi.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "GrowthLab Limited",
    "image": "https://www.growthlab.co.ke/media/logo.png",
    "@id": "https://www.growthlab.co.ke",
    "url": "https://www.growthlab.co.ke",
    "telephone": "+254 743 990 479",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Westlands",
      "addressLocality": "Nairobi",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.2635,
      "longitude": 36.8048
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:30"
    },
    "sameAs": [
      "https://www.facebook.com/share/1bTmn3gbH5/",
      "https://www.linkedin.com/in/calvince-omondi-3351763ba",
      "https://instagram.com/growthlablimited"
    ]
  };

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd data={organizationSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppIcon />
        <Analytics />
      </body>
    </html>
  );
}
