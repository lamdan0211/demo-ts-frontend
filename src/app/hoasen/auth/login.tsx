'use client';

import React from 'react';

// Types
interface LoginProps {
  newlayout?: number;
}

// Import the conditional components
import LoginV1 from '../../../components/index/login_v1';
import LoginOld from '../../../components/index/login_old';

export default function Login({
  newlayout = 0
}: LoginProps) {
  
  // Conditional rendering based on newlayout prop
  if (newlayout === 1) {
    return <LoginV1 />;
  } else {
    return <LoginOld />;
  }
}
