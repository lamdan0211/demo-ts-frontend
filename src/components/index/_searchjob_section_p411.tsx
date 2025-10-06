'use client';

import React, { useEffect } from 'react';

// Types
interface Industry {
  INDUSTRY_ID: number;
  INDUSTRY_NAME: string;
}

interface Location {
  LOCATION_ID: number;
  LOCATION_NAME: string;
}

interface LocationCountry {
  NAME: string;
  LOCATION: Location[];
}

interface SearchJobSectionP411Props {
  arrIndustries?: Industry[];
  getAllLocateCountry?: LocationCountry[];
  language?: 'vi' | 'en';
  LINK_JOBS_SEARCH?: string;
  LANGUAGE?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'Category': {
      vi: 'Ngành nghề',
      en: 'Category'
    },
    'Location': {
      vi: 'Địa điểm',
      en: 'Location'
    },
    'Keyword': {
      vi: 'Từ khóa',
      en: 'Keyword'
    },
    'act_search': {
      vi: 'Tìm kiếm',
      en: 'Search'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Validation function
function validateSearch(form: HTMLFormElement): boolean {
  const keyword = (form.querySelector('input[name="q"]') as HTMLInputElement)?.value;
  const category = (form.querySelector('select[name="cat"]') as HTMLSelectElement)?.value;
  const location = (form.querySelector('select[name="loc"]') as HTMLSelectElement)?.value;

  // Basic validation - at least one field should be filled
  if (!keyword && !category && !location) {
    alert('Vui lòng nhập ít nhất một tiêu chí tìm kiếm');
    return false;
  }

  return true;
}

export default function SearchJobSectionP411({
  arrIndustries = [],
  getAllLocateCountry = [],
  language = 'vi',
  LINK_JOBS_SEARCH = '/hoasen/jobs/search',
  LANGUAGE = 'vi'
}: SearchJobSectionP411Props) {

  useEffect(() => {
    // Initialize Chosen plugin for select elements
    const initChosen = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.chosen) {
        (window as any).jQuery('.chosen').chosen({
          width: '100%',
          placeholder_text_single: t('Category', language),
          no_results_text: 'Không tìm thấy kết quả'
        });
      } else {
        setTimeout(initChosen, 100);
      }
    };

    initChosen();
  }, [language]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (validateSearch(form)) {
      form.submit();
    }
  };

  return (
    <>
      <div className="search-jobs-main">
        <form 
          method="get" 
          action={`${LINK_JOBS_SEARCH}/${LANGUAGE}`}
          onSubmit={handleSubmit}
          id="frmSearchJob"
        >
          <input 
            name="q" 
            type="text" 
            className="brOrgane h15 width_545" 
            placeholder={t('Keyword', language)}
          />
          
          <select name="cat" className="chosen slc-mb">
            <option value="">{t('Category', language)}</option>
            {arrIndustries.map((industry) => (
              <option key={industry.INDUSTRY_ID} value={industry.INDUSTRY_ID}>
                {industry.INDUSTRY_NAME}
              </option>
            ))}
          </select>
          
          <select name="loc" className="chosen slc-mb">
            <option value="">{t('Location', language)}</option>
            {getAllLocateCountry.map((country, countryIndex) => (
              <optgroup key={countryIndex} label={country.NAME}>
                {country.LOCATION.map((location) => (
                  <option key={location.LOCATION_ID} value={location.LOCATION_ID}>
                    {location.LOCATION_NAME}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          
          <button 
            className="searchvt1" 
            type="submit"
          >
            <span>{t('act_search', language)}</span>
          </button>
        </form>
      </div>
      
      <style jsx>{`
        .chosen-container {
          float: left;
        }
      `}</style>
    </>
  );
}
