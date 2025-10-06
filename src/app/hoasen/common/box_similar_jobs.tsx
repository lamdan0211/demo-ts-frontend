'use client';

import React from 'react';
import BoxSimilarJobsP31 from '../../../components/common/box_similar_jobs_p31';

interface BoxSimilarJobsProps {
  // Props will be passed through to BoxSimilarJobsP31
  [key: string]: any;
}

export default function BoxSimilarJobs(props: BoxSimilarJobsProps) {
  return <BoxSimilarJobsP31 {...props} />;
}
