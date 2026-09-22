import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Logo Design & Branding Nairobi | GrowthLab",
  description: "Develop a memorable logo, visual identity, and practical brand system for your Nairobi or Kenyan business.",
  alternates: { canonical: '/services/graphic-design/logo-design-branding' },
};

export default function Page() {
  const pillar = pillarServices["graphic-design"];
  const subService = pillar?.clusters.find(c => c.slug === "logo-design-branding");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
