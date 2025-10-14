'use client';

import React from 'react';
import ChangePasswordP11 from '../../../components/index/change-password-p11';

interface ChangePasswordProps {
  // Props will be passed through to ChangePasswordP11
  [key: string]: any;
}

export default function ChangePassword(props: ChangePasswordProps) {
  return <ChangePasswordP11 {...props} />;
}
