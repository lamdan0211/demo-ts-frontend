'use client';

import { useState, useEffect } from 'react';
import { HeaderProps } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import Header from '../common/_header';
import Footer from '../common/_footer';

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'News': {
      vi: 'Tin tức',
      en: 'News'
    },
    'Latest News': {
      vi: 'Tin tức mới nhất',
      en: 'Latest News'
    },
    'News content is being developed...': {
      vi: 'Nội dung tin tức đang được phát triển...',
      en: 'News content is being developed...'
    }
  };
  
  return translations[key]?.[language] || key;
}

interface NewsPageProps extends HeaderProps {
  // Add any specific news props here if needed
}

export default function NewsPage({ 
  siteId, 
  arrRwInfo, 
  arrEmployer, 
  arrMenuCates = [], 
  language = 'vi',
  controller = 'news',
  action = 'index'
}: NewsPageProps) {
  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  return (
    <>
      <Header 
        siteId={siteId}
        arrRwInfo={arrRwInfo}
        arrEmployer={arrEmployer}
        arrMenuCates={arrMenuCates}
        controller={controller}
        action={action}
        language={language}
      />
      
      <div id="main">
        <div className="container">
          <div className="row" style={{float: 'none'}}>
            <div className="col-md-12">
              <div className="page-header">
                <h1>{t('News', language)}</h1>
                <p className="lead">{t('Latest News', language)}</p>
              </div>
              
              <div className="news-content">
                <div className="alert alert-info">
                  <p>{t('News content is being developed...', language)}</p>
                </div>
                
                {/* Placeholder for future news content */}
                <div className="row" style={{float: 'none'}}>
                  <div className="col-md-8">
                    <div className="news-list">
                      <div className="news-item">
                        <h3>Tin tức mẫu 1</h3>
                        <p className="text-muted">Ngày đăng: 01/01/2024</p>
                        <p>Đây là nội dung tin tức mẫu để demo giao diện...</p>
                      </div>
                      
                      <div className="news-item">
                        <h3>Tin tức mẫu 2</h3>
                        <p className="text-muted">Ngày đăng: 02/01/2024</p>
                        <p>Đây là nội dung tin tức mẫu thứ hai...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="sidebar">
                      <h4>Danh mục tin tức</h4>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <a href="/demoa1/news" className="text-decoration-none">
                            <i className="fa fa-newspaper-o me-2"></i>
                            Tin tức chung
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a href="/demoa1/news/employer-vi" className="text-decoration-none">
                            <i className="fa fa-briefcase me-2"></i>
                            Tin tức nhà tuyển dụng
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a href="/demoa1/news/employer-en" className="text-decoration-none">
                            <i className="fa fa-globe me-2"></i>
                            Employer News (EN)
                          </a>
                        </li>
                      </ul>
                      
                      <div className="mt-4">
                        <h5>Tin tức nổi bật</h5>
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">Xu hướng tuyển dụng 2024</h6>
                            <p className="card-text small">Khám phá những xu hướng tuyển dụng mới nhất trong năm 2024...</p>
                            <a href="/demoa1/news/employer-vi" className="btn btn-sm btn-outline-primary">Đọc thêm</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer 
        siteId={siteId}
        arrRwInfo={arrRwInfo}
        arrEmployer={arrEmployer}
        language={language}
      />
    </>
  );
}
