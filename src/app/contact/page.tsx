import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import styles from "./contact.module.css";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null);
  const contact = settings?.contactInfo;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "GrowthLab Limited",
    "url": "https://growthlab.co.ke",
    "telephone": "+254 743 990 479",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Westlands, Nairobi",
      "addressCountry": "KE"
    },
    "serviceArea": ["Nairobi", "Kenya", "East Africa"],
    "description": "GrowthLab Limited is a premium digital agency in Nairobi, Westlands, specializing in web development, SEO, business automation, and AI systems integration."
  };

  return (
    <div className={styles.contactPage}>
      <JsonLd data={schemaData} />
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Ready to Grow Your Digital Presence?</h1>
          <div className={styles.editorialIntro} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p>
              If you are a business operating in Kenya looking for high-performance website development, expert SEO strategies, or sophisticated business automation and AI solutions, you have come to the right place. GrowthLab Limited is dedicated to helping Kenyan enterprises scale through technical excellence and data-driven results. Whether you&apos;re in the early stages of planning a custom web application or looking to optimize your existing digital workflows, our team is ready to assist. Once you submit the contact form, our specialists will review your requirements and reach out within 24 hours to schedule a free 30-minute consultation call. We are physically located in Nairobi&apos;s Westlands district, serving clients across East Africa with strategic brilliance and dedicated support.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              <h2>Reach Out Directly</h2>
              <p>We're here to help you navigate the complexities of digital growth.</p>
              
              <div className={styles.infoItem}>
                <span className={styles.icon}><MapPin size={24} /></span>
                <div>
                  <h4>Location</h4>
                  <p>{contact?.address || 'ABC Place, Westlands, Nairobi'}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.icon}><Mail size={24} /></span>
                <div>
                  <h4>Email</h4>
                  <p>{'info@growthlab.co.ke'}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.icon}><Phone size={24} /></span>
                <div>
                  <h4>Phone</h4>
                  <p>{contact?.phone || '+254 743 990 479'}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div style={{ display: 'flex', gap: '15px', color: 'var(--accent-orange)' }}>
                  {settings?.socialLinks?.length > 0 ? settings.socialLinks.map((link: any, i: number) => {
                      let Icon = null;
                      const platform = link.platform.toLowerCase();
                      if (platform === 'facebook' || platform === 'fb') { Icon = Facebook; }
                      else if (platform.includes('linkedin')) { Icon = Linkedin; }
                      else if (platform.includes('instagram') || platform === 'ig') { Icon = Instagram; }
                      return Icon ? <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Icon size={24} /></a> : null;
                  }) : (
                      <>
                        <a href="https://www.facebook.com/share/1bTmn3gbH5/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Facebook size={24} /></a>
                        <a href="https://www.linkedin.com/in/calvince-omondi-3351763ba?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Linkedin size={24} /></a>
                        <a href="https://instagram.com/growthlablimited" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}><Instagram size={24} /></a>
                      </>
                  )}
                </div>
                <div>
                  <h4>Social Media</h4>
                  <p>Follow us for the latest updates.</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
