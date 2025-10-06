'use client';

import React from 'react';

// Types
interface LoadJobProps {
  // Add any specific props needed for the load job page
}

// Import the P31 load job component
import LoadJobP31 from '../../../components/jobs/load_job_p31';

export default function LoadJob({}: LoadJobProps) {
  
  return (
    <LoadJobP31 />
  );
}
