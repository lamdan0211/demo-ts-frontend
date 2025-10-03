import { getSiteConfig } from '@/lib/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo TS Frontend',
  description: 'Multi-tenant template system',
};

interface SiteLayoutProps {
  children: React.ReactNode;
  params: {
    siteId: string;
  };
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { siteId } = params;
  
  // Validate siteId exists - use fallback if not found
  const siteConfig = getSiteConfig(siteId);
  const validSiteId = siteConfig ? siteId : 'demoa1'; // Fallback to demoa1

  return (
    <html lang="vi">
      <body>
        <div className={`site-${validSiteId}`}>
          {children}
        </div>
      </body>
    </html>
  );
}
