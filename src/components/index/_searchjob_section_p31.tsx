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

interface SearchJobSectionP31Props {
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

export default function SearchJobSectionP31({
  arrIndustries = [],
  getAllLocateCountry = [],
  language = 'vi',
  LINK_JOBS_SEARCH = '/hoasen/jobs/search',
  LANGUAGE = 'vi'
}: SearchJobSectionP31Props) {

  useEffect(() => {
    // Initialize Chosen plugin for select elements
    const initChosen = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.chosen) {
        // Destroy existing Chosen instances first
        (window as any).jQuery('.chosen').chosen('destroy');
        
        // Initialize Chosen on select elements
        (window as any).jQuery('.chosen').chosen({
          width: '100%',
          placeholder_text_single: t('Category', language),
          no_results_text: 'Không tìm thấy kết quả',
          allow_single_deselect: true
        });

        console.log('Chosen initialized successfully');
      } else {
        console.log('jQuery or Chosen not available, retrying...');
        setTimeout(initChosen, 200);
      }
    };

    // Wait for DOM to be ready
    if (typeof window !== 'undefined') {
      if ((window as any).jQuery) {
        (window as any).jQuery(document).ready(initChosen);
      } else {
        setTimeout(() => {
          if ((window as any).jQuery) {
            (window as any).jQuery(document).ready(initChosen);
          } else {
            initChosen();
          }
        }, 500);
      }
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (validateSearch(form)) {
      form.submit();
    }
  };

  return (
    <div className="search-jobs-main">
      <form 
        method="get" 
        action={`${LINK_JOBS_SEARCH}/${LANGUAGE}`}
        onSubmit={handleSubmit}
        id="frmSearchJob"
        className="search-form"
      >
        <input 
          name="q" 
          type="text" 
          className="brOrgane h15 width_545 search-input" 
          placeholder={t('Keyword', language)}
        />
        
        <select name="cat" className="chosen slc-mb search-select">
          <option key="category-default" value="">{t('Category', language)}</option>
          {arrIndustries.map((industry) => (
            <option key={industry.INDUSTRY_ID} value={industry.INDUSTRY_ID}>
              {industry.INDUSTRY_NAME}
            </option>
          ))}
        </select>
        
        <select name="loc" className="chosen slc-mb search-select">
          <option key="location-default" value="">{t('Location', language)}</option>
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
          className="searchvt1 search-button" 
          type="submit"
        >
          <span>{t('act_search', language)}</span>
        </button>
      </form>
      
      <style jsx global>{`
        .search-jobs-main {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .search-form {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .search-input {
          flex: 1;
          min-width: 200px;
          max-width: 300px;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .search-select {
          min-width: 150px;
          max-width: 200px;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          background: white;
        }
        
        .search-button {
          padding: 10px 20px;
          background: #ff6b35;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .search-button:hover {
          background: #e55a2b;
        }
        
        .chosen-container {
          float: left;
          margin-right: 10px;
        }
        
        .chosen-container-single .chosen-single {
          height: 40px;
          line-height: 40px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }
        
        .chosen-container-single .chosen-single span {
          padding-left: 15px;
        }
        
        .chosen-container-single .chosen-single div b {
          background-position: 0px 2px;
        }
        
        @media (max-width: 768px) {
          .search-form {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-input,
          .search-select {
            max-width: 100%;
            margin-bottom: 10px;
          }
          
          .chosen-container {
            float: none;
            margin-right: 0;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
}
