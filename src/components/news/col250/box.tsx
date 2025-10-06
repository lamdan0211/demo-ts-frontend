'use client';

import React from 'react';
import BoxMedia from '../../common/box_media';
import BoxSearchJobs from '../../common/box_search_jobs';
import BoxSocialFollow from '../../common/box_social_follow';
import BoxSurvey from '../../common/box_survey';
import BoxEmpty from '../../common/box_empty';

interface NewsCol250BoxProps {
  siteId?: string;
  language?: string;
  [key: string]: any;
}

export default function NewsCol250Box({
  siteId = 'demoa2',
  language = 'en',
  ...props
}: NewsCol250BoxProps) {
  return (
    <div id="col250">
      <BoxMedia siteId={siteId} language={language} {...props} />
      <BoxSearchJobs siteId={siteId} language={language} {...props} />
      <BoxSocialFollow siteId={siteId} language={language} {...props} />
      <BoxSurvey siteId={siteId} language={language} {...props} />
      <BoxEmpty siteId={siteId} language={language} {...props} />
    </div>
  );
}
