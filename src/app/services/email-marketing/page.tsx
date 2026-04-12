import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Email Marketing | GrowthLab Limited Kenya",
  description: "Nurturing leads to conversion.",
};

export default function Page() {
  const service = pillarServices["email-marketing"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
