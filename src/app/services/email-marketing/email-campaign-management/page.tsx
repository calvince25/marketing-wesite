import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Email Campaign Management | GrowthLab Limited",
  description: "Professional email campaign management services.",
};

export default function Page() {
  const pillar = pillarServices["email-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "email-campaign-management");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
