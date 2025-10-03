import React from 'react';
import ContactPage from './index';
import { demoa1HeaderData } from '@/lib/sample-data';

const Contact = () => {
  return (
    <ContactPage 
      siteId="demoa1" 
      strCaptcha="test"
      arrRwInfo={demoa1HeaderData.arrRwInfo}
      arrEmployer={demoa1HeaderData.arrEmployer}
      arrMenuCates={demoa1HeaderData.arrMenuCates}
      language="vi"
    />
  );
};

export default Contact;