import LinkNext from "next/link";
import styles from "./services.module.css";
import { pillarServices } from "@/lib/services";
import { client } from "@/lib/client";
import { allServicesQuery } from "@/lib/queries";
import type { Metadata } from "next";
import HeroSection from "@/components/layout/HeroSection";

export const metadata: Metadata = {
  alternates: {
    canonical: '/services',
  },
};

export default async function ServicesPage() {
  const sanityServices = await client.fetch(allServicesQuery).catch(() => []);
  const staticServices = Object.values(pillarServices);
  
  const allServices = (sanityServices && sanityServices.length > 0) ? sanityServices : staticServices;

  return (
    <div className={styles.servicesPage}>
      <HeroSection 
        page="services" 
        defaultTitle="Expert Digital Services to Scale Your Brand" 
        defaultSubtitle="From high-end web development to data-driven SEO, we provide the tools your business needs to lead in the digital age." 
      />

      <section className={styles.serviceList}>
        <div className="container">
          <div className={styles.grid}>
            {allServices.map((service: any, idx: number) => {
              const isSanity = !!service._id;
              const slug = isSanity ? (service.slug?.current || service.slug) : service.slug;
              const title = service.name || service.title;
              const description = service.shortDescription || service.description;
              
              return (
                <div key={idx} className={styles.serviceCard}>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  {service.clusters && (
                    <ul className={styles.subList}>
                      {service.clusters.slice(0, 3).map((sub: any, sIdx: number) => (
                        <li key={sIdx}>{sub.title}</li>
                      ))}
                    </ul>
                  )}
                  <LinkNext href={`/services/${slug}`} className="btn btn-outline">
                    View Service Detail
                  </LinkNext>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
