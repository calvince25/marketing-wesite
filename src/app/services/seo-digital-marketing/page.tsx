import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "SEO Services Nairobi & Kenya | GrowthLab Limited",
  description: "Technical SEO, local SEO, keyword research, content, and reporting that help Kenyan businesses earn qualified Google traffic and enquiries.",
  alternates: { canonical: '/services/seo-digital-marketing' },
};

export default function Page() {
  const service = pillarServices["seo-digital-marketing"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
