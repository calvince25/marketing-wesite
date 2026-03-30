import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import styles from "./contact.module.css";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react";

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null);
  const contact = settings?.contactInfo;

  return (
    <div className={styles.contactPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Ready to Grow Your Digital Presence?</h1>
          <p className={styles.subtitle}>
            Fill out the form below and our experts will get back to you within 24 hours with a custom strategy.
          </p>
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
