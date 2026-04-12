import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Social Media Management | GrowthLab Limited",
  description: "Building communities and driving commerce.",
};

export default function Page() {
  const pillar = pillarServices["social-media-management"];
  const subService = pillar?.clusters.find(c => c.slug === "social-media-management");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
