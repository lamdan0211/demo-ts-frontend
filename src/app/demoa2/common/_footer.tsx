'use client';

import React from 'react';

interface FooterProps {
  siteId?: string;
  language?: string;
  arrFooterMenuCates?: any[];
  TN?: string;
  LANGUAGE?: string;
}

// Translation function
function t(key: string, language: string = 'en'): string {
  const translations: Record<string, Record<string, string>> = {
    '_By Employer_': {
      vi: 'Được tạo bởi Nhà tuyển dụng',
      en: 'Created by Employer'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to convert decimal to hex
function dec2hex(dec: number): string {
  return dec.toString(16);
}

// Helper function to generate menu links
function getMenuLink(menuItem: any, TN: string, LANGUAGE: string): string {
  if ((menuItem.CATE_TYPE === 2 || menuItem.CATE_TYPE === 3) && menuItem.CATE_CODE) {
    return `${TN}/${menuItem.CATE_CODE}-${dec2hex(menuItem.CATE_ID)}/${LANGUAGE}`;
  }
  
  if (menuItem.SUBURL_ID) {
    return `${TN}${menuItem.SUBURL_VALUE}`;
  }
  
  if (menuItem.CATE_LINK === '#') {
    return '#';
  }
  
  return menuItem.CATE_LINK || '#';
}

export default function Footer({
  siteId = 'demoa2',
  language = 'en',
  arrFooterMenuCates = [],
  TN = '/demoa2',
  LANGUAGE = 'en'
}: FooterProps) {
  return (
    <div id="footer" className="bgcolor_theme">
      <div className="bodyContainer">
        <div className="linkofClient">
          {arrFooterMenuCates.map((menuItem, index) => (
            <React.Fragment key={menuItem.CATE_ID}>
              <a 
                href={getMenuLink(menuItem, TN, LANGUAGE)}
                className="link_menu"
                target={menuItem.CATE_LINKTARGET || undefined}
              >
                {menuItem.CATE_NAME}
              </a>
              {index < arrFooterMenuCates.length - 1 && (
                <span className="separated">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="developed-by-CB">
          <p>{t('_By Employer_', language)}</p>
        </div>
      </div>
    </div>
  );
}