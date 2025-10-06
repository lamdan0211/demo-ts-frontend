'use client';

import React from 'react';

// Types
interface BoxJoinProps {
  arrInfo?: any;
  arrFunction?: {
    OFF_JOIN_TALENT_NETWORK?: boolean;
  };
  language?: 'vi' | 'en';
  joinLink?: string;
  checkPermitNumMember?: boolean;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Title Join_': {
      vi: 'Tham gia mạng lưới tài năng',
      en: 'Join Talent Network'
    },
    '_Stay Connected_': {
      vi: 'Hãy kết nối với chúng tôi',
      en: 'Stay Connected'
    },
    'Why?': {
      vi: 'Tại sao?',
      en: 'Why?'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function BoxJoin({
  arrInfo = null,
  arrFunction = {},
  language = 'vi',
  joinLink = '/hoasen/join',
  checkPermitNumMember = true
}: BoxJoinProps) {
  
  // Check if user should see join box
  const shouldShowJoinBox = !arrInfo && 
    !arrFunction.OFF_JOIN_TALENT_NETWORK && 
    checkPermitNumMember;

  if (!shouldShowJoinBox) {
    return null;
  }

  return (
    <div className="col-xs-12 section-box join-talent-onclip">
      <a href={joinLink} className="showDialogD">
        {t('_Title Join_', language)}
      </a>
      <p className="why-connect">
        {t('_Stay Connected_', language)}.{' '}
        <a href="#WhyJoin" className="showDialog">
          {t('Why?', language)}
        </a>
      </p>
    </div>
  );
}
