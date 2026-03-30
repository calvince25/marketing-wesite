import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Custom Web Applications | GrowthLab Limited",
  description: "Bespoke web applications tailored to your business logic and operational needs.",
};

export default function Page() {
  const pillar = pillarServices["web-development"];
  const subService = pillar?.clusters.find(c => c.slug === "custom-web-applications");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar} subService={subService} />;
}
