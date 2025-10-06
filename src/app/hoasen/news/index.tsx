'use client';

import React from 'react';
import { useTranslations } from '@/lib/use-translations';

// Types
interface NewsItem {
  NEWS_TITLE: string;
  NEWS_SUBCONTENT: string;
  NEWS_IMG_URL?: string;
  NEWS_PICTURE?: string;
  LINK: string;
}

interface CategoryInfo {
  CATE_ID: number;
  CATE_NAME: string;
  LINK: string;
}

interface News {
  CATE_PARENT_NAME?: string;
  CATE_NAME?: string;
  CATE_PARENT?: number;
}

interface PaginationInfo {
  previous?: number;
  next?: number;
  current: number;
  pagesInRange: number[];
}

interface NewsIndexProps {
  arrNews: NewsItem[];
  arrCateInfo: CategoryInfo;
  news?: News;
  pages?: PaginationInfo;
  is_mobile: boolean;
  siteId?: string;
  language: string;
}

export default function NewsIndex({
  arrNews,
  arrCateInfo,
  news,
  pages,
  is_mobile,
  siteId = 'hoasen',
  language = 'vi'
}: NewsIndexProps) {
  const t = useTranslations(language);

  // Helper functions
  const getBannerStyle = (): string => {
    if (is_mobile) {
      const mobileCateCss = t(`mobile_news_${arrCateInfo.CATE_ID}_css`);
      const mobileListCss = t('mobile_news_list_css');
      
      if (mobileCateCss && mobileCateCss !== `mobile_news_${arrCateInfo.CATE_ID}_css`) {
        return mobileCateCss;
      } else if (mobileListCss && mobileListCss !== 'mobile_news_list_css') {
        return mobileListCss;
      }
    } else {
      const cateCss = t(`news_${arrCateInfo.CATE_ID}_css`);
      const backgroundImage = t('_background_news_');
      
      if (cateCss && cateCss !== `news_${arrCateInfo.CATE_ID}_css`) {
        return cateCss;
      } else if (backgroundImage) {
        return `background-image:url(${backgroundImage})`;
      }
    }
    
    return '';
  };

  const getNewsImage = (newsItem: NewsItem): string => {
    if (newsItem.NEWS_IMG_URL) {
      return newsItem.NEWS_IMG_URL;
    } else if (newsItem.NEWS_PICTURE) {
      return `/themes/${siteId}/images/${newsItem.NEWS_PICTURE}`;
    }
    return '';
  };

  const getColumnClass = (): string => {
    if (news?.CATE_PARENT === parseInt(t('_id_career_')) || 
        news?.CATE_PARENT === parseInt(t('_id_news_2_'))) {
      return 'col-xs-12 col-sm-6 col-md-3';
    }
    return 'col-xs-12 col-sm-6 col-md-4';
  };

  const buildPaginationUrl = (page: number): string => {
    return `${arrCateInfo.LINK}/page/${page}`;
  };

  const getBreadcrumbParent = (): string => {
    if (news?.CATE_PARENT_NAME) {
      return news.CATE_PARENT_NAME;
    }
    return t('_News_');
  };

  const getBreadcrumbCurrent = (): string => {
    if (news?.CATE_NAME) {
      return news.CATE_NAME;
    } else if (arrCateInfo.CATE_NAME) {
      return arrCateInfo.CATE_NAME;
    }
    return t('_News_');
  };

  const shouldShowTitle = (): boolean => {
    const offTitleKey = `_off_cate_news_title_${arrCateInfo.CATE_ID}_`;
    const offTitle = t(offTitleKey);
    return !(offTitle && offTitle !== offTitleKey);
  };

  return (
    <>
      {/* Banner Area */}
      <div id="photo-area">
        <div id="banner-video">
          <div className="filter-video"></div>
          <div 
            id="bgvid" 
            style={{ 
              backgroundImage: getBannerStyle().includes('background-image:') 
                ? getBannerStyle().replace('background-image:', '').replace('url(', '').replace(')', '')
                : undefined,
              ...(getBannerStyle().includes('background-image:') ? {} : { style: getBannerStyle() })
            }}
          ></div>
        </div>
        <div className="container-search">
          {/* Include search job section component */}
          {/* <SearchJobSectionP31 /> */}
        </div>
      </div>

      {/* Breadcrumb */}
      <div id="breadcrumb">
        <div className="container">
          <ol className="breadcrumb">
            <li>{getBreadcrumbParent()}</li>
            <li className="active">
              {getBreadcrumbCurrent()}
            </li>
          </ol>
        </div>
      </div>

      {/* News Content */}
      <div className="section-page page-content-pre">
        <div className="news-five-items">
          <div className="container">
            <header className="container-fluid">
              {shouldShowTitle() && (
                <h2 className="section-title">
                  {arrCateInfo.CATE_NAME || t('_News_')}
                </h2>
              )}
            </header>
            
            <div className="row">
              {arrNews.map((newsItem, index) => (
                <div key={index} className={getColumnClass()}>
                  <div 
                    className="box bg-size-cover" 
                    style={{
                      backgroundImage: `url(${getNewsImage(newsItem)})`
                    }}
                  >
                    <div className="blurb">
                      <a href={newsItem.LINK}>{newsItem.NEWS_TITLE}</a>
                    </div>
                    <div className="excerpt">
                      <p className="title">
                        <a href={newsItem.LINK}>{newsItem.NEWS_TITLE}</a>
                      </p>
                      <p className="note">{newsItem.NEWS_SUBCONTENT}</p>
                      <p className="viewmore">
                        <a href={newsItem.LINK}>{t("_view detail_")}</a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pages && (
              <ul className="fl_right mar_top10" id="jb_pagination">
                {pages.previous && (
                  <li className="previous">
                    <a href={buildPaginationUrl(pages.previous)}>&nbsp;</a>
                  </li>
                )}
                
                {pages.pagesInRange.map((page) => (
                  <li key={page} className={pages.current === page ? 'active' : ''}>
                    {pages.current === page ? (
                      page
                    ) : (
                      <a href={buildPaginationUrl(page)}>{page}</a>
                    )}
                  </li>
                ))}
                
                {pages.next && (
                  <li className="next">
                    <a href={buildPaginationUrl(pages.next)}>&nbsp;</a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
