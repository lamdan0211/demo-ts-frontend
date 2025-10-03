'use client';

import { Col250BoxProps } from '@/lib/types';
import BoxUploadCv from '@/components/common/box_uploadCv';
import BoxMedia from '@/components/common/box_media';
import BoxSearchJobs from '@/components/common/box_search_jobs';
import BoxSocialFollow from '@/components/common/box_social_follow';
import BoxSurvey from '@/components/common/box_survey';

export default function Col250Box({ 
  siteId, 
  controller,
  action,
  cateId,
  arrInfo,
  currentUrl = '/',
  arrFunction,
  arrSurvey,
  csrfToken,
  language = 'vi' 
}: Col250BoxProps) {
  return (
    <div id="col250">
      {/* Upload CV Box */}
      <BoxUploadCv
        siteId={siteId}
        arrInfo={arrInfo}
        currentUrl={currentUrl}
      />

      {/* Media Box */}
      <BoxMedia
        siteId={siteId}
        controller={controller}
        action={action}
        cateId={cateId}
      />

      {/* Search Jobs Box */}
      <BoxSearchJobs
        siteId={siteId}
        language={language}
      />

      {/* Social Follow Box */}
      <BoxSocialFollow
        siteId={siteId}
        language={language}
      />

      {/* Survey Box */}
      <BoxSurvey
        siteId={siteId}
        arrFunction={arrFunction}
        arrSurvey={arrSurvey}
        csrfToken={csrfToken}
        language={language}
      />
    </div>
  );
}
