import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Social Media Management | GrowthLab Limited Kenya",
  description: "Building communities and driving commerce.",
};

export default function Page() {
  const service = pillarServices["social-media-management"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
