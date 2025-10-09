import { getSiteConfig } from '@/lib/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo TS Frontend',
  description: 'Multi-tenant template system',
};

interface SiteLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    siteId: string;
  }>;
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { siteId } = await params;
  
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
                const removeExtensionAttributes = (element) => {
                  if (!element || !element.attributes) return;
                  
                  // Remove specific known attributes
                  const attributesToRemove = [
                    'bis_register', '_processed_', 'bis_skin_checked',
                    'bis_skin_checked="1"', 'bis_skin_checked="true"',
                    'data-ruffle-polyfilled', 'data-ruffle-polyfilled=""',
                    'bis_size', 'bis_size="true"', 'bis_size="1"'
                  ];
                  
                  attributesToRemove.forEach(attr => {
                    try {
                      element.removeAttribute(attr);
                    } catch (e) {
                      // Ignore errors
                    }
                  });
                  
                  // Remove any attributes starting with known prefixes
                  try {
                    Array.from(element.attributes).forEach(attr => {
                      if (attr.name.startsWith('_processed_') || 
                          attr.name.startsWith('bis_') || 
                          attr.name.includes('bis_skin_checked') ||
                          attr.name.includes('chrome-extension') ||
                          attr.name.includes('ruffle') ||
                          attr.name.includes('data-ruffle') ||
                          attr.name === 'bis_size') {
                        element.removeAttribute(attr.name);
                      }
                    });
                  } catch (e) {
                    // Ignore errors
                  }
                };
                
                // Clean body immediately
                if (document.body) {
                  removeExtensionAttributes(document.body);
                }
                
                // Clean all existing elements
                try {
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(removeExtensionAttributes);
                } catch (e) {
                  // Ignore errors
                }
                
                // Set up observer to clean new elements
                if (window.MutationObserver && document.body) {
                  try {
                    const observer = new MutationObserver((mutations) => {
                      mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes') {
                          removeExtensionAttributes(mutation.target);
                        }
                        if (mutation.type === 'childList') {
                          mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1) { // Element node
                              removeExtensionAttributes(node);
                              try {
                                const children = node.querySelectorAll('*');
                                children.forEach(removeExtensionAttributes);
                              } catch (e) {
                                // Ignore errors
                              }
                            }
                          });
                        }
                      });
                    });
                    
                     observer.observe(document.body, {
                       attributes: true,
                       childList: true,
                       subtree: true,
                       attributeFilter: ['bis_skin_checked', 'data-ruffle-polyfilled', '_processed_', 'bis_size', 'bis_register']
                     });
                  } catch (e) {
                    console.warn('MutationObserver setup error:', e);
                  }
                }
                
                // Additional cleanup for Ruffle extension
                if (window.MutationObserver) {
                  try {
                    const ruffleObserver = new MutationObserver((mutations) => {
                      mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes') {
                          const target = mutation.target;
                          if (target && target.attributes) {
                            // Remove Ruffle-specific attributes
                            ['data-ruffle-polyfilled', 'bis_skin_checked'].forEach(attr => {
                              if (target.hasAttribute(attr)) {
                                target.removeAttribute(attr);
                              }
                            });
                          }
                        }
                      });
                    });
                    
                     ruffleObserver.observe(document.documentElement, {
                       attributes: true,
                       childList: true,
                       subtree: true,
                       attributeFilter: ['data-ruffle-polyfilled', 'bis_skin_checked', 'bis_size', 'bis_register', '_processed_']
                     });
                  } catch (e) {
                    // Ignore errors
                  }
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
