import React from 'react';
import JobsPage from './index';
import Header from '../common/_header';
import Footer from '../common/_footer';
import { demoa1HeaderData, demoa1FooterData } from '@/lib/sample-data';
import { getSiteConfig } from '@/lib/site-config';

const Jobs = () => {
  const siteId = 'demoa1';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={demoa1HeaderData.arrRwInfo}
        arrEmployer={demoa1HeaderData.arrEmployer}
        controller="jobs"
        action="index"
        arrMenuCates={demoa1HeaderData.arrMenuCates}
        listFeatureCareer={demoa1HeaderData.listFeatureCareer}
        currentUrl="/demoa1/jobs"
        changeLangUrl="/demoa1/jobs?lang=en"
      />
      
      <JobsPage 
        siteId="demoa1" 
        arrJobs={[]}
        pages={undefined}
        linkParams="/demoa1/jobs"
        arrIndustries={[]}
        getAllLocateCountry={[]}
        arrParam={{}}
        arrInfo={null}
        arrFunction={{ OFF_JOIN_TALENT_NETWORK: false }}
        language="vi"
        arrRwInfo={demoa1HeaderData.arrRwInfo}
        arrEmployer={demoa1HeaderData.arrEmployer}
        arrMenuCates={demoa1HeaderData.arrMenuCates}
      />
      
      <Footer 
        siteId={siteId} 
        footerMenuCates={demoa1FooterData}
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
};

export default Jobs;