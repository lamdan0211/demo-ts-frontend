import React from 'react';
import ContactPage from './index';
import Header from '../common/_header';
import Footer from '../common/_footer';
import { demoa1HeaderData, demoa1FooterData } from '@/lib/sample-data';
import { getSiteConfig } from '@/lib/site-config';

const Contact = () => {
  const siteId = 'demoa1';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={demoa1HeaderData.arrRwInfo}
        arrEmployer={demoa1HeaderData.arrEmployer}
        controller="contact"
        action="index"
        arrMenuCates={demoa1HeaderData.arrMenuCates}
        listFeatureCareer={demoa1HeaderData.listFeatureCareer}
        currentUrl="/demoa1/contact"
        changeLangUrl="/demoa1/contact?lang=en"
      />
      
      <ContactPage 
        siteId="demoa1" 
        strCaptcha="test"
        arrRwInfo={demoa1HeaderData.arrRwInfo}
        arrEmployer={demoa1HeaderData.arrEmployer}
        arrMenuCates={demoa1HeaderData.arrMenuCates}
        language="vi"
      />
      
      <Footer 
        siteId={siteId} 
        footerMenuCates={demoa1FooterData}
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
};

export default Contact;