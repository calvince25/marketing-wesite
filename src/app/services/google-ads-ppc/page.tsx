import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Google Ads & PPC | GrowthLab Limited Kenya",
  description: "Instant ROI with scalable growth.",
};

export default function Page() {
  const service = pillarServices["google-ads-ppc"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
