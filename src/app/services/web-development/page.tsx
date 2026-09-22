import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Web Design & Development Agency Kenya | GrowthLab",
  description: "GrowthLab builds mobile-first websites, e-commerce stores, and custom web applications for businesses in Nairobi and across Kenya.",
  alternates: { canonical: '/services/web-development' },
};

export default function Page() {
  const service = pillarServices["web-development"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
