import React from 'react';
import { redirect } from 'next/navigation';

const AboutVi = () => {
  redirect('/demoa1');
  return null; // This line will never be reached, but satisfies React component requirements
};

export default AboutVi;