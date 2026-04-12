import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Graphic Design & Branding | GrowthLab Limited Kenya",
  description: "Visual identities that command respect.",
};

export default function Page() {
  const service = pillarServices["graphic-design"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
