import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Social Media Management Kenya | Content & Lead Generation",
  description: "Plan, create, publish, and measure social media campaigns that connect Kenyan brands with customers, enquiries, and sales actions.",
  alternates: { canonical: '/services/social-media-management' },
};

export default function Page() {
  const service = pillarServices["social-media-management"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
