'use client';

import React, { useState } from 'react';
import { SingleSelect } from '@/components/UI';
import styles from '@/styles/_searchjob_section_p31.module.css';

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

export default function SearchJobSectionP31({
  arrIndustries = [],
  getAllLocateCountry = [],
  language = 'vi',
  LINK_JOBS_SEARCH = '/hoasen/jobs/search',
  LANGUAGE = 'vi'
}: SearchJobSectionP31Props) {
  const [searchForm, setSearchForm] = useState({
    q: '',
    cat: '',
    loc: ''
  });
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Validation function using state instead of DOM
  const validateSearch = (): boolean => {
    if (!searchForm.q && !searchForm.cat && !searchForm.loc) {
      alert('Vui lòng nhập ít nhất một tiêu chí tìm kiếm');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateSearch()) {
      // Handle search submission using state
      const searchParams = new URLSearchParams();
      if (searchForm.q) searchParams.set('q', searchForm.q);
      if (searchForm.cat) searchParams.set('cat', searchForm.cat);
      if (searchForm.loc) searchParams.set('loc', searchForm.loc);
      
      window.location.href = `${LINK_JOBS_SEARCH}/${LANGUAGE}?${searchParams.toString()}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm(prev => ({ ...prev, q: e.target.value }));
  };

  // Create options for SingleSelect components
  const categoryOptions = [
    ...arrIndustries.filter(industry => industry && industry.INDUSTRY_ID).map((industry) => ({
      value: industry.INDUSTRY_ID.toString(),
      label: industry.INDUSTRY_NAME || 'Unknown Industry',
      group: 'Industries'
    })),
    // Sample data
    { value: '1001', label: 'Công nghệ thông tin', group: 'Ngành nghề' },
    { value: '1002', label: 'Marketing & Quảng cáo', group: 'Ngành nghề' },
    { value: '1003', label: 'Tài chính & Ngân hàng', group: 'Ngành nghề' },
    { value: '1004', label: 'Bất động sản', group: 'Ngành nghề' },
    { value: '1005', label: 'Giáo dục & Đào tạo', group: 'Ngành nghề' },
    { value: '1006', label: 'Y tế & Chăm sóc sức khỏe', group: 'Ngành nghề' },
    { value: '1007', label: 'Logistics & Vận tải', group: 'Ngành nghề' },
    { value: '1008', label: 'Du lịch & Khách sạn', group: 'Ngành nghề' }
  ];

  const locationOptions = [
    ...getAllLocateCountry.filter(country => country && country.LOCATION).flatMap((country) => 
      country.LOCATION.filter(location => location && location.LOCATION_ID).map((location) => ({
        value: location.LOCATION_ID.toString(),
        label: location.LOCATION_NAME || 'Unknown Location',
        group: country.NAME || 'Vietnam'
      }))
    ),
    // Sample data
    { value: '2001', label: 'Hà Nội', group: 'Địa điểm' },
    { value: '2002', label: 'TP. Hồ Chí Minh', group: 'Địa điểm' },
    { value: '2003', label: 'Đà Nẵng', group: 'Địa điểm' },
    { value: '2004', label: 'Hải Phòng', group: 'Địa điểm' },
    { value: '2005', label: 'Cần Thơ', group: 'Địa điểm' },
    { value: '2006', label: 'Nha Trang', group: 'Địa điểm' },
    { value: '2007', label: 'Huế', group: 'Địa điểm' },
    { value: '2008', label: 'Vũng Tàu', group: 'Địa điểm' }
  ];

  // Show skeleton while mounting to prevent layout shift
  if (!isMounted) {
    return (
      <div className={styles.container}>
        <div className={styles.searchJobsMain}>
          <div className={`${styles.searchForm} ${styles.skeletonForm}`}>
            <div className={styles.skeletonInput}></div>
            <div className={styles.skeletonSelect}></div>
            <div className={styles.skeletonSelect}></div>
            <div className={styles.skeletonButton}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchJobsMain}>
        <form 
          method="get" 
          action={`${LINK_JOBS_SEARCH}/${LANGUAGE}`}
          onSubmit={handleSubmit}
          id="frmSearchJob"
          className={styles.searchForm}
        >
          <input
            name="q"
            type="text"
            className={styles.searchInput}
            placeholder="Tìm việc"
            value={searchForm.q}
            onChange={handleInputChange}
          />

          <SingleSelect
            options={categoryOptions}
            value={searchForm.cat}
            onChange={(value) => setSearchForm(prev => ({ ...prev, cat: value }))}
            placeholder="Ngành nghề"
            className={styles.formSelect}
            title="Ngành nghề"
            subtitle="Chọn ngành nghề"
          />

          <SingleSelect
            options={locationOptions}
            value={searchForm.loc}
            onChange={(value) => setSearchForm(prev => ({ ...prev, loc: value }))}
            placeholder="Nơi làm việc"
            className={styles.formSelect}
            title="Nơi làm việc"
            subtitle="Chọn địa điểm"
          />

          <button
            className={styles.searchButton}
            type="submit"
          >
            <span>TÌM KIẾM</span>
          </button>
        </form>
      </div>
    </div>
  );
}