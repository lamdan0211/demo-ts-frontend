'use client';

import React, { useEffect } from 'react';
import { useTranslations } from '@/lib/use-translations';

// Types
interface NewsDetail {
  NEWS_ID: number;
  NEWS_TITLE: string;
  NEWS_CONTENT: string;
  NEWS_POSTDATE: string;
  CATE_NAME?: string;
  CATE_PARENT_NAME?: string;
  CATE_PARENT?: number;
  CATE_TYPE?: string;
}

interface NewsDetailProps {
  news: NewsDetail;
  is_mobile: boolean;
  language: string;
}

export default function NewsDetail({
  news,
  is_mobile,
  language = 'vi'
}: NewsDetailProps) {
  const t = useTranslations(language);

  // Helper functions
  const getBannerStyle = (): string => {
    if (is_mobile) {
      const mobileNewsCss = t(`mobile_news_${news.NEWS_ID}_css`);
      const mobileNewsDetailCss = t('mobile_news_detail_css');
      const mobileCareerDetailCss = t('mobile_career_detail_css');
      
      if (mobileNewsCss && mobileNewsCss !== `mobile_news_${news.NEWS_ID}_css`) {
        return mobileNewsCss;
      } else if (news.CATE_PARENT === parseInt(t('_id_career_'))) {
        return mobileCareerDetailCss;
      } else {
        return mobileNewsDetailCss;
      }
    } else {
      const newsCss = t(`news_${news.NEWS_ID}_css`);
      const backgroundCareer = t('_background_career_');
      const backgroundNews = t('_background_news_');
      
      if (news.CATE_PARENT === parseInt(t('_id_career_'))) {
        if (newsCss && newsCss !== `news_${news.NEWS_ID}_css`) {
          return newsCss;
        } else if (backgroundCareer) {
          return `background-image:url(${backgroundCareer})`;
        }
      } else {
        if (newsCss && newsCss !== `news_${news.NEWS_ID}_css`) {
          return newsCss;
        } else if (backgroundNews) {
          return `background-image:url(${backgroundNews})`;
        }
      }
    }
    
    return '';
  };

  const getBreadcrumbParent = (): string => {
    if (news.CATE_PARENT_NAME) {
      return news.CATE_PARENT_NAME;
    }
    return t('_News_');
  };

  const getSectionTitle = (): string => {
    if (news.CATE_NAME && news.CATE_TYPE === '2') {
      return news.CATE_NAME;
    } else if (news.NEWS_TITLE) {
      return news.NEWS_TITLE;
    }
    return '';
  };

  const shouldShowTitle = (): boolean => {
    const offTitleKey = `_off_title_news_${news.NEWS_ID}`;
    const offTitle = t(offTitleKey);
    return !(offTitle && offTitle !== offTitleKey);
  };

  // OAuth2 relay styling effect
  useEffect(() => {
    const applyOAuth2Styling = () => {
      if ((window as any).$) {
        (window as any).$("[id*=oauth2relay]").css({
          'position': 'fixed',
          'width': '',
          'height': '0',
          'border': '0'
        });
      }
    };

    // Wait for jQuery to be available
    const checkAndApply = () => {
      if ((window as any).$) {
        applyOAuth2Styling();
      } else {
        setTimeout(checkAndApply, 100);
      }
    };

    checkAndApply();
  }, []);

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
      {news.CATE_NAME && (
        <div id="breadcrumb">
          <div className="container">
            <ol className="breadcrumb">
              <li>{getBreadcrumbParent()}</li>
              <li className="active">{news.CATE_NAME}</li>
            </ol>
          </div>
        </div>
      )}

      {/* News Content */}
      <div className="section-page page-content-pre">
        <header className="container-fluid">
          {shouldShowTitle() && (
            <h2 className="section-title">
              {getSectionTitle()}
            </h2>
          )}
        </header>
        
        <div className="container">
          <div className="col-xs-12">
            <div className="date-posted">{news.NEWS_POSTDATE}</div>
            <div 
              className="content_fck text-intro"
              dangerouslySetInnerHTML={{ __html: news.NEWS_CONTENT }}
            />
            
            {/* Include social share component */}
            {/* <BoxSocialShareP11 /> */}
          </div>
        </div>
      </div>
    </>
  );
}
