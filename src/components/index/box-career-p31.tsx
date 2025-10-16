'use client';

import React from 'react';

// Types
interface IndustryItem {
  INDUSTRY_NAME: string;
  LINK: string;
  JOB_INDUSTRY_NUM: number;
}

interface BoxCareerP31Props {
  R: {
    CATE_ID: number;
  };
  k?: number;
  arrHomeContent: {
    [key: number]: IndustryItem[];
  };
  language?: 'vi' | 'en';
  STATIC_TN?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_title_job_cate_': {
      vi: 'Danh mục việc làm',
      en: 'Job Categories'
    },
    '_positions_': {
      vi: 'vị trí',
      en: 'positions'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function BoxCareerP31({
  R,
  k = 0,
  arrHomeContent = {},
  language = 'vi',
  STATIC_TN = '/static'
}: BoxCareerP31Props) {
  
  // Get industries for this category
  const industries = arrHomeContent[R.CATE_ID] || [];
  const industryCount = industries.length;
  
  // Get CSS class for background
  const getBackgroundClass = () => {
    return k % 2 === 1 ? 'bg-odd' : '';
  };
  
  // Get column class based on count
  const getColumnClass = () => {
    return 'col-xs-12 col-sm-4 col-md-4 text-center blurb-item';
  };
  
  return (
    <div 
      id={R.CATE_ID.toString()} 
      className={`section-page categories-locations ${k} ${getBackgroundClass()}`}
    >
      <div className="container">
        <header>
          <h2 className="section-title">{t('_title_job_cate_', language)}</h2>
        </header>
        
        <div className="row flex-row justify-center">
          {industries.map((industry, index) => {
            if (!industry) return null;
            
            return (
              <div key={index} className={getColumnClass()}>
                <a 
                  href={industry.LINK} 
                  title={industry.INDUSTRY_NAME} 
                  className="blurb-item--link"
                >
                  <div className="blurb-item--img-wrapper">
                    <img 
                      src={industryCount === 9 ? `${STATIC_TN}/blank.gif` : `/themes/hoasen/images/image_job_${index + 1}.png`}
                      data-src={industryCount === 9 ? `/themes/hoasen/images/image_job_${index + 1}.png` : undefined}
                      className={`blurb-item--img img-responsive wp-post-image ${industryCount === 9 ? 'lazyload' : ''}`}
                      alt="" 
                      width="350" 
                      height="350"
                    />
                  </div>
                  <h3 className="blurb-item--title">{industry.INDUSTRY_NAME}</h3>
                  <span className="blurb-item--meta icon-arrow-right">
                    {industry.JOB_INDUSTRY_NUM} {t('_positions_', language)}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
