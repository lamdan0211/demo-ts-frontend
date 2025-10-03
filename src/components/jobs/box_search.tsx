'use client';

import { useState } from 'react';
import { BoxSearchProps, Industry, Location } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'Search Our Your Listings': {
      vi: 'Tìm kiếm việc làm',
      en: 'Search Our Your Listings'
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
    'Search': {
      vi: 'Tìm kiếm',
      en: 'Search'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Search validation function
const validateSearch = (form: HTMLFormElement): boolean => {
  const keyword = (form.querySelector('input[name="q"]') as HTMLInputElement)?.value;
  
  if (!keyword || keyword === t('Keyword')) {
    alert('Vui lòng nhập từ khóa tìm kiếm');
    return false;
  }
  
  return true;
};

export default function BoxSearch({ 
  siteId, 
  arrIndustries = [], 
  getAllLocateCountry = [], 
  arrParam = {},
  language = 'vi' 
}: BoxSearchProps) {
  const [searchForm, setSearchForm] = useState({
    q: arrParam.q || t('Keyword', language),
    cat: arrParam.cat || '',
    loc: arrParam.loc || ''
  });

  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSearch(e.currentTarget as HTMLFormElement)) {
      // Handle search submission
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const searchParams = new URLSearchParams();
      searchParams.set('q', formData.get('q') as string);
      searchParams.set('cat', formData.get('cat') as string);
      searchParams.set('loc', formData.get('loc') as string);
      
      window.location.href = `${siteConfig.constants.LINK_JOBS_SEARCH}/${siteConfig.constants.LANGUAGE}?${searchParams.toString()}`;
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
      <div id="search-container" className="search-full">
        <div className="bgcolor_theme headerBox">
          {t('Search Our Your Listings', language)}
        </div>
        <div className="containerBox fontCore">
          <form 
            method="get" 
            action={`${siteConfig.constants.LINK_JOBS_SEARCH}/${siteConfig.constants.LANGUAGE}`}
            onSubmit={handleSearchSubmit}
          >
            <div className="row last">
              <input 
                type="text" 
                name="q" 
                className="brOrgane h15 width_545" 
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                value={searchForm.q}
                onChange={handleInputChange}
              />
              <select 
                className="width_251 chosen slc-mb" 
                name="cat"
                value={searchForm.cat}
                onChange={handleInputChange}
              >
                <option value="">{t('Category', language)}</option>
                {arrIndustries.map((industry) => (
                  <option 
                    key={industry.INDUSTRY_ID} 
                    value={industry.INDUSTRY_ID}
                  >
                    {industry.INDUSTRY_NAME}
                  </option>
                ))}
              </select>
              <select 
                className="mar_left10 width_251 chosen slc-mb" 
                name="loc"
                value={searchForm.loc}
                onChange={handleInputChange}
              >
                <option value="">{t('Location', language)}</option>
                {getAllLocateCountry.map((country) => (
                  <optgroup key={country.COUNTRY_ID} label={country.NAME}>
                    {country.LOCATION.map((location) => (
                      <option 
                        key={location.LOCATION_ID} 
                        value={location.LOCATION_ID}
                      >
                        {location.LOCATION_NAME}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="searchBtn">
                <input 
                  type="submit" 
                  className="ui_btnCb" 
                  value={t('Search', language)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .chosen-container {
          float: left;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
}
