import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Ai Systems Integration | GrowthLab Limited",
  description: "Leverage artificial intelligence to future-proof your business.",
};

export default function Page() {
  const pillar = pillarServices["ai-systems-integration"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-systems-integration");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
