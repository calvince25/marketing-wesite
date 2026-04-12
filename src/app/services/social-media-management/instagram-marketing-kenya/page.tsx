import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Instagram Marketing Kenya | GrowthLab Limited",
  description: "Professional instagram marketing kenya services.",
};

export default function Page() {
  const pillar = pillarServices["social-media-management"];
  const subService = pillar?.clusters.find(c => c.slug === "instagram-marketing-kenya");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
