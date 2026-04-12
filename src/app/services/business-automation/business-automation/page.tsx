import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Business Automation | GrowthLab Limited",
  description: "Streamline your operations and focus on what matters most.",
};

export default function Page() {
  const pillar = pillarServices["business-automation"];
  const subService = pillar?.clusters.find(c => c.slug === "business-automation");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
