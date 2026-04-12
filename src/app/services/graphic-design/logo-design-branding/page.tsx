import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Logo Design Branding | GrowthLab Limited",
  description: "Professional logo design branding services.",
};

export default function Page() {
  const pillar = pillarServices["graphic-design"];
  const subService = pillar?.clusters.find(c => c.slug === "logo-design-branding");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
