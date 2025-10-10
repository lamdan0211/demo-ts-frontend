import React from 'react';
import IndexPage from './index';
import { demoa1HeaderData } from '@/lib/sample-data';

export default function Demoa1Index() {
  return (
    <IndexPage 
      siteId="demoa1"
      arrRwInfo={demoa1HeaderData.arrRwInfo}
      arrIndustries={[]}
      arrLocations={[]}
      language="vi"
    />
  );
}
