import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company Profile (PDF) | GrowthLab Limited Nairobi',
  description: 'View or download the official GrowthLab Limited company profile. A premium digital agency in Kenya specializing in web development, SEO, and automation.',
};

export default function CompanyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
