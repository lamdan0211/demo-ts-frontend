'use client';

import React from 'react';

// Types
interface ApplyProps {
  // Add any specific props needed for the apply page
}

// Import the general apply component
import ApplyGeneral from '../../../components/jobs/apply_general';

export default function Apply({}: ApplyProps) {
  
  return (
    <ApplyGeneral />
  );
}
