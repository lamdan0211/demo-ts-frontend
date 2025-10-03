'use client';

import { Col250Props, Industry, Location } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import BoxUploadCv from '@/components/common/box_uploadCv';
import BoxSocialFanpage from '@/components/common/box_social_fanpage';
import BoxSimilarJobs from '@/components/common/box_similar_jobs';

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'Job by Category': {
      vi: 'Việc làm theo danh mục',
      en: 'Job by Category'
    },
    'Job by Location': {
      vi: 'Việc làm theo địa điểm',
      en: 'Job by Location'
    },
    '_View more_': {
      vi: 'Xem thêm',
      en: 'View more'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function Col250({ 
  siteId, 
  arrBoxIndustries = [], 
  arrLocations = [], 
  arrInfo,
  arrListSoNetwork = [],
  arrSimilarJobs = [],
  currentUrl = '/',
  language = 'vi' 
}: Col250Props) {
  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  // Filter industries with jobs
  const industriesWithJobs = arrBoxIndustries.filter(industry => industry.JOB_INDUSTRY_NUM > 0);
  const topIndustries = industriesWithJobs.slice(0, 5);
  
  // Filter locations with jobs
  const locationsWithJobs = arrLocations.filter(location => location.JOB_LOCATION_NUM > 0);
  const topLocations = locationsWithJobs.slice(0, 10);

  return (
    <div id="col250">
      {/* Upload CV Box */}
      <BoxUploadCv
        siteId={siteId}
        arrInfo={arrInfo}
        currentUrl={currentUrl}
      />

      {/* Social Fanpage Box */}
      <BoxSocialFanpage
        arrListSoNetwork={arrListSoNetwork}
      />

      {/* Job by Category */}
      <div className="BoxHolder">
        <div className="bgcolor_theme headerBox">
          {t('Job by Category', language)}
        </div>
        <div className="containerBox">
          <ul className="ListCareer">
            {topIndustries.map((industry, index) => (
              <li key={industry.INDUSTRY_ID}>
                <a 
                  href={industry.LINK} 
                  title={industry.INDUSTRY_NAME}
                >
                  {industry.INDUSTRY_NAME}
                </a>
                <span className="organce">({industry.JOB_INDUSTRY_NUM})</span>
              </li>
            ))}
          </ul>
          {industriesWithJobs.length > 5 && (
            <a 
              href={`${siteConfig.constants.LINK_ALL_JOBS}/?tab=category`} 
              className="link_theme viewmore"
            >
              {t('_View more_', language)}
            </a>
          )}
        </div>
      </div>

      {/* Job by Location */}
      <div className="BoxHolder">
        <div className="bgcolor_theme headerBox">
          {t('Job by Location', language)}
        </div>
        <div className="containerBox">
          <ul className="ListCareer">
            {topLocations.map((location, index) => (
              <li key={location.LOCATION_ID}>
                <a 
                  href={location.LINK} 
                  title={location.LOCATION_NAME}
                >
                  {location.LOCATION_NAME}
                </a>
                <span className="organce">({location.JOB_LOCATION_NUM})</span>
              </li>
            ))}
          </ul>
          {locationsWithJobs.length > 10 && (
            <a 
              href={siteConfig.constants.LINK_ALL_JOBS} 
              className="link_theme viewmore"
            >
              {t('_View more_', language)}
            </a>
          )}
        </div>
      </div>

      {/* Similar Jobs Box */}
      <BoxSimilarJobs
        arrSimilarJobs={arrSimilarJobs}
        language={language}
      />
    </div>
  );
}
