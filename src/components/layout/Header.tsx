import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { sanityFetch } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import MobileMenu from './MobileMenu';

const Header = async () => {
    const settings = await sanityFetch({ query: siteSettingsQuery }).catch(() => null);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.navWrapper}`}>
                <div className={styles.logo}>
                    <Link href="/" aria-label="GrowthLab Home">
                        {settings?.logo ? (
                            <Image 
                                src={urlForImage(settings.logo).url()} 
                                alt={settings.metaTitle || "GrowthLab"} 
                                width={180}
                                height={36}
                                style={{ height: '36px', width: 'auto' }}
                                priority
                            />
                        ) : (
                            <svg width="180" height="36" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <text x="0" y="30" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="28" letterSpacing="-1">
                                    <tspan fill="#FFFFFF">Growth</tspan>
                                    <tspan fill="#FF6B00">Lab</tspan>
                                    <tspan fill="#FF6B00">.</tspan>
                                </text>
                            </svg>
                        )}
                    </Link>
                </div>
                <nav>
                    <ul className={styles.navLinks}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/portfolio">Portfolio</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <div className={styles.actions}>
                    <Link href="/contact" className="btn btn-primary">Get a Quote</Link>
                </div>
                <MobileMenu />
            </div>
        </header>
    );
};

export default Header;
