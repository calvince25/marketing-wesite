import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AI Strategy & Consulting | GrowthLab Limited",
  description: "Navigate the AI landscape with strategic consulting tailored to your business goals.",
};

export default function Page() {
  const pillar = pillarServices["ai-systems-integration"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-strategy-consulting");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
