import React from 'react';
import ForgotPassword from '../auth/forgot-password';
import { getSiteConfig } from '@/lib/site-config';
import Header from '../common/_header';
import Footer from '../common/_footer';
import { hoasenHeaderData, hoasenFooterData } from '@/lib/sample-data';

export default function HoasenForgotPasswordPage() {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={hoasenHeaderData.arrRwInfo}
        arrEmployer={hoasenHeaderData.arrEmployer}
        controller="forgot-password"
        action="index"
        arrMenuCates={hoasenHeaderData.arrMenuCates}
        listFeatureCareer={hoasenHeaderData.listFeatureCareer}
        currentUrl="/hoasen/forgot-password"
        CHANGE_LANG_URL="/hoasen/forgot-password?lang=en"
        language={siteConfig?.language || 'vi'}
      />
      
      <div className="main-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="forgot-password-container">
                <ForgotPassword />
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
