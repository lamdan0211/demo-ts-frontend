'use client';

import React, { useState } from 'react';
import { BoxSearchProps, Industry, Location } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import { MultiSelect } from '@/components/UI';

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


export default function BoxSearch({ 
  siteId, 
  arrIndustries = [], 
  getAllLocateCountry = [], 
  arrParam = {},
  language = 'vi' 
}: BoxSearchProps) {
  const [searchForm, setSearchForm] = useState({
    q: arrParam.q || '',
    cat: Array.isArray(arrParam.cat) ? arrParam.cat : (arrParam.cat ? [arrParam.cat] : []),
    loc: Array.isArray(arrParam.loc) ? arrParam.loc : (arrParam.loc ? [arrParam.loc] : [])
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  // Create options for MultiSelect components
  const categoryOptions = [
    ...arrIndustries.map((industry) => ({
      value: industry.INDUSTRY_ID.toString(),
      label: industry.INDUSTRY_NAME,
      group: 'Industries'
    })),
    // Sample data
    { value: '1001', label: 'Công nghệ thông tin', group: 'Sample' },
    { value: '1002', label: 'Marketing & Quảng cáo', group: 'Sample' },
    { value: '1003', label: 'Tài chính & Ngân hàng', group: 'Sample' },
    { value: '1004', label: 'Bất động sản', group: 'Sample' },
    { value: '1005', label: 'Giáo dục & Đào tạo', group: 'Sample' },
    { value: '1006', label: 'Y tế & Chăm sóc sức khỏe', group: 'Sample' },
    { value: '1007', label: 'Logistics & Vận tải', group: 'Sample' },
    { value: '1008', label: 'Du lịch & Khách sạn', group: 'Sample' }
  ];

  const locationOptions = [
    ...getAllLocateCountry.flatMap((country) => 
      country.LOCATION.map((location) => ({
        value: location.LOCATION_ID.toString(),
        label: location.LOCATION_NAME,
        group: country.NAME || 'Vietnam'
      }))
    ),
    // Sample data
    { value: '2001', label: 'Hà Nội', group: 'Sample' },
    { value: '2002', label: 'TP. Hồ Chí Minh', group: 'Sample' },
    { value: '2003', label: 'Đà Nẵng', group: 'Sample' },
    { value: '2004', label: 'Hải Phòng', group: 'Sample' },
    { value: '2005', label: 'Cần Thơ', group: 'Sample' },
    { value: '2006', label: 'Nha Trang', group: 'Sample' },
    { value: '2007', label: 'Huế', group: 'Sample' },
    { value: '2008', label: 'Vũng Tàu', group: 'Sample' }
  ];

  // Validation function using state instead of DOM
  const validateSearch = (): boolean => {
    const keyword = searchForm.q.trim();
    
    if (!keyword || keyword === '') {
      alert('Vui lòng nhập từ khóa tìm kiếm');
      return false;
    }
    
    return true;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSearch()) {
      // Handle search submission using state
      const searchParams = new URLSearchParams();
      searchParams.set('q', searchForm.q);
      if (searchForm.cat.length > 0) {
        searchParams.set('cat', searchForm.cat.join(','));
      }
      if (searchForm.loc.length > 0) {
        searchParams.set('loc', searchForm.loc.join(','));
      }
      
      window.location.href = `${siteConfig.constants.LINK_JOBS_SEARCH}/${siteConfig.constants.LANGUAGE}?${searchParams.toString()}`;
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm(prev => ({ ...prev, q: e.target.value }));
  };

  // Show skeleton while mounting to prevent layout shift
  if (!isMounted) {
    return (
      <div id="search-container" className="search-full">
        <div className="bgcolor_theme headerBox">
          {t('Search Our Your Listings', language)}
        </div>
        <div className="containerBox fontCore">
          <div className="row last skeleton-form">
            <div className="skeleton-input"></div>
            <div className="skeleton-select"></div>
            <div className="skeleton-select"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
    );
  }

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
                placeholder={t('Keyword', language)}
                value={searchForm.q}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="search-input"
              />
              <MultiSelect
                options={categoryOptions}
                value={searchForm.cat}
                onChange={(value) => setSearchForm(prev => ({ ...prev, cat: value }))}
                placeholder={t('Category', language)}
                className="form-select"
                title="Tất cả ngành nghề"
                subtitle="Chọn ngành nghề"
              />
              <MultiSelect
                options={locationOptions}
                value={searchForm.loc}
                onChange={(value) => setSearchForm(prev => ({ ...prev, loc: value }))}
                placeholder={t('Location', language)}
                className="form-select"
                title="Tất cả địa điểm"
                subtitle="Chọn địa điểm"
              />
              <div className="searchBtn">
                <input 
                  type="submit" 
                  className="" 
                  value={t('Search', language)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .search-full {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: visible;
        }


        .containerBox {
          padding: 20px;
          overflow: visible;
        }

        .row.last {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          flex-wrap: nowrap;
          overflow: visible;
          width: 100%;
        }

        .search-input {
          flex: 0.8 !important;
          min-width: 250px;
          width: 100%;
          height: 44px;
          padding: 12px 16px;
          border: 1px solid #e1e5e9;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
          background: white;
          color: #374151;
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .search-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .search-input:hover {
          border-color: #007bff;
        }

        .form-select {
          flex: 1 !important;
          min-width: 200px;
          width: 100%;
        }

        /* MultiSelect specific styles */
        .multi-select-container {
          flex: 1 !important;
          min-width: 200px;
          width: 100%;
        }

        .searchBtn {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .searchBtn input[type="submit"] {
          background: #ff6b35;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          height: 44px;
          min-height: 44px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .searchBtn input[type="submit"]:hover {
          background: #e55a2b;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .searchBtn input[type="submit"]:active {
          background: #d14d1f;
          transform: translateY(0);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .searchBtn input[type="submit"]:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
        }

        /* Skeleton Loading Styles */
        .skeleton-form {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          flex-wrap: nowrap;
          overflow: visible;
          width: 100%;
        }

        .skeleton-input {
          flex: 0.8 !important;
          min-width: 250px;
          height: 44px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          border-radius: 6px;
          animation: skeletonShimmer 1.5s infinite;
        }

        .skeleton-select {
          flex: 1 !important;
          min-width: 200px;
          height: 44px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          border-radius: 6px;
          animation: skeletonShimmer 1.5s infinite;
        }

        .skeleton-button {
          flex-shrink: 0;
          height: 44px;
          width: 120px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          border-radius: 6px;
          animation: skeletonShimmer 1.5s infinite;
        }

        @keyframes skeletonShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .row.last {
            flex-direction: column;
            gap: 15px;
          }

          .search-input {
            width: 100%;
            min-width: unset;
            flex: 0.8 !important;
          }
          
          .form-select {
            width: 100%;
            min-width: unset;
            flex: 1 !important;
          }

          .searchBtn {
            width: 100%;
          }

          .searchBtn input[type="submit"] {
            width: 100%;
            justify-content: center;
          }

          /* Skeleton responsive */
          .skeleton-form {
            flex-direction: column;
            gap: 15px;
          }

          .skeleton-input {
            width: 100%;
            min-width: unset;
            flex: 0.8 !important;
          }
          
          .skeleton-select {
            width: 100%;
            min-width: unset;
            flex: 1 !important;
          }

          .skeleton-button {
            width: 100%;
          }
        }

      `}</style>
    </>
  );
}
