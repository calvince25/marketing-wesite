import Link from 'next/link';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import styles from './Footer.module.css';
import { sanityFetch } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';

const Footer = async () => {
    const currentYear = new Date().getFullYear();
    const settings = await sanityFetch({ query: siteSettingsQuery }).catch(() => null);

    const contact = settings?.contactInfo;
    const social = settings?.socialLinks || [];

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerGrid}>
                    <div className={styles.footerBrand}>
                        <div className="logo" style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '24px', letterSpacing: '1px' }}>
                            GROWTH<span style={{ color: '#FF6B00' }}>LAB</span>
                        </div>
                        <p>{settings?.seo?.metaDescription || 'GrowthLab Limited: A premium digital marketing agency in Nairobi focused on minimalist design and maximum ROI.'}</p>
                    </div>
                    
                    <div className={styles.footerCol}>
                        <h4>Navigate</h4>
                        <ul>
                            <li><Link href="/about" aria-label="About GrowthLab">About Us</Link></li>
                            <li><Link href="/company-profile" aria-label="Company Profile">Company Profile</Link></li>
                            <li><Link href="/portfolio" aria-label="View Projects">Portfolio</Link></li>
                            <li><Link href="/blog" aria-label="Read Blog">Blog</Link></li>
                            <li><Link href="/faq" aria-label="FAQ">FAQ</Link></li>
                            <li><Link href="/contact" aria-label="Contact Us">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Growth & Tech</h4>
                        <ul>
                            <li><Link href="/services/web-development">Web Development</Link></li>
                            <li><Link href="/services/seo-digital-marketing">SEO & Marketing</Link></li>
                            <li><Link href="/services/ai-systems-integration">AI Solutions</Link></li>
                            <li><Link href="/services/business-automation">Automation</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Solutions</h4>
                        <ul>
                            <li><Link href="/services/web-development/ecommerce-solutions">Ecommerce</Link></li>
                            <li><Link href="/services/seo-digital-marketing/technical-seo-audit">SEO Audit</Link></li>
                            <li><Link href="/services/business-automation/workflow-automation">Workflows</Link></li>
                            <li><Link href="/services/ai-systems-integration/ai-chatbots">AI Chatbots</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>Connect</h4>
                        <ul>
                            <li>
                                <a href="mailto:info@growthlab.co.ke" aria-label="Email GrowthLab">
                                    info@growthlab.co.ke
                                </a>
                            </li>
                            {contact?.phone && (
                                <li><a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
                            )}
                            {social.length > 0 ? social.map((link: any, i: number) => {
                                let Icon = null;
                                const platform = link.platform.toLowerCase();
                                if (platform === 'facebook' || platform === 'fb') { Icon = Facebook; }
                                else if (platform.includes('linkedin')) { Icon = Linkedin; }
                                else if (platform.includes('instagram') || platform === 'ig') { Icon = Instagram; }
                                
                                return (
                                    <li key={i}>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {Icon && <Icon size={18} />} {link.platform}
                                        </a>
                                    </li>
                                );
                            }) : (
                                <>
                                    <li><a href="https://www.facebook.com/share/1bTmn3gbH5/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Facebook size={18} /> Facebook</a></li>
                                    <li><a href="https://www.linkedin.com/in/calvince-omondi-3351763ba?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Linkedin size={18} /> LinkedIn</a></li>
                                    <li><a href="https://instagram.com/growthlablimited" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Instagram size={18} /> Instagram</a></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                
                <div className={styles.copyright}>
                    <div>&copy; {currentYear} GrowthLab Limited. All rights reserved.</div>
                    <div>{contact?.address || 'Nairobi, Westlands'}</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
