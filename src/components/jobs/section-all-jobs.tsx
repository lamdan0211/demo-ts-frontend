'use client';

import React, { useEffect, useState } from 'react';

// Types
interface LocationJob {
  LOCATION_NAME: string;
  LINK: string;
  JOB_NUM: number;
  LOCATION_ID: number;
  COUNTRY_ID: number;
  JOB_LOCATION_NUM: number;
}

interface IndustryJob {
  INDUSTRY_NAME: string;
  LINK: string;
  JOB_NUM: number;
}

interface MapLocation {
  address: string;
  position: string;
  location_id: string;
  title: string;
}

interface SectionAllJobsProps {
  language?: 'vi' | 'en';
  arrListJobbyLocation1?: LocationJob[];
  arrListJobbyLocation2?: LocationJob[];
  arrListJobbyLocation3?: LocationJob[];
  arrListJobbyLocation4?: LocationJob[];
  arrListJobByIndustry1?: IndustryJob[];
  arrListJobByIndustry2?: IndustryJob[];
  arrListJobByIndustry3?: IndustryJob[];
  arrListJobByIndustry4?: IndustryJob[];
  arrLocations?: LocationJob[];
  nameTopJobLocation?: Record<number, { COUNTRY_NAME: string }>;
  arrPosition?: Record<number, string>;
  optionMapZoom?: string;
  positionLatitudeLongitude?: string;
  mapGoogjsAccesToken?: string;
  mapGoogjsApikey?: string;
  STATIC_TN?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_All job_': {
      vi: 'Tất cả việc làm',
      en: 'All Jobs'
    },
    '_Job by Location_': {
      vi: 'Việc làm theo địa điểm',
      en: 'Job by Location'
    },
    '_Jobs by Industry_': {
      vi: 'Việc làm theo ngành nghề',
      en: 'Jobs by Industry'
    },
    '_View all jobs in_': {
      vi: 'Xem tất cả việc làm tại',
      en: 'View all jobs in'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function SectionAllJobs({
  language = 'vi',
  arrListJobbyLocation1 = [],
  arrListJobbyLocation2 = [],
  arrListJobbyLocation3 = [],
  arrListJobbyLocation4 = [],
  arrListJobByIndustry1 = [],
  arrListJobByIndustry2 = [],
  arrListJobByIndustry3 = [],
  arrListJobByIndustry4 = [],
  arrLocations = [],
  nameTopJobLocation = {},
  arrPosition = {},
  optionMapZoom = '5',
  positionLatitudeLongitude = '',
  mapGoogjsAccesToken = '',
  mapGoogjsApikey = '',
  STATIC_TN = '/themes'
}: SectionAllJobsProps) {
  
  const [activeTab, setActiveTab] = useState<'location' | 'industry'>('location');

  useEffect(() => {
    // Load Goong Maps CSS and JS
    const loadGoongMaps = () => {
      // Load CSS
      if (!document.querySelector('link[href*="goong-js.css"]')) {
        const link = document.createElement('link');
        link.href = 'https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.6/dist/goong-js.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }

      // Load JS
      if (!document.querySelector('script[src*="goong-js.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.6/dist/goong-js.js';
        script.async = true;
        document.head.appendChild(script);
      }

      // Load custom maps.js
      if (!document.querySelector('script[src*="maps.js"]')) {
        const mapsScript = document.createElement('script');
        mapsScript.src = `${STATIC_TN}/js/maps.js`;
        mapsScript.async = true;
        document.head.appendChild(mapsScript);
      }
    };

    loadGoongMaps();
  }, [STATIC_TN]);

  useEffect(() => {
    // Initialize map and tab functionality
    const initMapAndTabs = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        const $ = (window as any).jQuery;
        
        // Check for anchor in URL
        const getAnchor = (url: string) => {
          const hash = url.split('#')[1];
          return hash || 'label_location';
        };
        
        const strAnchor = getAnchor(window.location.href);
        $(`#${strAnchor}`).trigger("click");
        
        // Set up tab switching
        (window as any).changeAllJob = (num: number) => {
          if (num === 2) {
            $('#map').hide();
            $('#area_location').hide();
            $('#area_industry').show();
            $('#label_location').removeClass('active');
            $('#label_industry').addClass('active');
            setActiveTab('industry');
          } else if (num === 1) {
            $('#map').show();
            $('#area_location').show();
            $('#area_industry').hide();
            $('#label_location').addClass('active');
            $('#label_industry').removeClass('active');
            setActiveTab('location');
          }
        };
      } else {
        setTimeout(initMapAndTabs, 100);
      }
    };

    initMapAndTabs();
  }, []);

  // Generate pin data for map
  const generatePinData = (): MapLocation[] => {
    const pinData: MapLocation[] = [];
    
    arrLocations.forEach((lc) => {
      if (lc.COUNTRY_ID === 1 && lc.JOB_LOCATION_NUM > 0) {
        const countryName = nameTopJobLocation[lc.LOCATION_ID]?.COUNTRY_NAME || '';
        const position = arrPosition[lc.LOCATION_ID] || '';
        
        pinData.push({
          address: `${lc.LOCATION_NAME}, ${countryName}`,
          position: position,
          location_id: lc.LOCATION_ID.toString(),
          title: `<div style="color: #fff; font-weight: bold"><a href="${lc.LINK}" style="font-weight: normal" target="_blank">${t('_View all jobs in_', language)} ${lc.LOCATION_NAME} (${lc.JOB_LOCATION_NUM})</a></div>`
        });
      }
    });
    
    return pinData;
  };

  // Render location list
  const renderLocationList = (locations: LocationJob[], key: string) => {
    if (!locations || locations.length === 0) return null;
    
    return (
      <div key={key} className="col-xs-12 col-sm-3">
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              <a href={location.LINK}>
                {location.LOCATION_NAME}
                <span>({location.JOB_NUM})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render industry list
  const renderIndustryList = (industries: IndustryJob[], key: string) => {
    if (!industries || industries.length === 0) return null;
    
    return (
      <div key={key} className="col-xs-12 col-sm-3">
        <ul>
          {industries.map((industry, index) => (
            <li key={index}>
              <a href={industry.LINK}>
                {industry.INDUSTRY_NAME}
                <span>({industry.JOB_NUM})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const pinData = generatePinData();
  const optionZoom = parseInt(optionMapZoom) || 5;
  const strPosition = `["${positionLatitudeLongitude.replace(/,/g, '","')}"]`;

  return (
    <>
      <header className="container-fluid">
        <h2 className="section-title">{t('_All job_', language)}</h2>
      </header>
      
      <div className="browser-job">
        <a 
          href="javascript:void(0);" 
          className={activeTab === 'location' ? 'active' : ''} 
          onClick={() => {
            if (typeof (window as any).changeAllJob === 'function') {
              (window as any).changeAllJob(1);
            }
          }}
          id="label_location"
        >
          {t('_Job by Location_', language)}
        </a>
        <a 
          href="javascript:void(0);" 
          className={activeTab === 'industry' ? 'active' : ''} 
          onClick={() => {
            if (typeof (window as any).changeAllJob === 'function') {
              (window as any).changeAllJob(2);
            }
          }}
          id="label_industry"
        >
          {t('_Jobs by Industry_', language)}
        </a>
      </div>
      
      <div id="map" style={{ position: 'relative', width: '100%', height: '520px' }}></div>
      
      <div className="container">
        <div className="list-cate" id="area_location" style={{ display: activeTab === 'location' ? 'block' : 'none' }}>
          <h3 className="col-xs-12">{t('_Job by Location_', language)}</h3>
          <div className="row">
            {renderLocationList(arrListJobbyLocation1, 'location1')}
            {renderLocationList(arrListJobbyLocation2, 'location2')}
            {renderLocationList(arrListJobbyLocation3, 'location3')}
            {renderLocationList(arrListJobbyLocation4, 'location4')}
          </div>
        </div>
        
        <div className="list-cate" id="area_industry" style={{ display: activeTab === 'industry' ? 'block' : 'none' }}>
          <h3 className="col-xs-12">{t('_Jobs by Industry_', language)}</h3>
          <div className="row">
            {renderIndustryList(arrListJobByIndustry1, 'industry1')}
            {renderIndustryList(arrListJobByIndustry2, 'industry2')}
            {renderIndustryList(arrListJobByIndustry3, 'industry3')}
            {renderIndustryList(arrListJobByIndustry4, 'industry4')}
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            var option_zoom = ${optionZoom};
            var pinData = ${JSON.stringify(pinData)};
            var arrPostion = ${strPosition};
            var strMapGoogAccess = '${mapGoogjsAccesToken}';
            var strMapGoogApi = '${mapGoogjsApikey}';
          `
        }}
      />
    </>
  );
}
