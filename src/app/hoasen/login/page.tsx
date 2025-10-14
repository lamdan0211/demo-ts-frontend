import React from 'react';
import Login from '../auth/login';
import { getSiteConfig } from '@/lib/site-config';
import Header from '../common/_header';
import Footer from '../common/_footer';
import { hoasenHeaderData, hoasenFooterData } from '@/lib/sample-data';

export default function HoasenLoginPage() {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={hoasenHeaderData.arrRwInfo}
        arrEmployer={hoasenHeaderData.arrEmployer}
        controller="login"
        action="index"
        arrMenuCates={hoasenHeaderData.arrMenuCates}
        listFeatureCareer={hoasenHeaderData.listFeatureCareer}
        currentUrl="/hoasen/login"
        CHANGE_LANG_URL="/hoasen/login?lang=en"
        language={siteConfig?.language || 'vi'}
      />
      
      <div className="main-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-container">
                <Login newlayout={0} />
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
