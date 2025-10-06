'use client';

import React from 'react';
import ForgotPasswordP11 from '../../../components/index/forgot-password-p11';

interface ForgotPasswordProps {
  // Props will be passed through to ForgotPasswordP11
  [key: string]: any;
}

export default function ForgotPassword(props: ForgotPasswordProps) {
  return <ForgotPasswordP11 {...props} />;
}
