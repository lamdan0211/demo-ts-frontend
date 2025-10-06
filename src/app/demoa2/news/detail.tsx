'use client';

import React, { useState, useEffect } from 'react';
import NewsCol250Box from '../../../components/news/col250/box';
import BoxSocialShare from '../../../components/common/box_social_share';

interface NewsDetailProps {
  siteId?: string;
  language?: string;
  news?: {
    CATE_PARENT_NAME?: string;
    CATE_NAME?: string;
    CATE_TYPE?: string;
    NEWS_TITLE?: string;
    NEWS_CONTENT?: string;
  };
  arrNews?: Array<{
    LINK: string;
    NEWS_TITLE: string;
    NEWS_POSTDATE?: string;
  }>;
  arrFunction?: {
    OFF_SHOW_POST_DATE_NEWS?: boolean;
  };
  pages?: {
    pageCount?: number;
  };
  t?: (key: string, lang?: string) => string;
  [key: string]: any;
}

export default function NewsDetail({
  siteId = 'demoa2',
  language = 'en',
  news = {},
  arrNews = [],
  arrFunction = { OFF_SHOW_POST_DATE_NEWS: false },
  pages = { pageCount: 0 },
  t = (key: string) => key,
  ...props
}: NewsDetailProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsList, setNewsList] = useState(arrNews);
  const [totalPages, setTotalPages] = useState(pages.pageCount || 0);

  const viewMore = async () => {
    try {
      const response = await fetch('/api/news/more', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page: currentPage + 1 }),
      });
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setCurrentPage(prev => prev + 1);
        setNewsList(data);
        
        // Remove view more button if we've reached the last page
        if (currentPage + 1 >= totalPages) {
          const viewMoreElement = document.getElementById('viewmore');
          if (viewMoreElement) {
            viewMoreElement.remove();
          }
        }
      }
    } catch (error) {
      console.error('Error loading more news:', error);
    }
  };

  return (
    <div id="main-content" className="">
      <div id="col709">
        <div className="Left-ListNews">
          <div className="nav_hor">
            <span className="col_theme">
              {news.CATE_PARENT_NAME || t('_News_')}
            </span>
            {news.CATE_NAME && (
              <>
                <span className="arrow"></span>
                <span className="col_theme">{news.CATE_NAME}</span>
              </>
            )}
          </div>
          
          {news.CATE_TYPE !== '2' && (
            <h2 className="titleArticle" style={{ paddingTop: '10px' }}>
              {news.NEWS_TITLE}
            </h2>
          )}
          
          <div 
            className="content_fck"
            dangerouslySetInnerHTML={{ __html: news.NEWS_CONTENT || '' }}
          />
          
          <div className="mar_top10">
            <BoxSocialShare siteId={siteId} language={language as 'vi' | 'en'} {...props} />
          </div>
          
          {newsList.length > 0 && (
            <div className="OtherNewsTalent">
              <span className="title">{t('_Other_')}</span>
              <span className="fl_right">
                <a href="#" className="back-to-top" onClick={(e) => e.preventDefault()}>
                  [{t('_Go back_')}]
                </a>
              </span>
              <ul>
                {newsList.map((item, index) => (
                  <li key={index}>
                    <a href={item.LINK} title={item.NEWS_TITLE}>
                      {item.NEWS_TITLE}
                    </a>
                    {!arrFunction.OFF_SHOW_POST_DATE_NEWS && item.NEWS_POSTDATE && (
                      ` (${item.NEWS_POSTDATE})`
                    )}
                  </li>
                ))}
              </ul>
              {totalPages > 1 && (
                <div className="clear fl_left" id="viewmore">
                  <a 
                    className="line_bot" 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); viewMore(); }}
                  >
                    {t('_View more_')}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <NewsCol250Box siteId={siteId} language={language} {...props} />
    </div>
  );
}
