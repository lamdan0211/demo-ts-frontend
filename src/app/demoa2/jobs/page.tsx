import React from 'react';
import JobsPage from './index';
import { demoa2HeaderData } from '@/lib/sample-data';

const Jobs = () => {
  return (
    <JobsPage 
      siteId="demoa2" 
      arrRwInfo={demoa2HeaderData.arrRwInfo}
      arrEmployer={demoa2HeaderData.arrEmployer}
      arrMenuCates={demoa2HeaderData.arrMenuCates}
      language="en"
    />
  );
};

export default Jobs;
