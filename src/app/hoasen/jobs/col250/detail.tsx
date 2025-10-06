'use client';

import React from 'react';

// Types
interface Col250DetailProps {
  // Add any specific props needed for the detail sidebar
}

// Import the common components
import BoxMedia from '../../../../components/common/box_media';
import BoxSocialFanpage from '../../../../components/common/box_social_fanpage';
import BoxSocialFollow from '../../../../components/common/box_social_follow';
import BoxSimilarJobs from '../../../../components/common/box_similar_jobs';

export default function Col250Detail({}: Col250DetailProps) {
  
  return (
    <div id="col250">
      <BoxMedia />
      <BoxSocialFanpage />
      <BoxSocialFollow />
      <BoxSimilarJobs />
    </div>
  );
}
