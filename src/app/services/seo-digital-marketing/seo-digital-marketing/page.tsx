import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Seo Digital Marketing | GrowthLab Limited",
  description: "Get found on Google and convert searchers into customers.",
};

export default function Page() {
  const pillar = pillarServices["seo-digital-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "seo-digital-marketing");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
