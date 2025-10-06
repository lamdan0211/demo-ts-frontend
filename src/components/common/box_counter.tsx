'use client';

import React from 'react';

interface BoxCounterProps {
  siteId?: string;
  language?: string;
  arrFunction?: {
    COUNTER?: boolean;
  };
  homeNumView?: number;
  t?: (key: string, lang?: string) => string;
  [key: string]: any;
}

export default function BoxCounter({
  siteId = 'demoa2',
  language = 'en',
  arrFunction = { COUNTER: false },
  homeNumView = 0,
  t = (key: string) => key,
  ...props
}: BoxCounterProps) {
  // Don't render if counter is disabled
  if (!arrFunction.COUNTER) {
    return null;
  }

  // Don't render if no view count
  if (!homeNumView) {
    return null;
  }

  // Split the number into individual digits
  const digits = homeNumView.toString().split('');

  return (
    <div className="pageview">
      <strong>{t('num_visistor')}:</strong>
      {digits.map((digit, index) => (
        <span key={index}>{digit}</span>
      ))}
    </div>
  );
}
