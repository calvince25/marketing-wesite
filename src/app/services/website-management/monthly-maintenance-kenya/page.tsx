import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Monthly Website Maintenance Kenya | Updates & Backups",
  description: "Monthly website maintenance in Kenya covering updates, backups, uptime checks, security reviews, and ongoing technical support.",
  alternates: { canonical: '/services/website-management/monthly-maintenance-kenya' },
};

export default function Page() {
  const pillar = pillarServices["website-management"];
  const subService = pillar?.clusters.find(c => c.slug === "monthly-maintenance-kenya");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
