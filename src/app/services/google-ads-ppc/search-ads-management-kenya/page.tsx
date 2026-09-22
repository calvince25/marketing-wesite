import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Search Ads Management Kenya | Google PPC Campaigns",
  description: "Plan and optimise Google search campaigns in Kenya with keyword strategy, conversion tracking, landing pages, and transparent reporting.",
  alternates: { canonical: '/services/google-ads-ppc/search-ads-management-kenya' },
};

export default function Page() {
  const pillar = pillarServices["google-ads-ppc"];
  const subService = pillar?.clusters.find(c => c.slug === "search-ads-management-kenya");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
