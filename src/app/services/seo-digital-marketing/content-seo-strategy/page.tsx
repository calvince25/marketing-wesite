import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Content SEO Strategy | GrowthLab Limited",
  description: "Data-driven content strategies that rank and convert for businesses in Kenya.",
};

export default function Page() {
  const pillar = pillarServices["seo-digital-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "content-seo-strategy");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
