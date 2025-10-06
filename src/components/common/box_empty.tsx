'use client';

import React from 'react';

interface BoxEmptyProps {
  siteId?: string;
  language?: string;
  [key: string]: any;
}

export default function BoxEmpty({
  siteId = 'demoa2',
  language = 'en',
  ...props
}: BoxEmptyProps) {
  // This component is intentionally empty as per the original template
  return null;
}
