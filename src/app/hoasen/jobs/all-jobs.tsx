'use client';

import React, { useEffect } from 'react';

// Types
interface AllJobsProps {
  // Add any specific props needed for the all-jobs page
}

// Import the section component
import SectionAllJobs from '../../../components/jobs/section-all-jobs';

export default function AllJobs({}: AllJobsProps) {
  
  // Load Bing Maps script
  useEffect(() => {
    const loadBingMaps = () => {
      if (typeof window !== 'undefined' && !(window as any).Microsoft) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&s=1';
        script.async = true;
        document.head.appendChild(script);
      }
    };

    loadBingMaps();
  }, []);

  return (
    <div className="section-page all-jobs-pre">
      <SectionAllJobs />
    </div>
  );
}
