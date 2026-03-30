import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Lead Management Automation | GrowthLab Limited",
  description: "Automate your lead lifecycle from capture to conversion with our intelligent systems.",
};

export default function Page() {
  const pillar = pillarServices["business-automation"];
  const subService = pillar?.clusters.find(c => c.slug === "lead-management-automation");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
