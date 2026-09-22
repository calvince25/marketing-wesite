import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "E-commerce Website Development Kenya | M-Pesa Stores",
  description: "Launch an online store in Kenya with mobile-first product pages, secure checkout, M-Pesa payment integration, delivery workflows, and support.",
  alternates: { canonical: '/services/web-development/ecommerce-solutions' },
};

export default function Page() {
  const pillar = pillarServices["web-development"];
  const subService = pillar?.clusters.find(c => c.slug === "ecommerce-solutions");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
