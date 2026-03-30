import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Workflow Automation | GrowthLab Limited",
  description: "Connect your business systems into a unified, efficient workflow with our automation services.",
};

export default function Page() {
  const pillar = pillarServices["business-automation"];
  const subService = pillar?.clusters.find(c => c.slug === "workflow-automation");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
