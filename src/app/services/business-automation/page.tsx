import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Business Automation | GrowthLab Limited Kenya",
  description: "Streamline your operations and focus on what matters most.",
};

export default function Page() {
  const service = pillarServices["business-automation"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
