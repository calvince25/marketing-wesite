import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Business Automation Nairobi | CRM & Workflow Automation",
  description: "Automate lead management, CRM workflows, reporting, and repetitive operations for growing businesses in Nairobi and across Kenya.",
  alternates: { canonical: '/services/business-automation' },
};

export default function Page() {
  const service = pillarServices["business-automation"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
