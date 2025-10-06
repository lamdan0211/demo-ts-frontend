'use client';

import React from 'react';

interface SocialNetwork {
  SO_NETWORK_OWNER_STATUS: number;
  SO_NETWORK_LINK: string;
}

interface BoxSocialFollowProps {
  siteId?: string;
  language?: string;
  arrListSoNetwork?: Record<number, SocialNetwork>;
}

// Translation function
function t(key: string, language: string = 'en'): string {
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

export default function BoxSocialFollow({
  siteId = 'demoa2',
  language = 'en',
  arrListSoNetwork = {}
}: BoxSocialFollowProps) {
  
  // Check if any social network is enabled
  const hasEnabledNetworks = 
    arrListSoNetwork[3]?.SO_NETWORK_OWNER_STATUS === 1 ||
    arrListSoNetwork[6]?.SO_NETWORK_OWNER_STATUS === 1 ||
    arrListSoNetwork[7]?.SO_NETWORK_OWNER_STATUS === 1;

  if (!hasEnabledNetworks) {
    return null;
  }

  return (
    <div className="BoxHolder">
      <div className="bgcolor_theme headerBox">{t('_CareerBuilder Networks_', language)}</div>
      <div className="containerBox">
        <div className="followus">
          <ul className="signin_social">
            {arrListSoNetwork[6]?.SO_NETWORK_OWNER_STATUS === 1 && (
              <li>
                <a 
                  href={arrListSoNetwork[6].SO_NETWORK_LINK} 
                  className="facebook" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="facebook"
                >
                  Facebook
                </a>
              </li>
            )}
            
            {arrListSoNetwork[3]?.SO_NETWORK_OWNER_STATUS === 1 && (
              <li>
                <a 
                  href={arrListSoNetwork[3].SO_NETWORK_LINK} 
                  className="linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="linkedin"
                >
                  Linkedin
                </a>
              </li>
            )}
            
            {arrListSoNetwork[7]?.SO_NETWORK_OWNER_STATUS === 1 && (
              <li>
                <a 
                  href={arrListSoNetwork[7].SO_NETWORK_LINK} 
                  className="youtube" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="youtube"
                >
                  YouTube
                </a>
              </li>
            )}
            
            {arrListSoNetwork[12]?.SO_NETWORK_OWNER_STATUS === 1 && (
              <li>
                <a 
                  href={arrListSoNetwork[12].SO_NETWORK_LINK} 
                  className="instagram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="instagram"
                >
                  Instagram
                </a>
              </li>
            )}
            
            {arrListSoNetwork[13]?.SO_NETWORK_OWNER_STATUS === 1 && (
              <li>
                <a 
                  href={arrListSoNetwork[13].SO_NETWORK_LINK} 
                  className="zalo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="zalo"
                >
                  Zalo
                </a>
              </li>
            )}
            
            {arrListSoNetwork[14]?.SO_NETWORK_OWNER_STATUS === 1 && (
              <li>
                <a 
                  href={arrListSoNetwork[14].SO_NETWORK_LINK} 
                  className="tiktok" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="tiktok"
                >
                  TikTok
                </a>
              </li>
            )}
            
            {arrListSoNetwork[10]?.SO_NETWORK_OWNER_STATUS === 1 && (
              <li className="last">
                <a 
                  href={arrListSoNetwork[10].SO_NETWORK_LINK} 
                  className="twitter" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="twitter"
                >
                  Twitter
                </a>
              </li>
            )}
            
            <li>{t('_Link Social Other_', language)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}