'use client';

import React from 'react';

// Types
interface ApplyGeneralProps {
  newlayout?: number;
}

// Import the conditional components
import ApplyV1 from './apply_v1';
import ApplyGeneralOld from './apply_general_old';

export default function ApplyGeneral({ newlayout = 0 }: ApplyGeneralProps) {
  
  // Conditional rendering based on newlayout prop
  if (newlayout === 1) {
    return <ApplyV1 />;
  } else {
    return <ApplyGeneralOld />;
  }
}
