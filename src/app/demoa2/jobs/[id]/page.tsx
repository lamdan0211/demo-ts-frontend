import React from 'react';
import Header from '../../common/_header';
import Footer from '../../common/_footer';
import JobDetail from './index';
import { demoa2FooterData, demoa2HeaderData } from '@/lib/sample-data';

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const JobDetailPage = ({ params }: JobDetailPageProps) => {
  const { id } = React.use(params);
  
  return (
    <div className="min-h-screen">
      <Header
        siteId="demoa2"
        arrRwInfo={demoa2HeaderData.arrRwInfo}
        arrEmployer={{
          ...demoa2HeaderData.arrEmployer,
          RW_LOGO: 'logo.png'
        }}
        controller="jobs"
        action="detail"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        listFeatureCareer={demoa2HeaderData.listFeatureCareer}
        currentUrl={`/demoa2/jobs/${id}`}
        CHANGE_LANG_URL={`/demoa2/jobs/${id}?lang=vi`}
        language="en"
      />

      <JobDetail 
        siteId="demoa2" 
        jobId={id}
        arrRwInfo={demoa2HeaderData.arrRwInfo}
        arrEmployer={demoa2HeaderData.arrEmployer}
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        language="en"
      />

      <Footer
        siteId="demoa2"
        arrFooterMenuCates={demoa2FooterData}
        language="en"
      />
    </div>
  );
};

export default JobDetailPage;
