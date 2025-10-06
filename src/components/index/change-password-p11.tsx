'use client';

import React from 'react';
import ChangePasswordV1 from './change-password_v1';
import ChangePasswordP11Old from './change-password-p11_old';

interface ChangePasswordP11Props {
  newlayout?: number;
  // Other props will be passed through to the appropriate component
  [key: string]: any;
}

export default function ChangePasswordP11({
  newlayout = 0,
  ...props
}: ChangePasswordP11Props) {
  
  // Conditional rendering based on newlayout
  if (newlayout === 1) {
    return <ChangePasswordV1 {...props} />;
  } else {
    return <ChangePasswordP11Old {...props} />;
  }
}
