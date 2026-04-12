import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AI Systems Integration | GrowthLab Limited Kenya",
  description: "Leverage artificial intelligence to future-proof your business.",
};

export default function Page() {
  const service = pillarServices["ai-systems-integration"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
