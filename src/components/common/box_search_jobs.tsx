'use client';

import React, { useState, useEffect } from 'react';

interface Industry {
  INDUSTRY_ID: number;
  INDUSTRY_NAME: string;
}

interface Location {
  LOCATION_ID: number;
  LOCATION_NAME: string;
}

interface CountryLocation {
  NAME: string;
  LOCATION: Location[];
}

interface BoxSearchJobsProps {
  siteId?: string;
  language?: string;
  arrIndustries?: Industry[];
  getAllLocateCountry?: CountryLocation[];
  args?: {
    cat?: number;
    loc?: number;
  };
  LINK_JOBS_SEARCH?: string;
  LANGUAGE?: string;
}

// Translation function
function t(key: string, language: string = 'en'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Search Job_': {
      vi: 'Tìm việc làm',
      en: 'Search Job'
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
    '_Search_': {
      vi: 'Tìm kiếm',
      en: 'Search'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function BoxSearchJobs({
  siteId = 'demoa2',
  language = 'en',
  arrIndustries = [],
  getAllLocateCountry = [],
  args = {},
  LINK_JOBS_SEARCH = '/demoa2/jobs/search',
  LANGUAGE = 'en'
}: BoxSearchJobsProps) {
  
  const [searchData, setSearchData] = useState({
    q: '',
    cat: args.cat || '',
    loc: args.loc || ''
  });

  const [keywordPlaceholder, setKeywordPlaceholder] = useState(t('Keyword', language));

  // Initialize Chosen plugin when component mounts
  useEffect(() => {
    const initChosen = () => {
      if (typeof window !== 'undefined' && (window as any).$) {
        const $ = (window as any).$;
        
        // Initialize Chosen on select elements
        $('.chosen').chosen({
          disable_search_threshold: 10,
          no_results_text: "No results found",
          width: "100%"
        });
      }
    };

    // Check if jQuery and Chosen are loaded
    if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn.chosen) {
      initChosen();
    } else {
      const checkDependencies = setInterval(() => {
        if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn.chosen) {
          clearInterval(checkDependencies);
          initChosen();
        }
      }, 100);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeywordFocus = () => {
    if (searchData.q === t('Keyword', language)) {
      setSearchData(prev => ({ ...prev, q: '' }));
    }
  };

  const handleKeywordBlur = () => {
    if (searchData.q === '') {
      setSearchData(prev => ({ ...prev, q: t('Keyword', language) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (searchData.q === t('Keyword', language) || searchData.q.trim() === '') {
      alert('Please enter a keyword to search');
      return;
    }
    
    // Build search URL
    const params = new URLSearchParams();
    if (searchData.q && searchData.q !== t('Keyword', language)) {
      params.append('q', searchData.q);
    }
    if (searchData.cat) {
      params.append('cat', searchData.cat.toString());
    }
    if (searchData.loc) {
      params.append('loc', searchData.loc.toString());
    }
    
    const searchUrl = `${LINK_JOBS_SEARCH}/${LANGUAGE}?${params.toString()}`;
    window.location.href = searchUrl;
  };

  return (
    <div className="BoxHolder">
      <div className="bgcolor_theme headerBox">{t('_Search Job_', language)}</div>
      <div className="containerBox search250 fontCore">
        <form method="get" action={`${LINK_JOBS_SEARCH}/${LANGUAGE}`} onSubmit={handleSubmit}>
          <div className="row">
            <input 
              type="text" 
              value={searchData.q}
              onFocus={handleKeywordFocus}
              onBlur={handleKeywordBlur}
              onChange={handleInputChange}
              className="width_212" 
              name="q"
            />
          </div>
          
          <div className="row">
            <select 
              className="width_224 chosen" 
              name="cat"
              value={searchData.cat}
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
          </div>
          
          <div className="row">
            <select 
              className="width_224 chosen" 
              name="loc"
              value={searchData.loc}
              onChange={handleInputChange}
            >
              <option value="">{t('Location', language)}</option>
              {getAllLocateCountry.map((country, countryIndex) => (
                <optgroup key={countryIndex} label={country.NAME}>
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
          </div>
          
          <div className="fl_right">
            <input 
              type="submit" 
              value={t('_Search_', language)} 
              className="ui_btnCb btnSmall"
            />
          </div>
        </form>
      </div>
    </div>
  );
}