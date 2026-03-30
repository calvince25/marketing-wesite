import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Local SEO Nairobi | GrowthLab Limited",
  description: "Dominate local search results in Nairobi with our specialized local SEO strategies.",
};

export default function Page() {
  const pillar = pillarServices["seo-digital-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "local-seo-nairobi");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
