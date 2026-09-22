import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Website Management & Support Kenya | Updates, Backups & Security",
  description: "Keep your website updated, backed up, monitored, secure, and supported with a practical website management plan for Kenyan businesses.",
  alternates: { canonical: '/services/website-management/website-management' },
};

export default function Page() {
  const pillar = pillarServices["website-management"];
  const subService = pillar?.clusters.find(c => c.slug === "website-management");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
