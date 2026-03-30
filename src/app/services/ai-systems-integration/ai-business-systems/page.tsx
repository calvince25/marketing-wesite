import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AI Business Systems | GrowthLab Limited",
  description: "Integrate AI into your core business systems for smarter decision making and operational excellence.",
};

export default function Page() {
  const pillar = pillarServices["ai-systems-integration"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-business-systems");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
