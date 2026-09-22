import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AI Strategy Consulting Kenya | Practical Use Cases & Roadmap",
  description: "Identify practical AI use cases, data requirements, risks, and implementation priorities for your Kenyan business.",
  alternates: { canonical: '/services/ai-systems-integration/ai-strategy-consulting' },
};

export default function Page() {
  const pillar = pillarServices["ai-systems-integration"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-strategy-consulting");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
