import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Search Ads Management Kenya | GrowthLab Limited",
  description: "Professional search ads management kenya services.",
};

export default function Page() {
  const pillar = pillarServices["google-ads-ppc"];
  const subService = pillar?.clusters.find(c => c.slug === "search-ads-management-kenya");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
