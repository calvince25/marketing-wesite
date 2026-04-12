import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Custom Web Applications | GrowthLab Limited",
  description: "Professional custom web applications services.",
};

export default function Page() {
  const pillar = pillarServices["web-development"];
  const subService = pillar?.clusters.find(c => c.slug === "custom-web-applications");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
