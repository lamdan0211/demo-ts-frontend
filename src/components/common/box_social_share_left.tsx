'use client';

import React from 'react';

interface SocialNetwork {
  SO_NETWORK_OWNER_STATUS: number;
  SO_NETWORK_LINK: string;
}

interface BoxSocialShareLeftProps {
  siteId?: string;
  language?: string;
  arrListSoNetwork?: Record<number, SocialNetwork>;
  currentUrl?: string;
  title?: string;
  description?: string;
}

// Translation function
function t(key: string, language: string = 'en'): string {
  const translations: Record<string, Record<string, string>> = {
    'Share': {
      vi: 'Chia sẻ',
      en: 'Share'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function BoxSocialShareLeft({
  siteId = 'demoa2',
  language = 'en',
  arrListSoNetwork = {},
  currentUrl = '/demoa2',
  title = 'Demo A2',
  description = 'Find your dream job with Demo A2'
}: BoxSocialShareLeftProps) {
  
  // Check if any social network is enabled
  const hasEnabledNetworks = 
    arrListSoNetwork[1]?.SO_NETWORK_OWNER_STATUS === 1 ||
    arrListSoNetwork[2]?.SO_NETWORK_OWNER_STATUS === 1 ||
    arrListSoNetwork[4]?.SO_NETWORK_OWNER_STATUS === 1 ||
    arrListSoNetwork[5]?.SO_NETWORK_OWNER_STATUS === 1;

  if (!hasEnabledNetworks) {
    return null;
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : currentUrl;
  const shareTitle = title;
  const shareDescription = description;

  // Share function
  const shareLink = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareDescription)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'google':
        shareUrl = `https://plus.google.com/share?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    
    // Open share window
    window.open(
      shareUrl,
      'share',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    );
  };

  return (
    <div className="clear share">
      <span>{t('Share', language)}</span>
      
      {arrListSoNetwork[1]?.SO_NETWORK_OWNER_STATUS === 1 && (
        <a 
          href="javascript:void(0)" 
          onClick={() => shareLink('facebook')} 
          className="facebook"
          title="Share on Facebook"
        >
          <i className="fa fa-facebook"></i>
        </a>
      )}
      
      {arrListSoNetwork[2]?.SO_NETWORK_OWNER_STATUS === 1 && (
        <a 
          href="javascript:void(0)" 
          onClick={() => shareLink('linkedin')} 
          className="linkedin"
          title="Share on LinkedIn"
        >
          <i className="fa fa-linkedin"></i>
        </a>
      )}
      
      {arrListSoNetwork[4]?.SO_NETWORK_OWNER_STATUS === 1 && (
        <a 
          href="javascript:void(0)" 
          onClick={() => shareLink('twitter')} 
          className="twitter"
          title="Share on Twitter"
        >
          <i className="fa fa-twitter"></i>
        </a>
      )}
      
      {arrListSoNetwork[5]?.SO_NETWORK_OWNER_STATUS === 1 && (
        <a 
          href="javascript:void(0)" 
          onClick={() => shareLink('google')} 
          className="google"
          title="Share on Google+"
        >
          <i className="fa fa-google-plus"></i>
        </a>
      )}
    </div>
  );
}
