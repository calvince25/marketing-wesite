import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AI SEO Services Kenya | GrowthLab Limited",
  description: "Future-proof your online presence with AI-powered SEO optimization.",
};

export default function Page() {
  const pillar = pillarServices["seo-digital-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "ai-seo-services-kenya");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
