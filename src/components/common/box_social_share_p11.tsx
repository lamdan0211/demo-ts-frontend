'use client';

import React from 'react';
import { useTranslations } from '@/lib/use-translations';

// Types
interface SocialNetwork {
  SO_NETWORK_OWNER_STATUS: number;
}

interface BoxSocialShareP11Props {
  arrListSoNetwork: Record<number, SocialNetwork>;
  language: string;
}

export default function BoxSocialShareP11({
  arrListSoNetwork,
  language = 'vi'
}: BoxSocialShareP11Props) {
  const t = useTranslations(language);

  // Helper function to check if any social network is enabled
  const hasEnabledSocialNetworks = (): boolean => {
    return (
      arrListSoNetwork[1]?.SO_NETWORK_OWNER_STATUS === 1 ||
      arrListSoNetwork[2]?.SO_NETWORK_OWNER_STATUS === 1 ||
      arrListSoNetwork[4]?.SO_NETWORK_OWNER_STATUS === 1 ||
      arrListSoNetwork[5]?.SO_NETWORK_OWNER_STATUS === 1
    );
  };

  // Share link function
  const shareLink = (platform: string) => {
    // Implement share functionality based on platform
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
      case 'google':
        shareUrl = `https://plus.google.com/share?url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        console.log(`Sharing to ${platform} not implemented`);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // Don't render if no social networks are enabled
  if (!hasEnabledSocialNetworks()) {
    return null;
  }

  return (
    <div className="fl_right share">
      <span>{t("Share")}</span>
      
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
