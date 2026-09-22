import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Email Campaign Management Kenya | GrowthLab",
  description: "Plan, write, design, send, and measure email campaigns that support customer retention and qualified business enquiries.",
  alternates: { canonical: '/services/email-marketing/email-campaign-management' },
};

export default function Page() {
  const pillar = pillarServices["email-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "email-campaign-management");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
