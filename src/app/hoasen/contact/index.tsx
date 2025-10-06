'use client';

import React from 'react';
import ContactIndexP11 from '../../../components/contact/index-p11';

interface ContactIndexProps {
  // Props will be passed through to ContactIndexP11
  [key: string]: any;
}

export default function ContactIndex(props: ContactIndexProps) {
  return <ContactIndexP11 {...props} />;
}
