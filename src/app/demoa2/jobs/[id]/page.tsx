import React from 'react';
import JobDetail from './index';
import { demoa2HeaderData } from '@/lib/sample-data';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

const JobDetailPage = ({ params }: JobDetailPageProps) => {
  return (
    <JobDetail 
      siteId="demoa2" 
      jobId={params.id}
      arrRwInfo={demoa2HeaderData.arrRwInfo}
      arrEmployer={demoa2HeaderData.arrEmployer}
      arrMenuCates={demoa2HeaderData.arrMenuCates}
      language="en"
    />
  );
};

export default JobDetailPage;
