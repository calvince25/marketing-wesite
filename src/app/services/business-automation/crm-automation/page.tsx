import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "CRM Automation | GrowthLab Limited",
  description: "Streamline your sales funnel and customer relationships with advanced CRM automation.",
};

export default function Page() {
  const pillar = pillarServices["business-automation"];
  const subService = pillar?.clusters.find(c => c.slug === "crm-automation");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
