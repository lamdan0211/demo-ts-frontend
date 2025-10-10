import React from 'react';
import JobsPage from './index';
import { demoa1HeaderData } from '@/lib/sample-data';

const Jobs = () => {
  return (
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
  );
};

export default Jobs;