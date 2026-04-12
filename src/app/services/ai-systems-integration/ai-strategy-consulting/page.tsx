import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Ai Strategy Consulting | GrowthLab Limited",
  description: "Professional ai strategy consulting services.",
};

export default function Page() {
  const pillar = pillarServices["ai-systems-integration"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-strategy-consulting");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
