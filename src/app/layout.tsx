import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";

export const revalidate = 60;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GrowthLab | Digital Marketing Services Kenya & SEO Nairobi",
  description: "GrowthLab Limited: Premier agency for digital marketing services in Kenya and SEO in Nairobi. We specialize in web design, SEO, and AI integration for modern brands.",
  keywords: "digital marketing services Kenya, digital marketing Nairobi, website development Nairobi, web design Kenya, SEO services Nairobi, SEO company in Nairobi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppIcon />
      </body>
    </html>
  );
}
