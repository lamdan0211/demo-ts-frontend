'use client';

import React, { useEffect } from 'react';

// Types
interface PopupSuccessP11Props {
  arrInfo?: {
    JOBSEEKER_LASTNAME: string;
    JOBSEEKER_FIRSTNAME: string;
  };
  popup_success?: number;
  language?: 'vi' | 'en';
  TN?: string;
  LANGUAGE?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Thanks for joining our Talent Network_': {
      vi: 'Cảm ơn [full_name] đã tham gia mạng lưới tài năng của chúng tôi',
      en: 'Thank you [full_name] for joining our Talent Network'
    },
    '_By joining our Talent Network_': {
      vi: 'Bằng cách tham gia mạng lưới tài năng của chúng tôi...',
      en: 'By joining our Talent Network...'
    },
    '_Please apply now to become candidates_': {
      vi: 'Vui lòng ứng tuyển ngay để trở thành ứng viên',
      en: 'Please apply now to become candidates'
    },
    '_vacancies_': {
      vi: 'các vị trí tuyển dụng',
      en: 'vacancies'
    },
    '_or continue_': {
      vi: 'hoặc tiếp tục',
      en: 'or continue'
    },
    '_update resume_': {
      vi: 'cập nhật hồ sơ',
      en: 'update resume'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function PopupSuccessP11({
  arrInfo = { JOBSEEKER_LASTNAME: '', JOBSEEKER_FIRSTNAME: '' },
  popup_success = 0,
  language = 'vi',
  TN = '/hoasen',
  LANGUAGE = 'vi'
}: PopupSuccessP11Props) {
  
  // Get job search link based on language
  const getJobSearchLink = () => {
    if (LANGUAGE === 'en') {
      return `${TN}/job-search/all-jobs/en`;
    } else {
      return `${TN}/viec-lam/tat-ca-viec-lam/vi`;
    }
  };

  // Get resume link
  const getResumeLink = () => {
    return `${TN}/${LANGUAGE}/resume`;
  };

  // Get thanks message with full name
  const getThanksMessage = () => {
    const fullName = `${arrInfo.JOBSEEKER_LASTNAME} ${arrInfo.JOBSEEKER_FIRSTNAME}`.trim();
    return t('_Thanks for joining our Talent Network_', language).replace('[full_name]', fullName);
  };

  // Initialize popup when component mounts
  useEffect(() => {
    if (popup_success === 1) {
      // Google Analytics event
      if (typeof window !== 'undefined' && (window as any).ga) {
        (window as any).ga('send', 'event', 'jobseekers', 'register', 'join success', 1);
      }

      // Show Fancybox popup
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fancybox) {
        (window as any).jQuery.fancybox({
          'href': '#Join_Success',
          'type': 'inline',
          'padding': 0,
          onComplete: function() {
            const fancyboxContent = (window as any).jQuery('#fancybox-content');
            const fancyboxWrap = (window as any).jQuery('#fancybox-wrap');
            if (fancyboxContent.length && fancyboxWrap.length) {
              fancyboxWrap.css({
                'width': (fancyboxContent.width() + 40) + 'px',
                'padding': 0
              });
            }
          }
        });
      }
    }
  }, [popup_success]);

  return (
    <div style={{ display: 'none' }}>
      <div id="Join_Success" className="wrapDialog msgbox">
        <div className="container">
          <h2>{getThanksMessage()}</h2>
          <p>{t('_By joining our Talent Network_', language)}</p>
          <p>
            {t('_Please apply now to become candidates_', language)}{' '}
            <a href={getJobSearchLink()}>{t('_vacancies_', language)}</a>{' '}
            {t('_or continue_', language)}{' '}
            <a href={getResumeLink()}>{t('_update resume_', language)}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
