import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Google Ads Management Kenya | PPC & Search Campaigns",
  description: "Manage Google Ads in Kenya with search strategy, conversion tracking, landing-page optimisation, reporting, and accountable ad-spend decisions.",
  alternates: { canonical: '/services/google-ads-ppc' },
};

export default function Page() {
  const service = pillarServices["google-ads-ppc"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
