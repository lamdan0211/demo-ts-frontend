'use client';

import React from 'react';
import { useTranslations } from '@/lib/use-translations';

// Types
interface Industry {
  INDUSTRY_NAME: string;
  JOB_INDUSTRY_NUM: number;
  LINK: string;
}

interface Location {
  LOCATION_NAME: string;
  JOB_LOCATION_NUM: number;
  LINK: string;
}

interface Col250IndexProps {
  arrBoxIndustries: Industry[];
  arrLocations: Location[];
  language: string;
}

export default function Col250Index({
  arrBoxIndustries,
  arrLocations,
  language = 'vi'
}: Col250IndexProps) {
  const t = useTranslations(language);

  // Helper functions
  const getIndustryItems = (): Industry[] => {
    return arrBoxIndustries
      .filter(industry => industry.JOB_INDUSTRY_NUM > 0)
      .slice(0, 10);
  };

  const getLocationItems = (): Location[] => {
    return arrLocations
      .filter(location => location.JOB_LOCATION_NUM > 0)
      .slice(0, 10);
  };

  const getTotalIndustries = (): number => {
    return arrBoxIndustries.filter(industry => industry.JOB_INDUSTRY_NUM > 0).length;
  };

  const getTotalLocations = (): number => {
    return arrLocations.filter(location => location.JOB_LOCATION_NUM > 0).length;
  };

  const getCycleClass = (index: number, cycleName: string): string => {
    const cycleValues = ['xk', ''];
    return cycleValues[index % cycleValues.length];
  };

  return (
    <div id="col250">
      {/* Include media box component */}
      {/* <BoxMedia /> */}
      
      {/* Job by Category */}
      <div className="BoxHolder JobBrowser">
        <h2>{t("Job by Category")}</h2>
        <div className="containerBox">
          <ul className="ListCareer">
            {getIndustryItems().map((industry, index) => (
              <li 
                key={industry.INDUSTRY_NAME} 
                className={getCycleClass(index, 'industry')}
              >
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
          
          {getTotalIndustries() > 10 && (
            <a 
              href="/hoasen/jobs/all/?tab=category" 
              className="link_theme viewmore"
            >
              {t("_View more_")}
            </a>
          )}
        </div>
      </div>

      {/* Job by Location */}
      <div className="BoxHolder JobBrowser">
        <h2>{t("Job by Location")}</h2>
        <div className="containerBox">
          <ul className="ListCareer">
            {getLocationItems().map((location, index) => (
              <li 
                key={location.LOCATION_NAME} 
                className={getCycleClass(index, 'location')}
              >
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
          
          {getTotalLocations() > 10 && (
            <a 
              href="/hoasen/jobs/all" 
              className="link_theme viewmore"
            >
              {t("_View more_")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
