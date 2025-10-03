'use client';

import { BoxSocialFollowProps, SocialNetworkFollow } from '@/lib/types';

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_CareerBuilder Networks_': {
      vi: 'Mạng lưới CareerBuilder',
      en: 'CareerBuilder Networks'
    },
    '_Link Social Other_': {
      vi: 'Liên kết mạng xã hội khác',
      en: 'Other Social Links'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to get network name and class
function getNetworkInfo(networkId: number): { name: string; className: string } | null {
  const networkMap: Record<number, { name: string; className: string }> = {
    3: { name: 'LinkedIn', className: 'linkedin' },
    6: { name: 'Facebook', className: 'facebook' },
    7: { name: 'YouTube', className: 'youtube' },
    10: { name: 'Twitter', className: 'twitter' },
    12: { name: 'Instagram', className: 'instagram' },
    13: { name: 'Zalo', className: 'zalo' },
    14: { name: 'TikTok', className: 'tiktok' }
  };
  
  return networkMap[networkId] || null;
}

export default function BoxSocialFollow({ 
  siteId, 
  arrListSoNetwork = [], 
  language = 'vi' 
}: BoxSocialFollowProps) {
  // Check if any social network is enabled
  const enabledNetworkIds = [3, 6, 7, 10, 12, 13, 14];
  const isAnyNetworkEnabled = enabledNetworkIds.some(networkId => {
    const network = arrListSoNetwork.find(n => n.SO_NETWORK_ID === networkId);
    return network && network.SO_NETWORK_OWNER_STATUS === 1;
  });

  if (!isAnyNetworkEnabled) {
    return null;
  }

  // Get enabled networks
  const enabledNetworks = arrListSoNetwork.filter(network => 
    enabledNetworkIds.includes(network.SO_NETWORK_ID) && 
    network.SO_NETWORK_OWNER_STATUS === 1
  );

  return (
    <div className="BoxHolder">
      <div className="bgcolor_theme headerBox">
        {t('_CareerBuilder Networks_', language)}
      </div>
      
      <div className="containerBox">
        <div className="followus">
          <ul className="signin_social">
            {enabledNetworks.map((network) => {
              const networkInfo = getNetworkInfo(network.SO_NETWORK_ID);
              if (!networkInfo) return null;

              const isLast = network.SO_NETWORK_ID === 10; // Twitter is last

              return (
                <li key={network.SO_NETWORK_ID} className={isLast ? 'last' : ''}>
                  <a 
                    href={network.SO_NETWORK_LINK} 
                    className={networkInfo.className} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={networkInfo.className}
                  >
                    {networkInfo.name}
                  </a>
                </li>
              );
            })}
            
            <li className="other-links">
              {t('_Link Social Other_', language)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
