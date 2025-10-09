'use client';

import { useState, useEffect } from 'react';
import { IndexPageProps, RewriteInfo, Industry, Location, Job } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import { SwiperBanner } from '@/components/UI';

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Employers_': {
      vi: 'Nhà tuyển dụng',
      en: 'Employers'
    },
    '_Find Management and Executive Level Jobs_': {
      vi: 'Tìm việc làm cấp quản lý và điều hành',
      en: 'Find Management and Executive Level Jobs'
    },
    'Keyword': {
      vi: 'Từ khóa',
      en: 'Keyword'
    },
    'Category': {
      vi: 'Danh mục',
      en: 'Category'
    },
    'Location': {
      vi: 'Địa điểm',
      en: 'Location'
    },
    'act_search': {
      vi: 'Tìm kiếm',
      en: 'Search'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Search validation function
const validateSearch = (form: HTMLFormElement): boolean => {
  const keyword = (form.querySelector('input[name="q"]') as HTMLInputElement)?.value;
  const category = (form.querySelector('select[name="cat"]') as HTMLSelectElement)?.value;
  const location = (form.querySelector('select[name="loc"]') as HTMLSelectElement)?.value;
  
  if (!keyword || keyword === t('Keyword')) {
    alert('Vui lòng nhập từ khóa tìm kiếm');
    return false;
  }
  
  return true;
};

export default function IndexPage({ 
  siteId, 
  arrRwInfo, 
  arrIndustries = [], 
  arrLocations = [], 
  language = 'vi' 
}: IndexPageProps) {
  const [searchForm, setSearchForm] = useState({
    q: t('Keyword', language),
    cat: '',
    loc: ''
  });

  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  // Process banner data for Swiper
  const bannerData = arrRwInfo?.RW_BANNER 
    ? arrRwInfo.RW_BANNER.split(';').filter(Boolean).map((banner, index) => ({
        id: index,
        image: `${siteConfig.constants.LINK_RW_IMAGES}/${banner}`,
        alt: `Banner ${index + 1}`
      }))
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSearch(e.currentTarget as HTMLFormElement)) {
      // Handle search submission
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const searchParams = new URLSearchParams();
      searchParams.set('q', formData.get('q') as string);
      searchParams.set('cat', formData.get('cat') as string);
      searchParams.set('loc', formData.get('loc') as string);
      
      window.location.href = `${siteConfig.constants.LINK_JOBS_SEARCH}?${searchParams.toString()}`;
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === t('Keyword', language)) {
      e.target.value = '';
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      e.target.value = t('Keyword', language);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div id="mainslide">
        <SwiperBanner
          banners={bannerData}
          height="354px"
          autoplay={true}
          autoplayDelay={5000}
          showPagination={true}
          showNavigation={bannerData.length > 1}
          loop={bannerData.length > 1}
          className="demoa1-banner"
        />
      </div>

      <div id="search-banner" style={{top: '170px', zIndex: 1}}>
          <div className="search-home">
            <h2>{t('_Find Management and Executive Level Jobs_', language)}</h2>
            <div className="search-box-right">
              <form 
                method="get" 
                action={siteConfig.constants.LINK_JOBS_SEARCH} 
                onSubmit={handleSearchSubmit}
              >
                <div className="row">
                  <input 
                    name="q" 
                    type="text" 
                    className="width_260" 
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    value={searchForm.q}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="row">
                  <select 
                    name="cat" 
                    className="width_272"
                    value={searchForm.cat}
                    onChange={handleInputChange}
                  >
                    <option value="">{t('Category', language)}</option>
                    {arrIndustries.map((industry) => (
                      <option key={industry.INDUSTRY_ID} value={industry.INDUSTRY_ID}>
                        {industry.INDUSTRY_NAME}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <select 
                    name="loc" 
                    className="width_272"
                    value={searchForm.loc}
                    onChange={handleInputChange}
                  >
                    <option value="">{t('Location', language)}</option>
                    {arrLocations.map((location) => (
                      <option key={location.LOCATION_ID} value={location.LOCATION_ID}>
                        {location.LOCATION_NAME}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row last">
                  <input 
                    type="submit" 
                    className="ui_btnCb search_banner" 
                    value={t('act_search', language)}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      
      <div id="main-content">
        <div id="col709">
          <div className="content_fck">
            {/* Industry boxes will be included here */}
            <div className="industry-section">
              {/* This will be replaced with actual industry components */}
              <p>Industry boxes will be loaded here</p>
            </div>
          </div>
          <div className="share_home">
            {/* Social share box will be included here */}
            <div className="social-share-section">
              {/* This will be replaced with actual social share component */}
              <p>Social share box will be loaded here</p>
            </div>
          </div>
        </div>
        
        <div id="col250">
          {/* Career box will be included here */}
          <div className="career-section">
            {/* This will be replaced with actual career component */}
            <p>Career box will be loaded here</p>
          </div>
          
          {/* Salary widget will be included here */}
          <div className="salary-widget-section">
            {/* This will be replaced with actual salary widget */}
            <p>Salary widget will be loaded here</p>
          </div>
          
          {/* Social follow box will be included here */}
          <div className="social-follow-section">
            {/* This will be replaced with actual social follow component */}
            <p>Social follow box will be loaded here</p>
          </div>
          
          {/* Survey box will be included here */}
          <div className="survey-section">
            {/* This will be replaced with actual survey component */}
            <p>Survey box will be loaded here</p>
          </div>
        </div>
        
        {/* Horizontal industries will be included here */}
        <div className="horizontal-industries-section">
          {/* This will be replaced with actual horizontal industries component */}
          <p>Horizontal industries will be loaded here</p>
        </div>
      </div>
    </>
  );
}
