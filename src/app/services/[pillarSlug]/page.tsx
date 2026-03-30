import { client } from "@/sanity/lib/client";
import { groq } from 'next-sanity'
import { pillarBySlugQuery, serviceBySlugQuery } from "@/sanity/lib/queries";
import PillarTemplate from "@/components/services/PillarTemplate";
import { pillarServices } from "@/lib/services";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  // 1. Get slugs from static registry
  const staticSlugs = Object.keys(pillarServices);
  
  // 2. Get slugs from Sanity (optional but good for completeness)
  const sanityPillars = await client.fetch(groq`*[_type == "pillarPage"].slug.current`).catch(() => []);
  const sanityServices = await client.fetch(groq`*[_type == "service"].slug.current`).catch(() => []);
  
  const allSlugs = Array.from(new Set([...staticSlugs, ...sanityPillars, ...sanityServices]));
  
  return allSlugs.map((slug) => ({
    pillarSlug: slug,
  }));
}

interface PillarPageProps {
  params: Promise<{ pillarSlug: string }>;
}

export async function generateMetadata({ params }: PillarPageProps): Promise<Metadata> {
  const { pillarSlug } = await params;
  const pillar = await client.fetch(pillarBySlugQuery, { slug: pillarSlug }).catch(() => null);
  const staticPillar = pillarServices[pillarSlug];
  
  const current = pillar || staticPillar;
  if (!current) return {};

  return {
    title: (current as any).title || (current as any).name || 'Service Category',
    description: (current as any).description || (current as any).shortDescription,
  };
}

export default async function PillarPage({ params }: PillarPageProps) {
  const { pillarSlug } = await params;
  
  // 1. Try fetching Pillar Page from Sanity
  const sanityPillar = await client.fetch(pillarBySlugQuery, { slug: pillarSlug }).catch(() => null);
  
  // 2. Try fetching Service from Sanity (if not a pillar)
  const sanityService = !sanityPillar ? await client.fetch(serviceBySlugQuery, { slug: pillarSlug }).catch(() => null) : null;
  
  // 3. Fallback to static data
  const staticPillar = !sanityPillar && !sanityService ? pillarServices[pillarSlug] : null;

  if (!sanityPillar && !sanityService && !staticPillar) {
    notFound();
  }

  // Handle Service Type (Individual Service)
  if (sanityService) {
    const displayData = {
      title: sanityService.name,
      slug: sanityService.slug.current,
      description: sanityService.shortDescription,
      overview: sanityService.fullDescription,
      benefits: [],
      process: [],
      faqs: [],
      clusters: [],
      isSanity: true
    };
    return <PillarTemplate service={displayData as any} />;
  }

  // Handle Pillar Type
  const displayData = sanityPillar ? {
    title: sanityPillar.title,
    slug: sanityPillar.slug.current,
    description: sanityPillar.description,
    overview: sanityPillar.overview,
    benefits: sanityPillar.benefits || [],
    process: (sanityPillar.process || []).map((p: any) => ({ step: p.step, detail: p.detail })),
    faqs: (sanityPillar.faqs || []).map((f: any) => ({ q: f.question, a: f.answer })),
    clusters: (sanityPillar.clusters || []).map((c: any) => ({
      title: c.title,
      slug: c.slug.current,
      description: c.description,
      content: c.content
    })),
    isSanity: true
  } : { ...staticPillar, isSanity: false };

  return <PillarTemplate service={displayData as any} />;
}
