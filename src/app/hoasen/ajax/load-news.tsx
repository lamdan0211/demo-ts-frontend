'use client';

import React from 'react';

// Types for news data
interface NewsItem {
  NEWS_TITLE: string;
  LINK: string;
  TOTAL?: number;
}

interface LoadNewsProps {
  arrNews?: NewsItem[];
  LINK_NEWS?: string;
  language?: 'vi' | 'en';
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_News_': {
      vi: 'Tin tức',
      en: 'News'
    },
    '_View more_': {
      vi: 'Xem thêm',
      en: 'View more'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function LoadNews({ 
  arrNews = [], 
  LINK_NEWS = '/hoasen/news',
  language = 'vi'
}: LoadNewsProps) {
  
  if (!arrNews || arrNews.length === 0) {
    return null;
  }

  const totalNews = arrNews[0]?.TOTAL || arrNews.length;
  const firstThreeNews = arrNews.slice(0, 3);
  const nextThreeNews = arrNews.slice(3, 6);

  return (
    <div className="title">
      <h3>{t('_News_', language)}</h3>
      {totalNews > 6 && (
        <a href={LINK_NEWS} className="viewmore">
          {t('_View more_', language)}
        </a>
      )}
    </div>
    
    <ul>
      {firstThreeNews.map((news, index) => (
        <li key={`news-${index}`}>
          <a href={news.LINK}>{news.NEWS_TITLE}</a>
        </li>
      ))}
    </ul>
    
    {totalNews > 3 && nextThreeNews.length > 0 && (
      <ul>
        {nextThreeNews.map((news, index) => (
          <li key={`news-${index + 3}`}>
            <a href={news.LINK}>{news.NEWS_TITLE}</a>
          </li>
        ))}
      </ul>
    )}
  );
}
