'use client';

import { Col250DetailProps } from '@/lib/types';
import BoxUploadCv from '@/components/common/box_uploadCv';
import BoxSocialFanpage from '@/components/common/box_social_fanpage';
import BoxSimilarJobs from '@/components/common/box_similar_jobs';

export default function Col250Detail({ 
  siteId, 
  arrInfo,
  arrListSoNetwork = [],
  arrSimilarJobs = [],
  currentUrl = '/',
  language = 'vi' 
}: Col250DetailProps) {
  return (
    <div id="col250">
      {/* Upload CV Box */}
      <BoxUploadCv
        siteId={siteId}
        arrInfo={arrInfo}
        currentUrl={currentUrl}
      />

      {/* Social Fanpage Box */}
      <BoxSocialFanpage
        arrListSoNetwork={arrListSoNetwork}
      />

      {/* Similar Jobs Box */}
      <BoxSimilarJobs
        arrSimilarJobs={arrSimilarJobs}
        language={language}
      />
    </div>
  );
}
