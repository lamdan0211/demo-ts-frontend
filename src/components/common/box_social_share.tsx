'use client';

import { BoxSocialShareProps, SocialNetwork } from '@/lib/types';

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'Share': {
      vi: 'Chia sẻ',
      en: 'Share'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Social sharing functions
const shareLink = (platform: string) => {
  const currentUrl = window.location.href;
  const title = document.title;
  
  let shareUrl = '';
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
      break;
    default:
      return;
  }
  
  // Open sharing window
  window.open(
    shareUrl,
    'share-dialog',
    'width=626,height=436,scrollbars=yes,resizable=yes'
  );
};

export default function BoxSocialShare({ 
  siteId, 
  arrListSoNetwork = [], 
  language = 'vi' 
}: BoxSocialShareProps) {
  // Check if any social network is enabled
  const isAnyNetworkEnabled = arrListSoNetwork.some(network => 
    network.SO_NETWORK_OWNER_STATUS === 1
  );

  if (!isAnyNetworkEnabled) {
    return null;
  }

  // Get enabled networks
  const enabledNetworks = arrListSoNetwork.filter(network => 
    network.SO_NETWORK_OWNER_STATUS === 1
  );

  return (
    <div className="fl_right share">
      <span>{t('Share', language)}</span>
      
      {enabledNetworks.map((network) => {
        const networkType = getNetworkType(network.SO_NETWORK_ID);
        if (!networkType) return null;

        return (
          <a
            key={network.SO_NETWORK_ID}
            href="javascript:void(0)"
            onClick={() => shareLink(networkType)}
            className={networkType}
            title={`Share on ${networkType.charAt(0).toUpperCase() + networkType.slice(1)}`}
          />
        );
      })}
    </div>
  );
}

// Helper function to map network ID to type
function getNetworkType(networkId: number): string | null {
  const networkMap: Record<number, string> = {
    1: 'facebook',
    2: 'linkedin', 
    4: 'twitter'
  };
  
  return networkMap[networkId] || null;
}
