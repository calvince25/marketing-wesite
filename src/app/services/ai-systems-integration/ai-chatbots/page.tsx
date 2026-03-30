import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AI Chatbots | GrowthLab Limited",
  description: "Intelligent chatbots that handle customer queries around the clock, improving support and conversion.",
};

export default function Page() {
  const pillar = pillarServices["ai-systems-integration"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-chatbots");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
