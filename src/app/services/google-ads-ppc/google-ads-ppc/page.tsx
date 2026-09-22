import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Google Ads & PPC Management Kenya | GrowthLab",
  description: "Plan, launch, measure, and optimise Google Ads campaigns with conversion tracking and clear reporting on spend, leads, and sales actions.",
  alternates: { canonical: '/services/google-ads-ppc/google-ads-ppc' },
};

export default function Page() {
  const pillar = pillarServices["google-ads-ppc"];
  const subService = pillar?.clusters.find(c => c.slug === "google-ads-ppc");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
