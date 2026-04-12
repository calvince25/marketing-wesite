import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Web Development | GrowthLab Limited",
  description: "High-performance websites built for speed, security, and scalability.",
};

export default function Page() {
  const pillar = pillarServices["web-development"];
  const subService = pillar?.clusters.find(c => c.slug === "web-development");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
