import React from 'react';
import { getSiteConfig } from '@/lib/site-config';
import Header from '../common/_header';
import Footer from '../common/_footer';
import { hoasenHeaderData, hoasenFooterData } from '@/lib/sample-data';

export default function HoasenJoinPage() {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={hoasenHeaderData.arrRwInfo}
        arrEmployer={hoasenHeaderData.arrEmployer}
        controller="join"
        action="index"
        arrMenuCates={hoasenHeaderData.arrMenuCates}
        listFeatureCareer={hoasenHeaderData.listFeatureCareer}
        currentUrl="/hoasen/join"
        CHANGE_LANG_URL="/hoasen/join?lang=en"
        language={siteConfig?.language || 'vi'}
      />
      
      <div className="main-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="join-container">
                <h1 className="text-center mb-4">Tham gia mạng lưới tài năng</h1>
                <div className="card">
                  <div className="card-body">
                    <p className="text-center mb-4">
                      Tham gia mạng lưới tài năng của chúng tôi để có cơ hội tìm được công việc phù hợp nhất.
                    </p>
                    <div className="text-center">
                      <a href="/hoasen/login" className="btn btn-primary me-3">
                        Đăng nhập
                      </a>
                      <a href="/hoasen/register" className="btn btn-outline-primary">
                        Đăng ký
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer 
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
}
