import { pillarServices } from "@/lib/services";
import PillarTemplate from "@/components/services/PillarTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Graphic Design & Branding Nairobi | Company Profiles",
  description: "Create consistent brand identities, logos, company profiles, pitch decks, and digital design assets for Nairobi and Kenyan businesses.",
  alternates: { canonical: '/services/graphic-design' },
};

export default function Page() {
  const service = pillarServices["graphic-design"];
  if (!service) notFound();
  return <PillarTemplate service={service as any} />;
}
