import { pillarServices } from "@/lib/services";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Email Marketing Kenya | Campaigns & Lead Nurture",
  description: "Use targeted email campaigns and lead-nurture journeys to stay useful, build trust, and generate repeat enquiries in Kenya.",
  alternates: { canonical: '/services/email-marketing/email-marketing' },
};

export default function Page() {
  const pillar = pillarServices["email-marketing"];
  const subService = pillar?.clusters.find(c => c.slug === "email-marketing");
  if (!pillar || !subService) notFound();
  return <SubServiceTemplate pillar={pillar as any} subService={subService as any} />;
}
