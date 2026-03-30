import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href="/">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.separator}>&gt;</span>
            {index === items.length - 1 ? (
              <span className={styles.current}>{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
