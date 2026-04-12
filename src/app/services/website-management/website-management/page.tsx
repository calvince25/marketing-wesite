import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Website Management | GrowthLab Limited",
  description: "Protecting your digital investment.",
};

export default function Page() {
  const pillar = pillarServices["website-management"];
  const subService = pillar?.clusters.find(c => c.slug === "website-management");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
