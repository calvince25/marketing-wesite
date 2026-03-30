import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { clusterBySlugQuery, pillarBySlugQuery } from "@/sanity/lib/queries";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { pillarServices } from "@/lib/services";
import { Metadata } from "next";
import { groq } from 'next-sanity'

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const params: { pillarSlug: string; clusterSlug: string }[] = [];
  
  // 1. Static Registry
  for (const [pSlug, pillar] of Object.entries(pillarServices)) {
    for (const cluster of pillar.clusters) {
      params.push({
        pillarSlug: pSlug,
        clusterSlug: cluster.slug,
      });
    }
  }
  
  // 2. Sanity (Optional - pre-render all cluster pages)
  const sanityClusters = await client.fetch(groq`*[_type == "clusterPage"]{ "pillarSlug": parentPillar->slug.current, "clusterSlug": slug.current }`).catch(() => []);
  
  const allParams = [...params, ...sanityClusters];
  
  return allParams;
}

interface ClusterPageProps {
  params: { pillarSlug: string; clusterSlug: string };
}

export async function generateMetadata({ params }: ClusterPageProps): Promise<Metadata> {
  const { clusterSlug } = await params;
  const cluster = await client.fetch(clusterBySlugQuery, { slug: clusterSlug }).catch(() => null);
  
  // Find static fallback if any
  let staticCluster = null;
  for (const p of Object.values(pillarServices)) {
     const found = p.clusters.find(c => c.slug === clusterSlug);
     if (found) { staticCluster = found; break; }
  }

  const current = cluster || staticCluster;
  if (!current) return {};

  return {
    title: current.title || 'Sub-Service',
    description: current.description,
  };
}

export default async function ClusterPage({ params }: ClusterPageProps) {
  const { pillarSlug, clusterSlug } = await params;

  // 1. Fetch Cluster from Sanity
  const cluster = await client.fetch(clusterBySlugQuery, { slug: clusterSlug }).catch(() => null);
  
  // 2. Fetch Pillar (either from Sanity or static)
  const sanityPillar = await client.fetch(pillarBySlugQuery, { slug: pillarSlug }).catch(() => null);
  const staticPillar = pillarServices[pillarSlug];

  if (!cluster && !staticPillar?.clusters.find(c => c.slug === clusterSlug)) {
    notFound();
  }

  const pillarData = sanityPillar ? {
    title: sanityPillar.title,
    slug: sanityPillar.slug.current,
    clusters: (sanityPillar.clusters || []).map((c: any) => ({
      title: c.title,
      slug: c.slug.current,
      description: c.description
    }))
  } : staticPillar;

  const clusterData = cluster ? {
    title: cluster.title,
    slug: cluster.slug.current,
    description: cluster.description,
    content: cluster.content,
    isSanity: true
  } : staticPillar.clusters.find(c => c.slug === clusterSlug);

  return <SubServiceTemplate pillar={pillarData as any} subService={clusterData as any} />;
}
