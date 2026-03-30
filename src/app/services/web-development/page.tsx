import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Web Development | GrowthLab Limited Kenya",
  description: "High-performance websites built for speed, security, and scalability.",
};

export default function Page() {
  const service = pillarServices["web-development"];
  if (!service) notFound();
  return <PillarTemplate service={service} />;
}
