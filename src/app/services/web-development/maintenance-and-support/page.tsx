import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Maintenance & Support | GrowthLab Limited",
  description: "Keep your website running smoothly with our expert maintenance and support services.",
};

export default function Page() {
  const pillar = pillarServices["web-development"];
  const subService = pillar?.clusters.find(c => c.slug === "maintenance-and-support");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
