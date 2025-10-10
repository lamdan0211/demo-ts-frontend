import React from 'react';
import NewsPage from './index';
import { demoa1HeaderData } from '@/lib/sample-data';

const News = () => {
  return (
    <NewsPage 
      siteId="demoa1" 
      arrRwInfo={demoa1HeaderData.arrRwInfo}
      arrEmployer={demoa1HeaderData.arrEmployer}
      arrMenuCates={demoa1HeaderData.arrMenuCates}
      language="vi"
    />
  );
};

export default News;
