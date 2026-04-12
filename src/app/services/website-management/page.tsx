import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Website Management | GrowthLab Limited Kenya",
  description: "Protecting your digital investment.",
};

export default function Page() {
  const service = pillarServices["website-management"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
