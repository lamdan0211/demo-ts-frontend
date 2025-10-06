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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove browser extension attributes that cause hydration errors
              if (typeof window !== 'undefined') {
                const body = document.body;
                if (body) {
                  body.removeAttribute('bis_register');
                  body.removeAttribute('_processed_');
                  // Remove any other extension-added attributes
                  Array.from(body.attributes).forEach(attr => {
                    if (attr.name.startsWith('_processed_') || attr.name.startsWith('bis_')) {
                      body.removeAttribute(attr.name);
                    }
                  });
                }
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <div className={`site-${validSiteId}`}>
          {children}
        </div>
      </body>
    </html>
  );
}
