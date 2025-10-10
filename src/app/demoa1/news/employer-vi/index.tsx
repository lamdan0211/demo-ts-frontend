'use client';

import { useState, useEffect } from 'react';
import { HeaderProps } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import Header from '../../common/_header';
import Footer from '../../common/_footer';

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'News for Employers': {
      vi: 'Tin tức dành cho nhà tuyển dụng',
      en: 'News for Employers'
    },
    'Latest Employer News': {
      vi: 'Tin tức nhà tuyển dụng mới nhất',
      en: 'Latest Employer News'
    },
    'Employer news content is being developed...': {
      vi: 'Nội dung tin tức nhà tuyển dụng đang được phát triển...',
      en: 'Employer news content is being developed...'
    },
    'Recruitment Tips': {
      vi: 'Mẹo tuyển dụng',
      en: 'Recruitment Tips'
    },
    'HR Trends': {
      vi: 'Xu hướng nhân sự',
      en: 'HR Trends'
    },
    'Company News': {
      vi: 'Tin tức công ty',
      en: 'Company News'
    },
    'Industry Insights': {
      vi: 'Góc nhìn ngành',
      en: 'Industry Insights'
    }
  };
  
  return translations[key]?.[language] || key;
}

interface EmployerViPageProps extends HeaderProps {
  // Add any specific employer news props here if needed
}

export default function EmployerViPage({ 
  siteId, 
  arrRwInfo, 
  arrEmployer, 
  arrMenuCates = [], 
  language = 'vi',
  controller = 'news',
  action = 'employer-vi'
}: EmployerViPageProps) {
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
          <div className="row">
            <div className="col-md-12">
              <div className="page-header">
                <h1>{t('News for Employers', language)}</h1>
                <p className="lead">{t('Latest Employer News', language)}</p>
              </div>
              
              <div className="news-content">
                <div className="alert alert-info">
                  <p>{t('Employer news content is being developed...', language)}</p>
                </div>
                
                {/* Placeholder for employer news content */}
                <div className="row">
                  <div className="col-md-8">
                    <div className="news-list">
                      <div className="news-item">
                        <h3>Mẹo tuyển dụng hiệu quả trong năm 2024</h3>
                        <p className="text-muted">Ngày đăng: 15/01/2024</p>
                        <p>Những xu hướng tuyển dụng mới nhất và cách áp dụng vào doanh nghiệp của bạn...</p>
                      </div>
                      
                      <div className="news-item">
                        <h3>Xây dựng văn hóa công ty thu hút nhân tài</h3>
                        <p className="text-muted">Ngày đăng: 10/01/2024</p>
                        <p>Làm thế nào để tạo ra môi trường làm việc hấp dẫn và giữ chân nhân viên...</p>
                      </div>
                      
                      <div className="news-item">
                        <h3>Ứng dụng AI trong quy trình tuyển dụng</h3>
                        <p className="text-muted">Ngày đăng: 05/01/2024</p>
                        <p>Khám phá cách công nghệ AI đang thay đổi ngành tuyển dụng...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="sidebar">
                      <h4>Danh mục tin tức</h4>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <a href="#" className="text-decoration-none">
                            <i className="fa fa-briefcase me-2"></i>
                            {t('Recruitment Tips', language)}
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a href="#" className="text-decoration-none">
                            <i className="fa fa-line-chart me-2"></i>
                            {t('HR Trends', language)}
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a href="#" className="text-decoration-none">
                            <i className="fa fa-building me-2"></i>
                            {t('Company News', language)}
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a href="#" className="text-decoration-none">
                            <i className="fa fa-lightbulb-o me-2"></i>
                            {t('Industry Insights', language)}
                          </a>
                        </li>
                      </ul>
                      
                      <div className="mt-4">
                        <h5>Tin tức nổi bật</h5>
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">Tuyển dụng từ xa: Xu hướng mới</h6>
                            <p className="card-text small">Khám phá cách làm việc từ xa đang thay đổi ngành tuyển dụng...</p>
                            <a href="#" className="btn btn-sm btn-outline-primary">Đọc thêm</a>
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
