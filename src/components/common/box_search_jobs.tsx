'use client';

import { BoxSearchJobsProps } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'Search Jobs': {
      vi: 'Tìm việc làm',
      en: 'Search Jobs'
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

export default function BoxSearchJobs({ 
  siteId, 
  language = 'vi' 
}: BoxSearchJobsProps) {
  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const searchParams = new URLSearchParams();
    searchParams.set('q', formData.get('q') as string);
    searchParams.set('cat', formData.get('cat') as string);
    searchParams.set('loc', formData.get('loc') as string);
    
    window.location.href = `${siteConfig.constants.LINK_JOBS_SEARCH}?${searchParams.toString()}`;
  };

  return (
    <div className="BoxHolder">
      <div className="bgcolor_theme headerBox">
        {t('Search Jobs', language)}
      </div>
      <div className="containerBox">
        <form onSubmit={handleSearch}>
          <div className="search-form">
            <input 
              type="text" 
              name="q" 
              placeholder={t('Keyword', language)}
              className="search-input"
            />
            <select name="cat" className="search-select">
              <option value="">{t('Category', language)}</option>
              {/* Categories would be populated from props */}
            </select>
            <select name="loc" className="search-select">
              <option value="">{t('Location', language)}</option>
              {/* Locations would be populated from props */}
            </select>
            <button type="submit" className="ui_btnCb btnSmall">
              {t('Search', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
