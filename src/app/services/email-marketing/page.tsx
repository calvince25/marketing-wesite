import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Email Marketing & Automation Kenya | GrowthLab",
  description: "Build email campaigns, lead-nurture sequences, and reporting systems that turn permission-based audiences into repeat enquiries and sales.",
  alternates: { canonical: '/services/email-marketing' },
};

export default function Page() {
  const service = pillarServices["email-marketing"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
