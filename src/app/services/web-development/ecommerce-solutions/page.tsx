import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Ecommerce Solutions | GrowthLab Limited",
  description: "Scale your online store with our high-converting ecommerce solutions including M-Pesa integration.",
};

export default function Page() {
  const pillar = pillarServices["web-development"];
  const subService = pillar?.clusters.find(c => c.slug === "ecommerce-solutions");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
