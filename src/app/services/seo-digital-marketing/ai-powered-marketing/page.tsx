import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Ai Powered Marketing | GrowthLab Limited",
  description: "Professional ai powered marketing services.",
};

export default function Page() {
  const pillar = pillarServices["seo-digital-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-powered-marketing");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
