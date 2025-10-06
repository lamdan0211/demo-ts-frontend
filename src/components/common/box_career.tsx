'use client';

import React from 'react';

interface Job {
  JOB_ID: number;
  JOB_TITLE: string;
  LINK: string;
}

interface BoxCareerProps {
  siteId?: string;
  language?: string;
  arrJobs?: Job[];
  jobNum?: number;
  LINK_JOBS?: string;
}

// Translation function
function t(key: string, language: string = 'en'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Career Opportunities_': {
      vi: 'Cơ hội nghề nghiệp',
      en: 'Career Opportunities'
    },
    '_View All Jobs_': {
      vi: 'Xem tất cả việc làm',
      en: 'View All Jobs'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function BoxCareer({
  siteId = 'demoa2',
  language = 'en',
  arrJobs = [],
  jobNum = 5,
  LINK_JOBS = '/demoa2/jobs'
}: BoxCareerProps) {
  
  if (!arrJobs || arrJobs.length === 0) {
    return null;
  }

  const displayJobs = arrJobs.slice(0, jobNum);

  const handleViewAllJobs = () => {
    window.location.href = LINK_JOBS;
  };

  return (
    <div className="BoxHolder">
      <div className="bgcolor_theme headerBox">{t('_Career Opportunities_', language)}</div>
      <div className="containerBox">
        <ul className="ListCareer">
          {displayJobs.map((job, index) => (
            <li key={job.JOB_ID || index}>
              <a 
                href={job.LINK} 
                title={job.JOB_TITLE}
              >
                {job.JOB_TITLE}
              </a>
            </li>
          ))}
        </ul>
        <div className="allJobBtn">
          <input 
            type="submit" 
            className="ui_btnCb btnSmall" 
            value={t('_View All Jobs_', language)}
            onClick={handleViewAllJobs}
          />
        </div>
      </div>
    </div>
  );
}