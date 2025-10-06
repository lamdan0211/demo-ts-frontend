'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from '@/lib/use-translations';

// Types
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

interface BoxSearchP31Props {
  arrParam: {
    q?: string;
    cat?: number;
    loc?: number;
  };
  arrIndustries: Industry[];
  getAllLocateCountry: CountryLocation[];
  language: string;
}

export default function BoxSearchP31({
  arrParam,
  arrIndustries,
  getAllLocateCountry,
  language = 'vi'
}: BoxSearchP31Props) {
  const t = useTranslations(language);
  const [keyword, setKeyword] = useState(arrParam.q || t("Keyword"));
  const [selectedCategory, setSelectedCategory] = useState(arrParam.cat || '');
  const [selectedLocation, setSelectedLocation] = useState(arrParam.loc || '');

  // Initialize Chosen plugin
  useEffect(() => {
    const initializeChosen = () => {
      if ((window as any).$ && (window as any).$.fn.chosen) {
        // Initialize Chosen on select elements
        (window as any).$('select[name="cat"]').chosen({
          disable_search_threshold: 10,
          no_results_text: t("No results found"),
          placeholder_text_single: t("Category")
        });
        
        (window as any).$('select[name="loc"]').chosen({
          disable_search_threshold: 10,
          no_results_text: t("No results found"),
          placeholder_text_single: t("Location")
        });

        // Apply custom styling
        (window as any).$('.chosen-container').css('float', 'left');
      }
    };

    // Wait for jQuery and Chosen to be available
    const checkAndInitialize = () => {
      if ((window as any).$ && (window as any).$.fn.chosen) {
        initializeChosen();
      } else {
        setTimeout(checkAndInitialize, 100);
      }
    };

    checkAndInitialize();

    return () => {
      // Cleanup Chosen instances
      if ((window as any).$ && (window as any).$.fn.chosen) {
        (window as any).$('select[name="cat"]').chosen('destroy');
        (window as any).$('select[name="loc"]').chosen('destroy');
      }
    };
  }, [t]);

  // Validation function
  const validateSearch = (form: HTMLFormElement): boolean => {
    const keywordInput = form.querySelector('input[name="q"]') as HTMLInputElement;
    const categorySelect = form.querySelector('select[name="cat"]') as HTMLSelectElement;
    const locationSelect = form.querySelector('select[name="loc"]') as HTMLSelectElement;

    // Check if keyword is empty or still contains placeholder text
    if (!keywordInput.value || keywordInput.value === t("Keyword")) {
      alert(t("Please enter a keyword to search"));
      keywordInput.focus();
      return false;
    }

    // Check if at least one filter is selected
    if (!categorySelect.value && !locationSelect.value) {
      alert(t("Please select at least one category or location"));
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateSearch(e.currentTarget)) {
      // Build search URL
      const searchParams = new URLSearchParams();
      
      if (keyword && keyword !== t("Keyword")) {
        searchParams.append('q', keyword);
      }
      if (selectedCategory) {
        searchParams.append('cat', selectedCategory.toString());
      }
      if (selectedLocation) {
        searchParams.append('loc', selectedLocation.toString());
      }

      const searchUrl = `/demoa1/jobs/search/${language}?${searchParams.toString()}`;
      window.location.href = searchUrl;
    }
  };

  // Handle keyword input focus/blur
  const handleKeywordFocus = () => {
    if (keyword === t("Keyword")) {
      setKeyword('');
    }
  };

  const handleKeywordBlur = () => {
    if (keyword === '') {
      setKeyword(t("Keyword"));
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    const form = document.getElementById('frmSearchJob') as HTMLFormElement;
    if (form) {
      form.submit();
    }
  };

  return (
    <>
      <div className="search-jobs-main">
        <form 
          method="get" 
          action={`/demoa1/jobs/search/${language}`}
          onSubmit={handleSubmit}
          id="frmSearchJob"
        >
          <input 
            name="q" 
            type="text" 
            className="brOrgane h15 width_545" 
            onBlur={handleKeywordBlur}
            onFocus={handleKeywordFocus}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          
          <select 
            name="cat" 
            className="chosen slc-mb"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">{t("Category")}</option>
            {arrIndustries.map((industry) => (
              <option 
                key={industry.INDUSTRY_ID} 
                value={industry.INDUSTRY_ID}
                selected={arrParam.cat === industry.INDUSTRY_ID}
              >
                {industry.INDUSTRY_NAME}
              </option>
            ))}
          </select>
          
          <select 
            name="loc" 
            className="chosen slc-mb"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">{t("Location")}</option>
            {getAllLocateCountry.map((country) => (
              <optgroup key={country.NAME} label={country.NAME}>
                {country.LOCATION.map((location) => (
                  <option 
                    key={location.LOCATION_ID} 
                    value={location.LOCATION_ID}
                    selected={arrParam.loc === location.LOCATION_ID}
                  >
                    {location.LOCATION_NAME}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          
          <button 
            type="button"
            className="searchvt1" 
            onClick={handleSearchClick}
          >
            <span>{t("act_search")}</span>
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
