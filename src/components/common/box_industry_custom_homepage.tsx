'use client';

import { BoxIndustryCustomHomepageProps, IndustryApi, Industry } from '@/lib/types';

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'list_industry': {
      vi: '1,2,3,4,5,6,7,8,9,10',
      en: '1,2,3,4,5,6,7,8,9,10'
    },
    '_jobs_by_industry_': {
      vi: 'Việc làm theo ngành nghề',
      en: 'Jobs by Industry'
    },
    '_positions_': {
      vi: 'vị trí',
      en: 'positions'
    },
    'industry_name_cb_1': {
      vi: 'Công nghệ thông tin',
      en: 'Information Technology'
    },
    'industry_name_cb_2': {
      vi: 'Tài chính - Ngân hàng',
      en: 'Finance - Banking'
    },
    'industry_name_cb_3': {
      vi: 'Bất động sản',
      en: 'Real Estate'
    },
    'industry_name_cb_4': {
      vi: 'Y tế - Dược phẩm',
      en: 'Healthcare - Pharmaceutical'
    },
    'industry_name_cb_5': {
      vi: 'Giáo dục - Đào tạo',
      en: 'Education - Training'
    },
    'industry_name_cb_6': {
      vi: 'Bán lẻ - Thương mại',
      en: 'Retail - Commerce'
    },
    'industry_name_cb_7': {
      vi: 'Sản xuất - Công nghiệp',
      en: 'Manufacturing - Industry'
    },
    'industry_name_cb_8': {
      vi: 'Du lịch - Khách sạn',
      en: 'Tourism - Hospitality'
    },
    'industry_name_cb_9': {
      vi: 'Vận tải - Logistics',
      en: 'Transportation - Logistics'
    },
    'industry_name_cb_10': {
      vi: 'Nông nghiệp - Thủy sản',
      en: 'Agriculture - Fisheries'
    },
    'link_image_industry_1': {
      vi: '/images/industries/it.png',
      en: '/images/industries/it.png'
    },
    'link_image_industry_2': {
      vi: '/images/industries/finance.png',
      en: '/images/industries/finance.png'
    },
    'link_image_industry_3': {
      vi: '/images/industries/real-estate.png',
      en: '/images/industries/real-estate.png'
    },
    'link_image_industry_4': {
      vi: '/images/industries/healthcare.png',
      en: '/images/industries/healthcare.png'
    },
    'link_image_industry_5': {
      vi: '/images/industries/education.png',
      en: '/images/industries/education.png'
    },
    'link_image_industry_6': {
      vi: '/images/industries/retail.png',
      en: '/images/industries/retail.png'
    },
    'link_image_industry_7': {
      vi: '/images/industries/manufacturing.png',
      en: '/images/industries/manufacturing.png'
    },
    'link_image_industry_8': {
      vi: '/images/industries/tourism.png',
      en: '/images/industries/tourism.png'
    },
    'link_image_industry_9': {
      vi: '/images/industries/logistics.png',
      en: '/images/industries/logistics.png'
    },
    'link_image_industry_10': {
      vi: '/images/industries/agriculture.png',
      en: '/images/industries/agriculture.png'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function BoxIndustryCustomHomepage({ 
  siteId, 
  arrIndustryApi = [], 
  arrIndexNews, 
  language = 'vi' 
}: BoxIndustryCustomHomepageProps) {
  // Process industry data similar to PHP logic
  const arrIndustry: Record<number, IndustryApi> = {};
  arrIndustryApi.forEach(item => {
    arrIndustry[item.INDUSTRY_ID] = item;
  });

  // Get industry IDs from translation
  const industryIdsString = t('list_industry', language);
  const arrIndustryId = industryIdsString.split(',').map(id => parseInt(id.trim()));

  if (arrIndustryApi.length > 0) {
    return (
      <div className="box-industry-custom-homepage">
        <p className="label-">
          <strong>{t('_jobs_by_industry_', language)}</strong>
        </p>
        
        <div className="categories-locations">
          {arrIndustryId.map((industryId, index) => {
            const industry = arrIndustry[industryId];
            if (!industry) return null;

            return (
              <div key={industryId} className="blurb-item">
                <p className="img-name">
                  <a 
                    href={industry.SEARCH_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={t(`link_image_industry_${industryId}`, language)} 
                      alt={t(`industry_name_cb_${industryId}`, language)}
                    />
                  </a>
                </p>
                
                <p className="industry-name">
                  <a 
                    href={industry.SEARCH_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={t(`industry_name_cb_${industryId}`, language)}
                  >
                    {t(`industry_name_cb_${industryId}`, language)}
                  </a>
                </p>
                
                <p className="actived-job">
                  <a 
                    href={industry.SEARCH_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title={t(`industry_name_cb_${industryId}`, language)}
                  >
                    {industry.INDUSTRY_ACTIVEDJOB} {t('_positions_', language)}
                  </a>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    // Fallback to news content if no industry data
    return (
      <div className="box-industry-custom-homepage">
        <div 
          className="news-content"
          dangerouslySetInnerHTML={{ 
            __html: arrIndexNews?.NEWS_CONTENT || '' 
          }}
        />
      </div>
    );
  }
}
