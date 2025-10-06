'use client';

import React from 'react';

// Types
interface LoginAjaxProps {
  newlayout?: number;
}

// Import the conditional components
import LoginAjaxV1 from '../../../components/index/login_ajax_v1';
import LoginAjaxOld from '../../../components/index/login_ajax_old';

export default function LoginAjax({
  newlayout = 0
}: LoginAjaxProps) {
  
  // Conditional rendering based on newlayout prop
  if (newlayout === 1) {
    return <LoginAjaxV1 />;
  } else {
    return <LoginAjaxOld />;
  }
}
