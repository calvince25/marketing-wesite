import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Website Maintenance, Security & Hosting Kenya",
  description: "Keep your website secure, backed up, fast, and available with monthly maintenance, malware protection, hosting, monitoring, and migration support.",
  alternates: { canonical: '/services/website-management' },
};

export default function Page() {
  const service = pillarServices["website-management"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
