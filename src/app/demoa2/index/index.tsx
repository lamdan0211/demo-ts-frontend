'use client';

import React, { useEffect } from 'react';
import BoxSocialShareLeft from '@/components/common/box_social_share_left';
import BoxSearchJobs from '@/components/common/box_search_jobs';
import BoxCareer from '@/components/common/box_career';
import BoxSocialFollow from '@/components/common/box_social_follow';
import { SwiperBanner } from '@/components/UI';

interface Demoa2IndexProps {
  siteId?: string;
  language?: string;
  arrRwInfo?: {
    RW_BANNER?: string;
    RW_LOGO?: string;
  };
  arrIndexNews?: {
    NEWS_TITLE?: string;
    NEWS_CONTENT?: string;
  };
  arrIndustries?: Array<{
    INDUSTRY_ID: number;
    INDUSTRY_NAME: string;
    LINK: string;
    JOB_INDUSTRY_NUM: number;
  }>;
  arrLocations?: Array<{
    LOCATION_ID: number;
    LOCATION_NAME: string;
    LINK: string;
    JOB_LOCATION_NUM: number;
  }>;
  [key: string]: any;
}

export default function Demoa2Index({
  siteId = 'demoa2',
  language = 'en',
  arrRwInfo = {},
  arrIndexNews = {},
  arrIndustries = [],
  arrLocations = [],
  ...props
}: Demoa2IndexProps) {
  useEffect(() => {
    // Load jQuery Cycle plugin
    const loadCycleScript = () => {
      return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined' && (window as any).$) {
          // jQuery is already loaded
          const script = document.createElement('script');
          script.src = '/themes/js/jquery.cycle.all.2.74.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        } else {
          // Wait for jQuery to load
          setTimeout(loadCycleScript, 100);
        }
      });
    };

    // Load Bing Maps
    const loadBingMaps = () => {
      return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined') {
          const script = document.createElement('script');
          script.src = 'http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        }
      });
    };

    // Slider is now handled by SwiperBanner component

    const loadJobsMapBox = (elementId: string) => {
      // This function would be implemented based on your map requirements
      console.log('Loading jobs map box for:', elementId);
    };

    // Initialize everything
    Promise.all([loadCycleScript(), loadBingMaps()]).then(() => {
      loadJobsMapBox('SearchJobBy');
    });

    // Make loadJobsMapBox available globally
    if (typeof window !== 'undefined') {
      (window as any).loadJobsMapBox = loadJobsMapBox;
    }
  }, []);

  // Parse banner images for Swiper
  const bannerData = arrRwInfo.RW_BANNER 
    ? arrRwInfo.RW_BANNER.split(';').filter(Boolean).map((banner: string, index: number) => {
        const extension = banner.split('.').pop()?.toLowerCase();
        // Only include non-SWF files
        if (extension !== 'swf') {
          return {
            id: index,
            image: `/themes/${siteId}/images/${banner}`,
            alt: `Banner ${index + 1}`
          };
        }
        return null;
      }).filter(Boolean)
    : [];

  return (
    <>
      <div id="mainslide">
        <SwiperBanner
          banners={bannerData}
          height="auto"
          autoplay={true}
          autoplayDelay={5000}
          showPagination={true}
          showNavigation={bannerData.length > 1}
          loop={bannerData.length > 1}
          className="demoa2-banner"
        />
      </div>

      <div id="main-content">
        <div id="col709">
          <div className="content_fck">
            <p style={{ 
              padding: '5px', 
              marginBottom: '10px', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#231f20', 
              borderLeft: '7px solid #49b344' 
            }}>
              {arrIndexNews.NEWS_TITLE}
            </p>
            <div dangerouslySetInnerHTML={{ __html: arrIndexNews.NEWS_CONTENT || '' }} />
          </div>
          <BoxSocialShareLeft siteId={siteId} language={language as 'vi' | 'en'} {...props} />
        </div>
        
        <div id="col250">
          <BoxSearchJobs siteId={siteId} language={language as 'vi' | 'en'} {...props} />
          <BoxCareer siteId={siteId} language={language as 'vi' | 'en'} {...props} />
          <BoxSocialFollow siteId={siteId} language={language as 'vi' | 'en'} {...props} />
        </div>
        
        <div className="SearchJobBy" id="SearchJobBy"></div>
      </div>
    </>
  );
}