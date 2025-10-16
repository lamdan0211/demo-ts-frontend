'use client';

import React, { useEffect } from 'react';

// Types
interface NewsItem {
  NEWS_TITLE: string;
  NEWS_SUBCONTENT: string;
  NEWS_PICTURE: string;
  LINK: string;
  NUMROW?: number;
  CATE_ID?: number;
  CATE_NAME?: string;
}

interface Category {
  CATE_ID: number;
  CATE_NAME: string;
  CATE_CODE?: string;
}

interface IndexNewsP31Props {
  R: Category;
  arrHomeContent: {
    [key: number]: NewsItem[];
  };
  indexBackground: number;
  language?: 'vi' | 'en';
  LANGUAGE?: string;
  IMAGES_TN?: string;
  TN?: string;
  idNews2?: string;
  idNews?: string;
  idCareer?: string;
  slideBannerLinkCustom?: string;
  slideBannerLinkCustomLink?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_view detail_': {
      vi: 'Xem chi tiết',
      en: 'View detail'
    },
    '_View More_': {
      vi: 'Xem thêm',
      en: 'View More'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to create title URL
function createTitleUrl(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}

// Helper function to convert decimal to hex
function dec2hex(dec: number): string {
  return dec.toString(16);
}

export default function IndexNewsP31({
  R,
  arrHomeContent = {},
  indexBackground = 0,
  language = 'vi',
  LANGUAGE = 'vi',
  IMAGES_TN = '/themes/hoasen/images',
  TN = '/hoasen',
  idNews2 = '2',
  idNews = '1',
  idCareer = '3',
  slideBannerLinkCustom = '',
  slideBannerLinkCustomLink = ''
}: IndexNewsP31Props) {
  
  const newsItems = arrHomeContent[R.CATE_ID] || [];
  const newsCount = newsItems.length;
  
  // Get CSS class for background
  const getBackgroundClass = () => {
    return indexBackground % 2 === 1 ? 'bg-odd' : '';
  };
  
  // Render news item
  const renderNewsItem = (item: NewsItem, index: number, columnClass: string) => {
    return (
      <div key={index} className={columnClass}>
        <div className="box bg-size-cover">
          <img 
            src={`${IMAGES_TN}/${item.NEWS_PICTURE}`}
            alt={item.NEWS_TITLE}
            className="lazyload"
            loading="lazy"
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
          <div className="blurb">
            <p><a href={item.LINK}>{item.NEWS_TITLE}</a></p>
          </div>
          <div className="excerpt">
            <p className="title"><a href={item.LINK}>{item.NEWS_TITLE}</a></p>
            <p className="note">{item.NEWS_SUBCONTENT}</p>
            <p className="viewmore">
              <a href={item.LINK}>{t('_view detail_', language as 'vi' | 'en')}</a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  // Render view more button
  const renderViewMoreButton = (numRow: number) => {
    if (numRow <= 6) return null;
    
    const viewMoreUrl = R.CATE_CODE 
      ? `${TN}/${R.CATE_CODE}-${dec2hex(R.CATE_ID)}/${LANGUAGE}`
      : `${TN}/${createTitleUrl(newsItems[0]?.CATE_NAME || '')}-${dec2hex(newsItems[0]?.CATE_ID || 0)}/${LANGUAGE}`;
    
    return (
      <div className="row">
        <div className="col-sm-12 text-center component-footer">
          <a 
            href={viewMoreUrl} 
            className="btn btn-primary" 
            title={t('_View More_', language as 'vi' | 'en')}
          >
            {t('_View More_', language as 'vi' | 'en')}
          </a>
        </div>
      </div>
    );
  };
  
  // Render banner (only for news category)
  const renderBanner = () => {
    if (R.CATE_ID.toString() !== idNews) return null;
    
    return (
      <div className="banner-section">
        {/* Banner content will be added here if needed */}
      </div>
    );
  };
  
  const renderContent = () => {
    // News category with 2 items
    if (newsCount === 2) {
      return (
        <div className="news-five-items">
          <div className="container">
            <header className="container-fluid">
              <h2 className="section-title">{R.CATE_NAME}</h2>
            </header>
            <div className="row">
              {newsItems.map((item, index) => 
                renderNewsItem(item, index, "col-xs-12 col-sm-6 col-md-6")
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // News category with 3 items
    if (newsCount === 3) {
      return (
        <div className="news-three-items">
          <div className="container">
            <header className="container-fluid">
              <h2 className="section-title">{R.CATE_NAME}</h2>
            </header>
            {newsItems.map((item, index) => (
              <div key={index} className="col-xs-12 col-sm-4 article">
                <div className="name-item">
                  <span>{item.NEWS_TITLE}</span>
                </div>
                <div className="mask-img">
                  <img 
                    src={`${IMAGES_TN}/${item.NEWS_PICTURE}`}
                    alt={item.NEWS_TITLE}
                    className="lazyload"
                    loading="lazy"
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
                <div className="mask-hover">
                  <div className="description-item">
                    <a href={item.LINK}>{item.NEWS_SUBCONTENT}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // News category with 4 items
    if (newsCount === 4) {
      return (
        <div className="news-five-items">
          <div className="container">
            <header className="container-fluid">
              <h2 className="section-title">{R.CATE_NAME}</h2>
            </header>
            <div className="row">
              {newsItems.map((item, index) => 
                renderNewsItem(item, index, "col-xs-12 col-sm-6 col-md-6")
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // News category with 5 items
    if (newsCount === 5) {
      return (
        <div className="news-five-items">
          <div className="container">
            <header className="container-fluid">
              <h2 className="section-title">{R.CATE_NAME}</h2>
            </header>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 latest">
                {renderNewsItem(newsItems[0], 0, "")}
              </div>
              {newsItems.slice(1).map((item, index) => 
                renderNewsItem(item, index + 1, "col-xs-12 col-sm-6 col-md-4")
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // News category with 6+ items
    if (newsCount >= 6) {
      return (
        <div className="news-five-items">
          <div className="container">
            <header className="container-fluid">
              <h2 className="section-title">{R.CATE_NAME}</h2>
            </header>
            <div className="row">
              {newsItems.map((item, index) => 
                renderNewsItem(item, index, "col-xs-12 col-sm-6 col-md-4")
              )}
            </div>
            {renderViewMoreButton(newsItems[0]?.NUMROW || 0)}
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div 
      id={R.CATE_ID.toString()}
      className={`section-page ${getBackgroundClass()}`}
    >
      {renderContent()}
      {renderBanner()}
    </div>
  );
}