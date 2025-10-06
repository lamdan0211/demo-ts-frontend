'use client';

import React from 'react';
import ForgotPasswordV1 from './forgot-password_v1';
import ForgotPasswordP11Old from './forgot-password-p11_old';

interface ForgotPasswordP11Props {
  newlayout?: number;
  // Other props will be passed through to the appropriate component
  [key: string]: any;
}

export default function ForgotPasswordP11({
  newlayout = 0,
  ...props
}: ForgotPasswordP11Props) {
  
  // Conditional rendering based on newlayout
  if (newlayout === 1) {
    return <ForgotPasswordV1 {...props} />;
  } else {
    return <ForgotPasswordP11Old {...props} />;
  }
}
