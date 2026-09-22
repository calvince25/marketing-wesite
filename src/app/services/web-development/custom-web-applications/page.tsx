import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Custom Web Application Development Kenya",
  description: "Build secure, scalable web applications for complex workflows, customer portals, dashboards, and operational systems in Kenya.",
  alternates: { canonical: '/services/web-development/custom-web-applications' },
};

export default function Page() {
  const pillar = pillarServices["web-development"];
  const subService = pillar?.clusters.find(c => c.slug === "custom-web-applications");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
