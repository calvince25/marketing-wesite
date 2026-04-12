import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "SEO & Digital Marketing | GrowthLab Limited Kenya",
  description: "Get found on Google and convert searchers into customers.",
};

export default function Page() {
  const service = pillarServices["seo-digital-marketing"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
