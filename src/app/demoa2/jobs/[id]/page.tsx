import React from 'react';
import JobDetail from './index';
import { demoa2HeaderData } from '@/lib/sample-data';

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const JobDetailPage = ({ params }: JobDetailPageProps) => {
  const { id } = React.use(params);
  
  return (
    <JobDetail 
      siteId="demoa2" 
      jobId={id}
      arrRwInfo={demoa2HeaderData.arrRwInfo}
      arrEmployer={demoa2HeaderData.arrEmployer}
      arrMenuCates={demoa2HeaderData.arrMenuCates}
      language="en"
    />
  );
};

export default JobDetailPage;
